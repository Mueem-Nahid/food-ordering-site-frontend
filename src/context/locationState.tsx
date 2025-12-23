"use client";
import React, { useState, ReactNode } from "react";
import locationContext from "./locationContext";
// import axios from "axios";

interface LocationStateProps {
  children: ReactNode;
}

interface Location {
  _id?: string;
  lat: number;
  lng: number;
  street: string;
  tag: string;
}

interface DisplaySections {
  first: string;
  second: string;
}

interface RadioValue {
  value: string;
  index: string | number;
}

const LocationState: React.FC<LocationStateProps> = ({ children }) => {
  const [longitude, setLongitude] = useState(69.3451);
  const [latitude, setLatitude] = useState(30.3753);
  const [displaySections, setDisplaySections] = useState<DisplaySections>({
    first: "none",
    second: "flex",
  });
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  // handle tag index to make on active on add location component
  const [tagIndex, setTagIndex] = useState<number | null>(null);
  const [locationState, setLocationState] = useState<string>("");

  const [locationId, setLocationId] = useState<string | null>(null);
  // handle radios values for checout
  const [radioValue, setRadioValue] = useState<RadioValue>({ value: "", index: "" });

  const getLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    }
  };

  // get all locations of logged in user
  const getLocations = async (email: string) => {
    // try {
    //   await axios
    //     .get(
    //       process.env.NEXT_PUBLIC_BACKEND + "/api/location/getLocations/" + email
    //     )
    //     .then((res) => {
    //       setLocations(res.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // For UI only: set dummy locations
    setLocations([]);
  };

  return (
    <locationContext.Provider
      value={{
        getLocation,
        longitude,
        latitude,
        setLatitude,
        setLongitude,
        displaySections,
        setDisplaySections,
        value,
        setValue,
        locations,
        setLocations,
        tagIndex,
        setTagIndex,
        locationState,
        setLocationState,
        locationId,
        setLocationId,
        getLocations,
        radioValue,
        setRadioValue,
      }}
    >
      {children}
    </locationContext.Provider>
  );
};

export default LocationState;
