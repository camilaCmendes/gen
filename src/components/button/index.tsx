import { ButtonProps } from "@mui/material";
import * as S from "./styles";

type Props = ButtonProps;

export const Button: React.FC<Props> = ({ variant = "contained", ...rest }) => {
  return <S.Button fullWidth variant={variant} {...rest} />;
};
