import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import option from "../../assets/option.PNG";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserAvatar from "../UserAvatar";
import moment from "moment";
import Comment from "./Comment";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const Post = (props) => {
  const { user } = useAuth();
  const [hasLiked, setHasLiked] = useState();
  const [likes, setLikes] = useState([]);
  const [comment, setComment] = useState("");
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  // Fetching comment from input field
  const fetchComment = (e) => {
    setComment(e.target.value);
  };

  //Fetching Comment from server

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", props.id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [setComments, props.id]);

  // Posting Comment

  const addComment = async () => {
    await addDoc(collection(db, "posts", props.id, "comments"), {
      username: user.displayName,
      comment: comment,
      timestamp: serverTimestamp(),
    }).then(() => {
      setComment("");
    });
  };

  // logic of liking the post and delete if already liked

  const like = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", props.id, "likes", user?.uid));
    } else {
      await setDoc(doc(db, "posts", props.id, "likes", user?.uid), {
        username: user.displayName,
      });
    }
  };

  //Fetching Posts

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", props.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [setLikes, props.id]);

  //Logic for setting likes

  useEffect(() => {
    setHasLiked(likes.findIndex((item) => item.id === user?.uid) !== -1);
  }, [likes, user]);

  return (
    <PostContainer>
      <PostHeader>
        <PostAuthor>
          <UserAvatar
            displayName={props.username}
            photoURL={props.avatar}
          ></UserAvatar>
          <User>{props.username}</User>
        </PostAuthor>
        <PostOption>
          <Option src={option}></Option>
        </PostOption>
      </PostHeader>
      <PostImage>
        <Img src={props.image}></Img>
      </PostImage>
      {user ? (
        <PostAction>
          <PostActionLeft>
            <PostActionItem>
              {!hasLiked ? (
                <FavoriteBorderIcon onClick={like}></FavoriteBorderIcon>
              ) : (
                <HeartIcon sx={{ color: "#f2003c" }} onClick={like}></HeartIcon>
              )}
            </PostActionItem>
            <PostActionItem>
              <ChatOutlinedIcon
                onClick={() => commentRef.current.focus()}
              ></ChatOutlinedIcon>
            </PostActionItem>
            <PostActionItem>
              <NearMeOutlinedIcon></NearMeOutlinedIcon>
            </PostActionItem>
          </PostActionLeft>
          <PostActionRight>
            <PostActionItem>
              <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
            </PostActionItem>
          </PostActionRight>
        </PostAction>
      ) : null}
      <PostDetails>
        <PostLikes>
          <span>{likes.length}</span>
          <span style={{ marginLeft: "0.3rem" }}>likes</span>
        </PostLikes>

        <TimeStamp>{props.timestamp}</TimeStamp>
        <PostCaption>
          <Caption>
            <User>{props.username}</User>
            {props.caption}
          </Caption>
        </PostCaption>
        <PostComments>
          {comments.length > 0 &&
            comments.map((comment) => {
              const formattedTimeStamp = moment(
                comment.data().timestamp?.toDate()
              ).from(new Date()); //Moment Js Formatter
              return (
                <Comment
                  key={comment.id}
                  username={comment.data().username}
                  comment={comment.data().comment}
                  timestamp={formattedTimeStamp}
                ></Comment>
              );
            })}
        </PostComments>
      </PostDetails>
      <CommentContainer>
        <CommentIcon></CommentIcon>
        <CommentInput
          ref={commentRef}
          value={comment}
          onChange={(e) => fetchComment(e)}
          placeholder="Add Comment"
        ></CommentInput>

        <CommentPost onClick={addComment} disabled={comment.trim() === ""}>
          Post
        </CommentPost>
      </CommentContainer>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  &:last-child {
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  background: white;
  border-top: 1px solid rgba(219, 219, 219, 1);
  border-bottom: 1px solid rgba(219, 219, 219, 1);

  @media (min-width: 600px) {
    border: 1px solid rgba(219, 219, 219, 1);
    border-radius: 0.2rem;
  }
`;

const PostHeader = styled.div`
  display: flex;
`;

const PostAuthor = styled.div`
  width: 80%;
  padding: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const User = styled.div`
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  font-weight: bold;
  font-size: 0.8rem;
`;

const PostOption = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
`;

const Option = styled.img`
  max-width: 20%;
  max-height: 20%;
`;

const PostImage = styled.div`
  border: none;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
`;

const PostAction = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.8rem 0.5rem 0.2rem 0rem;
`;

const PostActionLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostActionRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PostActionItem = styled.div`
  &:hover,
  :focus {
    color: grey;
  }
  margin-left: 0.7rem;
  cursor: pointer;
  display: inline-block;
  object-fit: contain;
  max-width: 2.2rem;
  max-height: 2.2rem;
  padding: 0.1rem;
  transition: transform 100ms ease-out;
`;

const PostDetails = styled.div`
  ${User} {
    margin-left: 0;
    font-size: 0.8rem;
  }
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem 1rem 1rem;
  width: 100%;
`;

const PostLikes = styled.div`
  & > span {
    font-weight: bold;
    font-size: 0.8rem;
  }
  display: flex;
  font-weight: bold;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const PostCaption = styled.div`
  padding: 0.2rem 0 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Caption = styled.div`
  font-size: 0.8rem;
  ${User} {
    display: inline-block;
    /* padding-bottom: 0.3rem; */
    font-size: 0.8rem;
  }
`;

const TimeStamp = styled.div`
  display: flex;
  justify-items: flex-start;
  align-items: center;
  font-size: 0.65rem;
  padding: 0.5rem 0;
  color: #757575;
  text-transform: uppercase;
`;

const HeartIcon = styled(FavoriteIcon)`
  animation-duration: 100ms;
  transition: cubic-bezier(1, 0, 0, 1);
  animation-name: zoom;

  @keyframes zoom {
    0% {
      transform: scale(1.1);
    }
    25% {
      transform: scale(1.3);
    }
    50% {
      transform: scale(1.5);
    }
    75% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const PostComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`;

const CommentContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0;
  border-top: 1px solid rgba(219, 219, 219, 1);
`;

const CommentIcon = styled(SentimentSatisfiedOutlinedIcon)`
  margin: 0.5rem;
`;
const CommentInput = styled.input`
  &:focus ::placeholder {
    color: black;
  }
  flex-grow: 1;
  outline: none;
  border: none;
  display: flex;
  width: 0;
`;
const CommentPost = styled.button`
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
  font-size: 0.8rem;
  font-weight: bold;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #0095f6;
`;

export default Post;
