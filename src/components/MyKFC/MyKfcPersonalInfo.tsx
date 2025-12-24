import React from "react";
import { ExpandMore } from "@mui/icons-material";
import { AccordionDetails, AccordionSummary } from "@mui/material";

const MyKfcPersonalInfo: React.FC = () => {
  return (
    <div>
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "red" }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h3>Personal Info</h3>
      </AccordionSummary>
      <AccordionDetails>
        <h3>Gender</h3>
        <span style={{ fontFamily: "Poppins" }}>Male</span>
      </AccordionDetails>
    </div>
  );
};

export default MyKfcPersonalInfo;
