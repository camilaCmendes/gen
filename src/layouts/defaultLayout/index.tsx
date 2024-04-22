import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import * as S from "./styles";

export const DefaultLayout: React.FC = () => {
  return (
    <S.LayoutContainer>
      <Header />
      <S.Space />
      <Outlet />
    </S.LayoutContainer>
  );
};
