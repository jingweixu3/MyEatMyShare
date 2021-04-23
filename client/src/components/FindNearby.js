import React, { useState, useEffect } from "react";
import GoogleMaps from "./GoogleMaps";

const FindNearby = ({ userLocation, nearby }) => {
  return (
    <div>
      Nearby
      <GoogleMaps resturant={null} nearby={nearby} coordinate={userLocation} />
      {nearby &&
        nearby.map((each) => <div key={each.place_id}>{each.name}</div>)}
    </div>
  );
};

export default FindNearby;
