import React, { useContext, useState, useEffect, useRef } from "react";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import softDrinkContext from "../../context/softDrinkContext";
import { useAppSelector } from "@/redux/hook";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";

interface SoftDrink {
  _id: string;
  name: string;
  price: number;
  pic: string;
  [key: string]: any;
}

interface SoftDrinkItemProps {
  softDrink: SoftDrink;
  index: number;
  prod_id: string;
}

const SoftDrinkItem: React.FC<SoftDrinkItemProps> = ({ softDrink, index, prod_id }) => {
  const context = useContext(softDrinkContext);
  const ref = useRef<HTMLSpanElement | null>(null);

  const [del, setDel] = useState(false);

  const { cartItems } = useAppSelector((store) => store.cart);
  const { softDrinksQuantity, setSoftDrinksQuantity } = context;
  const [quantity, setQuantity] = useState<{ softDrink: SoftDrink | string; quantity: number | string }>({
    softDrink: "",
    quantity: "",
  });
  const { t } = useTranslation();
  const handleAdd = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, softDrink: SoftDrink) => {
    if (e.target instanceof HTMLElement) {
      const parent = e.target.parentElement;
      if (parent) {
        parent.style.display = "none";
        if (parent.nextSibling instanceof HTMLElement) {
          parent.nextSibling.style.display = "flex";
        }
      }
    }
    setQuantity({
      softDrink: softDrink,
      quantity: 1,
    });
    setSoftDrinksQuantity(
      softDrinksQuantity.concat({
        softDrink: softDrink,
        quantity: 1,
      })
    );
    setDel(false);
  };

  const handleQuantity = (operator: "+" | "-", softDrink: SoftDrink) => {
    const filteredSoftDrink = softDrinksQuantity.filter((softDrinkCheck: any) => {
      return softDrinkCheck.softDrink._id !== softDrink._id;
    });
    if (operator === "+") {
      const newQuantity = Number(quantity.quantity) + 1;
      setQuantity({
        softDrink: softDrink,
        quantity: newQuantity,
      });

      setSoftDrinksQuantity(
        filteredSoftDrink.concat({
          softDrink: softDrink,
          quantity: newQuantity,
        })
      );
    } else {
      if (Number(quantity.quantity) < 2) {
        setDel(true);
        return;
      }
      const newQuantity = Number(quantity.quantity) - 1;
      setQuantity({
        softDrink: softDrink,
        quantity: newQuantity,
      });

      setSoftDrinksQuantity(
        filteredSoftDrink.concat({
          softDrink: softDrink,
          quantity: newQuantity,
        })
      );
    }
  };

  const checkSoftDrink = (prod_id: string) => {
    const checkFilter = cartItems.find((item) => item.prod_id === prod_id);
    if (checkFilter === undefined) {
      return;
    }
    const checkSoftDrink = checkFilter.softDrinks.find(
      (item) => item.softDrink._id === softDrink._id
    );
    if (checkSoftDrink === undefined) {
      return;
    } else {
      const filteredDrinks = softDrinksQuantity.filter((softCheck: any) => {
        return softCheck.softDrink._id !== softDrink._id;
      });
      setSoftDrinksQuantity(filteredDrinks);
      if (ref.current) {
        const parent = ref.current.parentElement;
        if (parent) {
          parent.style.display = "none";
          if (parent.nextSibling instanceof HTMLElement) {
            parent.nextSibling.style.display = "flex";
          }
        }
      }
      setQuantity({ softDrink, quantity: checkSoftDrink.quantity });

      setSoftDrinksQuantity((softDrinksQuantity: any) => [
        ...softDrinksQuantity,
        {
          softDrink: checkSoftDrink.softDrink,
          quantity: checkSoftDrink.quantity,
        },
      ]);
    }
  };

  const removeSoftDrink = (softDrink: SoftDrink) => {
    const newDrinks = softDrinksQuantity.filter((item: any) => {
      return item.softDrink._id !== softDrink._id;
    });
    setSoftDrinksQuantity(newDrinks);
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        parent.style.display = "flex";
        if (parent.nextSibling instanceof HTMLElement) {
          parent.nextSibling.style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    checkSoftDrink(prod_id);
    //eslint-disable-next-line
  }, [prod_id]);

  return (
    <>
      <div className="img">
        <OptimizedImage src={softDrink.pic} alt="Soft Drink" width={40} height={40} sizes="40px" />
      </div>
      <div className="addon-name">
        <span>{softDrink.name}</span>
        <span className="addon-price">Rs {softDrink.price}</span>
      </div>
      <div
        className="addon-add"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <span onClick={(e) => handleAdd(e, softDrink)} ref={ref}>
          + {t("add")}
        </span>
      </div>
      <div
        className="addon-quantity"
        style={{ display: "none", justifyContent: "center" }}
      >
        {del ? (
          <IconButton onClick={() => removeSoftDrink(softDrink)} size="small" sx={{ color: "#ff741f" }}>
            <DeleteOutline />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleQuantity("-", softDrink)} size="small" sx={{ color: "#ff741f" }}>
            <Remove />
          </IconButton>
        )}
        <span>{quantity.quantity}</span>
        <IconButton onClick={() => handleQuantity("+", softDrink)} size="small" sx={{ color: "#ff741f" }}>
          <Add />
        </IconButton>
      </div>
    </>
  );
};

export default SoftDrinkItem;
