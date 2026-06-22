"use client";

import React, {Suspense} from "react";
import {Button, Container, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";
import {signIn} from "@/utils/auth";
import {useSearchParams} from "next/navigation";
import OptimizedImage from "../../../../components/commons/OptimizedImage";

function LoginForm() {
  const {t} = useTranslation();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams?.get("redirect") || "/";
  const safeRedirect = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
    ? rawRedirect
    : "/";

  const handleSignIn = () => {
    signIn("google", {callbackUrl: safeRedirect});
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
            <OptimizedImage
              src="/images/login.png"
              alt="Login"
              width={500}
              height={500}
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="login-img"
              style={{ width: "30rem", height: "auto" }}
            />
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

export default function LoginClient() {
  return (
    <Suspense fallback={null}>
      <LoginForm/>
    </Suspense>
  );
}
