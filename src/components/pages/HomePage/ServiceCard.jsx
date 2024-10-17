import React from "react";
import { Tilt } from "react-tilt";
import { Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, description }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const navigateToAppoint = () => {
    if (auth.isAuthenticated) {
      navigate("/driver");
    } else {
      navigate("/login");
    }
  };

  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="bg-tertiary rounded-2xl w-full"
    >
      <div className="card flex justify-center">
        <h3>{title}</h3>
        <p>{description}</p>
        {(!auth.isAuthenticated ||
          (auth.isAuthenticated && auth.role === "driver")) && (
          <Button onClick={navigateToAppoint}>احجز</Button>
        )}
      </div>
    </Tilt>
  );
};

export default ServiceCard;
