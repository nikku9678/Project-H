import React from 'react';
import Navbar from '../navbar/Navbar';
import './DocNotification.css';
import Refresh from '../RefreshPage/Refresh';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import baseURL from "../../../baseUrl";

function DocNotification() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };


  useEffect(() => {
    // TODO:- Make Doctor ID Dynamic
    const doctorToken = localStorage.getItem("token");
    const doctorID = jwt_decode(doctorToken);
    const doctorId = doctorID.userId;

    const response = axios
      .get(`${baseURL}/docter/see/notification/${doctorId}`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });

    const refreshInterval = setInterval(refreshPage, 120000);
    return () => clearInterval(refreshInterval);
  }, []);

  const handleJoinChat = async (item) => {
    const userId = item.userId;
    localStorage.setItem("clickedUser", userId);
    navigate('/chat');
  };

  const handleRejectChat = async (item) => {
    const userId = item.userId;
    setList((prevList) => {
      return prevList.filter((chat) => chat.userId !== userId);
    });

    try {
      await axios.delete(`${baseURL}/docter/remove/notification/${userId}`);
    } catch (error) {
      console.error('Error deleting the chat:', error);
    }
  };




  return (
    <>
      <Navbar></Navbar>
      <div className="nf">
        <div className="nf-list">
          {list.length > 0 ? (
            list.map((chat, index) => (
              <div className="nf-list-a" key={index}>
                <div className="nf-img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37hOzI3y8ST4e9tCU3TCgOlhkCm3Ew1hjGhmguMzhEw&usqp=CAU&ec=48600113"
                    alt=""
                  />
                </div>
                <div className="nf-info">
                  <p>
                    <span>Name:</span> {chat.userName}
                  </p>
                  <p>
                    <span>Email:</span> {chat.userEmail}
                  </p>
                  <p>
                    <span>Age:</span>{chat.userAge}
                  </p>
                  <div className="nf-btn">
                    <button className="join" onClick={() => handleJoinChat(chat)}>
                      Join Chat
                    </button>
                    <button className="reject" onClick={() => handleRejectChat(chat)}>
                      Reject chat
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-data'> NO REQUEST FOUND FOR CHAT ! </div>
          )}
        </div>
      </div>
      <Refresh />
    </>
  );
}

export default DocNotification;
