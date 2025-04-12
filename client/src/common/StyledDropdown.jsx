import React, { useState } from "react";
import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

const StyledDropdown = ({
  title,
  placeholder,
  options,
  value,
  onChange,
  textColor = "#222222",
}) => {
  return (
    <div className="flex flex-col w-full">
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "16px",
          color: "#222222",
          marginBottom: "8px",
        }}
      >
        {title}
      </Typography>
      <FormControl fullWidth variant="outlined">
        <Select
          displayEmpty
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              style={{
                height: 48,
                borderRadius: 10,
                color: textColor,
              }}
            />
          }
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: "#BCBCBC" }}>{placeholder}</span>;
            }
            return selected;
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default StyledDropdown;
