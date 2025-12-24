import * as React from "react";
import {
  Grid,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import { ExpandMore, AddCircle } from "@mui/icons-material";
import Map from "../commons/Map";
import MyKfcLocations from "../MyKFC/MyKfcLocations";
import MyKfcAddLocation from "../MyKFC/MyKfcAddLocation";
import locationContext from "../../context/locationContext";
import userContext from "../../context/userContext";
import { useTranslation } from "react-i18next";

const SimpleAccordion: React.FC = () => {
  const context = React.useContext(locationContext);
  const user_context = React.useContext(userContext);
  const { user } = user_context;
  const {
    getLocations,
    setValue,
    setDisplaySections,
    setTagIndex,
    setLocationState,
    displaySections,
    locations,
  } = context;
  const getUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const clickSelecDifLoc = () => {
    setDisplaySections({ first: "flex", second: "none" });
    setValue("");
    setLocationState("Add");
    setTagIndex(null);
  };

  const { t } = useTranslation();

  React.useEffect(() => {
    getLocations(getUser.email);
    //eslint-disable-next-line
  }, [locations, user]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Accordion
        sx={{
          marginBottom: ".7rem",
          backgroundColor: "#1c1816",
          color: "white",
          borderRadius: "12px !important",
          padding: "1rem 0.4rem",
          fontFamily: "Poppins",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "red" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{t("personalInfo")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <h3>{t("email")}</h3>
          <span style={{ fontFamily: "Poppins" }}>{getUser.email}</span>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          marginBottom: ".7rem",
          backgroundColor: "#1c1816",
          color: "white",
          borderRadius: "12px !important",
          padding: "1rem 0.4rem",
          fontFamily: "Poppins",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "red" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{t("myAddresses")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            marginTop={2}
            columnSpacing={{ md: 2 }}
            rowSpacing={{ xs: 1 }}
          >
            <Grid>
              <Map />
            </Grid>
            {/* Add User Location To Database */}
            <MyKfcAddLocation />
            {/* Add User Location To Database */}

            <Grid
              sx={{
                display: displaySections.second,
                gap: 2,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* User current locations available in database */}
              <MyKfcLocations />
              {/* User current locations available in database */}
            </Grid>
            <Grid
              sx={{
                display: displaySections.second,
                gap: 2,
                flexDirection: "row",
                justifyContent: "flex-start",
                cursor: "pointer",
              }}
            >
              <div className="address-icon">
                <AddCircle />
              </div>
              <div className="select-dif-loc" onClick={clickSelecDifLoc}>
                <span>{t("selectADifLocation")}</span>
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default SimpleAccordion;
