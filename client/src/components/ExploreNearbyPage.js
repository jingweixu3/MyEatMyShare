import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import ExploreNearbyJumbotron from "./ExploreNearbyJumbotron";
import RestaurantList from "./RestaurantList";
import Axios from "axios";
import {
  Combobox
} from "@reach/combobox";
import "./ExploreNearbyPage.css";
import GoogleMaps from "./GoogleMaps";

const ExploreNearbyPage = ({ userLocation,userLoggedIn,userInfo, setFriendInfo, friendInfo }) => {
  // const [findNearByButton, setFindNearByButton] = useState(false);

  const [nearby, setNearby] = useState([]);
  const [placeSearchResult, setplaceSearchResult] = useState(null);
  // const [findResturantButton, setFindResturantButton] = useState(false);
  const [center, setCenter] = useState({
    lat: 34.0223,
    lng: -118.2851,
  });

  const mapRef = React.useRef(); // save the map ref to move center or zoom accordingly

  
  const panTo = React.useCallback(({ lat, lng }) => {
    
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);

  }, []);

  const Nearby_resturant = async () => {
    try {
      console.log("explore page:", center);
      if (center) {
        const res = await Axios.get(`/api/resturant/nearby`, {
          params: {
            lat: center.lat,
            lng: center.lng,
          },
        });
        console.log(res.data[0]);
        setNearby(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar userLoggedIn={userLoggedIn} userInfo = {userInfo} setFriendInfo={setFriendInfo} friendInfo = {friendInfo}/>

      <Combobox>
      <ExploreNearbyJumbotron className="search"
        panTo={panTo}

        setplaceSearchResult={setplaceSearchResult}
        setCenter={setCenter}
      />

        {/* {placeSearchResult &&   (

      <div className = "post">


                  <div >

                  <PostRestaurant   username={placeSearchResult.name} phone={placeSearchResult.phone} website={placeSearchResult.website} types={placeSearchResult.types} icon={placeSearchResult.icon} vicinity={placeSearchResult.vicinity} captions={placeSearchResult.reviews} photos={placeSearchResult.photos} view={placeSearchResult.view}/>
                  </div>


    </div>
        )} */}
     </Combobox>

     
                                    {/* avatar : finding my current location */}

      <button
            className="locate"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  console.log(position);
                  setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                  console.log("center"+center.lat);
                  panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                () => {console.log("position");}
              );
            }}
          >
            <img src="/15.jpg" alt="compass" />
      </button>


      <div>
          <div className='nearbybutton'>
          <button type="button" className="btn btn-dark" onClick={
              Nearby_resturant
          } >
                        Nearby
          </button>
          </div>
            {console.log("blank"+nearby)}
           
          
              { nearby!==[] &&  <div className="list"> <RestaurantList  nearby={nearby} />  </div>}
          
      </div>


      <div >


        {placeSearchResult && (

          <GoogleMaps
          mapRef={mapRef}
          nearby={nearby}
          coordinate={placeSearchResult.coordinate}
          placeSearchResult={placeSearchResult}         
        />

        )}
      </div>


{console.log("testnnnnnn"+placeSearchResult)}

        {!placeSearchResult && (
          <GoogleMaps
            mapRef={mapRef}
            nearby={nearby}
            coordinate={center}  
            placeSearchResult={null}        
          />
        )}

    </div>
  );
};

export default ExploreNearbyPage;
