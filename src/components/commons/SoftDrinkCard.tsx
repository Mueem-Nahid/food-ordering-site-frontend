import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState, ReactNode } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import SoftDrinkItem from "./SoftDrinkItem";
import softDrinkContext from "../../context/softDrinkContext";
import { useTranslation } from "react-i18next";

interface SoftDrinkCardProps {
  title: string;
  prod_id: string;
}

interface SoftDrink {
  _id: string;
  name: string;
  price: number;
  pic: string;
  [key: string]: any;
}

const softDrinksDummy = [
  {
    "_id": "62f95d3c0ecf5ffea243c9d9",
    "name": "7UP Diet",
    "price": 100,
    "pic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660509500/kfc-clone/vbbypmkpufrtgdtnd7pu.png",
    "__v": 0
  },
  {
    "_id": "62f95d660ecf5ffea243c9db",
    "name": "Mirinda Regular",
    "price": 100,
    "pic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660509541/kfc-clone/e4w3leiiw81soldkweno.png",
    "__v": 0
  },
  {
    "_id": "62f95da50ecf5ffea243c9dd",
    "name": "Mountain Dew Regular",
    "price": 100,
    "pic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660509605/kfc-clone/kqolpdgsvv1mtfsqplaa.png",
    "__v": 0
  },
  {
    "_id": "62f95f150ecf5ffea243c9df",
    "name": "Pepsi Diet Regular",
    "price": 100,
    "pic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660509973/kfc-clone/yiekbllnfoncwbnsypqt.png",
    "__v": 0
  },
  {
    "_id": "62f95f220ecf5ffea243c9e1",
    "name": "Pepsi Regular",
    "price": 100,
    "pic": "https://res.cloudinary.com/digaxe3sc/image/upload/v1660509986/kfc-clone/tynas6xbflqqosbdqbf0.png",
    "__v": 0
  }
]

const SoftDrinkCard: React.FC<SoftDrinkCardProps> = ({ title, prod_id }) => {
  const [show, setShow] = useState<"none" | "flex">("none");
  // use follow context to get all soft drinks
  const context = useContext(softDrinkContext);
  const { getAllSoftDrinks, softDrinks } = context;
  const [text, setText] = useState<{ text: string; icon: ReactNode }>({
    text: "View More (1)",
    icon: <KeyboardArrowDown />,
  });

  const { t } = useTranslation();
  // handle click on view more and less more
  const handleClick = () => {
    setShow(show === "none" ? "flex" : "none");
    setText(
      text.text === "View More (1)"
        ? { text: "View Less", icon: <KeyboardArrowUp /> }
        : { text: "View More (1)", icon: <KeyboardArrowDown /> }
    );
  };

  useEffect(() => {
    getAllSoftDrinks();
    //eslint-disable-next-line
  }, []);

  return (
    <Grid className="addons-container softDrink-container">
      <div className="add-ons">
        <h3>{title}</h3>
        <span className="optional">{t("optional")}</span>
      </div>
      <div className="addon-item">
        {softDrinksDummy.slice(0, 4).map((softDrink: SoftDrink, index: number) => {
          return (
            <div className="addon-info" key={index}>
              <SoftDrinkItem
                softDrink={softDrink}
                index={index}
                prod_id={prod_id}
              />
            </div>
          );
        })}
        {softDrinksDummy.slice(4, 5).map((softDrink: SoftDrink, index: number) => {
          return (
            <div className="addon-info" key={index} style={{ display: show }}>
              <SoftDrinkItem
                softDrink={softDrink}
                index={index}
                prod_id={prod_id}
              />
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

export default SoftDrinkCard;
