import React from "react";
import Navbar from "./Navbar";
import PostingBody from "./PostingBody";
import UserHomeJumbotron from "./UserHomeJumbotron";

const UserHomePage = () => {
  return (
    <div>
      <Navbar />
      <UserHomeJumbotron />
      <PostingBody />
    </div>
  );
};

export default UserHomePage;
