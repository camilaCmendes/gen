import { Typography, styled } from "@mui/material";

export const Text = styled(Typography)<{ isTitle?: boolean }>(
  ({ theme, isTitle }) => ({
    color: isTitle ? theme.palette.common.white : theme.palette.grey[500],
  })
);
