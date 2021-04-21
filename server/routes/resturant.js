const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/:id", async (req, res) => {
  console.log(req.params.id);

  // fields=name,rating,formatted_phone_number,opening_hours,price_level,geometry
  let result = await Axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&fields=name,rating,formatted_phone_number,opening_hours,price_level,geometry&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU`
  );
  console.log(result.data.result);

  res.json(result.data.result);
});

module.exports = router;
