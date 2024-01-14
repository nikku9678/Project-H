import "./doctorLogin.css";
import img from "../../assets/female-doctor-VAZ9BMYX6U-w600.jpg";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import baseURL from "../../../baseUrl";


const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log("Heloo Login Docter !");
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password
      }
      const response = await axios.post(`${baseURL}/docter/login`, data);
      console.log("Response ", response.data.docterToken);
      if (response.status != 404 || response.status != 501) {
        localStorage.setItem("userMail", `${email}`);
        localStorage.setItem("token", response.data.docterToken);
        navigate("/docHome");
      } else {
        toast('Docter not found !')
      }


    } catch (error) {
      toast('☠️ Login Failed')
      // navigate('/')
    }

  };
  return (<>   <div> <Navbar /></div>
    <div className="docLog-container2">

      <div className="docLogin-left">
        <img src={img} alt="" className="docLogin-img" />
      </div>
      <div className="docLog-right">
        <h2> Welcome Back to HealerJi!</h2>
        <span>
          <b>Doctor Login Portal</b>
        </span>
        <div className="docLog-card">
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              style: {
                border: "1px solid black",
                padding: "1em",
                color: "#713200",
                fontWeight: 'bold',
                background: "#f44336",
              },
            }}
          />
          <form className="docLog-form">
            {/* <label>Email</label> */}
            <input
              type="email"
              placeholder="Enter email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder="Enter Password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Sign In</button>
          </form>
          {/* <div className="login-link">
            <span>Not Registered?</span>
            <Link to={"/signup"}> signUp</Link>
          </div> */}
        </div>
      </div>
    </div>
  </>

  );
};

export default DoctorLogin;
