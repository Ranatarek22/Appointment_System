import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next"; 
import useAuth from "../../../hooks/useAuth";
import { apiInstance } from "../../../axios";

const AppointmentsDriverTable = () => {
  const { t, i18n } = useTranslation(); 
  const [appointments, setAppointments] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiInstance.get(
          "/reservations/driver/appointments/",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        const data = response.data;
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);


  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const textAlign = i18n.language === "ar" ? "right" : "left";

  return (
    <TableContainer
      component={Paper}
      className=" mt-[5%]"
      style={{ direction: direction }} 
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: textAlign }}>{t("id")}</TableCell>
            <TableCell style={{ textAlign: textAlign }}>
              {t("company")}
            </TableCell>
            <TableCell style={{ textAlign: textAlign }}>{t("from")}</TableCell>
            <TableCell style={{ textAlign: textAlign }}>{t("to")}</TableCell>
            <TableCell style={{ textAlign: textAlign }}>
              {t("status")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell style={{ textAlign: textAlign }}>
                {appointment.id}
              </TableCell>
              <TableCell style={{ textAlign: textAlign }}>
                {appointment.appointment.company.name}
              </TableCell>
              <TableCell style={{ textAlign: textAlign }}>
                {new Date(appointment.appointment.from_time).toLocaleString(
                  i18n.language === "ar" ? "ar-EG" : "en-US",
                  { hour12: true }
                )}
              </TableCell>
              <TableCell style={{ textAlign: textAlign }}>
                {new Date(appointment.appointment.to_time).toLocaleString(
                  i18n.language === "ar" ? "ar-EG" : "en-US",
                  { hour12: true }
                )}
              </TableCell>
              <TableCell style={{ textAlign: textAlign }}>
                <Button
                  variant="contained"
                  color={
                    appointment.appointment.fulfilled ? "success" : "error"
                  }
                  size="small"
                >
                  {appointment.appointment.fulfilled
                    ? t("completed")
                    : t("not_completed")}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsDriverTable;
