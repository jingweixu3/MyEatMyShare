import React from "react";
import Navbar from "./Navbar/Navbar";
import PostingBody from "./PostingBody";
import SearchPlaces from "./SearchPlaces";
import UserHomeJumbotron from "./UserHomeJumbotron";

const UserHomePage = ({userLoggedIn, userInfo, posts, setPosts, setFriendInfo, friendInfo }) => {
  return (
    <div>
      <Navbar userLoggedIn= {userLoggedIn} userInfo = {userInfo} setFriendInfo={setFriendInfo} friendInfo = {friendInfo}/>
      <UserHomeJumbotron setPosts={setPosts} />
      <PostingBody posts={posts} />
    </div>
  );
};

export default UserHomePage;
