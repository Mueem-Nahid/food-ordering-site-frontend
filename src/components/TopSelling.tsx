import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import Card from "./commons/Card";
import { useTranslation } from "react-i18next";
import {IProduct} from "@/types/globalTypes";

interface IProductSectionProps {
  products: IProduct[];
}

const TopSelling: React.FC<IProductSectionProps> = ({ products }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="top-selling">
      <h2 style={{ textAlign: isMobile ? "center" : undefined }}>
        {t("featuredItems")}
      </h2>
      <div className="card">
        <div className="cat-cards">
          <Box marginTop={4}>
            <Grid
              className="grid"
              container
              columnGap={{ xs: 1, sm: 2, md: 2 }}
              rowSpacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              {products.map((prod) => (
                <Grid key={prod._id} size={{ xs: 6, sm: 5, md: 2.8 }}>
                  <Card
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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, marginBottom: 2 }}>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button variant="outlined" sx={{ borderColor: "#ff741f", color: "#ff741f" }}>
            <strong>{t("viewAll")}</strong>
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default TopSelling;
