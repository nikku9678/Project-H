import "./main.css";
import floatingMen from "../../assets/homeImg1.png";
import mentalHealth from "../../assets/slogan.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import YouTube from 'react-youtube';

const Main = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/doctorList");
  };

  useEffect(() => {
    toast("Welcome to Healer Ji");
  }, []);

  return (
    <div className="outer-main-section">
      <div className="main-section">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "",
            style: {
              border: "1px solid black",
              padding: "0.4em",
              color: "#c0ffee",
              background: "#2775fc",
            },
          }}
        />
        <div className="home-img-container">
          <img src={floatingMen} alt="Welcome" className="home-img" />
        </div>
 
        <div className="home-intro">
          {/* <img
            className="intro-img"
            src={mentalHealth}
            alt="Don't let mental health issues bring you down"
          /> */}
          <p>Don't let mental health <br /> issues bring you down.</p>
        </div>
      </div>

      <div className="chat-box">
        <button className="chat-button" onClick={handleClick}>
          Chat Now
        </button>
        <div className="text-container">
          <p>🫂Personalized Support</p>
          <p>🔐Confidential Care</p>
          <p>💡Empowered Lives</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
