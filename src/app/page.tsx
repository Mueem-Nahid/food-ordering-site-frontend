"use client";
import React, { useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import Hero from "../components/Hero";
import DealSection from "../components/deals/DealSection";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoryApi";
import TopSelling from "../components/TopSelling";
import HeroSkeleton from "../components/HeroSkeleton";
import DealSkeleton from "../components/deals/DealSkeleton";
import dealContext from "../context/dealContext";
import CategoryPageSkeleton from "../components/deals/CatergoryPageSkeleton";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import TopBar from "../components/commons/TopBar";
import LanguageSwitch from "../components/commons/LanguageSwitch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const context = useContext(dealContext);
  const { loading, getCats } = context;

  const { data, isLoading, isError } = useGetCategoriesQuery(undefined);
  const categories = data?.data || [];

  useEffect(() => {
    getCats();
    //eslint-disable-next-line
  }, []);

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
      <Container>
        {loading ? <HeroSkeleton /> : <Hero />}
        {loading || isLoading ? (
          <DealSkeleton />
        ) : isError ? (
          <div className="deal-container">Failed to load categories.</div>
        ) : (
          <DealSection categories={categories} />
        )}
        {loading ? <CategoryPageSkeleton /> : <TopSelling />}
      </Container>
      <Footer />
    </>
  );
}
