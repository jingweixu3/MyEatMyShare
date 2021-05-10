"use strict";
const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/nearby", async (req, res) => {
  // get nearby 20 resturant

  const { lat, lng } = req.query;
  console.log(lat);
  console.log(lng);

  if (lat && lng) {
    let results = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBIWFtkPrXoDOGaO66Addbl-4Fu0mqbIZY&location=${lat},${lng}&radius=3000&type=restaurant&=`
    );

    let nearby = [];
    console.log(results.data.results);

    results.data.results.map((value) => {
      // ifconsole.log(value.photos);
      nearby.push({
        // view: (value.photos?[]: value.photos[0]),
        view: value.photos[0],
        place_id: value.place_id,
        ratingtotal: value.user_ratings_total,
        rating: value.rating,
        name: value.name,
        coordinate: value.geometry.location,
        price: value.price_level,
        open: value.opening_hours,
        close: value.permanently_closed,
        vicinity: value.vicinity,
      });
    });
    res.json(nearby);
  } else {
    res.status(400);
    res.send("Errors when finding nearby");
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);

  // fields=name,formatted_phone_number,price_level,geometry
  let result = await Axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&fields=name,reviews,photos,icon,vicinity,international_phone_number,rating,opening_hours,types,website,geometry&key=AIzaSyBIWFtkPrXoDOGaO66Addbl-4Fu0mqbIZY`
  );
  console.log("hh");
  console.log(result.data.result.opening_hours);
  const value = result.data.result;

  var pictures = [];
  if (result.data.result.photos && result.data.result.photos.length > 0) {
    for (var i = 1; i < result.data.result.photos.length; i++) {
      var picture = result.data.result.photos[i];
      pictures.push(picture);
    }
  }

  const resturant = {
    place_id: value.place_id,
    view: value.photos === undefined ? null : value.photos[0],
    photos: pictures,
    vicinity: value.vicinity,
    phone: value.international_phone_number,
    website: value.website,
    types: value.types,
    openhour: value.opening_hours,
    // rating: value.rating,
    // pictures: pictures,
    icon: value.icon,
    reviews: value.reviews,
    name: value.name,
    coordinate: value.geometry.location,
    // phone: value.formatted_phone_number,
    // working_hour: value.opening_hours.weekday_text,
  };
  res.json(resturant);
});

module.exports = router;
