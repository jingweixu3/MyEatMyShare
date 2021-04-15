import React, { useState } from "react";
import Axios from "axios";

const PostingContent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [resturant, setResturant] = useState("");

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
  const handleResturantChange = (e) => {
    setResturant(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file uploaded. Required a file");
      return;
    }
    if (resturant === "") {
      console.log("No Resturant. Required a resturant title");
      return;
    }
    console.log(e);

    console.log("Resturant:", resturant);
    console.log("Content:", content);

    const data = new FormData();
    data.append("resturant", resturant);
    data.append("file", file);
    data.append("content", content);

    Axios.post("/api/post/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className="mt-1 container col-lg-6" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="postResturantName"
            placeholder="Resturant"
            onChange={handleResturantChange}
          />
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
    </div>
  );
};

export default PostingContent;
