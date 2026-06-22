"use client";
import React, {useContext, useEffect} from "react";
import {useParams} from "next/navigation";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useTheme, useMediaQuery} from "@mui/material";
import Card from "../../../../components/commons/Card";
import DealSection from "../../../../components/deals/DealSection";
import CategoryPageSkeleton from "../../../../components/deals/CatergoryPageSkeleton";
import softDrinkContext from "../../../../context/softDrinkContext";
import addonContext from "../../../../context/addonContext";
import {useGetProductsQuery} from "@/redux/features/products/productApi";
import {useGetCategoriesQuery} from "@/redux/features/categories/categoryApi";
import {IProduct} from "@/types/globalTypes";
import {safeDecodeURIComponent} from "@/utils/utils";

export default function CategoryClient() {
  const params = useParams();
  const name = safeDecodeURIComponent(params?.name as string);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const softDrink_context = useContext(softDrinkContext);
  const addon_context = useContext(addonContext);

  const {setAddonQuantity} = addon_context;
  const {setSoftDrinksQuantity} = softDrink_context;

  const {data, isLoading} = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  const {data: productData, isLoading: isProductLoading} = useGetProductsQuery({categoryName: name});
  const products = productData?.data || [];

  useEffect(() => {
    setAddonQuantity([]);
    setSoftDrinksQuantity([]);
  }, [name, setAddonQuantity, setSoftDrinksQuantity]);

  return (
    <Container>
      <DealSection categories={categories}/>
      <div className="cat-container">
        {isLoading ? (
          <CategoryPageSkeleton/>
        ) : (
          <>
            <h2
              style={{
                textAlign: isMobile ? ("center" as React.CSSProperties["textAlign"]) : undefined,
              }}
            >
              {products[0]?.catId?.name || name}
            </h2>
            <div className="cat-cards">
              <Box marginTop={6}>
                <Grid
                  className="grid"
                  container
                  columnGap={{ xs: 1, sm: 2, md: 2 }}
                  rowSpacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  {products.map((prod: IProduct) => (
                    <Grid key={prod._id} size={{ xs: 12, sm: 6, md: 2.8 }}>
                      <Card
                        key={prod._id}
                        title={prod.name}
                        desc={prod.desc}
                        price={prod.price}
                        src={prod.productImage}
                        id={prod._id}
                        catName={prod.category?.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
