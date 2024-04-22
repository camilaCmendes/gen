import { AppBar, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Container = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  flexDirection: "row",
  height: "8rem",
  paddingLeft: "calc((100vw - 82.5rem) / 2)",
  paddingRight: "calc((100vw - 82.5rem) / 2)",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  "& span": {
    color: theme.palette.primary.main,
  },
  alignContent: "center",
}));

export const ContainerPageOptions = styled("div")(() => ({
  display: "flex",
  gap: "3rem",
}));

export const PageLink = styled(Link)(() => ({
  display: "flex",
  cursor: "pointer",
  textDecoration: "none",
  alignItems: "center",
}));

export const Logout = styled(LogoutIcon)(({ theme }) => ({
  color: theme.palette.common.black,
}));
