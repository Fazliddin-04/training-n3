import { OutlinedInput } from "@mui/material";

export default function InputV2({ ...props }) {
  return (
    <OutlinedInput
      fullWidth
      sx={{
        input: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          height: "32px",
        },
        borderRadius: "0.375rem",
        paddingLeft: "8px",
        backgroundColor: "background.default",
        "& fieldset": {
          borderColor: "rgb(229, 233, 235)",
        },
        "&:hover fieldset": {
          borderColor: "var(--primary-color) !important",
        },
      }}
      {...props}
    />
  );
}
