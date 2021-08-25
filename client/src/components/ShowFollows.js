import React, { useState, useEffect } from "react";
import UserGrid from "./UserGrid";

const ShowFollows = ({ foundUser, userInfo, follows }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 col-md-pull-3">
          <section className="search-result-item">
            {foundUser &&
              follows &&
              follows.map((info) => (
                <UserGrid user={info} userInfo={userInfo} isProfile={true} />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShowFollows;
