import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./doctor.css";
import axios from "axios";
import baseURL from "../../../baseUrl";


const doctor = {
  id: 12,
  about: "Test",
  language: "ENG",
  name: "ADI",
  email: "adi22maurya@gmail.com",
  phone: "3434",
  feePerMin: "23",
  feePerMinSession: "45",
  photo: "34",
  rating: "44",
  timings: "443",
  available: "true"
}

const Doctor = () => {
  const [doctorList, setDoctorList] = useState([]);

  const getDoctorData = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/docters`);
      const doctorsData = response.data;
      setDoctorList(doctorsData);
      console.log("DOCTOR DATA ==> ", doctorList);
    } catch (error) {
      console.error("Error retrieving doctor data: ", error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="doctor-list-container">
        <p> Our Expert Psychiatrists</p>
        <div className="doctorList">
          {doctorList.map((doctor) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
          {/* <DoctorCard key={12} {...doctor} />
          <DoctorCard key={12} {...doctor} />
          <DoctorCard key={12} {...doctor} />
          <DoctorCard key={12} {...doctor} />
          <DoctorCard key={12} {...doctor} /> */}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
