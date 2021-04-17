import React from "react";
import Navbar from "./Navbar";
import PostingBody from "./PostingBody";
import UserHomeJumbotron from "./UserHomeJumbotron";

const UserHomePage = ({ posts }) => {
  return (
    <div>
      <Navbar />
      <UserHomeJumbotron />
      <PostingBody posts={posts} />
    </div>
  );
};

export default UserHomePage;
