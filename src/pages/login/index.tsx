import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Logo from "../../assets/logo.png";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { USER_LIST } from "../../mock/user.mock";
import { storageUserListGet } from "../../storages/storageUserList";
import { LIST_USERS } from "../../storages/storages";
import * as S from "./styles";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 digitos."),
});

export const Login: React.FC = () => {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (data: FormDataProps) => {
    const success = login(data.email, data.password);
    if (success) {
      navigate("/");
    } else {
      showToast("E-mail ou senha incorretos.", "error");
    }
  };

  useEffect(() => {
    const list = storageUserListGet();
    if (list.length === 0) {
      localStorage.setItem(LIST_USERS, JSON.stringify(USER_LIST));
    }
  }, []);

  return (
    <S.BackgroundContainer>
      <S.LoginContainer>
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems={"stretch"}
          sx={{ padding: "20px" }}
        >
          <Grid
            container
            item
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ marginBottom: "20px" }}
            gap={2}
          >
            <img src={Logo} alt="logo" />
            <S.Text>Acesse sua conta</S.Text>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            rowSpacing={5}
          >
            <Grid item>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="E-mail"
                    onChange={onChange}
                    value={value}
                    error={!!errors.email?.message}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Senha"
                    onChange={onChange}
                    value={value}
                    type="password"
                    error={!!errors.password?.message}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button onClick={handleSubmit(handleLogin)}>Acessar</Button>
            </Grid>
          </Grid>
        </Grid>
      </S.LoginContainer>
    </S.BackgroundContainer>
  );
};
