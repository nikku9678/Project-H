import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Navbar from '../navbar/Navbar';
import baseURL from "../../../baseUrl";
import './userBookedSession.css';

const SessionBookedForDoctorByUser = () => {
  const [sessions, setSessions] = useState([]);

  let token = localStorage.getItem("token");
  const tokenData = jwt_decode(token);
  const doctorId = tokenData.userId;

  const getSession = async () => {
    const apiUrl = `${baseURL}/docter/userSessions/${doctorId}`;
    const response = await axios.get(apiUrl);
    setSessions(response.data);
  };

  useEffect(() => {
    getSession();
  }, [doctorId]);

  return (
    <>
      <Navbar />
      <div className="session-list">
        <ul>
          {sessions.map((session) => (
            <li key={session.id} className="session-card">
              <h2>Session ID: {session.id}</h2>
              <p>Doctor ID: {session.doctorId}</p>
              <p>User ID: {session.userId}</p>
              <p>Age: {session.age}</p>
              <p>Consent: {session.consent ? 'Yes' : 'No'}</p>
              <p>Gender: {session.gender}</p>
              <p>Medical History: {session.medicalHistory}</p>
              <p>Presenting Issue: {session.presentingIssue}</p>
              <p>Treatment Goal: {session.treatmentGoal}</p>
              {session.file && (
                <p>File: <a href={`${baseURL}/Uploads/${session.file.replace(/Uploads\\/g, '')}`}>Download</a></p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SessionBookedForDoctorByUser;