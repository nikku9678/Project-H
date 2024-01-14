import React, { useState } from 'react';
import "./admin.css"
import img from "../../assets/no-bg-images/7.png"
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';

const Admin = () => {

  return (
    <>
      <Navbar />
      <div className="admin">
        <div className="admin-first">
          <img src={img} alt="Welcome Admin" />
          <h2>Welcome Admin</h2>
        </div>
        <div className="admin-second">
          <h3>Doctor Controller</h3>
          <div className="admin-btn">
            <Link to="/admin/addDoctor"><button>Add Doctor</button></Link>
            <Link to="/admin/doctorList"><button>Get Doctor List</button></Link>
            <button>Pay Doctor</button>
          </div>
        </div>
        <div className="admin-second">
          <h3>User Controller</h3>
          <div className="admin-btn">
            <Link to="/admin/userList"><button>Get User List</button></Link>
            <Link to="/admin/updateUserWallet"><button>Update user wallet</button></Link>
          </div>
        </div>
        <div className="admin-second">
          <h3>Chat Controller</h3>
          <div className="admin-btn">
            <Link to="/admin/chatList"><button>Chat List</button></Link>
            <Link to="/admin/chatById"><button>Get Specific Chat Based on ID</button></Link>
          </div>
        </div>
        <div className="admin-second">
          <h3>Admin Controller</h3>
          <div className="admin-btn">
            <Link to="/admin/registerAdmin"><button>Register Admin</button></Link>
            <Link to="/admin/editAccessKey"><button>Edit Access Key</button></Link>
            <button>Get Money</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
