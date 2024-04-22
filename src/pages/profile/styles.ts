import { Typography, styled } from "@mui/material";

export const Container = styled("div")(({ theme }) => ({
  marginTop: "2rem",
  width: "37.5rem",
  marginLeft: "calc((100vw - 37.5rem)/2)",
  marginRight: "calc((100vw - 37.5rem)/2)",
  backgroundColor: theme.palette.grey[50],
  borderRadius: "0.25rem",
  padding: "3rem",
}));

export const Text = styled(Typography)<{ istitle?: boolean }>(
  ({ istitle }) => ({
    fontSize: istitle ? "1.5rem" : "1rem",
    fontWeight: "bold",
  })
);
