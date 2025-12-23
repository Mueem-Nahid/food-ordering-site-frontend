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
  [key: string]: any;
}

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
        {softDrinks.slice(0, 4).map((softDrink: SoftDrink, index: number) => {
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
        {softDrinks.slice(4, 5).map((softDrink: SoftDrink, index: number) => {
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
