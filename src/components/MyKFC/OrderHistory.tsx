"use client";
import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  Button,
} from "@mui/material";
import OrderInvoiceDialog from "./OrderInvoiceDialog";
import OrderHistoryItem from "./OrderHistoryItem";
import OrderHistorySkeleton from "./OrderHistorySkeleton";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {useGetMyOrdersQuery} from "@/redux/features/orders/orderApi";
import {useAppSelector} from "@/redux/hook";
import {Order} from "@/types/globalTypes";
import {useMediaQuery, useTheme} from "@mui/material";

interface IProps {
  showAllOrders: boolean;
}

const OrderHistory: React.FC<IProps> = ({showAllOrders}) => {
  const {t} = useTranslation();
  const userInfo = useAppSelector((state) => state.user?.userInfo);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const {data, isLoading, isError} = useGetMyOrdersQuery({});
  const orders: Order[] = data?.data || [];

  const showOrders: Order[] = orders.length > 2 ? orders.slice(0, 2) : orders;

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <Container>
      {showAllOrders && <h1 style={{marginBottom: "10px"}}>{t("pastOrders")}</h1>}
      <div className="order-history">
        {isLoading ? (
          <OrderHistorySkeleton />
        ) : isError ? (
          <span>{t("noOrder")}</span>
        ) : orders.length < 1 ? (
          <span>{t("noOrder")}</span>
        ) : isMobile ? (
          <>
            {(showAllOrders ? orders : showOrders).map((item: Order, index: number) => {
              const discount = item.discount || 0;
              const finalAmount = item.discountedAmount ?? (item.amount - discount);
              return (
              <Box key={item._id || index} className="order-card">
                <Box className="order-card-row">
                  <span className="order-card-label">ID</span>
                  <span className="order-card-value">{item._id.substring(0, 8)}...</span>
                </Box>
                <Box className="order-card-row">
                  <span className="order-card-label">{t("paymentMethod")}</span>
                  <span className="order-card-value">{item.payment_method}</span>
                </Box>
                <Box className="order-card-row">
                  <span className="order-card-label">{t("address")}</span>
                  <span className="order-card-value">{item.delivery_address}</span>
                </Box>
                <Box className="order-card-row">
                  <span className="order-card-label">{t("items")}</span>
                  <span className="order-card-value">{item.total_items}</span>
                </Box>
                <Box className="order-card-row">
                  <span className="order-card-label">{t("subTotal")}</span>
                  <span className="order-card-value">{discount > 0 ? <><del style={{ opacity: 0.6 }}>$ {item.amount}</del> <span style={{ color: "#4caf50" }}>$ {finalAmount.toFixed(2)}</span></> : <span>$ {item.amount}</span>}</span>
                </Box>
                {discount > 0 && (
                  <Box className="order-card-row">
                    <span className="order-card-label">Discount</span>
                    <span className="order-card-value" style={{ color: "#4caf50" }}>- $ {discount.toFixed(2)}</span>
                  </Box>
                )}
                <Box className="order-card-row">
                  <span className="order-card-label">{t("status")}</span>
                  <span className="order-card-value">{item.order_status}</span>
                </Box>
                <Box className="order-card-view">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(item)}
                    sx={{borderColor: "#ff741f", color: "#ff741f"}}
                  >
                    {t("details")}
                  </Button>
                </Box>
              </Box>
              );
            })}
            {!showAllOrders && orders.length > 2 && (
              <Box sx={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                <Link href="/order-history" className="view-all">
                  {t("viewAll")}
                </Link>
              </Box>
            )}
            <OrderInvoiceDialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              order={selectedOrder}
            />
          </>
        ) : (
          <>
            <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
              <Table
                sx={{
                  backgroundColor: "#1c1816",
                  borderRadius: "12px",
                  minWidth: 700,
                }}
              >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("id")}</strong>
                  </TableCell>
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
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("discount")}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("status")}</strong>
                  </TableCell>
                  <TableCell align="center" sx={{color: "white", backgroundColor: "#1c1816"}}>
                    <strong>{t("details")}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!showAllOrders
                  ? showOrders.map((item: Order, index: number) => (
                    <OrderHistoryItem
                      key={item._id || index}
                      item={item}
                      orderStatus={item.order_status}
                      onView={handleView}
                    />
                  ))
                  : orders.map((item: Order, index: number) => (
                    <OrderHistoryItem
                      key={item._id || index}
                      item={item}
                      orderStatus={item.order_status}
                      onView={handleView}
                    />
                  ))}
              </TableBody>
            </Table>
            </TableContainer>
            {!showAllOrders && orders.length > 2 && (
              <Box sx={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                <Link href="/order-history" className="view-all">
                  {t("viewAll")}
                </Link>
              </Box>
            )}
            <OrderInvoiceDialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              order={selectedOrder}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default OrderHistory;
