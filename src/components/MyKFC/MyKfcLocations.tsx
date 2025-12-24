import React, { useContext } from "react";
import locationContext from "../../context/locationContext";
import MyKfcLocationItem from "./MyKfcLocationItem";

interface Location {
  _id: string;
  lat: number;
  lng: number;
  street: string;
  tag: string;
}

const MyKfcLocations: React.FC = () => {
  const context = useContext(locationContext);
  const { locations } = context as { locations: Location[] };

  return (
    <div className="my-locations">
      {locations.map((location, index) => {
        return (
          <div key={index} className="my-locations-item">
            <MyKfcLocationItem location={location} index={index} />
          </div>
        );
      })}
    </div>
  );
};

export default MyKfcLocations;
