"use client";
import React from "react";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import TopBar from "../../components/commons/TopBar";
import LanguageSwitch from "../../components/commons/LanguageSwitch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LanguageSwitch />
      <ToastContainer
        autoClose={2000}
        position="top-right"
        pauseOnHover={true}
        draggable={true}
        theme="dark"
        toastClassName="toast-custom"
      />
      <TopBar />
      <Header />
      {children}
      <Footer />
    </>
  );
}