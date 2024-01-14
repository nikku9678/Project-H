import React, { useState } from "react";
import "./BookingPage.css";
import Navbar from "../navbar/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import baseURL from "../../../baseUrl";

const BookingPage = () => {
   const [age, setAge] = useState("");
   const [gender, setGender] = useState("");
   const [medicalHistory, setMedicalHistory] = useState("");
   const [presentingIssue, setPresentingIssue] = useState("");
   const [treatmentGoal, setTreatmentGoal] = useState("");
   const [phone, setPhone] = useState("");
   const [consent, setConsent] = useState(false);
   const [file, setFile] = useState('');
   const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
   const [showBookingPrompt, setShowBookingPrompt] = useState(false);

   let userToken = localStorage.getItem("userToken");
   const tokenData = jwt_decode(userToken);
   const userId = tokenData.userId;

   const navigate = useNavigate();

   const handleBookingSubmit = async (e) => {
      e.preventDefault();

      console.log("Booking Data:", {
         age,
         gender,
         medicalHistory,
         presentingIssue,
         treatmentGoal,
         phone,
         consent,
         file
      });

      try {
         let id = localStorage.getItem('docId');
         const formData = new FormData();
         formData.append('doctorId', id);
         formData.append('userId', parseInt(userId));
         formData.append('age', parseInt(age));
         formData.append('consent', consent);
         formData.append('gender', gender);
         formData.append('phone', phone);
         formData.append('medicalHistory', medicalHistory);
         formData.append('presentingIssue', presentingIssue);
         formData.append('treatmentGoal', treatmentGoal);

         if (file) {
            formData.append('file', file);
         };

         const response = await axios.post(`${baseURL}/user/session`, formData);

         setShowBookingPrompt(false);
         setShowBookingConfirmation(true);

         setAge("");
         setGender("");
         setMedicalHistory("");
         setPresentingIssue("");
         setTreatmentGoal("");
         setPhone("");
         setConsent(false);
         setFile(null);
      } catch (error) {
         console.log("Error in storing session ", error);
      }
   };

   const handleBookSession = () => {
      if (consent) {
         setShowBookingPrompt(true);
      };

      const bk = document.getElementById('bk-show');
      const bk_session = document.getElementById('book-session-hide');

      bk.style.display = "none";
      bk.style.top = "0";
      bk_session.style.display = "none";
      bk_session.style.top = "0";
   };

   const handleCancelBookSession = () => {
      setShowBookingPrompt(false);
      setShowBookingConfirmation(false);

      const bk = document.getElementById('bk-show');
      const bk_session = document.getElementById('book-session-hide');

      bk.style.display = "block";
      bk.style.top = "0";
      bk_session.style.display = "flex";
      bk_session.style.top = "0";
   };

   const handleDoneBooking = () => {
      setShowBookingPrompt(false);
      setShowBookingConfirmation(false);
      navigate('/doctorList')
   };

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
   };

   return (
      <>
         <Navbar />
         <div className="booking-page">
            <div className="booking-session-consent " id="bk-show">
               <p>
                  By proceeding with this booking, you confirm that you understand and agree to the following:
               </p>
               <ul>
                  <li>
                     Purpose of the Service:
                     <ul>
                        <li>
                           You are scheduling an appointment with a qualified doctor to seek medical advice or treatment.
                        </li>
                        <li>
                           The doctor will provide professional guidance based on the information you provide.
                        </li>
                        <li>
                           The doctor's advice does not replace an in-person examination or consultation.
                        </li>
                     </ul>
                  </li>
                  <li>
                     Confidentiality:
                     <ul>
                        <li>
                           The information you share during the consultation will be treated as confidential and will only be accessible to authorized personnel involved in your care.
                        </li>
                        <li>
                           However, please be aware that no online platform can guarantee 100% security, and there is a minimal risk of unauthorized access to your information.
                        </li>
                     </ul>
                  </li>
                  <li>
                     Limitations:
                     <ul>
                        <li>
                           While the doctor will make every effort to provide accurate and reliable advice, there are inherent limitations to online consultations.
                        </li>
                        <li>
                           The doctor cannot physically examine you or perform diagnostic tests, which may affect the accuracy of the advice provided.
                        </li>
                     </ul>
                  </li>
                  <li>
                     Emergency Situations:
                     <ul>
                        <li>
                           If you are experiencing a medical emergency, please call your local emergency number immediately or visit the nearest healthcare facility.
                        </li>
                        <li>
                           Online consultations are not suitable for urgent or life-threatening conditions.
                        </li>
                     </ul>
                  </li>
                  <li>
                     Informed Decision:
                     <ul>
                        <li>
                           You acknowledge that you are making an informed decision to seek medical advice through this online platform.
                        </li>
                        <li>
                           You understand the limitations and potential risks associated with online consultations.
                        </li>
                     </ul>
                  </li>
                  <li>
                     Personal Responsibility:
                     <ul>
                        <li>
                           You are responsible for providing accurate and complete information about your health condition, medical history, and any relevant details.
                        </li>
                        <li>
                           It is your responsibility to follow the doctor's advice and seek further medical attention if necessary.
                        </li>
                     </ul>
                  </li>
               </ul>
               <p>
                  Please read and understand the above information carefully before proceeding with the booking. If you have any questions or concerns, feel free to ask the doctor during the consultation.
               </p>
               <label htmlFor="consent" className="checkbox-row">
                  <input
                     type="checkbox"
                     id="consent"
                     checked={consent}
                     onChange={(e) => setConsent(e.target.checked)}
                  />
                  I give my consent and understand the confidentiality policies.
               </label>
            </div>

            <div className="booking-content" id="book-session-hide">
               {consent ? (<>
                  <button className="book-session-button" onClick={handleBookSession} disabled={!consent}>
                     Book Session
                  </button>
               </>) : (
                  <>
                     <button className="book-session-button-disabled" onClick={handleBookSession} disabled={!consent}>
                        Book Session
                     </button>
                  </>
               )}

            </div>

            {showBookingPrompt && (
               <div className="booking-popup">
                  <h3 className="heading_Name">Book Session</h3>
                  <form onSubmit={handleBookingSubmit}>
                     <label htmlFor="age">Age:</label>
                     <input type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />

                     <label htmlFor="gender">Gender:</label>
                     <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required />

                     <label htmlFor="medicalHistory">Medical History:</label>
                     <textarea
                        id="medicalHistory"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        required
                     ></textarea>

                     <label htmlFor="presentingIssue">Present Issue:</label>
                     <textarea
                        id="presentingIssue"
                        value={presentingIssue}
                        onChange={(e) => setPresentingIssue(e.target.value)}
                        required
                     ></textarea>

                     <label htmlFor="treatmentGoal">Treatment Goal:</label>
                     <textarea
                        id="treatmentGoal"
                        value={treatmentGoal}
                        onChange={(e) => setTreatmentGoal(e.target.value)}
                        required
                     ></textarea>

                     <label htmlFor="Phone">Phone no.:</label>
                     <textarea
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                     ></textarea>

                     <label htmlFor="file">Upload Any Medical Document:</label>
                     <input type="file" id="file" name='file' onChange={handleFileChange} />

                     <div className="buttons-class">
                        {consent ? (<>
                           <button type="submit" className="submit-button" disabled={!consent}>
                              Submit
                           </button>
                        </>) : (
                           <>
                              <button type="submit" className="submit-button-disabled" disabled={!consent}>
                                 Submit
                              </button>
                           </>
                        )}

                        <button type="cancel" className="cancel-button" onClick={handleCancelBookSession}>Cancel</button>
                     </div>
                  </form>
               </div>
            )}

            {showBookingConfirmation && (
               <div className="booking-confirmation-popup">
                  <h3>Thank you for booking a session!</h3>
                  <p>We will get in touch with you shortly.</p>
                  <button onClick={handleDoneBooking}>Done</button>
               </div>
            )}
         </div>
      </>
   );
};

export default BookingPage;
