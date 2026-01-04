import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeliveryAddressProps {
  addressValue: string;
  setAddressValue: (value: string) => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ addressValue, setAddressValue }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value);
  };
  const { t } = useTranslation();
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
      <div className="delivery-address">
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
      </div>
    </div>
  );
};

export default DeliveryAddress;
