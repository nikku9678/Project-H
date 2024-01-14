import axios from "axios";
import "./docterSessionPage.css"
import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Navbar from '../navbar/Navbar';
import baseURL from "../../../baseUrl";

const DoctorSessionPage = () => {

   const [sessions, setSessions] = useState([]);
   const [showAddSessionPopup, setShowAddSessionPopup] = useState(false);
   const [cost, setCost] = useState('');
   const [duration, setDuration] = useState('');
   const [time, setTime] = useState('');
   const [isEditing, setIsEditing] = useState(false);

   let token = localStorage.getItem("token");
   const tokenData = jwt_decode(token);
   const doctorId = tokenData.userId;

   const fetchData = async () => {
      try {
         const response = await axios.get(`${baseURL}/docter/sessions/${doctorId}`);

         if (!response) {
            console.log('NO DATA FOUND!');
         } else {
            setSessions(response.data);
         }
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleAddSession = () => {
      setShowAddSessionPopup(true);
   };


   const handleCancel = () => {
      setShowAddSessionPopup(false);
      setCost('');
      setDuration('');
      setTime('');
   };


   const handleSave = async () => {
      const newSession = {
         cost,
         duration,
         time,
      };

      const payload = {
         doctorId: doctorId,
         cost: newSession.cost,
         duration: newSession.duration,
         time: newSession.time
      };

      await axios.post(`${baseURL}/docter/sessions`, payload);

      setSessions([...sessions, newSession]);
      setShowAddSessionPopup(false);
      setCost('');
      setDuration('');
      setTime('');

      if (isEditing) {
         window.location.reload();
         setIsEditing(false);
      }
   };


   const handleEdit = async (index) => {
      setShowAddSessionPopup(true)
      setIsEditing(true);

      const updatedSessions = [...sessions];
      const sessionToUpdate = updatedSessions[index];
      // sessionToUpdate.cost = cost;
      // sessionToUpdate.duration = duration;
      // sessionToUpdate.time = time;
      // updatedSessions.splice(index, 1)
      // setSessions(updatedSessions);

      const sessionId = updatedSessions[index].sessionId;
      await axios.delete(`${baseURL}/docter/sessions/${sessionId}`);

   };

   const handleDelete = async (index) => {
      const updatedSessions = [...sessions];
      const sessionId = updatedSessions[index].sessionId;

      await axios.delete(`${baseURL}/docter/sessions/${sessionId}`);

      window.location.reload();
   };

   const handleSaveQuestions = () => {
      sessions.forEach((session) => {
         console.log(session.sessionId);
      })
      console.log('Logged questions:', sessions);
   };

   return (
      <>
         <Navbar />
         <div className="doctor-session-page">
            <button className="add-session-button" onClick={handleAddSession}>
               Add Session
            </button>
            {showAddSessionPopup && (
               <div className="add-session-popup">
                  <label>Cost:</label>
                  <input
                     type="text"
                     value={cost}
                     onChange={(e) => setCost(e.target.value)}
                  />
                  <label>Duration(In hours):</label>
                  <input
                     type="text"
                     value={duration}
                     onChange={(e) => setDuration(e.target.value)}
                  />
                  <label>Time:</label>
                  <input
                     type="text"
                     value={time}
                     onChange={(e) => setTime(e.target.value)}
                  />
                  <button className="cancel-button" onClick={handleCancel}>
                     Cancel
                  </button>
                  <button className="save-button" onClick={handleSave}>
                     Save
                  </button>
               </div>
            )}
            <div className="session-boxes">
               {sessions.length > 0 ? (sessions.map((session, index) => (
                  <div className="session-box" key={index}>
                     <p>Cost: {session.cost}</p>
                     <p>Duration: {session.duration}</p>
                     <p>Time: {session.time}</p>
                     <button
                        className="edit-button"
                        onClick={() => handleEdit(index)}
                     >
                        Edit
                     </button>
                     <button
                        className="delete-button"
                        onClick={() => handleDelete(index)}
                     >
                        Delete
                     </button>
                  </div>
               ))) : (<span>No Session Found.</span>)}
            </div>
         </div>
      </>
   );
};

export default DoctorSessionPage;
