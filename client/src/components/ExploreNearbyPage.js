import React, { useState, useEffect } from "react";
import GoogleMaps from "./GoogleMaps";
import Navbar from "./Navbar";
import Axios from "axios";

const ExploreNearbyPage = ({ userLocation }) => {
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    FindNearby();
  }, [userLocation]);

  const FindNearby = async () => {
    try {
      console.log("explore page:", userLocation);
      if (userLocation) {
        const res = await Axios.get(`/api/resturant/nearby`, {
          params: {
            lat: userLocation.lat,
            lng: userLocation.lng,
          },
        });
        console.log(res.data);
        setNearby(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <GoogleMaps resturant={null} nearby={nearby} coordinate={userLocation} />
    </div>
  );
};

export default ExploreNearbyPage;
