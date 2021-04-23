import React from "react";
import FindResturant from "./FindResturant";

const ExploreNearbyJumbotron = ({
  findNearByButton,
  setFindNearByButton,
  findResturantButton,
  setFindResturantButton,
}) => {
  const onClickNearBy = (e) => {
    setFindNearByButton(true);
    setFindResturantButton(false);
  };

  const onClickSearch = (e) => {
    setFindResturantButton(true);
    setFindNearByButton(false);
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
          onClick={onClickSearch}
        >
          Search Resturant
        </button>
      </div>
    </div>
  );
};

export default ExploreNearbyJumbotron;
