import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/userDTO";
import { storageUserListFind } from "../storages/storageUserList";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
  storageUserUpdate,
} from "../storages/storageUser";
import { useNavigate } from "react-router-dom";

export type AuthContextDataProps = {
  user: UserDTO;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  changePassword: (user: UserDTO, newPassword: string) => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState({} as UserDTO);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const userFound = storageUserListFind(email, password);
    if ("email" in userFound) {
      setUser(userFound);
      storageUserSave(userFound);
      return true;
    }
    return false;
  };

  const logout = () => {
    storageUserRemove();
    setUser({} as UserDTO);
  };

  const changePassword = (user: UserDTO, newPassword: string) => {
    storageUserUpdate({ ...user, password: newPassword });
    setUser({ ...user, password: newPassword });
  };

  useEffect(() => {
    const userIsLogged = storageUserGet();

    if (userIsLogged && userIsLogged.email) {
      console.log("ENTROU");
      setUser(userIsLogged);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
