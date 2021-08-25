import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Axios from "axios";

const UpdateProfile = ({ foundUser, setFoundUser }) => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [state, setState] = useState({
    firstName: foundUser.firstName,
    lastName: foundUser.lastName,
    location: foundUser.location,
    note: foundUser.note,
  });
  const types = ["image/png", "image/jpeg"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state in udate profile", state);
    console.log("thi is file,", file);
    const data = new FormData();
    data.append("firstName", state.firstName);
    data.append("lastName", state.lastName);
    data.append("location", state.location);
    data.append("note", state.note);
    data.append("file", file);
    Axios.post(`/api/user/update/${foundUser.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setFile(null);
        setFileName("");
      })
      .catch((err) => {
        console.log("err in update profile", err);
      });
  };
  console.log("set foundUser", foundUser);

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
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-12 col-sm-auto mb-3">
        <div className="mx-auto" style={{ width: "140px" }}>
          <div className="d-flex justify-content-center align-items-center rounded">
            {foundUser && foundUser.avatar === "" && (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
            )}
            {foundUser && foundUser.avatar !== "" && (
              <img
                src={foundUser.avatar}
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
            )}
          </div>
        </div>
      </div>
      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-4 ">
        <div className="mx-auto ">
          <div className="mt-2">
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
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6 mb-3">
          <label htmlFor="validationDefault01">First name</label>
          <input
            type="text"
            className="form-control"
            id="validationDefault01"
            value={state.firstName}
            placeholder={foundUser.firstName}
            onChange={(e) => {
              setState({ ...state, firstName: e.target.value });
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="validationDefault02">Last name</label>
          <input
            type="text"
            className="form-control"
            id="validationDefault02"
            value={state.lastName}
            placeholder={foundUser.lastName}
            onChange={(e) => {
              setState({ ...state, lastName: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-12 mb-3">
          <label htmlFor="validationDefault03">Location</label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            value={state.locatio}
            placeholder={foundUser.location}
            onChange={(e) => {
              setState({ ...state, location: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="validationTextarea">Things I like!</label>
        <textarea
          className="form-control"
          id="validationTextarea"
          value={state.note}
          placeholder={foundUser.note}
          onChange={(e) => {
            setState({ ...state, note: e.target.value });
          }}
        ></textarea>
        <div className="invalid-feedback"></div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit form
      </button>
    </form>
    // </div>
  );
};

export default UpdateProfile;
