import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { apiInstance } from "../../axios";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const LoginForm = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      setEmail(values.email);
      setPassword(values.password);

      try {
        const response = await apiInstance.post("/users/login/", values);

        console.log("Response:", response.data);

        setSnackbarMessage("Registration successful!");
        setOpenSnackbar(true);
        const accessToken = response?.data?.access;
        const refreshToken = response?.data?.refresh;
        const role = response?.data?.role;
        const isAuthenticated = response.data.isAuthenticated;
        const username = response?.data?.username;
        const company = response?.data?.company;
        console.log(isAuthenticated);

        // setAuth({ email, password, accessToken, role, refreshToken, isAuth });
        setAuth((prevAuth) => ({
          ...prevAuth,
          isAuthenticated,
          email: values.email,
          password: values.password,
          accessToken,
          refreshToken,
          role,
          username,
          company,
        }));
        console.log("Updated auth:", {
          role,
          accessToken,
          refreshToken,
          isAuthenticated,
        });
        console.log(role);
        console.log(auth.refreshToken);
        if (role === "driver") {
          navigate("/driver");
        } else if (role === "maintainer") {
          navigate("/maintainer");
        }
        formik.resetForm();
        // navigate(from, { replace: true });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setSnackbarMessage(
            error.response.data.detail || "Login failed. Please try again."
          );
        } else {
          setSnackbarMessage("An error occurred. Please try again.");
        }
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        تسجيل الدخول
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="الحساب"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="كلمة المرور"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          تسجيل الدخول
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        autoHideDuration={4000}
      />
    </Container>
  );
};

export default LoginForm;
