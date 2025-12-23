"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import OrderHistoryItem from "../../components/MyKFC/OrderHistoryItem";
import { useTranslation } from "react-i18next";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // For UI-only: set dummy orders
    setOrders([
      {
        payment_method: "COD",
        address: "123 Main St, City",
        totalItems: 2,
        amount: 500,
      },
      {
        payment_method: "Credit Card",
        address: "456 Elm St, City",
        totalItems: 1,
        amount: 250,
      },
    ]);
  }, []);

  return (
    <Container>
      <h1>{t("pastOrders")}</h1>
      <div className="order-history">
        {orders.length < 1 ? (
          <span>{t("noOrder")}</span>
        ) : (
          <>
            <Grid container display="flex" justifyContent="space-around">
              <Grid item md={3} sm={3} xs={3}>
                <strong>{t("paymentMethod")}</strong>
              </Grid>
              <Grid item md={3} sm={3} xs={4}>
                <strong>{t("address")}</strong>
              </Grid>
              <Grid item md={3} sm={3} xs={2}>
                <strong>{t("items")}</strong>
              </Grid>
              <Grid item md={3} sm={3} xs={3}>
                <strong>{t("subTotal")}</strong>
              </Grid>
            </Grid>
            <div>
              {orders.map((item, index) => (
                <OrderHistoryItem key={index} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
