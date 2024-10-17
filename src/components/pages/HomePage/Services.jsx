import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useInView } from "react-intersection-observer";
import { apiInstance } from "../../../axios";
import { Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const fadeIn = (
  direction = "left",
  type = "spring",
  delay = 0,
  duration = 1
) => ({
  initial: {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

const textVariant = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { delay: delay, duration: 0.75 } },
});

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={fadeIn("left", "spring", delay, 0.75)}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ icon, title, description, maintainerName, delay }) => {
  const { auth } = useAuth(); // Move useAuth here
  const navigate = useNavigate(); // Move useNavigate here

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
      className="bg-tertiary rounded-2xl w-full "
    >
      <AnimatedSection delay={delay}>
        <div className="card flex justify-center">
          <div className="image">
            {/* <img src={icon} width={50} height={50} alt="services" /> */}
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          {(!auth.isAuthenticated ||
            (auth.isAuthenticated && auth.role === "driver")) && (
            <Button onClick={navigateToAppoint}>احجز</Button>
          )}
        </div>
      </AnimatedSection>
    </Tilt>
  );
};

export default function Services({ auth }) {
  const [maintainers, setMaintainers] = useState([]);

  useEffect(() => {
    const fetchMaintainers = async () => {
      try {
        const response = await apiInstance.get(
          "/reservations/appointments/companies/"
        );
        setMaintainers(response.data);
      } catch (error) {
        console.error("Error fetching maintainers:", error);
      }
    };

    fetchMaintainers();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        background: "white",
        padding: "100px",
        paddingTop: 0,
      }}
    >
      <motion.section
        id="services"
        className="services"
        initial="initial"
        animate="animate"
      >
        <motion.h3
          className="mb-5"
          style={{
            fontSize: "4rem",
            fontWeight: "40px",
            letterSpacing: "-2px",
            color: "var(--new-color)",
          }}
          variants={textVariant()}
        >
          شركات الصيانه
        </motion.h3>
        <div className="cards flex-col md:flex-row w-full">
          {maintainers.map((maintainer, index) => (
            <ServiceCard
              key={maintainer.id}
              //   icon="icon1.png"
              title={maintainer.name}
              description="أبدأ رحلتك واحجز معنا الان"
              delay={index * 0.5}
            />
          ))}
        </div>
      </motion.section>
    </div>
  );
}
