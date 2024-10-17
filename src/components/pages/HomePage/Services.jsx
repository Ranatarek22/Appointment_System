import React, { useState, useEffect } from "react";
import { apiInstance } from "../../../axios";
import ServiceCard from "./ServiceCard"; // Ensure the path is correct

export default function Services() {
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
        background: "white",
        paddingTop: 0,
      }}
    >
      <section id="services" className="services">
        <h3
          className="mb-5"
          style={{
            fontSize: "4rem",
            fontWeight: "40px",
            letterSpacing: "-2px",
            color: "var(--new-color)",
          }}
        >
          شركات الصيانه
        </h3>
        <div className="cards flex-col md:flex-row w-full">
          {maintainers.map((maintainer, index) => (
            <ServiceCard
              key={maintainer.id}
              title={maintainer.name}
              description="أبدأ رحلتك واحجز معنا الان"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
