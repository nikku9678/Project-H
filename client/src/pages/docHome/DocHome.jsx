import "./docHome.css";
// import { Axios } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import counseling from "../../assets/docterProfile.png";
import { Link, useNavigate } from "react-router-dom";
import notification from "../../assets/notification.png";
import baseURL from "../../../baseUrl";


const DocHome = () => {

  const [docterEmail, setDocterEamil] = useState('Docter');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  
  const notificationClick = ()=>{
    navigate('/doctor/notification')
  }

  const profileNavigate = ()=>{
    navigate('/docHome/profile')
  }

  const userDetails = async (mail) => {

    const response = await axios.get(`${baseURL}/docter/profile/${mail}`);
    const data = response.data;
    console.log("Response ==> ", data);
    setPhoto(data.photo)
  };

  // useEffect(() => {
  //   console.log("Use Effect Called", availability);
  //   userDetails();
  // }, []);

  useEffect(()=>{
    const docEmail = localStorage.getItem('userMail');
    setDocterEamil(docEmail);
    userDetails(docEmail);
  }, []);

  return (
    <>
      <Navbar />
      <div className="doc-home-container">
        <div className="doc-home-left">
          
          <img
            src = {`${baseURL}/Uploads/${photo.replace(/Uploads\\/g, '')}`}
            alt="Doctor's Profile Picture"
            onClick={profileNavigate}
            style={{ cursor: 'pointer' }}
          />
          <p className="docter-name" onClick={profileNavigate} style={{ cursor: 'pointer' }}>{docterEmail}</p>
        </div>
        <div className="doc-home-right">
          <Link to={'/doctor/notification'}><button className="">Join Chat</button></Link>
          <Link to={'/docHome/profile'}><button className="">Profile</button></Link>
          <Link to={'/doc/addQuestion'}><button className="">Add Question</button></Link>
          <Link to={'/docHome/userSession'}><button className="">Your Interaction</button></Link>
          <Link to={'/docHome/stat'}><button className="">Stats</button></Link>
          <Link to={'/docHome/session'}><button className="">Add Session</button></Link>
          <Link to={'/docHome/session'}><button className="">Modify Session</button></Link>
          <Link to={'/docHome/profile'}><button className="">Change Availability</button></Link>
        </div>

        <div className="notification-button">
          <img
            className="bell-image"
            src={notification}
            alt="Bell Icon"
            title="Join Chat"
            onClick={notificationClick}
          />
        </div>
      </div>
    </>
  )
};

export default DocHome;

// import React from 'react';
// import './docHome.css';

// function DocHome() {
//   return (
//     <div className="container">
//       <div className="left">
//         <img className="user-image" src="user-image.jpg" alt="User" />
//         <h2 className="user-name">John Doe</h2>
//       </div>
//       <div className="right">
//         <button className="button">Profile</button>
//         <button className="button">Add Question</button>
//         <button className="button">Stats</button>
//         <button className="button">Your Interaction</button>
//         <button className="button">Add Session</button>
//         <button className="button">Modify Session</button>
//         <button className="button">Change Availability</button>
//       </div>
//     </div>
//   );
// }

// export default DocHome;
