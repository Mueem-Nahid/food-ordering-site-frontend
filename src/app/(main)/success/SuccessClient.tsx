"use client";
import React, { useEffect, useState } from "react";
import Spinner from "../../../components/commons/Spinner";

export default function SuccessClient() {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(true);
      if (typeof window !== "undefined") {
        localStorage.removeItem("payment");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showSuccess ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h1>Order Placed!</h1>
          <p>Your order was successful. Thank you for ordering!</p>
        </div>
      )}
    </>
  );
}
