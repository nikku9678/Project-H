import React, { useEffect, useState } from "react";
import "./docProfile.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../baseUrl";


const DocProfile = () => {

  const [profileDetails, setProfileDetails] = useState([]);
  const [id, setId] = useState(null);
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [language, setLanguage] = useState("");
  const [feePerMin, setFeePerMin] = useState("");
  const [timings, setTimings] = useState("");
  const [nameDoc, setNameDoc] = useState("");
  const [photo, setPhoto] = useState('');
  const [feePerSession, setFeePerSession] = useState("");
  const [availability, setAvailability] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  let mail = localStorage.getItem("userMail");
  console.log("MailFromLocalStorage=>", mail);

  const userDetails = async () => {

    const response = await axios.get(`${baseURL}/docter/profile/${mail}`);
    const data = response.data;
    console.log("Response ==> ", data);

    setProfileDetails(data);
    setId(data.id);
    setAbout(data.about);
    setEmailId(data.email);
    setFeePerMin(data.feePerMin);
    setLanguage(data.language);
    setFeePerSession(data.feePerMinSession);
    setTimings(data.timings);
    setNameDoc(data.name);
    setAvailability(data.available);
    setPhoto(data.photo)

    console.log("User Data ===> ", availability);
  };

  useEffect(() => {
    console.log("Use Effect Called", availability);
    userDetails();
  }, []);

  useEffect(() => {
    console.log("Availability updated: ", availability);
  }, [availability]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Add your save logic here
    const updatedData = {
      id,
      nameDoc,
      emailId,
      about,
      language,
      timings,
      feePerSession,
      feePerMin,
      availability,
    };

    console.log("Availa ==> handleSave ", availability);

    try {
      const response = await axios.post(`${baseURL}/docter/profile/update`, updatedData);
      localStorage.setItem("userMail", `${emailId}`);
      // console.log(response);
    } catch (error) {
      console.log("Error in Updating Profile ", error);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the form or revert any changes made during editing
    userDetails();
  };

  const handleHome = () => {
    navigate("/docHome")
  }

  const handleAvailabilityToggle = async () => {
    console.log("Availa ==> toggle before  ", availability);
    setAvailability(!availability)
    console.log("Availa ==> toggle  ", availability);

  };

  return (
    <>
      <Navbar />
      <div className="doc-home-profile">
        <img
          src = {`${baseURL}/Uploads/${photo.replace(/Uploads\\/g, '')}`}
          alt=""
          className="doc-profile-img"
        />


        <div className="data">
          <h2 className="profile-heading">Doctor Profile</h2>

          <div className="profile-item">
            <span className="item-label">Name:</span>
            {isEditing ? (
              <input
                type="text"
                value={nameDoc}
                onChange={(e) => setNameDoc(e.target.value)}
                className="edit-input"
              />

            ) : (
              <span>{nameDoc}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">Email:</span>
            {isEditing ? (
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{emailId}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">About:</span>
            {isEditing ? (
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="edit-textarea"
              />
            ) : (
              <span>{about}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">Language:</span>
            {isEditing ? (
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{language}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">Timings:</span>
            {isEditing ? (
              <input
                type="text"
                value={timings}
                onChange={(e) => setTimings(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{timings}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">Session Fee (Rupees per Hour):</span>
            {isEditing ? (
              <input
                type="text"
                value={feePerSession}
                onChange={(e) => setFeePerSession(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{feePerSession}</span>
            )}
          </div>
          <div className="profile-item">
            <span className="item-label">Chat (Rupees per minute):</span>
            {isEditing ? (
              <input
                type="text"
                value={feePerMin}
                onChange={(e) => setFeePerMin(e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{feePerMin}</span>
            )}
          </div>
          <div className="profile-avail">
            <span className="item-label">Availability:</span>
            {isEditing ? (
              <label className="switch">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={handleAvailabilityToggle}
                />
                <span className="slider"></span>
              </label>
            ) : (
              <span className="info">{availability ? "Available" : "Not Available"}</span>
            )}
          </div>

          <div className="button-container">
            {isEditing ? (
              <>
                <button className="btns btn-save" onClick={handleSave}>
                  Save
                </button>
                <button className="btns btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="btns btn-edit" onClick={handleHome}>
                  Home
                </button>
                <button className="btns btn-edit" onClick={handleEdit}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocProfile;
