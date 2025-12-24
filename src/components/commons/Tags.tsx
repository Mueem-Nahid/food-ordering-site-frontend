import React from "react";
import { Button } from "@mui/material";
import { Done } from "@mui/icons-material";

interface TagsProps {
  label: string;
  handleClick: (index: number) => void;
  variant: "text" | "outlined" | "contained";
  index: number;
}

const Tags: React.FC<TagsProps> = ({ label, handleClick, variant, index }) => {
  return (
    <>
      <Button
        className="tags"
        variant={variant}
        onClick={() => handleClick(index)}
        color="error"
      >
        {variant === "contained" ? <Done fontSize="small" /> : ""}
        {label}
      </Button>
    </>
  );
};

export default Tags;
