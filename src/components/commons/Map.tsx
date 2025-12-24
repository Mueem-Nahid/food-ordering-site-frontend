import React, { useContext, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import locationContext from "../../context/locationContext";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map: React.FC = () => {
  const context = useContext(locationContext);
  const { longitude, latitude } = context;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
  });
  const center = {
    lat: latitude,
    lng: longitude,
  };
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={{ lat: latitude, lng: longitude }} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
