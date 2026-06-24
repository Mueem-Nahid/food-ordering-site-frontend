import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import AddonItem from "./AddonItem";
import addonContext from "../../context/addonContext";
import { useTranslation } from "react-i18next";

interface AddonCardProps {
  title: string;
  prod_id: string;
}

interface Addon {
  _id: string;
  name: string;
  price: number;
  pic: string;
  [key: string]: any;
}

const addsOn:[] = [
  // {
  //   _id: "addon1",
  //   name: "Extra Cheese",
  //   price: 50,
  //   pic: "/images/addon1.png",
  // },
  // {
  //   _id: "addon2",
  //   name: "Spicy Sauce",
  //   price: 30,
  //   pic: "/images/addon2.png",
  // },
  // {
  //   _id: "addon3",
  //   name: "Garlic Mayo",
  //   price: 40,
  //   pic: "/images/addon3.png",
  // },
  // {
  //   _id: "addon4",
  //   name: "Crispy Onions",
  //   price: 20,
  //   pic: "/images/addon4.png",
  // },
  // {
  //   _id: "addon5",
  //   name: "Jalapenos",
  //   price: 25,
  //   pic: "/images/addon5.png",
  // },
]

const AddonCard: React.FC<AddonCardProps> = ({ title, prod_id }) => {
  const [show, setShow] = useState<"none" | "flex">("none");
  const { t } = useTranslation();
  const context = useContext(addonContext);
  const { getAllAddons, addons } = context;
  const [expanded, setExpanded] = useState(false);
  // handle click on view more and less more
  const handleClick = () => {
    setShow(show === "none" ? "flex" : "none");
    setExpanded(!expanded);
  };

  useEffect(() => {
    // For UI-only: set dummy addons if empty
    if (!addons || addons.length === 0) {
      context.setAddons?.([
        {
          _id: "addon1",
          name: "Extra Cheese",
          price: 50,
          pic: "/images/addon1.png",
        },
        {
          _id: "addon2",
          name: "Spicy Sauce",
          price: 30,
          pic: "/images/addon2.png",
        },
        {
          _id: "addon3",
          name: "Garlic Mayo",
          price: 40,
          pic: "/images/addon3.png",
        },
        {
          _id: "addon4",
          name: "Crispy Onions",
          price: 20,
          pic: "/images/addon4.png",
        },
        {
          _id: "addon5",
          name: "Jalapenos",
          price: 25,
          pic: "/images/addon5.png",
        },
      ]);
    } else {
      getAllAddons();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Grid className="addons-container">
      <div className="add-ons">
        <h3>{title}</h3>
        <span className="optional">{t("optional")}</span>
      </div>
      <div className="addon-item">
        {
          addsOn.length === 0 &&
          <div>{t("notAvailableMoment")}</div>
        }
        {addsOn.slice(0, 2).map((addon: Addon, index: number) => {
          return (
            <div className="addon-info" key={index}>
              <AddonItem addon={addon} index={index} prod_id={prod_id} />
            </div>
          );
        })}
        {addsOn.slice(2, 5).map((addon: Addon, index: number) => {
          return (
            <div className="addon-info" key={index} style={{ display: show }}>
              <AddonItem addon={addon} index={index} prod_id={prod_id} />
            </div>
          );
        })}
        <div
          className="addon-info"
          style={{
            justifyContent: "flex-start",
          }}
        >
          <div className="addon-view-more" onClick={handleClick}>
            <span className="view-more">
              {expanded ? t("viewLess") : t("viewMore")}
              {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </span>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default AddonCard;
