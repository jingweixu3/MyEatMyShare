import React, { useState } from "react";
import SearchPlaces from "./SearchPlaces";
import "./ExploreNearbyJumbotron.css";
import Axios from "axios";

const ExploreNearbyJumbotron = ({
  panTo,
  setFindNearByButton,
  findNearByButton,
  setPlaceSearchResult,
  setCenter,
}) => {
  const [place, setPlace] = useState("");

  const [err, setError] = useState(null);

  const onClickSearch = (e) => {
    if (!place) {
      console.log("Please selected a valid place!");
      setError("Please selected a valid place!");
      return;
    }
    console.log("Search", { place });

    // return the result
    Axios.get(`/api/restaurant/${place}`)
      .then((res) => {
        console.log("restaurant data: ", res.data);
        setPlaceSearchResult(res.data);
        setCenter(res.data.coordinate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div></div>

      <div className="search">
        <SearchPlaces setRestaurant={setPlace} panTo={panTo} />
        {console.log("test1" + place)}
        <div className="searchbutton">
          <button
            className="btn btn-light"
            type="button"
            onClick={onClickSearch}
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreNearbyJumbotron;
