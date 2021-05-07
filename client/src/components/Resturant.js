import React, { useState, useEffect } from "react";
import Axios from "axios";
import GoogleMaps from "./GoogleMaps";
import Navbar from "./Navbar/Navbar";

const Resturant = ({id, userLoggedIn, userInfo}) => {
  const [resturant, setResturant] = useState(null);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    Axios.get(`/api/resturant/${id}`)
      .then((res) => {
        console.log("resturant dataaaaaaa: ", res.data);
        setResturant(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const FindNearby = async () => {
    try {
      const res = await Axios.get(`/api/resturant/nearby`, {
        params: {
          lat: resturant.coordinate.lat,
          lng: resturant.coordinate.lng,
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
      <Navbar userLoggedIn={userLoggedIn} userInfo = {userInfo}/>
      {resturant && <h1>Hello {resturant.name}!</h1>}
      {resturant && (
        <h5>
          {resturant.coordinate.lat}, {resturant.coordinate.lng}
        </h5>
      )}
      {resturant && (
        <button type="button" className="btn btn-dark" onClick={FindNearby}>
          FindNearby
        </button>
      )}

      <div>
        {resturant && (
          <GoogleMaps
            resturant={resturant}
            nearby={nearby}
            coordinate={resturant.coordinate}
          />
        )}
      </div>
    </div>
  );
};

export default Resturant;
