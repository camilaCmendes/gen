import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "..";
import { UserDTO } from "../../dtos/userDTO";
import * as S from "./styles";

type Props = DialogProps & {
  open: boolean;
  handleClose: () => void;
  userData: UserDTO;
  handleUpdateUser: (
    userData: UserDTO,
    user: { name: string; role: string; team: string }
  ) => void;
  handleRemoveUser: (user: UserDTO) => void;
};

const userSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  role: yup.string().required("Informe a especialidade."),
  team: yup.string().required("Informe o time."),
  email: yup.string().required("Informe o email."),
});

export const Modal: React.FC<Props> = ({
  open,
  userData,
  handleClose,
  handleUpdateUser,
  handleRemoveUser,
  ...rest
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: userData?.name || "",
      role: userData?.role || "",
      team: userData?.team || "",
      email: userData?.email || "",
    },
  });

  const [isEditingDisabled, setIsEditingDisabled] = useState(true);

  const handleEdit = (user: {
    name: string;
    role: string;
    team: string;
    email: string;
  }) => {
    handleUpdateUser(userData, user);
    handleModalCLose();
    return;
  };

  useEffect(() => {
    reset({
      name: userData?.name || "",
      role: userData?.role || "",
      team: userData?.team || "",
      email: userData?.email || "",
    });
    setIsEditingDisabled("name" in userData);
  }, [userData, reset, open]);

  const handleModalCLose = () => {
    setIsEditingDisabled(true);
    handleClose();
  };

  return (
    <S.Modal open={open} onClose={handleModalCLose} {...rest}>
      <DialogTitle>
        <S.Text>Detalhes usuário</S.Text>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          direction={"column"}
          alignItems={"stretch"}
          rowSpacing={2}
        >
          <Grid item>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nome"
                  disabled={isEditingDisabled}
                  value={value}
                  onChange={onChange}
                  error={!!errors.name?.message}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Especialidade"
                  disabled={isEditingDisabled}
                  value={value}
                  onChange={onChange}
                  error={!!errors.role?.message}
                  errorMessage={errors.role?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="team"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Time"
                  disabled={isEditingDisabled}
                  value={value}
                  onChange={onChange}
                  error={!!errors.team?.message}
                  errorMessage={errors.team?.message}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="E-mail"
                  disabled={isEditingDisabled}
                  value={value}
                  onChange={onChange}
                  error={!!errors.email?.message}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent={"flex-end"} columnGap={2}>
          {isEditingDisabled ? (
            <Grid item xs={3}>
              <Button onClick={() => handleRemoveUser(userData)} color="error">
                Remover
              </Button>
            </Grid>
          ) : (
            <Grid item xs={3}>
              <Button onClick={handleModalCLose} color="error">
                Cancelar
              </Button>
            </Grid>
          )}
          <Grid item xs={3}>
            {isEditingDisabled ? (
              <Button onClick={() => setIsEditingDisabled(false)}>
                Editar
              </Button>
            ) : (
              <Button onClick={handleSubmit(handleEdit)}>Salvar</Button>
            )}
          </Grid>
        </Grid>
      </DialogActions>
    </S.Modal>
  );
};
