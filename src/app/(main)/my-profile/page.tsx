"use client";
import React, { useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProfileDetails from "../../../components/MyKFC/ProfileDetails";
import PastOrders from "../../../components/MyKFC/PastOrders";
import Favourites from "../../../components/MyKFC/Favourites";
import MyKFCSkeleton from "../../../components/MyKFC/MyKFCSkeleton";
import { useTranslation } from "react-i18next";
import {useSession} from "next-auth/react";

export default function MyProfilePage() {
  const {data: session, status} = useSession();
  const [favs, setFavs] = useState<any[]>([]);
  const { t } = useTranslation();

  if (status === "unauthenticated") {
    return (
      <Container>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Please login to view your profile.</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {status === "loading" ? (
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
                <h3>{session?.user?.name}</h3>
              </Grid>
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12}}>
              <ProfileDetails />
            </Grid>
            <Grid size={{xs: 12, sm: 12, md: 12}}>
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
