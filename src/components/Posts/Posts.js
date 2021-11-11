import React, { useState, useEffect } from "react";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../../firebaseConfig";

// import faker from "faker";

const Posts = () => {
  // const [posts, setPosts] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, []);

  // postss.map((post) =>
  //   console.log({
  //     id: post.id,
  //     image: post.data().image,
  //     avatar: post.data().profilepic,
  //     username: post.data().username,
  //     caption: post.data().caption,
  //   })
  // );
  // useEffect(() => {
  //   const data = [...Array(10)].map(() => {
  //     return {
  //       id: faker.datatype.uuid(),
  //       avatar: faker.image.avatar(),
  //       image: `${faker.image.unsplash.imageUrl()}?random=${
  //         faker.datatype.number() * 1000
  //       }`,
  //       username: faker.fake("{{name.firstName}}"),
  //       caption: faker.fake("{{lorem.lines}}"),
  //       likes: faker.datatype.number(),
  //     };
  //   });
  //   setPosts(data);
  // }, []);

  return (
    <>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          avatar={post.data().profilepic}
          image={post.data().image}
          username={post.data().username}
          caption={post.data().caption}
        ></Post>
      ))}
    </>
  );
};

export default Posts;
