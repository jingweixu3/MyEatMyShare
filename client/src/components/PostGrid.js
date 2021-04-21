import React from "react";
import { Link } from "react-router-dom";

const PostGrid = ({ post }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card mb-4 box-shadow">
        <Link to={`/Resturant/${post.resturant_id}`}>
          <h5 className="card-title">{post.resturant_name}</h5>
        </Link>

        <img className="card-img-top" src={post.url} alt="" />
        <div className="card-body">
          <p className="card-text">{post.content}</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Comments"
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
