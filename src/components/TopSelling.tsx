import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "./commons/Card";
import {IProduct} from "@/types/globalTypes";

interface IProductSectionProps {
  products: IProduct[];
}

const TopSelling: React.FC <IProductSectionProps> = ({ products }) => {
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
              {products.map((prod, index) => (
                <Grid key={index} size={{ xs: 10, sm: 5, md: 2.8 }}>
                  <Card
                    key={index}
                    title={prod?.name}
                    desc={prod?.desc}
                    price={prod?.price}
                    src={prod?.productImage}
                    id={prod?._id}
                    catName={prod?.category?.name}
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
