import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const PostGrid = ({ post, userInfo }) => {
  const [addcomment, setAddComment] = useState("");

  const TypeComment = (e) => {
    setAddComment(e.target.value);
  };

  const SendComment = (e) => {
    if (addcomment === "") {
      console.log("please type comment before send! ");
      return;
    }
    console.log("send");
    let data = {
      username: userInfo.firstName,
      comment: addcomment,
      post_id: post.id,
    };
    Axios.post("/api/post/addComment", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setAddComment("");

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              value={addcomment}
              onChange={TypeComment}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={SendComment}
              >
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
