import React from "react";
import "./doctorCard.css";
import Modal from "../modal/Modal";
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import baseURL from "../../../baseUrl";
import ChatOptionsPopup from "../chatOptionsPopup/chatOptionsPopup";

// "id": 1,
const DoctorCard = ({ id, about,
  language,
  name,
  email,
  phone,
  feePerMin,
  feePerMinSession,
  photo,
  rating,
  timings,
  available }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatOptionsPopup, setShowChatOptionsPopup] = useState(false);
  const navigate = useNavigate();

  const localLoggedInUser = localStorage.getItem('userToken');

  const toggleModal = () => {
    if (available) {
      console.log("Clicked in Docter id ", id);
      localStorage.setItem("clickedDocter", id);
      setIsOpen(!isOpen);
    } else {
      toast('Docter is Offline !')
    }
  };

  const openChatOptions = () => {
    if (localLoggedInUser) {
      localStorage.setItem("clickedDocter", id);
      setShowChatOptionsPopup(!showChatOptionsPopup);
    } else {
      toast("Please Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleAddMoney = () => {
    navigate("/user/wallet")
  };

  const handleRedeemChat = () => {
    console.log('Reddem chat');
  };

  const handleBookSession = async () => {
    if (localLoggedInUser) {
      navigate('/docterList/session')
      localStorage.setItem('docId', id);
    } else {
      toast("Please Login!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const handleProfile = async () => {
    localStorage.setItem("userDocterId", id);
    navigate('/user/docter')
  };


  useEffect(() => {
    const clearLocalStorageOnReload = () => {
      const localStorageItemsToDelete = ['clickedDocter'];
      localStorageItemsToDelete.forEach((itemName) => {
        localStorage.removeItem(itemName);
      });
    };

    window.addEventListener('beforeunload', clearLocalStorageOnReload);
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorageOnReload);
    };
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          style: {
            border: "1px solid black",
            padding: "1em",
            color: "#ffffff",
            fontWeight: 'bold',
            background: "#f44336",
          },
          duration: 1000,
        }}
      />
      <div className="card-container2" style={{ backgroundColor: available ? "white" : "grey" }}>
        <div className="card-container3">
          <div className="doc-card-left" onClick={handleProfile}>
            <img
              className="doc-img"
              src={`${baseURL}/Uploads/${photo.replace(/Uploads\\/g, '')}`}
            />
            <span className="doc-name">{name}</span>
          </div>
          <div className="doc-info">
            <span>
              <b>Email</b>: {email}
            </span>
            <span>
              <b>About</b>: {about}
            </span>
            <span>
              <b>Specialization</b>:
            </span>
            <span>
              <b>Language</b>: {language}
            </span>
            <span>
              <b>Timings</b>: {timings}
            </span>

            <span className="doc-rate">
              <b>Chat Fee ₹</b>{feePerMin}/min
            </span>
            <span className="doc-rate">
              <b>Session Fee</b>: ₹{feePerMinSession}
            </span>
            <span className="available">
              <b>
                Available: {available ? "Yes" : "No"}
              </b>
            </span>
            <div className="doc-buttons">
              <button onClick={handleBookSession} className="doc-book-session">
                Book Session
              </button>

              <button onClick={openChatOptions} className="doc-chat" style={{ cursor: available ? "pointer" : "not-allowed" }}>
                Chat Now
              </button>
              {showChatOptionsPopup && (
                <ChatOptionsPopup
                  handleAddMoney={handleAddMoney}
                  handleRedeemChat={handleRedeemChat}
                  toggleModal={toggleModal}
                />
              )}
            </div>

            <Modal isOpen={isOpen} onClose={toggleModal} docId={id} /> 
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
