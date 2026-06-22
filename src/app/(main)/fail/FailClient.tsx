"use client";
import React, { useEffect, useState } from "react";
import Spinner from "../../../components/commons/Spinner";
import { toast } from "react-toastify";

export default function FailClient() {
  const [showFail, setShowFail] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFail(true);
      toast.error("Payment Incomplete!");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showFail ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h1>Payment Incomplete!</h1>
          <p>Your payment was not successful. Please try again.</p>
        </div>
      )}
    </>
  );
}
