import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import OrderHistory from "../../pages/OrderHistory";
import { useTranslation } from "react-i18next";

const PastOrders: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        display="flex"
      >
        <h1>{t("pastOrders")}</h1>
        <Link href="/orderHistory" className="view-all">
          {t("viewAll")}
        </Link>
      </Grid>
      <div className="past-orders">
        <OrderHistory />
      </div>
    </>
  );
};

export default PastOrders;
