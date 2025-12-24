import React, { useContext, useState } from "react";
import { LocationSearching, ArrowDropDown } from "@mui/icons-material";
import { Modal, Typography, Box, Button } from "@mui/material";
import Map from "./Map";
import AutoComplete from "./AutoComplete";
import locationContext from "../../context/locationContext";
import { useTranslation } from "react-i18next";

const getModalStyle = () => ({
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "#1C1816",
  boxShadow: 24,
  p: 4,
  borderRadius: ".4rem",
  height:
    typeof window !== "undefined" && window.innerWidth < 768
      ? "85vh"
      : "90vh",
});

const ModalFunc: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(locationContext);
  const { getLocation } = context;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // handle the location when clicked on select current location
  const handleClick = () => {
    getLocation();
  };

  return (
    <div>
      <div className="sel-loc" onClick={handleOpen}>
        {t("selectLocation")} <ArrowDropDown />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "#ffffff4a",
          },
        }}
      >
        <Box sx={getModalStyle()} id="modal">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {t("selectLocation")}
          </Typography>

          <Map />

          <div style={{ width: "100%" }}>
            <AutoComplete />
          </div>
          <Box
            sx={{ display: "flex", marginTop: "1rem", gap: ".5rem" }}
            className="modal-search-loc"
            onClick={handleClick}
          >
            <LocationSearching style={{ color: "#e4002b" }} />
            <strong>{t("selectCurrentLocation")}</strong>
          </Box>
          <Box
            sx={{
              display: "flex",
              marginTop: "1rem",
              gap: ".5rem",
              justifyContent: "center",
            }}
            onClick={handleClick}
          >
            <Button
              sx={{
                width: "30vw",
                color: "white",
                borderColor: "white",
                "&.MuiButtonBase-root:hover": {
                  borderColor: "white",
                },
              }}
              size="large"
              variant="outlined"
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>
            <Button
              sx={{
                width: "30vw",
                color: "white",
                borderColor: "#e4002b",
                backgroundColor: "#e4002b",
                "&.MuiButtonBase-root:hover": {
                  borderColor: "#e4002b",
                  backgroundColor: "#e4002b",
                },
              }}
              size="large"
              variant="outlined"
              onClick={handleClose}
            >
              {t("select")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalFunc;
