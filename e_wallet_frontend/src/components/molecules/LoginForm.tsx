import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  CardHeader,
} from "@mui/material";
import ButtonComponent from "../atoms/Button";
import { loginUser } from "../../api/UserApi";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { LoginData } from "../../interfaces/User/UserInterface";
import { useAppState } from "../../provider/AppContext";

const LoginForm = () => {
  const { setShowRegisterForm, setUserLogin, setRenderTable, renderTable } = useAppState();

  const { mutate, isLoading, isError, error } = useMutation(loginUser, {
    onSuccess: (response) => {
      if (response?.data?.message) {
        setUserLogin(response.data.data.id);
        setRenderTable(!renderTable);
        alert("Login success!");
      }
    },
    onError: (error) => {
      console.error("Something's Wrong:", error);
      alert("Wrong password/email!");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    const objUser = {
      email: data.email,
      password: data.password,
    };
    mutate(objUser);
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "30vw", boxShadow: 3 }}>
        <CardHeader title="Login Form" sx={{ textAlign: "center" }} />
        <CardContent
          component="form"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Typography gutterBottom variant="h6" component="div">
            Email
          </Typography>
          <TextField
            fullWidth
            id="email"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
            margin="normal"
            type="text"
          />
          <Typography gutterBottom variant="h6" component="div">
            Password
          </Typography>
          <TextField
            fullWidth
            id="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
            margin="normal"
            type="password"
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <ButtonComponent
              label={"Register"}
              variant={"outlined"}
              onClick={() => setShowRegisterForm(true)}
              type={"button"}
              sx={{ mr: 1 }}
            />
            <ButtonComponent
              label={"Login"}
              color={"primary"}
              variant={"contained"}
              type={"submit"}
              sx={{ mr: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
