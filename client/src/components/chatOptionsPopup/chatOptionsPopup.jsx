import React from 'react';
import axios from 'axios';
import baseURL from '../../../baseUrl';
import { useNavigate } from 'react-router-dom';

const ChatOptionsPopup = ({ handleAddMoney, handleRedeemChat, toggleModal }) => {
  const navigate = useNavigate();

  const redirectToQuestionPage = () => {
    navigate('/user-ans');
  };

  return (
    <div className="chat-options-popup">
      <button onClick={handleAddMoney}>Add Money</button>
      <button onClick={handleRedeemChat}>Redeem First Chat</button>
      <button onClick={redirectToQuestionPage}>Continue</button>
    </div>
  );
};

export default ChatOptionsPopup;
