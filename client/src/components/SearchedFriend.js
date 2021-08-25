import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserGrid from "./UserGrid";

const SearchedFriend = ({ name, userInfo }) => {
  const [friendInfo, setFriendInfo] = useState([]);

  useEffect(() => {
    Axios.get(`/api/user/search/${name}`)
      .then((res) => {
        setFriendInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <nav aria-label="breadcrumb" className="main-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Search Result
          </li>
        </ol>
      </nav>
      <div className="row ng-scope">
        <div className="col-md-9 col-md-pull-3">
          <p className="search-results-count">
            About {friendInfo.length} results
          </p>
          <section className="search-result-item">
            {friendInfo.map((info) => (
              <UserGrid user={info} userInfo={userInfo} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SearchedFriend;
