import { TextField, InputAdornment, Typography } from "@mui/material";
import React from "react";

const StyledTextField = ({
  title,
  placeholder,
  textColor = "#222222",
  value,
  multiline = false,
  startIcon,
  endIcon,
  variant = "outlined",
  onChange,
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
      <TextField
        placeholder={placeholder}
        multiline={multiline}
        minRows={multiline ? 4 : 1}
        fullWidth
        variant={variant}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : null,
          endAdornment: endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : null,
          style: {
            color: textColor,
            borderRadius: 10,
            height: multiline ? "auto" : 48,
          },
        }}
        sx={{
          "& input::placeholder": {
            color: "#BCBCBC",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#222222",
            },
          },
        }}
      />
    </div>
  );
};

export default StyledTextField;
