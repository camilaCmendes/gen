import AddIcon from "@mui/icons-material/Add";
import { Grid, Pagination, Stack } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, CardUser, Input, Modal } from "../../components";
import { UserDTO } from "../../dtos/userDTO";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import {
  storageUserListAddNew,
  storageUserListGet,
  storageUserListRemove,
  storageUserListUpdate,
  storageUserVerifyEmail,
} from "../../storages/storageUserList";
import * as S from "./styles";

export const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<UserDTO>({
    id: "",
    userAccess: "USER",
    name: "",
    role: "",
    team: "",
    email: "",
    password: "",
  });
  const userSelected = useRef<UserDTO>({} as UserDTO);
  const list = storageUserListGet();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleInputChange =
    (field: keyof typeof filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [field]: event.target.value }));
      setCurrentPage(1);
    };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFilters({
      id: "",
      userAccess: "USER",
      name: "",
      role: "",
      team: "",
      email: "",
      password: "",
    });
  };

  const handleClickedCardUser = (user: UserDTO) => {
    userSelected.current = user;
    handleOpenModal();
  };

  const createNewUser = () => {
    userSelected.current = {} as UserDTO;
    handleOpenModal();
  };

  const handleUpdateUser = (
    userData: UserDTO,
    user: { name: string; role: string; team: string; email: string }
  ) => {
    const emailInUse = storageUserVerifyEmail(user.email);
    if (emailInUse) {
      showToast("Email já está cadastrado", "error");
      return;
    }
    if ("name" in userData) {
      const updateUser = { ...userData, ...user };
      storageUserListUpdate(updateUser);
    } else {
      const newUser: UserDTO = {
        ...user,
        email: user.name.split(" ")[0].toLocaleLowerCase() + "@email.com",
        id: uuidv4(),
        password: "123456",
        userAccess: "USER",
      };
      storageUserListAddNew(newUser);
    }
    showToast("Lista de usuários atualizada!", "success");
  };

  const handleRemoveUser = (userRemove: UserDTO) => {
    if (user.id === userRemove.id) {
      handleClose();
      showToast("Não é possível se remover da lista.", "warning");
      return;
    }
    storageUserListRemove(userRemove);
    showToast("Usuário removido com sucesso.", "success");
    handleClose();
  };

  const filteredUsers = useMemo(() => {
    return list
      .filter(
        (user) =>
          user.team.toLowerCase().includes(filters.team.toLowerCase()) &&
          user.role.toLowerCase().includes(filters.role.toLowerCase()) &&
          user.name.toLowerCase().includes(filters.name.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [filters, list, handleRemoveUser]);

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredUsers]);

  if (!user) navigate("/login");

  return (
    <>
      <S.Container>
        <Grid
          container
          justifyContent={"space-between"}
          style={{ marginBottom: "1rem" }}
        >
          <Grid item xs={3.5}>
            <Input
              label="Nome"
              onChange={handleInputChange("name")}
              value={filters.name}
            />
          </Grid>
          <Grid item xs={3.5}>
            <Input
              label="Especialidade"
              onChange={handleInputChange("role")}
              value={filters.role}
            />
          </Grid>
          <Grid item xs={3.5}>
            <Input
              label="Time"
              onChange={handleInputChange("team")}
              value={filters.team}
            />
          </Grid>
          {user.userAccess === "ADMIN" && (
            <Grid item xs={1}>
              <Button endIcon={<AddIcon />} onClick={createNewUser}>
                Criar
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent={"start"}
          style={{ height: "28rem", marginBottom: "1rem" }}
        >
          <S.Row item isTitle>
            <CardUser isTitle name="Nome" role="Especialidade" team="Time" />
          </S.Row>
          {currentUsers.map((element) => (
            <S.Row item key={element.id}>
              <CardUser
                handleClickedCardUser={() => {
                  if (user.userAccess === "USER") return;
                  handleClickedCardUser(element);
                }}
                name={element.name}
                role={element.role}
                team={element.team}
              />
            </S.Row>
          ))}
        </Grid>
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Stack>
      </S.Container>
      <Modal
        open={open}
        handleClose={handleClose}
        userData={userSelected.current}
        handleUpdateUser={handleUpdateUser}
        handleRemoveUser={handleRemoveUser}
      />
    </>
  );
};
