"use client";
import React from "react";
import { Container } from "@mui/material";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div id="login-parent">
      <Container className="login">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          rowSpacing={1}
        >
          <Grid item md={6} sm={6} xs={12} textAlign="center">
            <img src="/images/login.gif" id="gif" alt="Hello" />
          </Grid>
          <Grid item md={6} sm={6} xs={12} textAlign="center">
            <h1 style={{ marginBottom: "1rem", textAlign: "left" }}>
              {t("welcome")}!
            </h1>
            <form>
              <TextField
                id="filled-basic"
                label="Name"
                variant="filled"
                sx={{
                  backgroundColor: "#343434",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  fontWeight: "bolder",
                  marginBottom: "1rem",
                  paddingRight: "0",
                }}
                inputProps={{ className: "floatingInput" }}
                InputLabelProps={{
                  className: "floatingLabel",
                }}
                color="error"
              />
              <TextField
                id="filled-basic"
                label="Phone Number"
                variant="filled"
                sx={{
                  backgroundColor: "#343434",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  fontWeight: "bolder",
                  marginBottom: "1rem",
                  paddingRight: "0",
                }}
                inputProps={{
                  className: "floatingInput",
                }}
                InputLabelProps={{
                  className: "floatingLabel",
                }}
                color="error"
              />
              <Button variant="contained" id="login-btn" disabled>
                Login
              </Button>
              <div className="or-login-with">
                <div>
                  <Box
                    className="lines"
                    sx={{
                      backgroundColor: "#48413e",
                    }}
                  />
                </div>
                <div>
                  <h5>Or</h5>
                </div>
                <div>
                  <Box
                    className="lines"
                    sx={{
                      backgroundColor: "#48413e",
                    }}
                  />
                </div>
              </div>
            </form>
            {/* Google login placeholder */}
            <div className="login-with-google" id="login-with-google">
              <Button variant="outlined" disabled>
                Login with Google (UI only)
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
