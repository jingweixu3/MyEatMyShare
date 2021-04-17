import React from "react";

const PostGrid = ({ post }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 box-shadow">
        <img className="card-img-top" src={post.url} alt="" />
        <div className="card-body">
          <p className="card-text">{post.content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostGrid;
