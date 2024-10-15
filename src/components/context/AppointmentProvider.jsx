import React, { createContext, useState, useEffect } from "react";
import { apiInstance } from "../../axios";
import useAuth from "../../hooks/useAuth";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!auth.role || auth.role === "driver") {
        console.log(
          "User is not maintainer authenticated Skipping API for appointment."
        );
        return;
      }

      console.log("Company ID:", auth.company);

      try {
        const response = await apiInstance.get(
          `/reservations/appointments/companies/${auth.company}/`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        console.log(response.data.appointments);

        if (Array.isArray(response.data.appointments)) {
          setAppointments(response.data.appointments);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [auth.company, auth.accessToken, auth.role]);

  const addAppointment = async (newAppointment) => {
    try {
      const response = await apiInstance.post(
        "/reservations/appointments/create/",
        newAppointment,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

   
      setAppointments((prevAppointments) => [
        ...prevAppointments,
        response.data, 
      ]);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

