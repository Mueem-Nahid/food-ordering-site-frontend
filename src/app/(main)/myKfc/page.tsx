"use client";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Accordin from "../../../components/MyKFC/Accordin";
import PastOrders from "../../../components/MyKFC/PastOrders";
import Favourites from "../../../components/MyKFC/Favourites";
import MyKFCSkeleton from "../../../components/MyKFC/MyKFCSkeleton";
import { useTranslation } from "react-i18next";

export default function MyKfcPage() {
  // document.title = "My KFC";
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  const [loading, setLoading] = useState(true);
  const [favs, setFavs] = useState<any[]>([]);

  // For UI-only: simulate fetching favorites
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setFavs([]); // Set dummy favorites
      setLoading(false);
    }, 1000);
    //eslint-disable-next-line
  }, []);

  const { t } = useTranslation();

  if (!user) {
    return (
      <Container>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Please login to view your KFC profile.</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {loading ? (
        <MyKFCSkeleton />
      ) : (
        <div className="my-kfc">
          <div className="hello-sec">
            <Grid container>
              <Grid
                flexDirection="row"
                display="flex"
                gap=".7rem"
                size={{xs: 12, sm: 12, md: 12}}
              >
                <h3>{t("hello")} &#128512;</h3>
                <h3>{user.name}</h3>
              </Grid>
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12}}>
              <Accordin />
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12}} marginTop="2rem">
              <PastOrders />
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12}}>
              <Favourites favs={favs} setFavs={setFavs} />
            </Grid>
          </div>
        </div>
      )}
    </Container>
  );
}
