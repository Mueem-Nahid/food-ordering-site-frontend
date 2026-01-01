"use client";
import React, {useEffect, useState} from "react";
import {Container, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import OrderHistoryItem from "./OrderHistoryItem";
import {useTranslation} from "react-i18next";
import Link from "next/link";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const {t} = useTranslation();

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
      {
        payment_method: "Paypal",
        address: "789 Oak St, City",
        totalItems: 3,
        amount: 900,
      },
    ]);
  }, []);

  const showOrders = orders.length > 2 ? orders.slice(0, 2) : orders;

  return (
    <Container>
      <div className="order-history">
        {orders.length < 1 ? (
          <span>{t("noOrder")}</span>
        ) : (
          <>
            <Table
              sx={{
                backgroundColor: "#1c1816",
                borderRadius: "12px",
                overflow: "hidden"
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("paymentMethod")}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("address")}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("items")}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("subTotal")}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showOrders.map((item, index) => (
                  <OrderHistoryItem key={index} item={item}/>
                ))}
              </TableBody>
            </Table>
            {orders.length > 2 && (
              <div style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                <Link href="/orderHistory" className="view-all">
                  {t("viewAll")}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default OrderHistory;
