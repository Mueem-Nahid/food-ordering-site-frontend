import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PhoneNumberProps {
  phoneValue: string;
  setPhoneValue: (value: string) => void;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ phoneValue, setPhoneValue }) => {
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneValue(value);

    // Australian phone validation
    // Remove spaces, dashes, parentheses
    const cleaned = value.replace(/[\s\-()]/g, "");
    // Mobile: 10 digits, starts with 04
    const isMobile = /^04\d{8}$/.test(cleaned);
    // Landline: 10 digits, starts with 02, 03, 07, 08
    const isLandline = /^(02|03|07|08)\d{8}$/.test(cleaned);
    // International: +614xxxxxxxx or +61[2,3,7,8]xxxxxxx
    const isIntlMobile = /^\+614\d{8}$/.test(cleaned);
    const isIntlLandline = /^\+61([2378])\d{8}$/.test(cleaned);

    if (
      value.length > 0 &&
      !isMobile &&
      !isLandline &&
      !isIntlMobile &&
      !isIntlLandline
    ) {
      setError("Please enter a valid Australian phone number.");
    } else {
      setError(null);
    }
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
        <strong>{t("phnNo")}</strong>
      </div>
      <div className="phone-no">
        <TextField
          id="filled-basic"
          label={t("phnNo")}
          variant="filled"
          value={phoneValue}
          onChange={handleChange}
          required={true}
          type={"tel"}
          error={!!error}
          helperText={error}
          sx={{
            backgroundColor: "#343434",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            fontWeight: "bolder",
            marginBottom: "1rem",
            paddingRight: "0",
            width: "99%",
          }}
          inputProps={{ className: "floatingInput" }}
          InputLabelProps={{
            className: "floatingLabel",
          }}
          color="error"
        />
      </div>
    </div>
  );
};

export default PhoneNumber;
