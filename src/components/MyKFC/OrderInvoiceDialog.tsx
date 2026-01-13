import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Order} from "@/types/globalTypes";
import { deliveryFee } from "@/constants/constants";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface OrderInvoiceDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  onDownload: () => void;
}

const OrderInvoiceDialog: React.FC<OrderInvoiceDialogProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 order,
                                                                 onDownload
                                                               }) => {

  // Download invoice as PDF with default filename using jsPDF/html2canvas
  const handleDownload = async () => {
    if (!order) return;
    const element = document.getElementById("invoice-content");
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4"
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 20, 20, imgWidth, imgHeight);
    pdf.save(`invoice-${order._id}.pdf`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Invoice {order ? `#${order._id}` : ""}
      </DialogTitle>
      <DialogContent>
        {order && (
          <div
            id="invoice-content"
            style={{
              padding: 0,
              margin: 0,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "Poppins, Arial, sans-serif"
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#ff741f",
                color: "#fff",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                padding: "1.5rem 1rem 1rem 1rem",
                textAlign: "center"
              }}
            >

              <h2 style={{margin: 0, fontWeight: 700, fontSize: 28}}>
                Invoice
              </h2>
              <div style={{display: "flex", justifyContent: "space-between", margin: "4px"}}>
                <div style={{fontSize: 14}}>
                  Order ID: <span style={{fontWeight: 500}}>{order._id}</span>
                </div>
                <div style={{fontSize: 14}}>
                  Date: {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
            {/* Customer & Order Info */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 16,
                padding: "1.5rem 1rem 0.5rem 1rem"
              }}
            >
              <div style={{flex: 1, minWidth: 180}}>
                <div style={{fontWeight: 600, marginBottom: 4}}>Customer</div>
                <div style={{fontSize: 15}}>{order.user?.name}</div>
                <div style={{fontSize: 15}}>{order.email}</div>
                <div style={{fontSize: 15}}>{order.phone_no}</div>
              </div>
              <div style={{flex: 1, minWidth: 180}}>
                <div style={{fontWeight: 600, marginBottom: 4}}>Delivery Address</div>
                <div style={{fontSize: 15}}>{order.delivery_address}</div>
              </div>
              <div style={{flex: 1, minWidth: 120}}>
                <div style={{fontWeight: 600, marginBottom: 4}}>Status</div>
                <div style={{fontSize: 15}}>{order.order_status}</div>
              </div>
            </div>
            {/* Items Table */}
            <div style={{padding: "1rem"}}>
              <div style={{fontWeight: 600, marginBottom: 8}}>Items</div>
              <div style={{overflowX: "auto"}}>
                <table style={{width: "100%", borderCollapse: "collapse", minWidth: 350}}>
                  <thead>
                  <tr style={{background: "#f5f5f5"}}>
                    <th style={{
                      padding: 8,
                      fontWeight: 600,
                      fontSize: 15,
                      textAlign: "left"
                    }}>Product</th>
                    <th style={{padding: 8, fontWeight: 600, fontSize: 15}}>Qty</th>
                    <th style={{padding: 8, fontWeight: 600, fontSize: 15}}>Price</th>
                    <th style={{padding: 8, fontWeight: 600, fontSize: 15}}>Delivery Day</th>
                  </tr>
                  </thead>
                  <tbody>
                  {order.product.map((prod: any, idx: number) => (
                    <tr key={idx} style={{borderBottom: "1px solid #eee"}}>
                      <td style={{padding: 8, fontSize: 15}}>{prod.product.title}</td>
                      <td style={{padding: 8, fontSize: 15, textAlign: "center"}}>{prod.quantity}</td>
                      <td style={{padding: 8, fontSize: 15, textAlign: "center"}}>Rs {prod.product.price}</td>
                      <td style={{padding: 8, fontSize: 15, textAlign: "center"}}>{prod.product.deliveryDay}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              {/* Modern Summary */}
              <div
                style={{
                  marginTop: 24,
                  background: "#f5f5f5",
                  borderRadius: 8,
                  padding: "1rem",
                  maxWidth: 400,
                  marginLeft: "auto",
                  marginRight: "auto",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  fontSize: 16
                }}
              >
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
                  <span style={{fontWeight: 500}}>Payment Method:</span>
                  <span>{order.payment_method}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
                  <span style={{fontWeight: 500}}>Delivery Charge:</span>
                  <span>$ {deliveryFee}</span>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18}}>
                  <span>Total:</span>
                  <span>$ {order.amount}</span>
                </div>
              </div>
            </div>
            {/* Footer: Site name and URL */}
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#888",
                marginTop: 24,
                paddingBottom: 8
              }}
            >
              DeshiQ &mdash; {process.env.NEXT_PUBLIC_SITE_URL}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions className="no-print">
        <Button onClick={handleDownload} variant="outlined">
          Download
        </Button>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderInvoiceDialog;
