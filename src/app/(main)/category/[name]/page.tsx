"use client";
import React, {useContext, useEffect} from "react";
import {useParams} from "next/navigation";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "../../../../components/commons/Card";
import DealSection from "../../../../components/deals/DealSection";
import CategoryPageSkeleton from "../../../../components/deals/CatergoryPageSkeleton";
import softDrinkContext from "../../../../context/softDrinkContext";
import addonContext from "../../../../context/addonContext";
import {useGetProductsQuery} from "@/redux/features/products/productApi";
import {useGetCategoriesQuery} from "@/redux/features/categories/categoryApi";
import {IProduct} from "@/types/globalTypes";

export default function CategoryPage() {
  const params = useParams();
  const name = params?.name as string;

  const softDrink_context = useContext(softDrinkContext);
  const addon_context = useContext(addonContext);

  const {setAddonQuantity} = addon_context;
  const {setSoftDrinksQuantity} = softDrink_context;

  const {data, isLoading, isError} = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  // Fetch products by categoryId (if found), else fallback to name
  const {data: productData, isLoading: isProductLoading} = useGetProductsQuery({categoryName: name});
  const products = productData?.data || [];

  useEffect(() => {
    setAddonQuantity([]);
    setSoftDrinksQuantity([]);
    //eslint-disable-next-line
  }, [name]);

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
                textAlign:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? ("center" as React.CSSProperties["textAlign"])
                    : undefined,
              }}
            >
              {products[0]?.catId?.name || name}
            </h2>
            <div className="cat-cards">
              <Box marginTop={6}>
                <Grid
                  className="grid"
                  container
                  columnGap={{xs: 0, sm: 4, md: 3}}
                  gap={1}
                  justifyContent={{
                    sm: "center",
                    xs: "center",
                    md: "flex-start",
                  }}
                >
                  {products.map((prod: IProduct) => (
                    <Grid key={prod._id} size={{xs: 10, sm: 5, md: 2.8}}>
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
