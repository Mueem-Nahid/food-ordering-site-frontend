"use client";
import React from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer
} from "@mui/material";
import OrderInvoiceDialog from "./OrderInvoiceDialog";
import OrderHistoryItem from "./OrderHistoryItem";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {useGetMyOrdersQuery} from "@/redux/features/orders/orderApi";
import {useSelector} from "react-redux";
import {Order} from "@/types/globalTypes";

interface IProps {
  showAllOrders: boolean;
}

const OrderHistory: React.FC<IProps> = ({showAllOrders}) => {
  const {t} = useTranslation();
  const userInfo = useSelector((state: any) => state.user?.userInfo);

  // Modal state for invoice
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  // Fetch orders (optionally filter by user)
  const {data, isLoading, isError} = useGetMyOrdersQuery({});
  const orders: Order[] = data?.data || [];

  const showOrders: Order[] = orders.length > 2 ? orders.slice(0, 2) : orders;

  // Download invoice as PDF or print
  const handleDownload = () => {
    if (!selectedOrder) return;
    window.print(); // For simplicity, use print dialog. For PDF, use jsPDF or html2pdf.
  };

  return (
    <Container>
      {showAllOrders && <h1 style={{marginBottom: "10px"}}>{t("pastOrders")}</h1>}
      <div className="order-history">
        {isLoading ? (
          <span>{t("loading") || "Loading..."}</span>
        ) : isError ? (
          <span>{t("noOrder")}</span>
        ) : orders.length < 1 ? (
          <span>{t("noOrder")}</span>
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
                    <strong>{t("ID")}</strong>
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
                    <strong>{t("status") || "Status"}</strong>
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
                      onView={(order) => {
                        setSelectedOrder(order);
                        setModalOpen(true);
                      }}
                    />
                  ))
                  : orders.map((item: Order, index: number) => (
                    <OrderHistoryItem
                      key={item._id || index}
                      item={item}
                      orderStatus={item.order_status}
                      onView={(order) => {
                        setSelectedOrder(order);
                        setModalOpen(true);
                      }}
                    />
                  ))}
              </TableBody>
            </Table>
            </TableContainer>
            {!showAllOrders && orders.length > 2 && (
              <div style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                <Link href="/my-profile/order-history" className="view-all">
                  {t("viewAll")}
                </Link>
              </div>
            )}
            {/* Invoice Modal */}
            <OrderInvoiceDialog
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              order={selectedOrder}
              onDownload={handleDownload}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default OrderHistory;
