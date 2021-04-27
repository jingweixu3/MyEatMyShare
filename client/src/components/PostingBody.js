import React from "react";
import PostGrid from "./PostGrid";

const PostingBody = ({ posts, userInfo }) => {
  return (
    <div className="container">
      {posts && (
        <div className="container mb-4">
          {posts.map((post) => (
            <PostGrid key={post.id} post={post} userInfo={userInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostingBody;
