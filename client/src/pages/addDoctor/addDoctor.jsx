import React, { useState } from 'react';
import axios from 'axios';
import './addDoctor.css'
import Navbar from '../../components/navbar/Navbar';
import baseURL from "../../../baseUrl";
import toast, { Toaster } from "react-hot-toast";


const AddDoctorForm = () => {
   const [doctorData, setDoctorData] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      feePerMin: "",
      feePerMinSession: "",
      about: "",
      language: "",
      timings: "",
      rating: "",
      available: "",
   });

   const [selectedFile, setSelectedFile] = useState(null);

   const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
   };


   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setDoctorData({
         ...doctorData,
         [name]: value,
      });
   };

   const handleAddDoctor = async () => {
      try {
         const formData = new FormData();
         formData.append('name', doctorData.name);
         formData.append('email', doctorData.email);
         formData.append('password', doctorData.password);
         formData.append('phone', doctorData.phone);
         formData.append('feePerMin', doctorData.feePerMin);
         formData.append('feePerMinSession', doctorData.feePerMinSession);
         formData.append('about', doctorData.about);
         formData.append('language', doctorData.language);
         formData.append('timings', doctorData.timings);
         formData.append('rating', doctorData.rating);
         formData.append('available', doctorData.available);

         if (selectedFile) {
            formData.append('photo', selectedFile);
         };
         
         const response = await axios.post(`${baseURL}/admin/add/docter`, formData);

         toast("Doctor added successfully!!");

         setTimeout(() => {
            window.location.reload();
         }, 1500);

      } catch (error) {
         toast("Failed to add Doctor. Please try once again!!");
         console.log(error);
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
               duration: 1500,
            }}
         />
         <Navbar />
         <div className='add-doc'>
            <h2>Add Doctor</h2>
            <div className="form-group">
               <label>Name:</label>
               <input type="text" name="name" value={doctorData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Email:</label>
               <input type="email" name="email" value={doctorData.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Password:</label>
               <input type="password" name="password" value={doctorData.password} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Phone Number:</label>
               <input type="text" name="phone" value={doctorData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Language:</label>
               <input type="text" name="language" value={doctorData.language} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Fee Per Minute:</label>
               <input type="text" name="feePerMin" value={doctorData.feePerMin} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Fee Per Session:</label>
               <input type="text" name="feePerMinSession" value={doctorData.feePerMinSession} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>About</label>
               <input type="text" name="about" value={doctorData.about} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Timings:</label>
               <input type="text" name="timings" value={doctorData.timings} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Rating:</label>
               <input type="text" name="rating" value={doctorData.rating} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Available:</label>
               <input type="checkbox" name="available" value={doctorData.available} onChange={handleInputChange} />
            </div>
            <div className="form-group">
               <label>Photo:</label>
               <input type="file" name="photo" onChange={handlePhotoUpload} />
            </div>

            <div className='doc-btn'>
               <button onClick={handleAddDoctor}>Submit</button>
            </div>

         </div>
      </>
   );
};

export default AddDoctorForm;
