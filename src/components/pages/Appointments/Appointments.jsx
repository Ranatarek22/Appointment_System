import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from "@mui/material";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { apiInstance } from "../../../axios";

const Appointments = () => {
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

  return (
    <TableContainer
      component={Paper}
      className=" mt-[5%]"
      style={{ direction: "rtl" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: "right" }}>الرقم</TableCell>
            <TableCell style={{ textAlign: "right" }}>الشركة</TableCell>
            <TableCell style={{ textAlign: "right" }}>من</TableCell>
            <TableCell style={{ textAlign: "right" }}>الى</TableCell>
            <TableCell style={{ textAlign: "right" }}>الحالة</TableCell>
            <TableCell style={{ textAlign: "right" }}>الإجراءات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell style={{ textAlign: "right" }}>
                {appointment.id}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {appointment.appointment.company.name}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {new Date(appointment.appointment.from_time).toLocaleString(
                  "ar-EG",
                  { hour12: true }
                )}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                {new Date(appointment.appointment.to_time).toLocaleString(
                  "ar-EG",
                  { hour12: true }
                )}
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color={
                    appointment.appointment.fulfilled ? "success" : "error"
                  }
                  size="small"
                >
                  {appointment.appointment.fulfilled ? "مكتملة" : "غير مكتملة"}
                </Button>
              </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <Button variant="outlined">تفاصيل</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Appointments;
