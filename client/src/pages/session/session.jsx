import React, { useEffect, useState } from "react";
import axios from "axios";
import "./session.css";
import Navbar from "../../components/navbar/Navbar";

const Session = () => {
  const [doctorList, setDoctorList] = useState([]);

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
      <div className="session-list">
        <h2>Session List</h2>
        <div className="session-list-info">
          {list.map((list) => (
            <div className="session-list-a" key={list.id}>
              <div className="session-info">
                <p><span>Doctor ID:</span> {list.docid}</p>
                <p><span>User ID:</span> {list.userid}</p>
                <p><span>Age:</span> {list.age}</p>
                <p><span>Conset:</span> {list.conset}</p>
                <p><span>Gender:</span> {list.gender}</p>
                <p><span>Medical History:</span> {list.history}</p>
                <p><span>Presenting Issue:</span> {list.issue}</p>
                <p><span>Treatement Goal:</span> {list.goal}</p>
                <p><span>Username:</span> {list.username}</p>
                <p><span>Doctor Name:</span> {list.docname}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Session;
