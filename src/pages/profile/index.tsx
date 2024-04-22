import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import * as S from "./styles";

type FormDataProps = {
  previousPassword: string;
  newPassword: string;
};

const changePasswordSchema = yup.object({
  previousPassword: yup.string().required("Informe sua antiga senha"),
  newPassword: yup
    .string()
    .required("Informe a nova senha.")
    .min(6, "A senha deve ter pelo menos 6 digitos."),
});

export const Profile: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      previousPassword: "",
      newPassword: "",
    },
  });
  const navigate = useNavigate();
  const { user, changePassword } = useAuth();
  const { showToast } = useToast();

  const handleNewPassword = (data: FormDataProps) => {
    if (user.password === data.previousPassword) {
      changePassword(user, data.newPassword);
      showToast("Senha atualizada com sucesso!", "success");
    } else {
      showToast("Senha antiga está incorreta", "error");
    }
    reset({
      previousPassword: "",
      newPassword: "",
    });
  };

  if (!user) navigate("/login");

  return (
    <S.Container>
      <Grid container direction={"column"} rowGap={2}>
        <Grid item>
          <S.Text istitle>{user?.name}</S.Text>
        </Grid>
        <Grid item>
          <S.Text>Especialidade: {user?.role}</S.Text>
        </Grid>
        <Grid item>
          <S.Text>Time: {user?.team}</S.Text>
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="previousPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Senha Antiga"
                onChange={onChange}
                value={value}
                error={!!errors.previousPassword?.message}
                errorMessage={errors.previousPassword?.message}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nova Senha"
                onChange={onChange}
                value={value}
                error={!!errors.newPassword?.message}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit(handleNewPassword)}>Atualizar</Button>
        </Grid>
      </Grid>
    </S.Container>
  );
};
