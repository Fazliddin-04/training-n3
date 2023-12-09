import { Box } from "@mui/material";

export default function Footer({ children, props }) {
  return (
    <Box
      position="sticky"
      bottom={0}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      px={2}
      py={1}
      gap={1}
      bgcolor="background.paper"
      borderTop="1px solid rgb(229, 231, 235)"
      zIndex={10}
      {...props}
    >
      {children}
    </Box>
  );
}
