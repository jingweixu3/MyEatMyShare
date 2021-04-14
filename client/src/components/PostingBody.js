import React from "react";
import PostGrid from "./PostGrid";

const PostingBody = () => {
  return (
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
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
