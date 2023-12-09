import { Switch as MuiSwitch } from "@mui/material";

export default function Switch({ checked, onChange, ...props }) {
  return (
    <MuiSwitch
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
  );
}
