import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import {Add, Edit} from "@mui/icons-material";
import Link from "next/link";
import userContext from "../../context/userContext";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addToCart} from "@/redux/cart/cartSlice";
import {useTranslation} from "react-i18next";

interface CardProps {
  src: string;
  title: string;
  desc: string;
  price: number;
  id: string;
  catName: string;
}

const Card: React.FC<CardProps> = ({src, title, desc, price, id, catName}) => {
  const dispatch = useAppDispatch();

  const [addIcon, setAddIcon] = useState<boolean | undefined>(undefined);

  const {cartItems} = useAppSelector((store) => store.cart);

  const [btn, setBtn] = useState<boolean | null>(null);

  const [link, setLink] = useState<string>("");
  const context = useContext(userContext);
  const {user} = context;

  const {t} = useTranslation();

  const checkMidnight = (hour: number) => {
    if (catName === "Midnight") {
      hour < 2 ? setLink(`/product/${id}`) : setLink("");
      hour < 2 ? setBtn(false) : setBtn(true);
    } else {
      setLink(`/product/${id}`);
      setBtn(false);
    }
  };

  const handleAddToCart = (id: string, e: MouseEvent) => {
    e.preventDefault();

    dispatch(
      addToCart({
        product: {price, title, id, src},
        quantity: 1,
        addons: [],
        softDrinks: [],
        prod_id: id,
      })
    );
  };

  useEffect(() => {
    checkMidnight(new Date().getHours());
    const find = cartItems.find((item) => item.prod_id === id);
    if (find === undefined) {
      setAddIcon(true);
    } else {
      setAddIcon(false);
    }
  }, [user, cartItems, id, catName]);

  return (
    <div className="grid-item">
      <Link href={link} className="card-link">

        <div className="card-img">
          <img className="top-sel-img" src={src} alt="Top Selling"/>
        </div>
        <h4>
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </h4>
        <h5>{desc.substring(0, 50)} ...</h5>
        <div className="card-footer">
          <h2>
            <strong>$ {price}</strong>
          </h2>
          <strong>
            {addIcon === true ? (
              btn === false ? (
                <Add
                  className="plus-icon"
                  onClick={(e) => handleAddToCart(id, e)}
                />
              ) : (
                ""
              )
            ) : (
              <Edit className="plus-icon" sx={{color: "#e4002b"}}/>
            )}
          </strong>

          {addIcon === true ? (
            <Button
              variant="contained"
              className="add-to-bucket"
              disabled={btn ?? undefined}
              // onClick={(e) => handleAddToCart(id, e)}
            >
              <strong>{t("addToBucket")}</strong>
            </Button>
          ) : (
            <Edit className="edit-icon" sx={{color: "#e4002b"}}/>
          )}
        </div>
      </Link>
    </div>
  );
};

export default React.memo(Card);
