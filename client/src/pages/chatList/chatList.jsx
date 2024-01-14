import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "../../../baseUrl";


const ChatListPage = () => {
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/chatList/${email}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Get Chat Data by Email</h2>
      <h3>Enter the email of Doctor/User:</h3>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={handleInputChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {data && (
        <div>
          <h3>Data:</h3>
          <p>ID: {data.id}</p>
          <p>Doctor ID: {data.doctorId}</p>
          <p>User ID: {data.userId}</p>
          <p>Message: {data.message}</p>
          <p>Timestamp: {data.timestamp}</p>
        </div>
      )}
    </div>
  );
};

export default ChatListPage;
