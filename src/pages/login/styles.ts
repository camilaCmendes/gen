import LoginBackground from "../../assets/login_background.jpg";
import { Typography, styled, alpha } from "@mui/material";

export const BackgroundContainer = styled("div")(() => ({
  backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.5), rgba(51, 51, 51, 0.5)), url(${LoginBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const LoginContainer = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: alpha(theme.palette.grey[400], 0.5),
  width: "30rem",
  height: "33.75rem",
  borderRadius: "0.25rem",
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontSize: "2rem",
}));
