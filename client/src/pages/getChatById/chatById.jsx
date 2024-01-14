import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "../../../baseUrl";


const ChatById = () => {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/getChat/${id}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Get Chat by ID</h2>
      <h3>Enter the id of Doctor/User:</h3>
      <div className="form-group">
        <label>ID:</label>
        <input type="number" value={id} onChange={handleInputChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {/* Display the data based on the model */}
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

export default ChatById;
