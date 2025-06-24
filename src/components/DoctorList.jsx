import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/DoctorList.module.css";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className={styles.header}>
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className={styles.body}>
        <p>
          <span className={styles.label}>Specialization:</span> {doctor.specialization}
        </p>
        <p>
          <span className={styles.label}>Experience:</span> {doctor.experience} years
        </p>
        <p>
          <span className={styles.label}>Fees Per Consultation:</span> Rs. {doctor.feesPerCunsaltation}
        </p>
        {/* ✅ Safely check if timings exist and are an array */}
        {Array.isArray(doctor.timings) && doctor.timings.length === 2 ? (
          <p>
            <span className={styles.label}>Timings:</span> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        ) : (
          <p>
            <span className={styles.label}>Timings:</span> Not Available
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
