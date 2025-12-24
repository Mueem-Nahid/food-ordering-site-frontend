import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState, ReactNode } from "react";
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

const AddonCard: React.FC<AddonCardProps> = ({ title, prod_id }) => {
  const [show, setShow] = useState<"none" | "flex">("none");
  const { t } = useTranslation();
  // use follow context to get all addons
  const context = useContext(addonContext);
  const { getAllAddons, addons } = context;
  const [text, setText] = useState<{ text: string; icon: ReactNode }>({
    text: "View More (3)",
    icon: <KeyboardArrowDown />,
  });
  // handle click on view more and less more
  const handleClick = () => {
    setShow(show === "none" ? "flex" : "none");
    setText(
      text.text === "View More (3)"
        ? { text: "View Less", icon: <KeyboardArrowUp /> }
        : { text: "View More (3)", icon: <KeyboardArrowDown /> }
    );
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
        {addons.slice(0, 2).map((addon: Addon, index: number) => {
          return (
            <div className="addon-info" key={index}>
              <AddonItem addon={addon} index={index} prod_id={prod_id} />
            </div>
          );
        })}
        {addons.slice(2, 5).map((addon: Addon, index: number) => {
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
              {text.text}
              {text.icon}
            </span>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default AddonCard;
