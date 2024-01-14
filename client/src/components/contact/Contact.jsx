import React, { useRef } from "react";
import mail from "../../assets/images/7.svg";
import instagram from "../../assets/images/8.svg";
import facebook from "../../assets/images/9.svg";
import contactImg from "../../assets/ContactImg.png";
import "./contact.css";

const Contact = () => {
  const form = useRef();

  const sendMail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    console.log("Form Data:", formDataObject);
    form.current.reset();
  };

  return (
    <div id="contact-section">
      <section id="contact">
        <div className="contact-titles">
          <h2>Contact Us</h2>
        </div>
        <div className="contact__container">
          
          <div className="form">
          <form ref={form} onSubmit={sendMail}>
            <input type="text" name="name" placeholder="Your Full Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="10" placeholder="Your message" required></textarea>
            <button type="submit" className="btn btn-primary">Send message</button>
          </form>
          </div>
          <div className="contact-img">
            <img src={contactImg} alt="Contact Image" />
          </div>
         
        </div>
        <div className="contact__options">
            <article className="contact__option">
              <img src={mail} alt="Mail Icon" />
            </article>
            <article className="contact__option">
              <img src={instagram} alt="Instagram Icon" />
            </article>
            <article className="contact__option">
              <img src={facebook} alt="Facebook Icon" />
            </article>
          </div>
      </section>
    </div>
  );
};

export default Contact;
 