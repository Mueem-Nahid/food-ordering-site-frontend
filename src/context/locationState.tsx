"use client";
import React, { useState, ReactNode } from "react";
import locationContext from "./locationContext";

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
  const [longitude, setLongitude] = useState(151.2093);
  const [latitude, setLatitude] = useState(-33.8688);
  const [displaySections, setDisplaySections] = useState<DisplaySections>({
    first: "none",
    second: "flex",
  });
  const [value, setValue] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [tagIndex, setTagIndex] = useState<number | null>(null);
  const [locationState, setLocationState] = useState<string>("");

  const [locationId, setLocationId] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState<RadioValue>({ value: "", index: "" });

  const getLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
      });
    }
  };

  const getLocations = async () => {
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
