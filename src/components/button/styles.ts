import { Button as MuiButton, ButtonProps, styled } from "@mui/material";

export const Button = styled(MuiButton)<ButtonProps>(() => ({
  fontWeight: "bold",
  height: "3rem",
}));
