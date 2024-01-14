import "./accessLogin.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../baseUrl";

const AccessLogin = () => {
   const [inputText, setInputText] = useState('');

   const navigate = useNavigate();

   const handleClick = async () => {
      console.log(inputText);
      const data = {
         key: inputText.toString()
      }
      try {
         const response = await axios.post(`${baseURL}/admin/accessKey`, data)
         console.log(response);
         if (response) {
            navigate("/adminLoginPage")
         } else {
            console.log("Unauthorized !");
         }
      } catch (error) {
         console.log("Error in Access Login", error);
      }

   };

   const handleChange = (event) => {
      setInputText(event.target.value);
   };

   return (
      <div className="container">
         <div className="box">
            <input
               type="text"
               value={inputText}
               onChange={handleChange}
               className="input-field"
               placeholder="Enter Access Key"
            />
            <button onClick={handleClick} className="button">
               Verify
            </button>
         </div>
      </div>
   );
}

export default AccessLogin;