import React, { useState } from "react";
import { TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import {pickupAddresses} from "@/constants/constants";

interface DeliveryAddressProps {
  addressValue: string;
  setAddressValue: (value: string) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ addressValue, setAddressValue }) => {
  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [pickup, setPickup] = useState(pickupAddresses[0]);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "delivery" | "pickup";
    setMode(value);
    if (value === "pickup") {
      setAddressValue(pickup);
    } else {
      setAddressValue("");
    }
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value);
    setAddressValue(e.target.value);
  };

  return (
    <div className="checkout-item" style={{ marginBottom: "2rem" }}>
      <div
        className="delivery-head"
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <strong>{t("deliveryAddress")}</strong>
      </div>
      <FormControl component="fieldset" style={{ marginBottom: "1rem" }}>
        <FormLabel component="legend" style={{ color: "white" }}>
          {t("chooseAddressType")}
        </FormLabel>
        <RadioGroup
          row
          value={mode}
          onChange={handleModeChange}
          name="address-mode"
        >
          <FormControlLabel
            value="delivery"
            control={<Radio sx={{ color: "#ff741f", "&.Mui-checked": { color: "#ff741f" } }} />}
            label={t("delivery")}
          />
          <FormControlLabel
            value="pickup"
            control={<Radio sx={{ color: "#ff741f", "&.Mui-checked": { color: "#ff741f" } }} />}
            label={t("pickup")}
          />
        </RadioGroup>
      </FormControl>
      <div className="delivery-address">
        {mode === "delivery" ? (
          <TextField
            id="delivery-address"
            label={t("deliveryAddress")}
            variant="filled"
            value={addressValue}
            onChange={handleChange}
            required={true}
            type="text"
            sx={{
              backgroundColor: "#343434",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              fontWeight: "bolder",
              marginBottom: "1rem",
              paddingRight: "0",
              width: "99%",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .Mui-disabled": { color: "white" }
            }}
            inputProps={{ className: "floatingInput" }}
            InputLabelProps={{
              className: "floatingLabel",
              style: { color: "white" }
            }}
            color="error"
          />
        ) : (
          <FormControl fullWidth>
            <FormLabel style={{ color: "white", marginBottom: 8 }}>
              {t("pickupAddress")}
            </FormLabel>
            <RadioGroup
              value={pickup}
              onChange={handlePickupChange}
              name="pickup-address"
            >
              {pickupAddresses.map(addr => (
                <FormControlLabel
                  key={addr}
                  value={addr}
                  control={<Radio sx={{ color: "#ff741f", "&.Mui-checked": { color: "#ff741f" } }} />}
                  label={<span style={{ color: "white" }}>{addr}</span>}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </div>
    </div>
  );
};

export default DeliveryAddress;
