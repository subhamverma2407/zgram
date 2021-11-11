import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    if (!user) {
      nav("/signin");
    }
  }, [user, nav]);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const captionRef = useRef();

  const fetchImage = (e) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.value)) {
      toast.error("Please Select Images Only", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  };

  const validate = () => {
    if (!image && !caption) {
      toast.error("Chose An Image and Add Caption");
      captionRef.current.value = "";
    } else if (!caption) {
      toast.error("Add Caption");
      captionRef.current.value = "";
    } else if (!image) toast.error("Chose An Image");
    else uploadPost();
  };

  const uploadPost = async () => {
    setUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.displayName,
      profilepic: user.photoURL,
      caption: caption,
      userid: user.uid,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, image, "data_url").then(async (snapshot) => {
      const imageURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: imageURL,
      }).then(() => {
        toast.success("Post Uploaded");
        setUploading(false);
        setImage(null);
        setCaption(null);
        captionRef.current.value = "";
        nav("/");
      });
    });
  };

  return (
    <Container>
      <PostContainer>
        <Head>Create a Post</Head>
        {!image ? (
          <UploadIcon>
            <IconWrapper onClick={() => fileRef.current.click()}>
              <CameraAltOutlinedIcon
                sx={{ width: "40px", height: "40px" }}
              ></CameraAltOutlinedIcon>
              <input
                onChange={fetchImage}
                hidden
                ref={fileRef}
                type="file"
              ></input>
            </IconWrapper>
          </UploadIcon>
        ) : (
          <PostImage onClick={() => setImage(null)}>
            <Img src={image}></Img>
          </PostImage>
        )}
        <Caption>
          <CaptionInput
            ref={captionRef}
            placeholder="Add Caption"
            onChange={() =>
              captionRef.current.value.trim() &&
              setCaption(captionRef.current.value)
            }
          ></CaptionInput>
        </Caption>
        <UploadButton disabled={uploading} onClick={validate}>
          {uploading ? "UPLOADING..." : "UPLOAD"}
        </UploadButton>
      </PostContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const PostContainer = styled.div`
  border: 1px solid rgba(219, 219, 219, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.4rem;
  padding-bottom: 1rem;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(219, 219, 219, 1);
`;

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #ffdce8;
  border-radius: 50%;
`;
const UploadIcon = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  color: #c4001d;
`;

const PostImage = styled.div`
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 100%;
  @media (min-width: 500px) {
    max-width: 50%;
  }
`;

const Caption = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CaptionInput = styled.input`
  &:focus,
  :active {
    &::placeholder {
      color: transparent;
    }
    border: 1px solid rgba(100, 100, 100, 1);
    text-align: left;
  }
  text-align: center;
  width: 90%;
  border: 1px solid rgba(219, 219, 219, 1);
  font-size: 0.9rem;
  padding: 0.5 1rem;
  max-height: 3rem;
  min-height: 2rem;
  outline: none;
  border-radius: 0.3rem;
`;

const UploadButton = styled.button`
  &:hover {
    background-color: white;
    color: #e74c3c;
  }

  transition: 250ms ease-in-out;
  background-color: #e74c3c;
  border: none;
  outline: none;
  border: 1px solid #e74c3c;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.1rem;
`;

export default AddPost;
