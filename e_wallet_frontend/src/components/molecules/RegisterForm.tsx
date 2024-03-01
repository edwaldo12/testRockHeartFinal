import {
  Box,
  Card,
  Button,
  CardContent,
  TextField,
  Typography,
  CardHeader,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { RegisterData } from "../../interfaces/User/UserInterface";
import { registerUser } from "../../api/UserApi";
import { useAppState } from "../../provider/AppContext";
import ButtonComponent from "../atoms/Button";

const RegisterForm = () => {
  const { setShowRegisterForm } = useAppState();

  const { mutate, isLoading, isError, error } = useMutation(registerUser, {
    onSuccess: (response) => {
      alert("Registration successful!");
      setShowRegisterForm(false);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert("Registration failed!");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onSubmit = (data: RegisterData) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "30vw", boxShadow: 3 }}>
        <CardHeader title="Register" sx={{ textAlign: "center" }} />
        <CardContent
          component="form"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Typography gutterBottom variant="h6" component="div">
            Name
          </Typography>
          <TextField
            fullWidth
            id="name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="normal"
            type="text"
          />
          <Typography gutterBottom variant="h6" component="div">
            Email
          </Typography>
          <TextField
            fullWidth
            id="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            type="email"
          />
          <Typography gutterBottom variant="h6" component="div">
            Password
          </Typography>
          <TextField
            fullWidth
            id="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            type="password"
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <ButtonComponent
              label={"Back"}
              variant={"outlined"}
              onClick={() => setShowRegisterForm(false)}
              type={"button"}
              sx={{ mr: 1 }}
            />
            <ButtonComponent
              label={"Register"}
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

export default RegisterForm;
