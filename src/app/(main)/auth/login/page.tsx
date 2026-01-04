"use client";

import React, {Suspense} from "react";
import {Button, Container, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import {signIn} from "@/utils/auth";
import {useSearchParams} from "next/navigation";

function LoginForm() {
  const {t} = useTranslation();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";

  const handleSignIn = () => {
    signIn("google", {callbackUrl: redirect});
  }

  return (
    <div id="login-parent">
      <Container className="login">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={1}
        >
          <Grid size={{xs: 12, sm: 6, md: 6}} textAlign="center">
            <img src="/images/login.png" id="gif" alt="Login"/>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 6}} textAlign="center">
            <h1 style={{marginBottom: "1rem", textAlign: "center"}}>
              {t("welcome")}!
            </h1>

            <div className="login-with-google" id="login-with-google">
              <Button
                sx={{backgroundColor: '#ff741f'}}
                variant="contained"
                onClick={handleSignIn}
              >
                Login with Google
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm/>
    </Suspense>
  );
}
