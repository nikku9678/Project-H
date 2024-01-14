import "./login.css";
import img from "../../assets/animatedLoginBlue.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import baseURL from "../../../baseUrl";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user", `${email}`);
    
    const loginData = {
      email: email,
      pass: password
    }

    try {
      const response = await axios.post(`${baseURL}/user/login`, loginData);

      if (response.status != 404 || response.status != 400){
        localStorage.setItem("userToken", response.data.userToken);
        navigate("/");
      }
    } catch (erorr) {
      toast('Incorrect password!!');
    }

  };
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
      <div className="login-nav"><Navbar /></div>
      <div className="log-box">

        <div className="login-left">
          <img src={img} className="login-img" />
          <hr></hr>
          <a href="https://storyset.com/people"></a>
          <div className="login-qoute">
            <q>
              You don’t have to control your thoughts. You just have to stop
              letting them control you.
            </q>
            <br></br>
            <span> — Dan Millman</span>
          </div>
        </div>
        <div className="login-right">
          <h2> Welcome Back to HealerJi!</h2>
          <div className="form-box">
            <form className="" onSubmit={handleSubmit}>
              {/* <label >Email</label> */}
              <input
                type="email"
                placeholder="Enter email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <label >Password</label> */}
              <input
                type="password"
                placeholder="Password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
            </form>
            <div className="user-register">
              <span>Not Registered ?</span>
              <Link to={"/signup"}> signUp</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
