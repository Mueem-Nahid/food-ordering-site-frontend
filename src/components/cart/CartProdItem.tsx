import React, { useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { DeleteOutlined, Add, Remove, Edit } from "@mui/icons-material";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hook";
import OptimizedImage from "../commons/OptimizedImage";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  delCartItem,
} from "@/redux/cart/cartSlice";

interface CartProdItemProps {
  item: {
    product: {
      src: string;
      title: string;
      price: number;
      deliveryDay?: string | null;
    };
    quantity: number;
    prod_id: string;
    softDrinks: { softDrink: { name: string }; quantity: number }[];
    addons: unknown[];
  };
}

const CartProdItem: React.FC<CartProdItemProps> = ({ item }) => {
  const [del, setDel] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleQuantity = (condition: "+" | "-") => {
    if (condition === "+") {
      setDel(false);
      setQuantity(quantity + 1);
      dispatch(increaseItemQuantity(item.prod_id));
    } else {
      dispatch(decreaseItemQuantity(item.prod_id));
      setQuantity(quantity - 1);
      if (item.quantity < 2) {
        setDel(true);
        return;
      }
    }
  };
  const removeFromCart = async () => {
    dispatch(delCartItem({ id: item.prod_id, price: item.product.price }));
  };
  return (
    <div style={{ margin: "1rem 0" }} className="cart-prod-item">
      <Grid container sx={{justifyContent: "space-between"}} rowSpacing={2} flexWrap="wrap">
        <Grid
          size={{xs: 12, sm: 7, md: 6}}
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <OptimizedImage src={item.product.src} alt="Product-Image" width={80} height={80} sizes="80px" />
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            <strong style={{overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%"}}>{item.product.title}</strong>
            <span>$ {item.product.price}</span>
            <span>Delivery day: {item.product.deliveryDay || "N/A"}</span>
            <div className="cart-prod-item-quan" style={{ display: "flex", alignItems: "center" }}>
              {del ? (
                <IconButton onClick={() => removeFromCart()} sx={{ color: "#e4002b" }} size="small">
                  <DeleteOutlined />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleQuantity("-")} sx={{ color: "#e4002b" }} size="small">
                  <Remove />
                </IconButton>
              )}
              <span style={{ minWidth: "2rem", textAlign: "center" }}>
                {item.quantity}
              </span>
              <IconButton onClick={() => handleQuantity("+")} sx={{ color: "#e4002b" }} size="small">
                <Add />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <Grid
          size={{xs: 6, sm: 2, md: 3}}
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            {item.softDrinks.length > 0 ? (
              <>
                <h4>Drinks</h4>
                {item.softDrinks.map((drink, index) => {
                  return (
                    <div key={index} style={{ textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>
                      <span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", maxWidth: "150px"}}>
                        {drink.softDrink.name} x {drink.quantity}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid
          size={{xs: 6, sm: 3, md: 3}}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3 className="cart-item-price">
            $ {item.quantity * item.product.price}
          </h3>
          <div className="cart-item-icons" style={{display: "flex", gap: "0.5rem"}}>
            <Link
              href={`/product/${item.prod_id}`}
              style={{ textDecoration: "none" }}
            >
              <IconButton sx={{ color: "#e4002b" }} size="small">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => removeFromCart()}
              sx={{ color: "#e4002b" }}
              size="small"
            >
              <DeleteOutlined />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartProdItem;
