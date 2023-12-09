import { Button as MuiButton } from "@mui/material";
import "./index.scss";

export default function Button({
  variant = "contained",
  children,
  style = {},
  ...props
}) {
  return (
    <MuiButton
      variant={variant}
      disableElevation={true}
      sx={{ borderRadius: "6px", minWidth: "fit-content", ...style }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
