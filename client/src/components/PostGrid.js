import React from "react";

const PostGrid = ({ post }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" src={post.url} alt="" />
        <div className="card-body">
          <h5 className="card-title">{post.resturant}</h5>
          <p className="card-text">{post.content}</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
