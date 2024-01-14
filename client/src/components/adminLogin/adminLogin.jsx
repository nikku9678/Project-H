import "./adminLogin.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../baseUrl";


const AdminLogin = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();

   const handleLogin = async () => {
      const data = {
         email: email,
         password: password
      }
      try {
         const resposne = await axios.post(`${baseURL}/admin/login`, data);
         if (resposne) {
            navigate('/admin')
         }
      } catch (error) {
         console.log('Error in login admin ', error);
      }
   };

   const handleEmailChange = (event) => {
      setEmail(event.target.value);
   };

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   return (
      <div className="container">
         <h1>Login</h1>
         <form>
            <div className="form-group">
               <label>Email:</label>
               <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email"
               />
            </div>
            <div className="form-group">
               <label>Password:</label>
               <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
               />
            </div>
            <button type="button" onClick={handleLogin}>
               Login
            </button>
         </form>
      </div>
   );
}

export default AdminLogin;