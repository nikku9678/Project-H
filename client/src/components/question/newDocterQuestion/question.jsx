import "./question.css"
import React, { useEffect, useState } from 'react';
import axios from "axios"
import jwt_decode from "jwt-decode";
import Navbar from '../../navbar/Navbar';
import baseURL from "../../../../baseUrl";

const DoctorQuestionPage = () => {
   const [sessions, setSessions] = useState([]);
   const [showAddSessionPopup, setShowAddSessionPopup] = useState(false);
   const [question, setquestion] = useState('');

   const [isEditing, setIsEditing] = useState(false);

   let token = localStorage.getItem("token");
   const tokenData = jwt_decode(token);
   const docterId = tokenData.userId;
   // let questionId;

   // console.log("TOKEN DATA ==> ", docterId);

   const questionDetails = async () => {

      const response = await axios.get(`${baseURL}/docter/doc/questions/${docterId}`)
      console.log("RESPONSE =>", response);
      setSessions(response.data)
   }

   const handleAddSession = () => {
      setShowAddSessionPopup(true);
   };

   const handleCancel = () => {
      setShowAddSessionPopup(false);
      setquestion('');
   };

   const handleSave = async () => {
      const newSession = {
         question,
      };

      setSessions([...sessions, newSession]);
      setShowAddSessionPopup(false);
      const data = {
         doctorId: docterId,
         question: question
      }
      await axios.post(`${baseURL}/docter/questions`, data);
      setquestion('');

      if (isEditing) {
         window.location.reload();
         setIsEditing(false);
      }
   };

   const handleEdit = async (index) => {
      setShowAddSessionPopup(true)
      setIsEditing(true);
      const updatedSessions = [...sessions];
      const questionId = updatedSessions[index].questionId;
      await axios.delete(`${baseURL}/docter/questions/${questionId}`)


   };


   const handleDelete = async (index) => {

      const updatedSessions = [...sessions];
      const questionId = updatedSessions[index].questionId;

      // console.log("QUESTION ID UPDATED SESSION ", updatedSessions[index].questionId);
      await axios.delete(`${baseURL}/docter/questions/${questionId}`)

      // updatedSessions.splice(index, 1);
      // setSessions(updatedSessions);
      window.location.reload();

   };

   const handleSaveQuestions = () => {
      console.log('Logged questions:', sessions);
   };

   useEffect(() => {
      questionDetails()
   }, [])

   return (
      <>
         <Navbar />
         <div className="doctor-session-page">
            {/* <button className="save-button" onClick={handleSaveQuestions}>
            Save
         </button> */}
            <button className="add-session-button" onClick={handleAddSession}>
               Add Question
            </button>
            {showAddSessionPopup && (
               <div className="add-session-popup">
                  <label>Question:</label>
                  <input
                     type="text"
                     value={question}
                     onChange={(e) => setquestion(e.target.value)}
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
               {sessions.map((session, index) => (
                  <div className="session-box" key={index}>
                     <p>question: {session.question}</p>
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
               ))}
            </div>
         </div>
      </>
   );
};

export default DoctorQuestionPage;
