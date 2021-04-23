import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ExploreNearbyJumbotron from "./ExploreNearbyJumbotron";
import FindNearby from "./FindNearby";
import FindResturant from "./FindResturant";
import Axios from "axios";

const ExploreNearbyPage = ({ userLocation }) => {
  const [findNearByButton, setFindNearByButton] = useState(false);
  const [findResturantButton, setFindResturantButton] = useState(false);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    Nearby_resturant();
  }, [userLocation]);

  const Nearby_resturant = async () => {
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
      <ExploreNearbyJumbotron
        setFindNearByButton={setFindNearByButton}
        setFindResturantButton={setFindResturantButton}
      />
      <div className="container mt-5">
        {findNearByButton && (
          <FindNearby userLocation={userLocation} nearby={nearby} />
        )}
        {findResturantButton && <FindResturant />}
      </div>
    </div>
  );
};

export default ExploreNearbyPage;
