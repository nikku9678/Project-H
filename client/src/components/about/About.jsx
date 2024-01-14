import React from "react";
import "./about.css";
import onlineCounseling from "../../assets/DocterAssets/5.png";

const About = () => {
  return (
    <div id='about-section'>
      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-intro">
          <p className="hero-text">
            Feeling totally burnt out from all the stress in your life? Traditional therapy can be hella expensive and tough to schedule around your busy life. With all the pressure to perform at work, school, and in your personal life, it's no wonder that stress and burnout are at an all-time high. But you deserve to have access to mental health services that fit your lifestyle and budget. That's where our mental health app and virtual counseling platform comes in. We offer therapy for stress and burnout through online counseling sessions with licensed counselors who totally get what you're going through. Our app lets you connect with your counselor through text therapy and secure messaging, so you can get support whenever you need it, no matter where you are. And our virtual platform means you can access quality mental health care without having to worry about transportation or scheduling conflicts. With our mental health app and virtual counseling platform, you can take control of your mental health in a way that works for you.
          </p>
        </div>

        <div className="home-video-container">
          {/* <iframe
            id="ytplayer"
            className="home-video"
            type="text/html"
            width="640"
            height="360"
            src="https://www.youtube.com/embed/Hzi3PDz1AWU?autoplay=1&origin=https://youtu.be/Hzi3PDz1AWU"
            frameBorder="0"
          ></iframe> */}
        </div>
      </div>
    </div>
  );
};

export default About;
 