import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface RadioBtnProps {
  value: { value: string; index: number };
  handleClick: (index: number) => void;
  index: number;
}

const RadioBtn: React.FC<RadioBtnProps> = ({ value, handleClick, index }) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={value.value === "" ? "" : value.value}
          control={
            <Radio
              onClick={() => handleClick(index)}
              checked={value.index === index}
              sx={{ color: "#e4002b !important" }}
            />
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioBtn;
