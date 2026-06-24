import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (val: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, value, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const { t } = useTranslation();

  React.useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>{label}</h3>
      {editMode ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <TextField
            size="small"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            variant="outlined"
            sx={{ background: "white", borderRadius: 1, minWidth: 180 }}
          />
          <IconButton
            aria-label={t("saveAria")}
            color="primary"
            onClick={() => {
              onSave(tempValue);
              setEditMode(false);
            }}
            size="small"
          >
            <SaveIcon sx={{ color: "#ff741f" }} />
          </IconButton>
          <IconButton
            aria-label={t("cancelAria")}
            color="secondary"
            onClick={() => {
              setTempValue(value);
              setEditMode(false);
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Poppins" }}>{value || "-"}</span>
          <IconButton
            aria-label={t("editAria")}
            onClick={() => setEditMode(true)}
            size="small"
          >
            <EditIcon sx={{ color: "#ff741f" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default EditableField;