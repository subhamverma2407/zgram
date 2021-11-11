import React, { useState, useEffect } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../../firebaseConfig";
import moment from "moment";

// import faker from "faker";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [setPosts]);

  return (
    <>
      {posts?.map((post) => {
        const formattedTimeStamp = moment(post.data().timestamp?.toDate()).from(
          new Date()
        ); //Moment Js Formatter
        return (
          <Post
            key={post.id}
            id={post.id}
            avatar={post.data().profilepic}
            image={post.data().image}
            username={post.data().username}
            caption={post.data().caption}
            timestamp={formattedTimeStamp}
          ></Post>
        );
      })}
    </>
  );
};

export default Posts;
