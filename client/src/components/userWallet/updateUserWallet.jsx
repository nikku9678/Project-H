import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '../../../baseUrl';
import toast, { Toaster } from "react-hot-toast";

const UpdateUserWallet = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${baseURL}/admin/update/user/wallet`, {
        userId: userId,
        amount: amount,
      });

      toast(`Balance updated successfully!`)
      console.log('Payment successful:', response.data);
    } catch (error) {
      toast('Error');
      console.error('Payment failed:', error);
    }
  };

  return (
    <div>
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
          duration: 1500,
        }}
      />
      <h2>Update user wallet:-</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type='number'
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Enter User ID"
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default UpdateUserWallet;
