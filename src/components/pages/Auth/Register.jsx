import React from "react";
import Navbar from "../../navigation/Navbar";
import RegisterForm from "../../forms/registerForm";

const Register = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <RegisterForm />
    </div>
  );
};

export default Register;
