import "./ChatHome.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Navbar from '../../components/navbar/Navbar';
import baseURL from "../../../baseUrl";
import ChatToken from "../chatToken/chatToken";


const socket = io.connect(`${baseURL}`);

const localUserToken = localStorage.getItem("userToken") //USER
const localDocterToken = localStorage.getItem("token")  //DOCTOR
let localUserId = ""
let localDocterId = ""
let testLocalUserId;
let testLocalDocterId;

let LOGGED_IN_USER_ID = "";
let LOGGED_IN_DOCTER_ID = "";

let getClickedDocter;

let anonymousUserName;
let getData;

let joinRoomPayload;

function ChatHome() {
   const [username, setUsername] = useState("");
   const [room, setRoom] = useState("");
   const [showChat, setShowChat] = useState(false);

   const getUserInfo = async (testLocalUserId) => {
      const response = await axios.get(`${baseURL}/user/profile/${testLocalUserId}`)
      // console.log("USER DATA ===> ", response.data.anonymousName);
      anonymousUserName = response.data.anonymousName
      return response;
   }

   const getDoctorInfo = async (LOGGED_IN_DOCTER_ID) => {
      const response = await axios.get(`${baseURL}/user/docter/profile/${LOGGED_IN_DOCTER_ID}`)
      return response
   }

   const getNotificationData = async () => {
      const notificationData = await axios.get(`${baseURL}/user/see/User/notification/${roomId}`)
      return notificationData;
   };

   const storeNotification = async (LOGGED_IN_USER_ID, NEW_LOGGED_IN_DOCTER_ID) => {
      const userInformation = await getUserInfo(LOGGED_IN_USER_ID);
      const doctorInformaion = await getDoctorInfo(NEW_LOGGED_IN_DOCTER_ID);

      const docFee = parseInt(doctorInformaion.data.feePerMin, 10);

      const freeMin = 120;
      const maxTime = (Math.floor(userInformation.data.wallet_price / docFee)) * 60;
      const timeInMinutes = parseInt(freeMin + maxTime);

      const payload = {
         doctorId: NEW_LOGGED_IN_DOCTER_ID,
         userEmail: userInformation.data.email,
         userId: userInformation.data.id,
         userName: userInformation.data.name,
         roomId: room,
         userWalletAmount: userInformation.data.wallet_price,
         doctorChatFee: docFee,
         chatTime: timeInMinutes
      };

      // localStorage.setItem("chatTime", timeInMinutes)
      // localStorage.setItem("doctorFee", docFee);
      localStorage.setItem("userWallet", userInformation.data.wallet_price);
      localStorage.setItem("userIDWallet", userInformation.data.id);

      const response = await axios.post(`${baseURL}/user/send/notification`, payload);
   };

   const joinRoom = async () => {
      if (username !== "" && room !== "") {
         if (localUserToken) {
            localUserId = jwt_decode(localUserToken)
            testLocalUserId = String(localUserId.userId) || "";
            LOGGED_IN_USER_ID = parseInt(testLocalUserId, 10)
            let NEW_LOGGED_IN_DOCTER_ID = parseInt(getClickedDocter, 10)

            setTimeout(async () => {
               await storeNotification(LOGGED_IN_USER_ID, NEW_LOGGED_IN_DOCTER_ID)
            }, 0)
         };

         if (localDocterToken) {
            localDocterId = jwt_decode(localDocterToken);
         };

         let payload = {
            userId: username,
            roomId: room,
            localDocterId: testLocalDocterId,
            localUserId: testLocalUserId
         };
         socket.emit("join_room", payload);
         setShowChat(true);
      }
   };

   useEffect(() => {



      if (localUserToken) {
         localUserId = jwt_decode(localUserToken)
         testLocalUserId = String(localUserId.userId) || "";
         LOGGED_IN_USER_ID = parseInt(testLocalUserId, 10)

         getClickedDocter = localStorage.getItem("clickedDocter")
         let NEW_LOGGED_IN_DOCTER_ID = parseInt(getClickedDocter, 10)

         //TODO:- Calling RoomTable DB
         const getRoomID = async () => {
            const response = await axios.get(`${baseURL}/user/chat/docter/room/${getClickedDocter}`)
            console.log("GET ROOMID=====> ", response.data);
            let tempRoomId = response.data + testLocalUserId
            setRoom(tempRoomId);
            localStorage.setItem("ROOM", tempRoomId)
         }
         getRoomID();
         getUserInfo(LOGGED_IN_USER_ID);

         setUsername(anonymousUserName)
      };

      if (localDocterToken) {
         (async () => {
            localDocterId = jwt_decode(localDocterToken)
            const doctorInfo = await getDoctorInfo(parseInt(localDocterId.userId, 10));
            setUsername(`DOC-${doctorInfo.data.name}`)

            const doctorId = parseInt(localDocterId.userId, 10);

            const userId = parseInt(localStorage.getItem("clickedUser"), 10);

            axios.get(`${baseURL}/docter/see/notification/${doctorId}/${userId}`)
               .then((response) => {
                  const data = response.data[0];

                  // localStorage.setItem("chatTime", data.chatTime)
                  // localStorage.setItem("doctorFee", data.doctorChatFee);
                  localStorage.setItem("userWallet", data.userWalletAmount);
                  localStorage.setItem("userIDWallet", data.userId);

                  setRoom(response.data[0].roomId)
                  localStorage.setItem("ROOM", room);
               })
               .catch((error) => {
                  console.error('Error fetching data from the API:', error);
               });
         })();

         (async () => {
            const userId = localStorage.getItem("clickedUser")

            try {
               setTimeout(async () => {
                  await axios.delete(`${baseURL}/docter/remove/notification/${userId}`);
               }, 20000)
            } catch (error) {
               console.error('Error deleting the chat:', error);
            }
         })();
      }
   })

   return (
      <>
         <Navbar />
         <div className="App">
            {!showChat ? (
               <div className="joinChatContainer">
                  <h3>Join A Chat</h3>
                  <input
                     type="text"
                     placeholder="John..."
                     onChange={(event) => {
                        setUsername(event.target.value);
                     }}
                     value={username ? username : 'DEFAULT_NAME'}
                  // readOnly
                  />
                  <input
                     type="text"
                     placeholder="Room ID..."
                     onChange={(event) => {
                        setRoom(event.target.value);
                     }}
                     value={room ? room : 'DEFAULT_ROOM'}
                  // readOnly 
                  />
                  <button onClick={joinRoom}>Join A Room</button>
               </div>
            ) : (
               // <Chat socket={socket} username={username} room={room} />
               <ChatToken socket={socket} username={username} room={room} />
            )}
         </div>
      </>

   );
}

export default ChatHome;
