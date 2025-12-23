"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddonCard from "../../../components/commons/AddonCard";
import DealSection from "../../../components/deals/DealSection";
import ProductPageSkeleton from "../../../components/ProductPageSkeleton";
import dealContext from "../../../context/dealContext";
import DealSkeleton from "../../../components/deals/DealSkeleton";
import addonContext from "../../../context/addonContext";
import SoftDrinkCard from "../../../components/commons/SoftDrinkCard";
import softDrinkContext from "../../../context/softDrinkContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../../redux/cart/cartSlice";
import { useTranslation } from "react-i18next";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const { cartItems } = useSelector((store: any) => store.cart);
  const context = useContext(dealContext);
  const { getCats } = context;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  // add to bucket text
  const [text, setText] = useState("Add To Bucket");

  // use follow context to get loading and addons to add in cart
  const addon_context = useContext(addonContext);
  const { addonQuantity } = addon_context;

  // use the follow context to get softdrinks to add in cart
  const softDrinks_context = useContext(softDrinkContext);
  const { softDrinksQuantity } = softDrinks_context;

  // product detail
  const [detail, setDetail] = useState<any>({
    name: "Sample Product",
    desc: "Sample product description.",
    price: 100,
    prodImg: "/images/1.png",
  });
  const [quantity, setQuantity] = useState(1);

  // get product detail when page is loaded (UI only)
  const getProdDetail = async (prodId: string) => {
    // For UI only: set dummy data
    setDetail({
      name: "Sample Product",
      desc: "Sample product description.",
      price: 100,
      prodImg: "/images/1.png",
    });
    setLoading(false);
  };

  //handle when clicked on red button + or -
  const handleClick = (condition: "+" | "-") => {
    if (condition === "+") {
      setQuantity(quantity + 1);
      dispatch(increaseItemQuantity(id));
    } else {
      if (quantity === 0) {
        return;
      }
      setQuantity(quantity - 1);
      dispatch(decreaseItemQuantity(id));
    }
  };

  // handle When clicked on add to bucket button
  const handleAddToCart = () => {
    if (text === "محفوظ کریں" || text === "save") {
      dispatch(
        updateCartItem({
          product: {
            price: detail.price,
            title: detail.name,
            id,
            src: detail.prodImg,
          },
          quantity: quantity,
          addons: addonQuantity,
          softDrinks: softDrinksQuantity,
          prod_id: id,
        })
      );
    } else {
      dispatch(
        addToCart({
          product: {
            price: detail.price,
            title: detail.name,
            id,
            src: detail.prodImg,
          },
          quantity: quantity,
          addons: addonQuantity,
          softDrinks: softDrinksQuantity,
          prod_id: id,
        })
      );
    }
  };

  const checkStorage = (prod_id: string) => {
    const filter = cartItems.filter((item: any) => {
      return item.prod_id === prod_id;
    });
    if (filter.length > 0) {
      setText(t("save"));
      setQuantity(filter[0].quantity);
    } else {
      setText(t("addToBucket"));
      setQuantity(1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCats();
    getProdDetail(id);
    //eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    checkStorage(id);
    //eslint-disable-next-line
  }, [cartItems, t]);

  // document.title = detail.name === undefined ? "Loading..." : detail.name;
  return (
    <div className="product">
      <Container>
        {loading ? <DealSkeleton /> : <DealSection />}
        {loading ? (
          <ProductPageSkeleton />
        ) : (
          <>
            <div
              className="product-info"
              style={{
                backgroundImage: `url(/images/bg-ellipse.png)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition:
                  typeof window !== "undefined" && window.innerWidth <= 991
                    ? "-65% -115px"
                    : "-6% -117px",
                marginBottom:
                  typeof window !== "undefined" && window.innerWidth <= 768
                    ? "32px"
                    : "",
                backgroundSize:
                  typeof window !== "undefined" && window.innerWidth <= 768
                    ? "contain"
                    : "",
              }}
            >
              <Box sx={{ width: "100%", marginBottom: "10rem" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <div className="product-img">
                      <img src={detail.prodImg} width={300} alt="Deal" />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className="product-info-inner">
                      <div className="info">
                        <h1>{detail.name}</h1>
                        <span>{detail.desc}</span>
                        <h2>
                          <strong>Rs {detail.price}</strong>
                        </h2>
                        <div className="input-div">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Button
                              variant="contained"
                              className="addcartp"
                              onClick={() => handleClick("-")}
                            >
                              <h1>-</h1>
                            </Button>
                            <div className="quantity">
                              <span>{quantity}</span>
                            </div>
                            <Button
                              variant="contained"
                              className="addcartp"
                              onClick={() => handleClick("+")}
                            >
                              <h1>+</h1>
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              className="add-to-bucket"
                              onClick={() => handleAddToCart()}
                            >
                              {text}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>
            <Box>
              <Grid
                container
                marginBottom={30}
                columnSpacing={{ xs: 3, sm: 3, md: 3 }}
              >
                <Grid item sm={6} xs={12} md={4}>
                  <AddonCard title={t("addons")} prod_id={id} />
                </Grid>
                <Grid item sm={6} xs={12} md={4}>
                  <SoftDrinkCard title={t("softDrink")} prod_id={id} />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
}
