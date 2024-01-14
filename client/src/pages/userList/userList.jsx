import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userList.css'
import Navbar from "../../components/navbar/Navbar";
import baseURL from '../../../baseUrl';


const UserListPage = () => {
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    axios.get(`${baseURL}/admin/userList`)
      .then(response => {
        console.log(response.data);
        setUserList(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="userlist">
        <h2>User List</h2>

        <div className="userlist-all">
          {userList.map(data => (
            <div className='userlist-data' key={data.id}>
              <div className='user-img'>
                <img
                  src = {`${baseURL}/Uploads/${data.photo.replace(/Uploads\\/g, '')}`}
                  alt="" />
              </div>
              <div className='userlist-user-info'>
                <p><span>Name: </span>{data.name}</p>
                {/* <p><span>Age: </span>{data.age}</p> */}
                <p><span>Phone no: </span>{data.phone}</p>
                <p><span>Email: </span>{data.email}</p>
                <p><span>Wallet Amount: </span>{data.wallet_price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default UserListPage;
