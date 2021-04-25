import React from "react";

const FindResturant = ({ placeSearchResult }) => {
  console.log(placeSearchResult.name);
  return (
    <div>
      <h5>{placeSearchResult.name}</h5>
      <p>Hiiiii</p>
    </div>
  );
};

export default FindResturant;
