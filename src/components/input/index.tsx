import * as S from "./styles";
import { TextFieldProps, Typography } from "@mui/material";

export type Props = TextFieldProps & {
  errorMessage?: string;
};

export const Input: React.FC<Props> = ({ errorMessage, ...rest }) => {
  return (
    <>
      <S.Input fullWidth size="small" variant="filled" {...rest}></S.Input>
      {errorMessage && <Typography color={"error"}>{errorMessage}</Typography>}
    </>
  );
};
