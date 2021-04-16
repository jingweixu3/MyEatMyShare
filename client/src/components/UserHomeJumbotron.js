import React, { useState } from "react";
import PostingContent from "./PostingContent";

const UserHomeJumbotron = () => {
  const [postButton, setPostButton] = useState(false);
  const onClickPost = (e) => {
    setPostButton(!postButton);
  };

  return (
    <div className="jumbotron vertical-align-center text-center">
      <div className="container mb-3">
        <button
          type="button"
          className="btn btn-primary mr-2 btn-md"
          onClick={onClickPost}
        >
          AddPost
        </button>
      </div>

      <div>
        {postButton && <PostingContent setPostButton={setPostButton} />}
      </div>
    </div>
  );
};

export default UserHomeJumbotron;
