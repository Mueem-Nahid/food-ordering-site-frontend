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
import OptimizedImage from "../commons/OptimizedImage";
import { Grid, Collapse, Box, IconButton } from "@mui/material";
import { useAppDispatch } from "@/redux/hook";
import {
  delCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../redux/cart/cartSlice";
import { useTranslation } from "react-i18next";

interface CartItemProps {
  item: {
    product: {
      id: string;
      title: string;
      src: string;
      price: number;
      deliveryDay?: string | null;
    };
    quantity: number;
    prod_id: string;
    addons: unknown[];
    softDrinks: unknown[];
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const dispatch = useAppDispatch();
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
  }, [item.quantity]);

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
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <OptimizedImage
              src={item.product.src}
              alt="Cart Item"
              width={80}
              height={80}
              sizes="80px"
            />
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <strong style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px"}}>{item.product.title}</strong>
              <span
                style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
              >
                <IconButton
                  sx={{ color: "#e4002b" }}
                  size="small"
                  onClick={() => handleQuantity("-")}
                >
                  <Remove ref={ref} />
                </IconButton>
                {isDelete && (
                  <IconButton
                    sx={{ color: "#e4002b" }}
                    size="small"
                    onClick={() => removeFromCart()}
                  >
                    <DeleteOutline />
                  </IconButton>
                )}
                <span style={{minWidth: "1.5rem", textAlign: "center"}}>{item.quantity}</span>
                <IconButton
                  sx={{ color: "#e4002b" }}
                  size="small"
                  onClick={() => handleQuantity("+")}
                >
                  <Add />
                </IconButton>
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
            <IconButton
              sx={{ color: "#e4002b" }}
              size="small"
              onClick={handleArrowClick}
            >
              {icon === "Down" ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </IconButton>
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
