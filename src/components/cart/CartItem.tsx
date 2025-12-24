import React, { useState, useEffect, useRef } from "react";
import {
  Add,
  Remove,
  DeleteOutline,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import SoftDrinkCard from "../commons/SoftDrinkCard";
import AddonCard from "../commons/AddonCard";
import { Grid, Collapse, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  delCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../redux/cart/cartSlice";
import { useTranslation } from "react-i18next";

interface CartItemProps {
  item: any; // TODO: Replace 'any' with a specific type for item
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState<"Down" | "Up">("Down");
  const [isDelete, setIsDelete] = useState(false);

  // handle when clicked on plus or minus icon
  const handleQuantity = (condition: "+" | "-") => {
    if (condition === "+") {
      dispatch(increaseItemQuantity(item.product.id));
      if (item.quantity === 1) {
        if (ref.current) ref.current.style.display = "flex";
        setIsDelete(false);
      }
    } else {
      dispatch(decreaseItemQuantity(item.product.id));

      if (item.quantity === 1 || item.quantity === 0) {
        if (ref.current) ref.current.style.display = "none";
        setIsDelete(true);
        return;
      }
    }
  };
  //handle when clicked on arrow icon
  const handleArrowClick = () => {
    setOpen((prev) => !prev);
    setIcon((prev) => (prev === "Down" ? "Up" : "Down"));
  };
  //  handle when clicked on delete button
  const removeFromCart = async () => {
    dispatch(delCartItem({ id: item.product.id, price: item.product.price }));
  };

  useEffect(() => {
    if (item.quantity === 1 || item.quantity === 0) {
      if (ref.current) ref.current.style.display = "none";
      setIsDelete(true);
      return;
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="cart-item"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <div className="cart-item-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "1.3rem" }}>
            <img
              src={item.product.src}
              style={{ marginLeft: "-20px" }}
              width={100}
              alt="Cart Item"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{item.product.title}</strong>
              <span
                style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
              >
                <Remove
                  sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
                  fontSize="small"
                  onClick={() => handleQuantity("-")}
                  ref={ref}
                />
                {isDelete && (
                  <DeleteOutline
                    sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
                    fontSize="small"
                    onClick={() => removeFromCart()}
                  />
                )}
                <span>{item.quantity}</span>
                <Add
                  sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
                  fontSize="small"
                  onClick={() => handleQuantity("+")}
                />
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {icon === "Down" ? (
              <KeyboardArrowDown
                sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
                onClick={handleArrowClick}
              />
            ) : (
              <KeyboardArrowUp
                sx={{ color: "#e4002b", "&:hover": { cursor: "pointer" } }}
                onClick={handleArrowClick}
              />
            )}
          </div>
        </div>
        <div className="collapse">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Grid
                container
                columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Grid sx={{ marginBottom: 5 }}>
                  <AddonCard title={t("addons")} prod_id={item.prod_id} />
                </Grid>
                <hr className="cart-item-hr" />
                <Grid sx={{ marginBottom: 5 }}>
                  <SoftDrinkCard
                    title={t("softDrink")}
                    prod_id={item.prod_id}
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default CartItem;
