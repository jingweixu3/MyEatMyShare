import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import PlaceIcon from "@material-ui/icons/Place";
import CallEndIcon from "@material-ui/icons/CallEnd";
import LanguageIcon from "@material-ui/icons/Language";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const GoogleMaps = ({ nearby, coordinate, mapRef, placeSearchResult }) => {
  const [selected, setSelected] = React.useState(placeSearchResult);
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  return (
    <div>
      {coordinate && (
        <GoogleMap
          id="map"
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
          zoom={14}
          center={{
            lat: coordinate.lat,
            lng: coordinate.lng,
          }}
          onLoad={onMapLoad}
        >
          {/* current marker */}
          <Marker
            key={"currentplace"}
            position={{
              lat: coordinate.lat,
              lng: coordinate.lng,
            }}
            icon={{
              url: "/map-pin.svg",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
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
                lat: selected.coordinate.lat + 0.001,
                lng: selected.coordinate.lng,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <div
                  className="post_header"
                  style={{
                    backgroundImage:
                      "url(" +
                      `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${selected.view.photo_reference}&key=AIzaSyDGx9NguhqUd5CeQR8FA12jwLTyFgBekxU` +
                      ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h3>{selected.name}</h3>
                </div>
                {selected.vicinity && (
                  <p class="small">
                    <PlaceIcon />
                    &nbsp; {selected.vicinity}{" "}
                  </p>
                )}
                {selected.phone && (
                  <p class="small">
                    {" "}
                    <CallEndIcon />
                    &nbsp;&nbsp;{selected.phone}{" "}
                  </p>
                )}
                {selected.website && (
                  <p class="small">
                    {" "}
                    <LanguageIcon />
                    &nbsp;&nbsp;{selected.website}
                  </p>
                )}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMaps;
