import React from 'react';
// import QrCode from 'qrcode.react';
import './Wallet.css';
import QRImg from '../../assets/QR-code.jpg';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import baseURL from '../../../baseUrl';

const UserWallet = () => {

  const mail = localStorage.getItem("user")
  const sendMail = async () => {
    try {
      await axios.get(`${baseURL}/user/sendMail/${mail}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="user-wallet">
        <div className="user-wallet-left">
          <h3>Notice: </h3>
          <p>Please send us Follow up email to us to update your wallet very fast</p>
          {/* <p>Send mail:</p> */}
          <input type="text" placeholder="Your email" value={mail} />
          <button className='user-send-btn' onClick={sendMail}>Send</button>
        </div>
        <div className="user-wallet-right">
          <img src={QRImg} alt="" />
          <p>ayushkiid@okaxis</p>
        </div>
        <div className="user-wallet-left">
          {/* <img src={QRImg} alt="" /> */}
          <p>You can also call us at: <br /> <b>+91 8789189856</b></p>
        </div>
      </div>
    </>
  );
};

export default UserWallet;
