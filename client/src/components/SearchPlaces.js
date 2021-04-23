import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const SearchPlaces = ({ setResturant }) => {
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {
    if (value !== "") {
      const results = await geocodeByAddress(value);
      console.log(results[0]);
      setResturant(results[0].place_id);
      setAddress(value);
    }
  };

  const onChange = (value) => {
    setAddress(value);
    if (value === "") {
      setResturant("");
    }
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={onChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="mt-1 container col-lg-12 "
              {...getInputProps({ placeholder: "Type place" })}
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
