import "./signup.css";
import img from "../../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import Navbar from '../../components/navbar/Navbar';
import baseURL from "../../../baseUrl";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName);
    const postData = {
      name: firstName + " " + lastName,
      email: email,
      pass: password,
      phone: phone
    }
    try {
      const response = await axios.post(`${baseURL}/user/signup`, postData)
      if (response) {

        (navigate("/login"))
      }
    } catch (error) { console.log("Erorr in registering user ") }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        
        <div className="signup-left">
          <img src={img} className="signup-img" />
          <hr></hr>
          <a href="https://storyset.com/people"></a>
          <div className="signup-qoute">
            <q>Deep breathing is our nervous system’s love language.</q>
            <br></br>
            <span> — Dr. Lauren Fogel Mersy</span>
          </div>
        </div>
        <div className="signup-right">
          <h2> Welcome to HealerJi!</h2>
          <div className="signup-card">
            <form className="signup-form" onSubmit={handleSubmit}>
              {/* <label>First Name</label> */}
              <input
                type="text"
                placeholder="First name"
                required={true}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              {/* <label>Last Name</label> */}
              <input
                type="text"
                placeholder="Last name"
                required={true}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              {/* <label>Email</label> */}
              <input
                type="email"
                placeholder="Enter email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter phone no"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <label>Password</label> */}
              <input
                type="password"
                placeholder="Enter Password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
            <div className="login-link">
              <span>Already Registered ?</span>
              <Link to={"/login"}> LogIn</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
