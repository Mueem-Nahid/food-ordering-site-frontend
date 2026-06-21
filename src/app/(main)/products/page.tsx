"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "../../../components/commons/Card";
import CategoryPageSkeleton from "../../../components/deals/CatergoryPageSkeleton";
import { useGetProductsPageQuery } from "@/redux/features/products/productApi";
import { useTranslation } from "react-i18next";
import { IProduct } from "@/types/globalTypes";

export default function ProductsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingMore = useRef(false);
  const prevLengthRef = useRef(0);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsPageQuery(page);

  const products: IProduct[] = data?.data ?? [];
  const total: number = data?.meta?.total ?? products.length;

  const hasMore = !reachedEnd && products.length < total;

  // Detect end of data: if a fetch completed but added no new items, stop.
  useEffect(() => {
    if (!isFetching && page > 1) {
      if (products.length === prevLengthRef.current) {
        setReachedEnd(true);
      }
    }
    prevLengthRef.current = products.length;
  }, [isFetching, products.length, page]);

  // Reset the loading guard when a fetch finishes
  useEffect(() => {
    if (!isFetching) {
      isLoadingMore.current = false;
    }
  }, [isFetching]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (
        entry.isIntersecting &&
        hasMore &&
        !isLoadingMore.current &&
        !isError
      ) {
        isLoadingMore.current = true;
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, isError]
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || reachedEnd) return;
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "300px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleIntersect, reachedEnd]);

  if (isLoading) {
    return (
      <Container>
        <h2 style={{ textAlign: isMobile ? "center" : undefined }}>{t("allProducts")}</h2>
        <CategoryPageSkeleton />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <h2 style={{ textAlign: isMobile ? "center" : undefined }}>{t("allProducts")}</h2>
        <div className="deal-container">Failed to load products.</div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 style={{ textAlign: isMobile ? "center" : undefined }}>{t("allProducts")}</h2>
      <div className="cat-container">
        <div className="cat-cards">
          <Box marginTop={6}>
            <Grid
              className="grid"
              container
              columnGap={{ xs: 0, sm: 4, md: 3 }}
              gap={1}
              justifyContent={{
                sm: "center",
                xs: "center",
                md: "flex-start",
              }}
            >
              {products.map((prod: IProduct) => (
                <Grid key={prod._id} size={{ xs: 10, sm: 5, md: 2.8 }}>
                  <Card
                    title={prod.name}
                    desc={prod.desc}
                    price={prod.price}
                    src={prod.productImage}
                    id={prod._id}
                    catName={prod.category?.name}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>

      {/* Sentinel + loading / end states */}
      <div ref={sentinelRef} style={{ minHeight: 1 }} />

      {isFetching && (
        <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
          <Box
            component="div"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "3px solid #333",
              borderTopColor: "#ff741f",
              animation: "spin 0.8s linear infinite",
              "@keyframes spin": {
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
      )}

      {!hasMore && !isFetching && products.length > 0 && (
        <Box sx={{ textAlign: "center", padding: 4, color: "#888" }}>
          {t("noMoreProducts")}
        </Box>
      )}

      {!isFetching && products.length === 0 && (
        <Box sx={{ textAlign: "center", padding: 4, color: "#888" }}>
          {t("noProd")}
        </Box>
      )}
    </Container>
  );
}
