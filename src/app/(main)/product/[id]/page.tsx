"use client";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Container from "@mui/material/Container";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddonCard from "../../../../components/commons/AddonCard";
import DealSection from "../../../../components/deals/DealSection";
import ProductPageSkeleton from "../../../../components/ProductPageSkeleton";
import dealContext from "../../../../context/dealContext";
import DealSkeleton from "../../../../components/deals/DealSkeleton";
import addonContext from "../../../../context/addonContext";
import SoftDrinkCard from "../../../../components/commons/SoftDrinkCard";
import softDrinkContext from "../../../../context/softDrinkContext";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, decreaseItemQuantity, increaseItemQuantity, updateCartItem,} from "@/redux/cart/cartSlice";
import {useTranslation} from "react-i18next";
import {useGetCategoriesQuery} from "@/redux/features/categories/categoryApi";
import {useGetProductQuery} from "@/redux/features/products/productApi";
import {IProduct} from "@/types/globalTypes";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {daysOfWeek} from "@/constants/constants";
import {isSelectable} from "@/utils/utils";

function ProductAvailabilitySelector({ availability }: { availability: string[] }) {
  const [selectedDay, setSelectedDay] = useState("");

  const availableDays = daysOfWeek.filter(day => availability.includes(day));

  return (
    <FormControl size="medium" fullWidth sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#ff741f"
        },
        "&:hover fieldset": {
          borderColor: "#ff741f"
        },
        "&.Mui-focused fieldset": {
          borderColor: "#ff741f"
        },
      },
    }}>
      <InputLabel
        sx={{
          color: "#ff741f",
          "&.Mui-focused": { color: "#ff741f" },
          "&.MuiInputLabel-shrink": { color: "#ff741f" }
        }}
        id="availability-label"
      >
        Select Day
      </InputLabel>
      <Select
        sx={{color:"white"}}
        labelId="availability-label"
        value={selectedDay}
        label="Select Day"
        onChange={e => setSelectedDay(e.target.value)}
      >
        {availableDays.map((day) => (
          <MenuItem
            key={day}
            value={day}
            disabled={!isSelectable(day)}
            style={{ textTransform: "capitalize" }}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const {cartItems} = useSelector((store: any) => store.cart);
  const context = useContext(dealContext);
  const {getCats} = context;
  const dispatch = useDispatch();
  const {t} = useTranslation();

  // add to bucket text
  const [text, setText] = useState("Add To Bucket");

  // use follow context to get loading and addons to add in cart
  const addon_context = useContext(addonContext);
  const {addonQuantity} = addon_context;

  // use the follow context to get softdrinks to add in cart
  const softDrinks_context = useContext(softDrinkContext);
  const {softDrinksQuantity} = softDrinks_context;

  const {data, isLoading, isError} = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  const {data: productData, isLoading: isProductLoading, isError: isProductError} = useGetProductQuery(id);
  const product: IProduct = productData?.data;

  const [quantity, setQuantity] = useState(1);

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
            price: product?.price,
            title: product?.name,
            id,
            src: product?.productImage,
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
            price: product?.price,
            title: product?.name,
            id,
            src: product?.productImage,
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
    // setLoading(true);
    getCats();
  }, [id]);

  useEffect(() => {
    checkStorage(id);
    //eslint-disable-next-line
  }, [cartItems, t]);

  // document.title = detail.name === undefined ? "Loading..." : detail.name;
  return (
    <div className="product">
      <Container>
        {isLoading ? <DealSkeleton/> : <DealSection categories={categories}/>}
        {isProductLoading ? (
          <ProductPageSkeleton/>
        ) : (
          <>
            {
              isProductError ?
                <div className="deal-container">Failed to load product.</div> :
                product ?
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
                    <Box sx={{width: "100%", marginBottom: "5rem"}}>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{xs: 1, sm: 2, md: 3}}
                      >
                        <Grid
                          size={{xs: 12, sm: 12, md: 6}}
                          justifyContent="center"
                          alignItems="center"
                          textAlign="center"
                        >
                          <div className="product-img">
                            <img src={product?.productImage} width={300} alt="Product Image"/>
                          </div>
                        </Grid>
                        <Grid size={{xs: 12, sm: 12, md: 6}}>
                          <div className="product-info-inner">
                            <div className="info">
                              <h1>{product?.name}</h1>
                              <span>{product?.desc}</span>
                              {/* product availability  */}
                              <div style={{ margin: "1rem 0" }}>
                                <div style={{ fontWeight: 500, marginBottom: "1rem", color: "#ff741f" }}>
                                  When do you need the food to be delivered?
                                </div>
                                <ProductAvailabilitySelector availability={product?.availability || []} />
                              </div>
                              <h2>
                                <strong>$ {product?.price}</strong>
                              </h2>
                              <div className="input-div">
                                <div
                                  style={{display: "flex", alignItems: "center"}}
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
                  </div> :
                  <div className="deal-container">No product found.</div>
            }
            <Box>
              <Grid
                container
                marginBottom={10}
                columnSpacing={{xs: 3, sm: 3, md: 3}}
                justifyContent="center"
              >
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                  <AddonCard title={t("addons")} prod_id={id}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                  <SoftDrinkCard title={t("softDrink")} prod_id={id}/>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </div>
  );
}
