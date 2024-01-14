import React from "react";
import owlImg from "../../assets/owl_img.png";
import session from "../../assets/session-img.png";
import community from "../../assets/comm_img.png";
import { useNavigate } from "react-router-dom";
import "./services.css";

const Services = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/doctorList");
  };

  return (
    <div id="services-section">
      {/* CTA SECTION */}
      {/* PART 1 */}
      <h1 className="cta-heading2 h11">Our Counseling Services</h1>
      <div className="cta-section">
        <div className="cta-img-container">
          <img className="cta-img" src={owlImg} alt="Owl Image" />
        </div>

        <div className="cta-intro">
          <h2 className="cta-subheading-text">Speak Freely, Heal Anonymously</h2>
          <p className="cta-text">
            Anonymous Chats for Mental Health, Your Voice Matters in this Non-judgmental Space of Support and Connection
          </p>
          <button className="cta-chat-button" onClick={handleClick}>Chat Now</button>
        </div>
      </div>

      {/* PART 2 */}
      <div className="cta-section part2">
      
        <div className="cta-intro">
          <h2 className="cta-subheading-text">Connect Face-to-Face</h2>
          <p className="cta-text">
            Start a Video Session for Mental Health and Experience Empathetic Support from Qualified Professionals
          </p>
          <button className="cta-chat-button" onClick={handleClick}>
            Book 121 session
          </button>
        </div>
        <div className="cta-img2-container">
          <img className="cta-img2"  src={session} alt="Owl Image" />
        </div>
      </div>

      {/* PART 3 */}
      <div className="cta-section">
        <div className="cta-img2-container pic">
          <img className="cta-img2 " src={community} alt="Owl Image" />
        </div>

        <div className="cta-intro">
          <h2 className="cta-subheading-text">Connect, Share, and Heal</h2>
          <p className="cta-text">
            Join a Community Chat for Mental Health and Connect with Individuals on a Similar Journey
          </p>
          <button className="cta-chat-button">JOIN community</button>
        </div>
      </div>
    </div>
  );
};

export default Services;
 