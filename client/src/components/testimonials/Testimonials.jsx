import React from "react";
import feed1 from "../../assets/test_img1.png";
import feed2 from "../../assets/test_img2.png";
import feed3 from "../../assets/test_img3.png";
import owlImg from "../../assets/owl_img.png";
import "./testimonials.css";

const Testimonials = () => {
  return (
    <>
     
      <div className="test-box">
        <h2>Our Testonomials</h2>
      <div className="feed-section">
        <div className="feed-img-container">
          <div className="box">
            <img src={owlImg} alt="" />
            <h3>Ayush</h3>
              <p>The practical strategies offered brought about a transformative shift in my mindset,
                leading to personal growth and fulfillment.</p>
          </div>
          <div className="box">
          <img src={owlImg} alt="" />
              <h3>Ambika</h3>
              <p>The expert advice provided a fresh perspective and empowered me to make positive changes in my life.</p>
          </div>
          <div className="box">
          <img src={owlImg} alt="" />
              <h3>Aditya</h3>
              <p>Life-changing support! The compassionate guidance helped me gain new perspectives and effective coping strategies.</p>
          </div>
          {/* <img className="feed-img" src={feed1} alt="Feed Image 1" />
          <img className="feed-img" src={feed2} alt="Feed Image 2" />
          <img className="feed-img" src={feed3} alt="Feed Image 3" /> */}
        </div>
      </div>

      {/* PART 5  */}
      <div className="feed-section">
        <div className="box-container">
          <h2 className="box-title1">Are you ready?</h2>
          <button className="box-btn btn-hover class-7">Start your journey</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Testimonials;
 