import React, { useEffect, useState } from "react";
import axios from "axios";
import "./doctorList.css";
import Navbar from "../../components/navbar/Navbar";
import baseURL from "../../../baseUrl";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([
  
  ]);



  useEffect(() => {
    axios
      .get(`${baseURL}/admin/docterList`)
      .then((response) => {
        console.log(response.data);
        setDoctorList(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="doc-list">
        <h2>Doctor List</h2>
        <div className="doc-list-info">
          {doctorList.map((list) => (
            <div className="doc-list-a" key={list.id}>
              <div className="doc-a">
                <img
                  src = {`${baseURL}/Uploads/${list.photo.replace(/Uploads\\/g, '')}`}
                  alt=""
                />
                <p>{list.name} dfz</p>
              </div>
              <div className="doc-info">
                <p><span>Email:</span> {list.email}</p>
                <p>
                  <span>About:</span>{list.about}
                </p>
                <p><span>Specialization:</span>{list.specialization}</p>
                <p><span>Timing:</span>{list.timing}</p>
                <p><span>Chat fee:</span>{list.feePerMin}</p>
                <p><span>Session fee:</span>{list.feePerSession}</p>
                <p className="avail"><span>Available:</span>{list.available}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
