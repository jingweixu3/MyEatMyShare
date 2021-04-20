import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchPlaces = ({ resturant, setResturant, setResturant_coor }) => {
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setResturant(value);
    setResturant_coor(latLng);
  };
  return (
    <div>
      <PlacesAutocomplete
        value={resturant}
        onChange={setResturant}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="mt-1 container col-lg-12"
              {...getInputProps({ placeholder: "Type Resturant" })}
            />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div
                    key={suggestion.index}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default SearchPlaces;
