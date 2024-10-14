import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiInstance } from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const AllMaintainers = () => {
  const [maintainers, setMaintainers] = useState([]);
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchMaintainers = async () => {
      try {
        const response = await apiInstance.get(
          "/reservations/appointments/companies/",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setMaintainers(response.data);
      } catch (error) {
        console.error("Error fetching maintainers:", error);
      }
    };

    fetchMaintainers();
  }, [auth.accessToken]);

  //   const reserveAppointment = async (appointmentId) => {
  //     try {
  //       const response = await apiInstance.post(
  //         `/reservations/appointments/${appointmentId}/reserve/`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${auth.accessToken}`,
  //           },
  //         }
  //       );
  //       const updatedSlotsLeft = response.data.slots_left;
  //       console.log(updatedSlotsLeft + " " + appointmentId);

  //       setMaintainers((prevMaintainers) =>
  //         prevMaintainers.map((maintainer) => ({
  //           ...maintainer,
  //           appointments: maintainer.appointments.map((appointment) =>
  //             appointment.id === appointmentId
  //               ? { ...appointment, slots_left: updatedSlotsLeft }
  //               : appointment
  //           ),
  //         }))
  //       );
  //       setOpenModal(true);
  //     } catch (error) {
  //       console.error("Error reserving appointment:", error);
  //       alert("Error reserving the appointment. Please try again.");
  //     }
  //   };
  const reserveAppointment = async (appointmentId) => {
    try {
      const response = await apiInstance.post(
        `/reservations/appointments/${appointmentId}/reserve/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      console.log("Response from server:", response.data); 

      const updatedSlotsLeft = response.data.slots_left; 
      setMaintainers((prevMaintainers) =>
        prevMaintainers.map((maintainer) => ({
          ...maintainer,
          appointments: maintainer.appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, slots: updatedSlotsLeft } 
              : appointment
          ),
        }))
      );
      setOpenModal(true);
    } catch (error) {
      console.error("Error reserving appointment:", error);
      alert("Error reserving the appointment. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      {maintainers.length === 0 ? (
        <p>No maintainers available</p>
      ) : (
        maintainers.map((maintainer) => (
          <Card key={maintainer.id} className="w-[80%] mx-auto p-4">
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar
                  src={`https://avatars.dicebear.com/api/personas/${maintainer.name}.svg`}
                  alt={maintainer.name}
                />
                <div>
                  <Typography variant="h6">{maintainer.name}</Typography>
                </div>
              </div>
              <Divider className="my-2" />
              {maintainer.appointments.length > 0 ? (
                <div className="flex gap-4 overflow-x-scroll w-full">
                  <div className="flex flex-nowrap gap-4">
                    {maintainer.appointments
                      .filter((appointment) => appointment.slots > 0) 
                      .map((appointment) => (
                        <Card
                          key={appointment.id}
                          className="w-[300px] p-4 flex-shrink-0 transition-shadow hover:shadow-lg"
                        >
                          <CardContent>
                            <Typography variant="body2">
                              <div>
                                {new Date(
                                  appointment.from_time
                                ).toLocaleDateString("ar-EG", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </div>
                              <strong>من </strong>
                              <div>
                                {new Date(
                                  appointment.from_time
                                ).toLocaleTimeString("ar-EG")}
                              </div>
                            </Typography>
                            <Typography variant="body2">
                              <strong>الى </strong>
                              <div>
                                {new Date(
                                  appointment.to_time
                                ).toLocaleTimeString("ar-EG")}
                              </div>
                            </Typography>
                            <Typography variant="body2">
                              <strong>عدد الفترات </strong> {appointment.slots}
                            </Typography>
                            <Typography variant="body2">
                              <strong>عدد الفترات المتاحة </strong>{" "}
                              {appointment.slots_left}
                            </Typography>
                            <Typography variant="body2">
                              <strong>الحاله </strong>
                              <CheckCircleIcon
                                style={{
                                  color: appointment.active ? "green" : "red",
                                }}
                              />{" "}
                            </Typography>
                            <Divider className="my-2" />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => reserveAppointment(appointment.id)}
                              disabled={!appointment.active}
                              className="md:w-full"
                            >
                              احجز
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  لا توجد مواعيد متاحه
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>نجح الحجز</DialogTitle>
        <DialogContent className="flex flex-col items-center">
          <CheckCircleOutlineIcon style={{ fontSize: 50, color: "green" }} />
          <Typography>لقد قمت بحجز الموعد بنجاح!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllMaintainers;
