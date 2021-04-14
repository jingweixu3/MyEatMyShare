import React from "react";
import PostGrid from "./PostGrid";

const PostingBody = () => {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          <PostGrid />
          <PostGrid />
          <PostGrid />
          <PostGrid />
          <PostGrid />
          <PostGrid />
        </div>
      </div>
    </div>
  );
};

export default PostingBody;
