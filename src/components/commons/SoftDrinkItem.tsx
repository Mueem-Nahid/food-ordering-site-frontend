import React, { useContext, useState, useEffect, useRef } from "react";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import softDrinkContext from "../../context/softDrinkContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

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

interface CartItem {
  prod_id: string;
  softDrinks: { softDrink: SoftDrink; quantity: number }[];
  [key: string]: any;
}

interface RootState {
  cart: {
    cartItems: CartItem[];
  };
}

const SoftDrinkItem: React.FC<SoftDrinkItemProps> = ({ softDrink, index, prod_id }) => {
  const context = useContext(softDrinkContext);
  const ref = useRef<HTMLSpanElement | null>(null);

  // delete icon trigger
  const [del, setDel] = useState(false);

  const { cartItems } = useSelector((store: RootState) => store.cart);
  const { softDrinksQuantity, setSoftDrinksQuantity } = context;
  const [quantity, setQuantity] = useState<{ softDrink: SoftDrink | string; quantity: number | string }>({
    softDrink: "",
    quantity: "",
  });
  const { t } = useTranslation();
  // handle when clicked on add icon
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

  // handle when clicked on either + or -
  const handleQuantity = (operator: "+" | "-", e: React.MouseEvent<SVGSVGElement, MouseEvent>, softDrink: SoftDrink) => {
    const filteredSoftDrink = softDrinksQuantity.filter((softDrinkCheck: any) => {
      return softDrinkCheck.softDrink._id !== softDrink._id;
    });
    if (operator === "+") {
      const newQuantity = Number(quantity.quantity) + 1;
      setQuantity({
        softDrink: softDrink,
        quantity: newQuantity,
      });

      // adding softdrink again with new value to softdrink quantity
      setSoftDrinksQuantity(
        filteredSoftDrink.concat({
          softDrink: softDrink,
          quantity: newQuantity,
        })
      );
    } else {
      if (Number(quantity.quantity) < 2) {
        // if quantity equals to one show delete button
        setDel(true);
        return;
      }
      const newQuantity = Number(quantity.quantity) - 1;
      setQuantity({
        softDrink: softDrink,
        quantity: newQuantity,
      });

      // adding softdrink again with new value to softdrink quantity
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
    // check if product not exist in cart items then return it
    if (checkFilter === undefined) {
      return;
    }
    const checkSoftDrink = checkFilter.softDrinks.find(
      (item) => item.softDrink._id === softDrink._id
    );
    if (checkSoftDrink === undefined) {
      return;
    } else {
      // removing incoming softdrink from softdrink quantity and adding it again. Purpose:When someone use browser navigation button it will not be added again and again
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

  // handle when clicked on delete icon
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
    //check if addon is with product or not
    checkSoftDrink(prod_id);
    //eslint-disable-next-line
  }, [prod_id]);

  return (
    <>
      <div className="img">
        <img src={softDrink.pic} alt="Addon" width={30} />
      </div>
      <div className="addon-name">
        <span>{softDrink.name}</span>
        <span className="addon-price">Rs {softDrink.price}</span>
      </div>
      <div
        className="addon-add"
        style={{ display: "flex", width: "15vw", justifyContent: "center" }}
      >
        <span onClick={(e) => handleAdd(e, softDrink)} ref={ref}>
          + {t("add")}
        </span>
      </div>
      <div
        className="addon-quantity"
        style={{ display: "none", width: "15vw", justifyContent: "center" }}
      >
        {del ? (
          <DeleteOutline onClick={() => removeSoftDrink(softDrink)} />
        ) : (
          <Remove onClick={(e) => handleQuantity("-", e, softDrink)} />
        )}
        <span>{quantity.quantity}</span>
        <Add onClick={(e) => handleQuantity("+", e, softDrink)} />
      </div>
    </>
  );
};

export default SoftDrinkItem;
