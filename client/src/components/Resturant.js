import React, { useState, useEffect } from "react";
import Axios from "axios";
import GoogleMaps from "./GoogleMaps";
import PostRestaurant from "./PostRestaurant";
import RestaurantList from "./RestaurantList";
import Navbar from "./Navbar/Navbar";
import './Resturant.css';


const Resturant = ({id, userLoggedIn, userInfo}) => {
  const [resturant, setResturant] = useState(null);
  const [nearby, setNearby] = useState([]);

  const mapRef = React.useRef(); // save the map ref to move center or zoom accordingly

  
  const panTo = React.useCallback(({ lat, lng }) => {
    
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);

  }, []);

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
<<<<<<< Updated upstream
      <Navbar userLoggedIn={userLoggedIn} userInfo = {userInfo}/>
      {resturant && <h1>Hello {resturant.name}!</h1>}
      {resturant && (
        <h5>
          {resturant.coordinate.lat}, {resturant.coordinate.lng}
        </h5>
      )}
=======
      <Navbar />




      {/* {resturant && (
                    <button type="button" className="btn btn-dark" onClick={FindNearby}>
                    FindNearby
                    </button>
                )} */}

      {/* { (resturant&&nearby && nearby !==[] )&&

      (<RestaurantList nearby={nearby} />)
      
      } */}


>>>>>>> Stashed changes
      {resturant && (
       <PostRestaurant openhour={resturant.openhour} username={resturant.name} phone={resturant.phone} website={resturant.website} types={resturant.types} icon={resturant.icon} vicinity={resturant.vicinity} captions={resturant.reviews} photos={resturant.photos} view={resturant.view}/>
      )}

      <div className="map">
        {resturant && (
          <GoogleMaps
            mapRef={mapRef}
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
