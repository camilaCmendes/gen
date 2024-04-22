import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  if (user?.id?.length === 0) navigate("/login");

  const firstName = user ? user?.name?.split(" ")[0] : "";
  return (
    <S.Container>
      <S.ContainerPageOptions>
        <img src={logo} alt="logo" />
        <S.PageLink to="/">
          <S.Text>Home</S.Text>
          <AddIcon color="primary" />
        </S.PageLink>

        <S.PageLink to="/profile">
          <S.Text>Perfil</S.Text>
          <AddIcon color="primary" />
        </S.PageLink>
      </S.ContainerPageOptions>

      <S.ContainerPageOptions>
        <S.Text>
          Olá, <span>{firstName}</span>
        </S.Text>
        <IconButton onClick={handleLogout}>
          <S.Logout />
        </IconButton>
      </S.ContainerPageOptions>
    </S.Container>
  );
};
