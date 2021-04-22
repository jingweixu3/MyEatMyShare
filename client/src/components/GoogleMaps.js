import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const GoogleMaps = ({ resturant, nearby, coordinate }) => {
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef(); // save the map ref to move center or zoom accordingly
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <div>
      {resturant && (
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "75vh", width: "100%" }}
          zoom={13}
          center={{
            lat: coordinate.lat,
            lng: coordinate.lng,
          }}
          onLoad={onMapLoad}
        >
          {/* this resturant marker */}
          {resturant && (
            <Marker
              position={{
                lat: resturant.coordinate.lat,
                lng: resturant.coordinate.lng,
              }}
              onClick={() => {
                setSelected(resturant);
              }}
            />
          )}
          {/* nearby Marker */}
          {nearby.map((resturant) => (
            <Marker
              key={resturant.place_id}
              position={{
                lat: resturant.coordinate.lat,
                lng: resturant.coordinate.lng,
              }}
              onClick={() => {
                setSelected(resturant);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{
                lat: selected.coordinate.lat,
                lng: selected.coordinate.lat,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h5> {selected.name} </h5>
                {/* view more information and render friends comment later */}
                {/* <img className='restaurant_image' src ={selected.image}   /> */}
                {/* <p> time {formatRelative(selected.time, new Date()) } </p> */}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMaps;
