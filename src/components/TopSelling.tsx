import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "./commons/Card";

interface Product {
  name: string;
  desc: string;
  price: number;
  prodImg: string;
  _id: string;
  catId: { name: string };
}

const TopSelling: React.FC = () => {
  const [topSell, setTopSell] = useState<Product[]>([]);

  // For UI-only: set dummy top selling products
  useEffect(() => {
    setTopSell([
      {
        name: "Top Seller 1",
        desc: "Description for top seller 1",
        price: 150,
        prodImg: "/images/topsel1.png",
        _id: "ts1",
        catId: { name: "Signature Boxes" },
      },
      {
        name: "Top Seller 2",
        desc: "Description for top seller 2",
        price: 200,
        prodImg: "/images/topsel2.png",
        _id: "ts2",
        catId: { name: "Signature Boxes" },
      },
      {
        name: "Top Seller 3",
        desc: "Description for top seller 3",
        price: 180,
        prodImg: "/images/topsel3.png",
        _id: "ts3",
        catId: { name: "Signature Boxes" },
      },
      {
        name: "Top Seller 4",
        desc: "Description for top seller 4",
        price: 220,
        prodImg: "/images/topsel4.png",
        _id: "ts4",
        catId: { name: "Signature Boxes" },
      },
    ]);
  }, []);

  return (
    <div className="top-selling">
      <h2
        style={{
          textAlign:
            typeof window !== "undefined" && window.innerWidth < 768
              ? ("center" as React.CSSProperties["textAlign"])
              : undefined,
        }}
      >
        Featured Items
      </h2>
      <div className="card">
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
              {topSell.slice(0, 4).map((prod, index) => (
                <Grid key={index} size={{ xs: 10, sm: 5, md: 2.8 }}>
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
      </div>
    </div>
  );
};

export default TopSelling;
