import React from "react";
import {Button, Grid, TextField} from "@mui/material";
import Tags from "../commons/Tags";
import {toast} from "react-toastify";
import locationContext from "../../context/locationContext";
import {useTranslation} from "react-i18next";

const MyKfcAddLocation: React.FC = () => {
  const context = React.useContext(locationContext);
  const {
    getLocation,
    longitude,
    latitude,
    displaySections,
    setDisplaySections,
    setLocations,
    locations,
    value,
    setValue,
    tagIndex,
    setTagIndex,
    locationState,
    locationId,
  } = context;
  const [userEmail, setUserEmail] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const u = JSON.parse(localStorage.getItem("user") || "{}");
        setUserEmail(u?.userInfo?.email || "");
      } catch {
        setUserEmail("");
      }
    }
  }, []);

  // handle when clicked on cancel button
  const handleCancel = () => {
    getLocation();
    setDisplaySections({
      first: "none",
      second: "flex",
    });
  };

  const { t } = useTranslation();

  // handle when clicked on done button
  const handleDone = async () => {
    if (tagIndex === null) {
      toast.warning("Please Select A Tag");
      return;
    } else if (value === "") {
      toast.warning("Please Type House No.");
      return;
    }
    setDisplaySections({
      first: "none",
      second: "flex",
    });
    setLocations(
      locations.concat({
        lat: latitude,
        lng: longitude,
        email: userEmail,
        tag: tagIndex,
        street: value,
      })
    );
    setValue("");
    setTagIndex(null);
  };

  // handle when house number value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const tags = [
    {
      tag: t("home"),
    },
    {
      tag: t("office"),
    },
    {
      tag: t("partner"),
    },
  ];

  // handle when clicked on any tag
  const handleClick = (index: number) => {
    setTagIndex(index);
  };

  return (
    <>
      <Grid sx={{ display: displaySections.first }}>
        <TextField
          id="filled-basic"
          label="Address"
          variant="filled"
          required
          sx={{
            backgroundColor: "rgb(52, 52, 52)",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            fontWeight: "bolder",
            width: "100%",
            paddingRight: "0",
            marginTop: "16px",
          }}
          inputProps={{ className: "floatingInput" }}
          InputLabelProps={{
            className: "floatingLabel",
          }}
          color="error"
          name="field"
          value={value}
          onChange={handleChange}
        />
      </Grid>
      <Grid sx={{ display: displaySections.first }}>
        <div style={{ width: "100%" }}>
          <TextField
            id="filled-basic"
            label="House / Street No."
            variant="filled"
            required
            sx={{
              backgroundColor: "rgb(52, 52, 52)",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              fontWeight: "bolder",
              width: "100%",
              paddingRight: "0",
              marginTop: "16px",
            }}
            inputProps={{ className: "floatingInput" }}
            InputLabelProps={{
              className: "floatingLabel",
            }}
            color="error"
            name="field"
            value={value}
            onChange={handleChange}
          />
        </div>
      </Grid>

      <Grid sx={{ display: displaySections.first, justifyContent: "flex-end" }}>
        <Button
          sx={{
            borderColor: "white !important",
            color: "white !important",
            borderRadius: "8px",
            padding: ".7rem 2.6rem",
          }}
          variant="outlined"
          onClick={handleCancel}
        >
          {t("cancel")}
        </Button>
        <Button
          sx={{
            borderColor: "white !important",
            color: "white !important",
            borderRadius: "8px",
            padding: ".8rem 2.6rem",
            backgroundColor: "#e4002b !important",
            margin: "0 1rem",
          }}
          variant="contained"
          onClick={handleDone}
        >
          {t("save")}
        </Button>
      </Grid>
    </>
  );
};

export default MyKfcAddLocation;
