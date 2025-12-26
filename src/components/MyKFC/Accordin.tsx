import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Grid,} from "@mui/material";
import {AddCircle, ExpandMore} from "@mui/icons-material";
import locationContext from "../../context/locationContext";
import userContext from "../../context/userContext";
import {useTranslation} from "react-i18next";
import MyKfcAddLocation from "@/components/MyKFC/MyKfcAddLocation";
import MyKfcLocations from "@/components/MyKFC/MyKfcLocations";

interface AccordinProps {
  userEmail?: string | null;
}

const SimpleAccordion: React.FC<AccordinProps> = ({ userEmail }) => {
  const context = React.useContext(locationContext);
  const user_context = React.useContext(userContext);
  const {user} = user_context;
  const {
    setValue,
    setDisplaySections,
    displaySections,
  } = context;
  const getUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const clickSelecDifLoc = () => {
    setDisplaySections({first: "flex", second: "none"});
    setValue("");
  };

  const {t} = useTranslation();

  return (
    <div style={{marginTop: "2rem"}}>
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
          expandIcon={<ExpandMore sx={{color: "red"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{t("personalInfo")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <h3>{t("email")}</h3>
          <span style={{fontFamily: "Poppins"}}>{userEmail}</span>
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
          expandIcon={<ExpandMore sx={{color: "red"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>{t("myAddresses")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            marginTop={2}
            columnSpacing={{md: 2}}
            rowSpacing={{xs: 1}}
          >
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
                <AddCircle/>
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
