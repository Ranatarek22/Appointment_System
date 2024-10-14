import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { object, string } from "yup";
import { apiInstance } from "../../axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const signupschema = object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    company: Yup.string().required("Company name is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      company: "",
      role: "",
    },
    validationSchema: signupschema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await apiInstance.post("/users/register/", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response:", response);
        setSnackbarMessage("Registration successful!");
        setOpenSnackbar(true);
        navigate("/login");
        formik.resetForm();
      } catch (error) {
        console.error("Error during registration:", error);
        console.error("Status Code:", error.response.status);
        if (error.response) {
          console.error("Status Code:", error.response.status);
          console.error("Data:", error.response.data);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request:", error.request);
        } else {
          console.error("Message:", error.message);
        }

        setSnackbarMessage("Registration failed. Please try again.");
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        التسجيل
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ direction: "rtl" }}>
        <TextField
          fullWidth
          margin="normal"
          label="اسم المستخدم"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
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
        <TextField
          fullWidth
          margin="normal"
          label="تأكيد كلمة المرور"
          name="confirm_password"
          type="password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="اسم الشركه"
          name="company"
          value={formik.values.company}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
        />
        <FormControl
          margin="normal"
          error={formik.touched.role && Boolean(formik.errors.role)}
        >
          <FormLabel>من انت ؟</FormLabel>
          <RadioGroup
            name="role"
            value={formik.values.role || ""}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="maintainer"
              control={<Radio />}
              label="مسؤول الصيانه"
            />
            <FormControlLabel value="driver" control={<Radio />} label="سائق" />
          </RadioGroup>
          {formik.touched.role && formik.errors.role && (
            <Typography variant="caption" color="error">
              {formik.errors.role}
            </Typography>
          )}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ marginTop: 2 }}
        >
          تسجيل
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

export default SignUpForm;
