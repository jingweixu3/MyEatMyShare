import React, { useState } from "react";
import SearchPlaces from "./SearchPlaces";
import Axios from "axios";

const ExploreNearbyJumbotron = ({
  setFindNearByButton,
  setFindResturantButton,
  findResturantButton,
  findNearByButton,
  setplaceSearchResult,
}) => {
  const [place, setPlace] = useState("");
  const [err, setError] = useState(null);

  const onClickNearBy = (e) => {
    setFindNearByButton(!findNearByButton);
    setFindResturantButton(false);
  };

  const onClickFind = (e) => {
    setFindResturantButton(!findResturantButton);
    setFindNearByButton(false);
  };

  const onClickSearch = (e) => {
    if (!place) {
      console.log("Please selected a valid place!");
      setError("Please selected a valid place!");
      return;
    }
    console.log("Search", { place });

    // return the result
    Axios.get(`/api/resturant/${place}`)
      .then((res) => {
        console.log("resturant dataaaaaaa: ", res.data);
        setplaceSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="jumbotron vertical-align-center text-center mb-0">
      <div className="container mb-3">
        <button
          type="button"
          className="mb-2 btn btn-primary mr-2 btn-md"
          onClick={onClickNearBy}
        >
          FindNearby
        </button>
        <button
          type="button"
          className="mb-2 btn btn-primary mr-2 btn-md"
          onClick={onClickFind}
        >
          Find Resturant
        </button>
        {findResturantButton && (
          <div className="container mt-4 col-lg-4">
            <SearchPlaces setResturant={setPlace} />
            <button
              type="button"
              className="mt-4 mb-2 btn btn-primary mr-2 btn-md"
              onClick={onClickSearch}
            >
              Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreNearbyJumbotron;
