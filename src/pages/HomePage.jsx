import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, message } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

// ✅ Debug log: check if doctors data is being set
useEffect(() => {
  console.log("Doctors data:", doctors);
}, [doctors]);

  return (
    <Layout>
      <h1 className="appointments-heading">
   Home Page
</h1>

      <Row>
        {doctors && doctors.map((doctor) => (
          <DoctorList key={doctor._id} doctor={doctor} />
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
