import { Grid } from "@mui/material";
import * as S from "./styles";

type Props = {
  handleClickedCardUser?: () => void;
  name?: string;
  role?: string;
  team?: string;
  isTitle?: boolean;
};

export const CardUser: React.FC<Props> = ({
  name,
  role,
  team,
  isTitle,
  handleClickedCardUser,
}) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      onClick={handleClickedCardUser}
      alignItems={"center"}
    >
      <Grid item xs={4}>
        <S.Text isTitle={isTitle} fontWeight={"bold"}>
          {name}
        </S.Text>
      </Grid>
      <Grid item xs={4}>
        <S.Text isTitle={isTitle}>{role}</S.Text>
      </Grid>
      <Grid item xs={4}>
        <S.Text isTitle={isTitle}>{team}</S.Text>
      </Grid>
    </Grid>
  );
};
