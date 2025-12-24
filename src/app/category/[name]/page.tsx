"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "../../../components/commons/Card";
import DealSection from "../../../components/deals/DealSection";
import CategoryPageSkeleton from "../../../components/deals/CatergoryPageSkeleton";
import softDrinkContext from "../../../context/softDrinkContext";
import addonContext from "../../../context/addonContext";

export default function CategoryPage() {
  const params = useParams();
  const name = params?.name as string;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  const softDrink_context = useContext(softDrinkContext);
  const addon_context = useContext(addonContext);

  const { setAddonQuantity } = addon_context;
  const { setSoftDrinksQuantity } = softDrink_context;

  // For UI-only: set dummy products
  const getCatProds = async () => {
    setProducts([
      {
        name: "Sample Product 1",
        desc: "Description for product 1",
        price: 100,
        prodImg: "/images/1.png",
        _id: "1",
        catId: { name: name || "Category" },
      },
      {
        name: "Sample Product 2",
        desc: "Description for product 2",
        price: 200,
        prodImg: "/images/2.png",
        _id: "2",
        catId: { name: name || "Category" },
      },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getCatProds();
    setAddonQuantity([]);
    setSoftDrinksQuantity([]);
    //eslint-disable-next-line
  }, [name]);

  // document.title = products[0] === undefined ? "Loading..." : products[0].catId.name;

  return (
    <Container>
      <DealSection />
      <div className="cat-container">
        {loading ? (
          <CategoryPageSkeleton />
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
              {products[0].catId.name}
            </h2>
            <div className="cat-cards">
              <Box marginTop={6}>
                <Grid
                  className="grid"
                  container
                  columnGap={{ xs: 0, sm: 4, md: 3 }}
                  gap={1}
                  justifyContent={{
                    sm: "center",
                    xs: "center",
                    md: "flex-start",
                  }}
                >
                  {products.map((prod, index) => (
                    <Grid key={index} size={{xs: 10, sm: 5, md: 2.8}}>
                      <Card
                        key={index}
                        title={prod.name}
                        desc={prod.desc}
                        price={prod.price}
                        src={prod.prodImg}
                        id={prod._id}
                        catName={prod.catId.name}
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
