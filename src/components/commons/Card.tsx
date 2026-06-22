import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Button, IconButton} from "@mui/material";
import {Add, Edit} from "@mui/icons-material";
import Link from "next/link";
import userContext from "../../context/userContext";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addToCart} from "@/redux/cart/cartSlice";
import {useTranslation} from "react-i18next";
import OptimizedImage from "./OptimizedImage";

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
          <OptimizedImage
            src={src}
            alt={title}
            fill
            width={300}
            sizes="(max-width: 768px) 45vw, 22vw"
            className="top-sel-img"
          />
        </div>
        <h4>{title}</h4>
        <h5>{desc}</h5>
        <div className="card-footer">
          <h2>
            <strong>$ {price}</strong>
          </h2>
          <strong>
            {addIcon === true ? (
              btn === false ? (
                <IconButton
                  className="plus-icon"
                  onClick={(e) => handleAddToCart(id, e)}
                  size="small"
                  sx={{color: "#ff741f"}}
                >
                  <Add />
                </IconButton>
              ) : (
                ""
              )
            ) : (
              <IconButton className="plus-icon" size="small" sx={{color: "#e4002b"}}>
                <Edit />
              </IconButton>
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
