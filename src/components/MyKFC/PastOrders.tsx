import React from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import OrderHistory from "./OrderHistory";
import {useTranslation} from "react-i18next";
import {ExpandMore} from "@mui/icons-material";

const PastOrders: React.FC = () => {
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
          <h3>{t("pastOrders")}</h3>
        </AccordionSummary>
        <AccordionDetails>
          <OrderHistory showAllOrders={false}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PastOrders;
