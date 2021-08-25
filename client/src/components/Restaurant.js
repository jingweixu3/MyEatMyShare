import React, { useState, useEffect } from "react";
import Axios from "axios";
import GoogleMaps from "./GoogleMaps";
import PostRestaurant from "./PostRestaurant";
import Navbar from "./Navbar/Navbar";
import "./Restaurant.css";

const Restaurant = ({ id, userLoggedIn, userInfo }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [comment, setComment] = useState(null);

  const mapRef = React.useRef(); // save the map ref to move center or zoom accordingly

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  useEffect(() => {
    Axios.get(`/api/restaurant/${id}`)
      .then((res) => {
        console.log("restaurant data: ", res.data);
        setRestaurant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`/api/restaurant/user`, {
      params: {
        userid: userInfo.id,
        restaurantid: id,
      },
    })
      .then((res) => {
        setComment(res.data);
        console.log(res.data);
        console.log(comment);
        console.log("test");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const FindNearby = async () => {
    try {
      const res = await Axios.get(`/api/restaurant/nearby`, {
        params: {
          lat: restaurant.coordinate.lat,
          lng: restaurant.coordinate.lng,
        },
      });
      console.log(res.data);
      setNearby(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(id);

  return (
    <div>
      <Navbar userLoggedIn={userLoggedIn} userInfo={userInfo} />

      {restaurant && (
        <PostRestaurant
          comment={comment}
          openhour={restaurant.openhour}
          username={restaurant.name}
          phone={restaurant.phone}
          website={restaurant.website}
          types={restaurant.types}
          icon={restaurant.icon}
          vicinity={restaurant.vicinity}
          captions={restaurant.reviews}
          photos={restaurant.photos}
          view={restaurant.view}
        />
      )}

      <div className="map">
        {restaurant && (
          <GoogleMaps
            mapRef={mapRef}
            restaurant={restaurant}
            nearby={nearby}
            coordinate={restaurant.coordinate}
          />
        )}
      </div>
    </div>
  );
};

export default Restaurant;
