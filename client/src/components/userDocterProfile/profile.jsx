import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../baseUrl";


const UserDocProfile = () => {

   const [id, setId] = useState(null);
   const [about, setAbout] = useState("");
   const [emailId, setEmailId] = useState("");
   const [language, setLanguage] = useState("");
   const [feePerMin, setFeePerMin] = useState("");
   const [timings, setTimings] = useState("");
   const [nameDoc, setNameDoc] = useState("");
   const [feePerSession, setFeePerSession] = useState("");
   const [availability, setAvailability] = useState(null);
   const [photo, setPhoto] = useState('');

   const navigate = useNavigate();

   const handleBookSession = () => {
      navigate('/docterList/session')
   };

   const handleChatNow = () => {

   }

   const handleGetProfileData = async () => {
      const id = localStorage.getItem("userDocterId");
      const result = await axios.get(`${baseURL}/user/docter/profile/${id}`);

      setId(result.data.id)
      setAbout(result.data.about)
      setEmailId(result.data.email)
      setLanguage(result.data.language)
      setFeePerMin(result.data.feePerMin)
      setFeePerSession(result.data.feePerMinSession)
      setTimings(result.data.timings)
      setNameDoc(result.data.name)
      setAvailability(result.data.available)
      setPhoto(result.data.photo)

   }

   useEffect(() => {
      handleGetProfileData();
   }, []);


   return (
      <>
         <Navbar />
         <div className="doc-profile-container">
            <div className="doc-left">
               <img
                  src={`${baseURL}/Uploads/${photo.replace(/Uploads\\/g, '')}`}
                  alt=""
                  className="doc-profile-img"
               />
               <span className="doc-profile-name">{nameDoc}</span>
            </div>

            <div className="data">
               <h2 className="profile-heading">Doctor Profile</h2>
               <div className="profile-item">
                  <span className="item-label">Name:</span>
                  <span>{nameDoc}</span>
               </div>
               <div className="profile-item">
                  <span className="item-label">Email:</span>
                  <span>{emailId}</span>
               </div>
               <div className="profile-item">
                  <span className="item-label">About:</span>
                  <span>{about}</span>
               </div>
               <div className="profile-item">
                  <span className="item-label">Language:</span>
                  <span>{language}</span>
               </div>
               <div className="profile-item">
                  <span className=".item-label">Timings:</span>
                  <span>{timings}</span>
               </div>
               <div className="profile-item">
                  <span className="item-label">Session Fee (Rupees per Hour):</span>

                  <span>{feePerSession}</span>

               </div>
               <div className="profile-item">
                  <span className="item-label">Chat (Rupees per minute):</span>

                  <span>{feePerMin}</span>

               </div>
               <div className="profile-item">
                  <span className="item-label">Availability:</span>

                  <span>{availability ? "Available" : "Not Available"}</span>

               </div>

               <div className="button-container">
                  <button className="btns btn-save" onClick={handleBookSession}>
                     Book Session
                  </button>

                  {availability ? (
                     <>
                        <button className="btns btn-save" onClick={handleChatNow}>
                           Chat Now
                        </button>
                     </>) : (
                     <>
                        <span className="button-alternative">Docter Not Available For Chat</span>
                     </>
                  )
                  }
               </div>
            </div>
         </div>
      </>
   );
};

export default UserDocProfile;
