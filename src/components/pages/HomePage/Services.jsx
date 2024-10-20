import React, { useState, useEffect } from "react";
import { apiInstance } from "../../../axios";
import ServiceCard from "./ServiceCard";
import { useTranslation } from "react-i18next";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Services() {
  const [maintainers, setMaintainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const { t } = useTranslation();

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

  const handleNext = () => {
    if (currentIndex + 3 < maintainers.length) {
      setCurrentIndex((prevIndex) => prevIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 3);
    }
  };

  const visibleMaintainers = maintainers.slice(currentIndex, currentIndex + 3);

  return (
    <div
      className="container-fluid"
      style={{
        background: "white",
        paddingTop: 0,
      }}
    >
      <section id="services" className="services">
        <h3
          className="mb-5 text-[2rem] md:text-[4rem] font-bold"
          style={{
        
            fontWeight: "40px",
            letterSpacing: "-2px",
            textAlign: "center",
            color: "var(--new-color)",
          }}
        >
          {t("company_mant")}
        </h3>
        <div className="flex justify-between items-center">
          <IconButton onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowBackIos />
          </IconButton>
          <div className="cards flex-col md:flex-row w-full justify-center">
            {visibleMaintainers.map((maintainer) => (
              <ServiceCard
                key={maintainer.id}
                title={maintainer.name}
                description={t("company_description")}
              />
            ))}
          </div>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex + 3 >= maintainers.length}
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
      </section>
    </div>
  );
}
