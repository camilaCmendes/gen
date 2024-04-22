import { styled } from "@mui/material/styles";
import { TextField, TextFieldProps } from "@mui/material";

export const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  ".MuiInputBase-root": {
    backgroundColor: theme.palette.grey[100],
  },
  "& input": {
    color: theme.palette.grey[400],
  },
  "& input:disabled": {
    color: theme.palette.grey[300],
  },
  "& input::placeholder": {
    color: theme.palette.grey[200],
  },
  "& input:focus": {
    color: theme.palette.grey[400],
  },
}));
