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
import { object } from "yup";
import { apiInstance } from "../../axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signupschema = object().shape({
    username: Yup.string().required(t("username_required")),
    email: Yup.string().email(t("email_invalid")).required(t("email_required")),
    password: Yup.string()
      .required(t("password_required"))
      .min(8, t("password_min")),
    confirm_password: Yup.string()
      .required(t("confirm_password_required"))
      .oneOf([Yup.ref("password"), null], t("passwords_must_match")),
    company: Yup.string().required(t("company_required")),
    role: Yup.string().required(t("role_required")),
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
        setSnackbarMessage(t("registration_success"));
        setOpenSnackbar(true);
        navigate("/login");
        formik.resetForm();
      } catch (error) {
        console.error("Error during registration:", error);
        setSnackbarMessage(t("registration_failed"));
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("sign_up_title")}
      </Typography>
      <form onSubmit={formik.handleSubmit} style={{ direction: "rtl" }}>
        <TextField
          fullWidth
          margin="normal"
          label={t("username_label")}
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          margin="normal"
          label={t("email_label")}
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
          label={t("password_label")}
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
          label={t("confirm_password_label")}
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
          label={t("company_label")}
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
          <FormLabel>{t("role_label")}</FormLabel>
          <RadioGroup
            name="role"
            value={formik.values.role || ""}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="maintainer"
              control={<Radio />}
              label={t("maintainer_label")}
            />
            <FormControlLabel
              value="driver"
              control={<Radio />}
              label={t("driver_label")}
            />
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
          {t("register_button")}
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

export default RegisterForm;
