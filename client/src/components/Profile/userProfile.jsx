import React, { useEffect, useState } from 'react';
import './userProfile.css'
import owlImg from "../../assets/owl_img.png";
import Navbar from '../navbar/Navbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import baseURL from "../../../baseUrl";


const UserProfile = () => {

  const userToken = localStorage.getItem("userToken")
  const userId = jwtDecode(userToken).userId;
  const navigate = useNavigate()

  const[anonymousName, setAnonymousName] = useState("")
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [phone, setphone] = useState("")
  const [photo, setphoto] = useState("")
  const [wallet_price, setwallet_price] = useState("")
  const [age, setAge] = useState()

  const handleAddMoney = ()=>{
    navigate('/user/wallet')
  }

  const getUser = async()=>{
    const response = await axios.get(`${baseURL}/user/profile/${userId}`)
    setAnonymousName(response.data.anonymousName);
    setemail(response.data.email);
    setname(response.data.name);
    setphone(response.data.phone);
    setAge(response.data.age)
    setwallet_price(response.data.wallet_price);
    return response.data
  };

  useEffect(()=>{
      getUser();
  });

  
  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="left">
          <div className="first">
            <img src={owlImg} className="user-image" />
            <p className="user-name">{anonymousName}</p>
            <div className="profile-buttons">
              <Link to={'/doctorList'}><button className=''>Chat now</button></Link>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="second">
            <div className="info">
              <>
                <p className="">Name : {name} </p>
                <p>(only visible to you !)</p>
              </>
              <p className="p">Age: 21</p>
              <p className="">Phone no: {phone} </p>
              <p className="">Email: {email}</p>
             
            </div>
            <div className="profile-buttons">
              <button>Edit</button>
              <button>Save</button>
            </div>
          </div>
          <div className="third">
            <p className="p">Wallet Amount : {wallet_price}</p>
            <div className="profile-buttons">
              <button onClick={handleAddMoney}>Add Money</button>
              <Link to={'/help'}><button>Help and Support</button></Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UserProfile;
