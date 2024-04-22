import { Grid, alpha, styled } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
  marginBottom: "2rem",
  marginLeft: `calc((100vw - 82.5rem)/2)`,
  marginRight: "calc((100vw - 82.5rem)/2)",
}));

export const Row = styled(Grid)<{ isTitle?: boolean }>(
  ({ theme, isTitle }) => ({
    borderWidth: "1px",
    borderColor: theme.palette.grey[100],
    borderStyle: "solid",
    backgroundColor: isTitle ? theme.palette.common.black : "transparent",
    "&:hover": {
      backgroundColor: isTitle
        ? theme.palette.common.black
        : alpha(theme.palette.primary.main, 0.5),
    },
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: "0.5rem",
    height: "3.5rem",
  })
);
