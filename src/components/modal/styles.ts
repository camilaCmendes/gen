import { Dialog, Typography, styled } from "@mui/material";

export const Modal = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    maxWidth: "82.5rem",
    width: "100%",
  },
}));

export const Text = styled(Typography)(() => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
}));
