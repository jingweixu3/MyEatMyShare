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
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU&location=${lat},${lng}&radius=3000&type=restaurant&=`
    );

    let nearby = [];
    results.data.results.map((value) => {
      nearby.push({
        place_id: value.place_id,
        rating: value.rating,
        name: value.name,
        coordinate: value.geometry.location,
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
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&fields=name,geometry&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`
  );
  console.log(result.data.result);
  const value = result.data.result;
  const resturant = {
    place_id: value.place_id,
    // rating: value.rating,
    name: value.name,
    coordinate: value.geometry.location,
    // phone: value.formatted_phone_number,
    // working_hour: value.opening_hours.weekday_text,
  };
  res.json(resturant);
});

module.exports = router;
