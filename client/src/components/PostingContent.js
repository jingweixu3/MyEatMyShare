import React, { useState } from "react";
import Axios from "axios";
import SearchPlaces from "./SearchPlaces";
import CircularProgress from "@material-ui/core/CircularProgress";

const PostingContent = ({ setPostButton, setPosts, userInfo }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [restaurant, setRestaurant] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);
  const types = ["image/png", "image/jpeg"];

  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setFileName(selected.name);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("No File. Required a picture to upload!");
      return;
    }
    if (restaurant === "") {
      setError("No Restaurant. Required a restaurant!");
      return;
    }
    setSubmitStatus(true);
    console.log(JSON.stringify(restaurant));
    const data = new FormData();
    data.append("restaurant_id", restaurant);
    data.append("file", file);
    data.append("content", content);
    data.append("user_id", userInfo.id);
    data.append("user_name", userInfo.name);

    Axios.post("/api/post/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setSubmitStatus(false);
        console.log(res);
        setFile(null);
        setFileName("");
        setContent("");
        setRestaurant("");
        setPostButton(false);
        Axios.get(`/api/post/${userInfo.id}`)
          .then((res) => {
            console.log("data: ", res.data.posts);
            setPosts(res.data.posts);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to upload");
      });
  };

  return (
    <div>
      {/* alert window when fail to upload  */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      {/* upload form  */}
      <form className="mt-1 container col-lg-6" onSubmit={onSubmit}>
        <div className="form-group">
          <SearchPlaces setRestaurant={setRestaurant} />
        </div>
        <div className="custom-file mb-3">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleFileChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            id="postBody"
            rows="3"
            placeholder="Content"
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-1"
          />
        </div>
      </form>
      {submitStatus && <CircularProgress />}
    </div>
  );
};

export default PostingContent;
