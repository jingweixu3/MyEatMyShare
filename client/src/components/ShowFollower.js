import React, { useState, useEffect } from "react";
import UserGrid from "./UserGrid";

const ShowFollower = ({ foundUser, userInfo, follower }) => {
  return (
    <div className="container">
      <div>
        <div>
          {foundUser &&
            follower &&
            follower.map((info) => (
              <UserGrid user={info} userInfo={userInfo} isProfile={true} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFollower;
