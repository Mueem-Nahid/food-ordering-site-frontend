import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from "react-places-autocomplete";
import locationContext from "../../context/locationContext";

interface AutoCompleteState {
  address: string;
}

interface AutoCompleteProps {}

class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
  static contextType = locationContext;
  context!: React.ContextType<typeof locationContext>;

  constructor(props: AutoCompleteProps) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address: string) => {
    this.setState({ address });
  };

  handleSelect = (address: string) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.context.setLongitude(latLng.lng);
        this.context.setLatitude(latLng.lat);
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ textAlign: "center" }}>
            <input
              {...getInputProps({
                placeholder: "Search Area",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion: Suggestion, index: number) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#48413e",
                      borderBottom: "1px solid #48413e",
                      textAlign: "left",
                      padding: ".5rem .5rem",
                      cursor: "pointer",
                      marginTop: "1rem",
                    }
                  : {
                      backgroundColor: "#1c1816",
                      borderBottom: "1px solid #48413e",
                      textAlign: "left",
                      padding: ".5rem .5rem",
                      cursor: "pointer",
                      marginTop: "1rem",
                    };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default AutoComplete;
