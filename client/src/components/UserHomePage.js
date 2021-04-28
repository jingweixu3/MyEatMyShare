import React from "react";
import Navbar from "./Navbar/Navbar";
import PostingBody from "./PostingBody";
import UserHomeJumbotron from "./UserHomeJumbotron";

const UserHomePage = ({ userLoggedIn, userInfo, posts, setPosts }) => {
  return (
    <div>
      <Navbar userLoggedIn={userLoggedIn} userInfo={userInfo} />
      <UserHomeJumbotron setPosts={setPosts} />
      <PostingBody posts={posts} userInfo={userInfo} />
    </div>
  );
};

export default UserHomePage;
