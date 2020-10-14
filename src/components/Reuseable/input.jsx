import React from "react";
import { TextField } from "@material-ui/core";
export default function Input({
  name,
  value,
  label,
  type = "text",
  onChange,
  errors
}) {
  return (
    <div>
      <TextField
        fullWidth
        type={type}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        helperText={errors && <span>{errors}</span>}
      />
    </div>
  );
}
