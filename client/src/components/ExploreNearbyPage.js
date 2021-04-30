import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import ExploreNearbyJumbotron from "./ExploreNearbyJumbotron";
import FindNearby from "./FindNearby";
import FindResturant from "./FindResturant";
import Axios from "axios";

const ExploreNearbyPage = ({ userLocation,userLoggedIn,userInfo, setFriendInfo, friendInfo }) => {
  const [findNearByButton, setFindNearByButton] = useState(false);
  const [findResturantButton, setFindResturantButton] = useState(false);
  const [nearby, setNearby] = useState([]);
  const [placeSearchResult, setplaceSearchResult] = useState(null);

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
      <Navbar userLoggedIn={userLoggedIn} userInfo = {userInfo} setFriendInfo={setFriendInfo} friendInfo = {friendInfo}/>
      <ExploreNearbyJumbotron
        setFindNearByButton={setFindNearByButton}
        setFindResturantButton={setFindResturantButton}
        findResturantButton={findResturantButton}
        findNearByButton={findNearByButton}
        setplaceSearchResult={setplaceSearchResult}
      />
      <div className="container mt-5">
        {findNearByButton && (
          <FindNearby userLocation={userLocation} nearby={nearby} />
        )}
        {placeSearchResult && (
          <FindResturant placeSearchResult={placeSearchResult} />
        )}
      </div>
    </div>
  );
};

export default ExploreNearbyPage;
