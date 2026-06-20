import React, { useContext, useEffect, useState } from "react";
import {
  HomeOutlined,
  Delete,
  Edit,
  Apartment,
  BusinessCenterOutlined,
} from "@mui/icons-material";
import locationContext from "../../context/locationContext";
import { usePathname } from "next/navigation";
import RadioBtn from "../commons/RadioBtn";
import { useTranslation } from "react-i18next";

interface Location {
  _id: string;
  lat: number;
  lng: number;
  street: string;
  tag: string;
}

interface MyKfcLocationItemProps {
  location: Location;
  index: number;
}

const MyKfcLocationItem: React.FC<MyKfcLocationItemProps> = ({ location, index }) => {
  const [address, setAddress] = useState("");
  const pathname = usePathname();

  const context = useContext(locationContext);
  const {
    setLongitude,
    setLatitude,
    setLocations,
    locations,
    setDisplaySections,
    setValue,
    setTagIndex,
    setLocationState,
    setLocationId,
    radioValue,
    setRadioValue,
  } = context;
  // handle when clicked on delete buttom
  const handleDelete = async (id: string) => {
    const newLocations = locations.filter((loc: Location) => loc._id !== id);
    setLocations(newLocations);
  };
  // handle when clicked on edit button
  const handleEdit = async (id: string) => {
    setDisplaySections({ first: "flex", second: "none" });
    setValue(location.street);
    setTagIndex(parseInt(location.tag));
    // Set the state to update data in MyKFCAddLocaton Component Instead Of Adding Location, It will Edit Data. Location State is available in Accordin Component
    setLocationState("edit");
    setLocationId(id);
    setLongitude(location.lng);
    setLatitude(location.lat);
  };
  // get address of locations
  const getAddress = async (lat: number, lng: number) => {
    setAddress("Sample Address");
  };
  // handle when clicked on radio button
  const handleRadioClick = (index: number) => {
    setLongitude(location.lng);
    setLatitude(location.lat);
    setRadioValue({ value: location.street + "," + address, index: index });
  };

  const { t } = useTranslation();

  useEffect(() => {
    getAddress(location.lat, location.lng);
  }, [location.lat, location.lng]);
  return (
    <>
      {pathname === "/delivery" ? (
        <RadioBtn
          value={radioValue}
          index={index}
          handleClick={handleRadioClick}
        />
      ) : (
        <div className="address-icon">
          {location.tag === "0" ? <HomeOutlined /> : ""}
          {location.tag === "1" ? <BusinessCenterOutlined /> : ""}
          {location.tag === "2" ? <Apartment /> : ""}
        </div>
      )}
      <div className="address">
        <h3>{location.tag === "0" ? t("home") : ""}</h3>
        <h3>{location.tag === "1" ? t("office") : ""}</h3>
        <h3>{location.tag === "2" ? t("partner") : ""}</h3>
        <span style={{ fontFamily: "Poppins" }}>
          {location.street}, {address.length < 1 ? "Not Available" : address}
        </span>
      </div>
      {pathname === "/delivery" ? (
        ""
      ) : (
        <div className="edit-address">
          <div className="del-add" onClick={() => handleDelete(location._id)}>
            <Delete />
            {t("remove")}
          </div>
          <div className="edit-add" onClick={() => handleEdit(location._id)}>
            <Edit />
            {t("edit")}
          </div>
        </div>
      )}
    </>
  );
};

export default MyKfcLocationItem;
