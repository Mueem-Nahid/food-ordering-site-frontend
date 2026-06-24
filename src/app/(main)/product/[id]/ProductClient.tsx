"use client";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Container from "@mui/material/Container";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useTheme, useMediaQuery} from "@mui/material";
import AddonCard from "../../../../components/commons/AddonCard";
import DealSection from "../../../../components/deals/DealSection";
import ProductPageSkeleton from "../../../../components/ProductPageSkeleton";
import dealContext from "../../../../context/dealContext";
import DealSkeleton from "../../../../components/deals/DealSkeleton";
import addonContext from "../../../../context/addonContext";
import SoftDrinkCard from "../../../../components/commons/SoftDrinkCard";
import softDrinkContext from "../../../../context/softDrinkContext";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {addToCart, decreaseItemQuantity, increaseItemQuantity, updateCartItem,} from "@/redux/cart/cartSlice";
import {useTranslation} from "react-i18next";
import {useGetCategoriesQuery} from "@/redux/features/categories/categoryApi";
import {useGetProductQuery} from "@/redux/features/products/productApi";
import {IProduct} from "@/types/globalTypes";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {daysOfWeek} from "@/constants/constants";
import {isSelectable} from "@/utils/utils";
import {toast} from "react-toastify";
import OptimizedImage from "../../../../components/commons/OptimizedImage";

function ProductAvailabilitySelector({
  availability,
  selectedDay,
  setSelectedDay,
  onChangeDeliveryDay,
  label,
}: {
  availability: string[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  onChangeDeliveryDay: (day: string) => void;
  label: string;
}) {
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
        {label}
      </InputLabel>
      <Select
        sx={{color:"white"}}
        labelId="availability-label"
        value={selectedDay}
        label={label}
        onChange={e => {
          setSelectedDay(e.target.value);
          onChangeDeliveryDay(e.target.value);
        }}
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

export default function ProductClient() {
  const params = useParams();
  const id = params?.id as string;
  const {cartItems} = useAppSelector((store) => store.cart);
  const context = useContext(dealContext);
  const {getCats} = context;
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isInCart, setIsInCart] = useState(false);

  const addon_context = useContext(addonContext);
  const {addonQuantity} = addon_context;

  const softDrinks_context = useContext(softDrinkContext);
  const {softDrinksQuantity} = softDrinks_context;

  const {data, isLoading, isError} = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  const {data: productData, isLoading: isProductLoading, isError: isProductError} = useGetProductQuery(id);
  const product: IProduct = productData?.data;

  const [quantity, setQuantity] = useState(1);
  const [selectedDay, setSelectedDay] = useState("");

  function updateDeliveryDayInRedux(newDay: string) {
    const cartItem = cartItems.find((item: any) => item.prod_id === id);
    if (cartItem) {
      dispatch(
        updateCartItem({
          ...cartItem,
          product: {
            ...cartItem.product,
            deliveryDay: newDay,
          },
        })
      );
    }
  }

  useEffect(() => {
    const cartItem = cartItems.find((item: any) => item.prod_id === id);
    if (cartItem && cartItem.product && cartItem.product.deliveryDay) {
      setSelectedDay(cartItem.product.deliveryDay);
    }
  }, [cartItems, id]);

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

  const handleAddToCart = () => {
      if (!selectedDay) {
        toast.error(t("selectDeliveryDay"));
        return;
      }
    if (isInCart) {
      dispatch(
        updateCartItem({
          product: {
            price: product?.price,
            title: product?.name,
            id,
            src: product?.productImage,
            deliveryDay: selectedDay,
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
            deliveryDay: selectedDay,
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
      setIsInCart(true);
      setQuantity(filter[0].quantity);
    } else {
      setIsInCart(false);
      setQuantity(1);
    }
  };

  useEffect(() => {
    getCats();
  }, [id]);

  useEffect(() => {
    checkStorage(id);
    //eslint-disable-next-line
  }, [cartItems, t]);

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
                <div className="deal-container">{t("failedToLoadProduct")}</div> :
                product ?
                  <div
                    className="product-info"
                    style={{
                      backgroundImage: `url(/images/bg-ellipse.png)`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: isMobile ? "-65% -115px" : "-6% -117px",
                      marginBottom: isMobile ? "2rem" : "",
                      backgroundSize: isMobile ? "contain" : "",
                    }}
                  >
                    <Box sx={{width: "100%", marginBottom: {xs: "2rem", md: "5rem"}}}>
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
                            <OptimizedImage
                              src={product?.productImage}
                              alt={t("productImage")}
                              fill
                              width={300}
                              priority
                              sizes="300px"
                            />
                          </div>
                        </Grid>
                        <Grid size={{xs: 12, sm: 12, md: 6}}>
                          <div className="product-info-inner">
                            <div className="info">
                              <h1>{product?.name}</h1>
                              <span>{product?.desc}</span>
                              <div style={{ margin: "1rem 0" }}>
                                <div style={{ fontWeight: 500, marginBottom: "1rem", color: "#ff741f" }}>
                                  {t("whenDelivered")}
                                </div>
                                <ProductAvailabilitySelector
                                  availability={product?.availability || []}
                                  selectedDay={selectedDay}
                                  setSelectedDay={setSelectedDay}
                                  onChangeDeliveryDay={updateDeliveryDayInRedux}
                                  label={t("selectDay")}
                                />
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
                                    {isInCart ? t("save") : t("addToBucket")}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </div> :
                  <div className="deal-container">{t("noProductFound")}</div>
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
