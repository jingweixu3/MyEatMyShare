import React from "react";
import Navbar from "./Navbar";
import PostingBody from "./PostingBody";
import SearchPlaces from "./SearchPlaces";
import UserHomeJumbotron from "./UserHomeJumbotron";

const UserHomePage = ({ posts, setPosts }) => {
  return (
    <div>
      <Navbar />
      <UserHomeJumbotron setPosts={setPosts} />
      <PostingBody posts={posts} />
    </div>
  );
};

export default UserHomePage;
