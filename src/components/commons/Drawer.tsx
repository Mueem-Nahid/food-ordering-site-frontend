import * as React from "react";
import { Box, Drawer, Button, Grid } from "@mui/material";
import { Close, ShoppingCartOutlined } from "@mui/icons-material";
import CartItem from "../cart/CartItem";
import Link from "next/link";
import { useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface RootState {
  cart: {
    cartItems: any[];
    totalItems: number;
    amount: number;
  };
}

const TemporaryDrawer: React.FC = () => {
  const { cartItems, totalItems, amount } = useSelector((state: RootState) => state.cart);

  // get user state information
  const user_context = useContext(userContext);
  const { user } = user_context;

  const [state, setState] = React.useState<{ right: boolean }>({
    right: false,
  });

  const toggleDrawer = (anchor: "right", open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { t } = useTranslation();

  const list = (anchor: "right") => (
    <>
      <Box className="drawer-main" role="presentation">
        <div className="drawer-header">
          <div>
            <Button
              onClick={toggleDrawer("right", true)}
              id="bucket-btn"
              variant="outlined"
              sx={{
                bgcolor: totalItems >= 1 ? "#ff741f !important" : "",
                borderColor: totalItems >= 1 ? "#ff741f !important" : "",
                marginRight: "1rem",
              }}
            >
              {totalItems}
            </Button>
            <strong>{t("yourBucket")}</strong>
          </div>
          <div>
            <strong
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
              }}
            >
              {totalItems >= 1 ? <h3>Rs {amount}</h3> : ""}
              <Close
                sx={{
                  cursor: "pointer",
                }}
                onClick={toggleDrawer("right", false)}
              />
            </strong>
          </div>
        </div>
        {totalItems >= 1 ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            ></Box>
            <Box>
              <Grid container>
                {cartItems.map((item, index) => {
                  return <CartItem key={index} item={item} />;
                })}
              </Grid>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <ShoppingCartOutlined
              sx={{
                fontSize: 80,
                color: "gray",
              }}
            />
            <strong>{t("emptyBucket")}</strong>
          </Box>
        )}
      </Box>
    </>
  );

  useEffect(() => {
    if (typeof window !== "undefined" && (!localStorage.getItem("user") || user === null)) {
      return;
    }
  }, [user]);

  return (
    <div className="drawer">
      <React.Fragment key={"right"}>
        <Button
          onClick={toggleDrawer("right", true)}
          id="bucket-btn"
          variant="outlined"
          sx={{
            bgcolor: totalItems >= 1 ? "#ff741f !important" : "",
            borderColor: totalItems >= 1 ? "#ff741f !important" : "",
          }}
        >
          {totalItems}
        </Button>

        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          PaperProps={{
            sx: {
              backgroundColor: "black",
              color: "white",
              padding: "1rem 1rem",
              justifyContent: "space-between",
            },
          }}
          BackdropProps={{
            sx: {
              backgroundColor: "#ffffff4a",
            },
          }}
          className="drawer-cart"
        >
          <div>{list("right")}</div>
          {totalItems >= 1 ? (
            <div className="cart-btn">
              <Link
                href="/cart"
                style={{ textDecoration: "none" }}
                onClick={toggleDrawer("right", false)}
              >
                <Button variant="contained" className="view-cart-btn">
                  {t("viewBucket")}
                </Button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
