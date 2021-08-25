import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantList.css";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const RestaurantList = ({ nearby }) => {
  return (
    <div className="showlist">
      {nearby.map((restaurant) => (
        <div className="listitem">
          <img
            className="image"
            src={`https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${restaurant.view.photo_reference}&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`}
            alt="/.default_avatar.png"
          />

          <h1 className="title">
            <Link to={`/Restaurant/${restaurant.place_id}`}>
              {restaurant.name}
            </Link>
          </h1>

          <div className="open_close">
            {restaurant.close && (
              <span className="curclose">permanent close</span>
            )}
            {!restaurant.close && restaurant.open && restaurant.open.open_now && (
              <div>
                <span className="curopen">open now</span>
                &nbsp;&nbsp;
                {[...Array(restaurant.price)].map((e, i) => {
                  return <span className="price">$</span>;
                })}
              </div>
            )}
            {!restaurant.close && !restaurant.open.open_now && (
              <div>
                <span className="nowclose">close now</span>
                &nbsp;&nbsp;
                {[...Array(restaurant.price)].map((e, i) => {
                  return <span className="price">$</span>;
                })}
              </div>
            )}
          </div>

          <div className="address">{restaurant.vicinity}</div>

          <div className="rating">
            <Box component="fieldset" mb={2} borderColor="transparent">
              <Rating name="read-only" value={restaurant.rating} readOnly />
            </Box>
          </div>

          <div className="ratingnumber">
            <Typography component="legend">
              {" "}
              {restaurant.rating} stars ({restaurant.ratingtotal})
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
