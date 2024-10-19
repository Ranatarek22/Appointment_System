import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AppointmentContext } from "../../context/AppointmentProvider";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TableForMaintainer = () => {
  const { t, i18n } = useTranslation(); // Use this hook to get translations
  const { appointments, addAppointment } = useContext(AppointmentContext);
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    from_time: "",
    to_time: "",
    slots: "",
    active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedFromTime = `${formData.from_time}:00Z`;
    const formattedToTime = `${formData.to_time}:00Z`;

    const appointmentData = {
      company: +auth.company,
      from_time: formattedFromTime,
      to_time: formattedToTime,
      slots: +formData.slots,
      active: formData.active,
    };

    try {
      await addAppointment(appointmentData);

      setFormData({
        from_time: "",
        to_time: "",
        slots: "",
        active: false,
      });

      handleClose();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="">
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              {t("addToSchedule")}
            </Typography>

            <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
              <TextField
                label={t("startTime")}
                name="from_time"
                type="datetime-local"
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.from_time}
                onChange={handleChange}
              />

              <TextField
                label={t("endTime")}
                name="to_time"
                type="datetime-local"
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.to_time}
                onChange={handleChange}
              />

              <TextField
                label={t("slots")}
                name="slots"
                type="number"
                fullWidth
                required
                margin="normal"
                value={formData.slots}
                onChange={handleChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                }
                label="Active"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "20px" }}
              >
                {t("add")}
              </Button>
            </form>
          </Box>
        </Modal>
      </div>

      <div className="max-w-4xl  w-[100%] shadow-lg rounded-lg border mt-[10%] border-gray-200 bg-white mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{t("scheduleTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appointments.map((appointment, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
                <h3 className="text-xl font-semibold mt-1">
                  {new Date(appointment.from_time).toLocaleString(
                    i18n.language,
                    {
                      weekday: "long",
                    }
                  )}
                </h3>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-semibold">{t("date")} </span>
                  {new Date(appointment.from_time).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("startTime")} </span>
                  {new Date(appointment.from_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("endTime")} </span>
                  {new Date(appointment.to_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{t("slots")} </span>
                  {appointment.slots}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <motion.button
            className="border border-gray-400 text-gray-600 px-4 py-2 rounded-lg flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={handleOpen}
          >
            <span className="mr-2">+</span> {t("addDay")}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TableForMaintainer;
