import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import Card from "./commons/Card";
import { useTranslation } from "react-i18next";
import {IProduct} from "@/types/globalTypes";

interface IProductSectionProps {
  products: IProduct[];
}

const TopSelling: React.FC<IProductSectionProps> = ({ products }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="top-selling">
      <h2
        style={{
          textAlign: isMobile ? ("center" as React.CSSProperties["textAlign"]) : undefined,
        }}
      >
        {t("featuredItems")}
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
              {products.map((prod) => (
                <Grid key={prod._id} size={{ xs: 10, sm: 5, md: 2.8 }}>
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
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, marginBottom: 2 }}>
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
