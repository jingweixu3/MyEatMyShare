import React from "react";
import PostGrid from "./PostGrid";

const PostingBody = ({ posts }) => {
  return (
    <div className="album py-4 bg-light">
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <PostGrid key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostingBody;
