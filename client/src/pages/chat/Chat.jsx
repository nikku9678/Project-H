import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import send from './send.svg'
import LoadingComponent from "../../components/loading_3aug/loading_3aug";
import axios from "axios";
import baseURL from "../../../baseUrl";


const notify = () => toast('Chat Over, recharge your wallet !');
const timerToast = () => toast('Timer is On');
const docterNotJoinedToast = () => toast('Wating for docter to Join ! ');
const docterJoinedToast = () => toast('Please press "Enter" again to send message ! ');

const stringChatTime = localStorage.getItem("chatTime");
const chatTime = parseInt(stringChatTime, 10)
let flag = 0;

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatContainerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true); // add state for showing/hiding footer
  const [timer, setTimer] = useState(chatTime);
  const [startTimer, setStartTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [curTime, setCurTime] = useState(0);

  const walletUpdate = async (timeAlloted, timeConsumed, freeTime) => {
    if ((timeAlloted - timeConsumed) > freeTime) {
      const stringFee = localStorage.getItem("doctorFee");
      const fee = parseFloat(stringFee)

      const stringUserId = localStorage.getItem("userIDWallet");
      const userId = parseInt(stringUserId)

      const stringWallet = localStorage.getItem("userWallet");
      const wallet = parseFloat(stringWallet)

      const cost = wallet - (Math.ceil(((timeAlloted - freeTime) - timeConsumed) / 60) * fee);
      const payload = {
        cost: cost,
        userId: userId
      }
      const response = await axios.put(`${baseURL}/user/wallet`, payload)
    }
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      if (startTimer == true) {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      } else if (startTimer == false) {
        if (/^DOC/.test(username)) {
          setStartTimer(true)
          docterJoinedToast();
          setIsLoading(false);
        } else {
          docterNotJoinedToast();
        }
      }
    }
  };

  useEffect(() => {

    socket.on("receive_message", (data) => {
      setStartTimer(true)
      setIsLoading(false)
      setMessageList((list) => [...list, data]);
      if (data.message === "User Left the chat") {
        const stringTimer = localStorage.getItem("timer");
        const tempTimer = parseInt(stringTimer);
        walletUpdate(chatTime, tempTimer, 120);

        setShowFooter(false); // update state to hide footer
      }
    });
  }, [socket]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    // Start timer when showFooter is true

    if (showFooter && startTimer) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (flag == 0) {
        timerToast();
        flag = 1;
      }

      // Clear interval and hide footer when timer expires
      console.log("TIMER ===> ", timer);
      if (timer != 0) setCurTime(timer)
      localStorage.setItem("timer", timer);
      if (timer === 0) {
        notify();
        clearInterval(interval);

        setTimeout(function () {
          window.location.href = "/";
        }, 2000); // 2000 milliseconds = 2 seconds
        setShowFooter(false);
      }

      return () => clearInterval(interval);
    }
  }, [messageList, showFooter, timer]);




  useEffect(() => {
    // Reset timer when footer is shown again
    if (showFooter && startTimer) {
      setTimer(chatTime);
    }
  }, [showFooter]);


  const handleEndChat = () => {
    window.location.reload();
  }

  const formatTime = (time) => {
    if (startTimer) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
        <div className="timer">{formatTime(timer)}</div>
        <button onClick={handleEndChat} className="endChat">End Chat</button>
      </div>
      <div className="chat-body" ref={chatContainerRef}>
        {isLoading && !/^DOC/.test(username) ? <LoadingComponent /> : ""}
        <div className="message-container">
          {messageList.map((messageContent, index = Math.random()) => {
            return (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <p className="userMsg">{messageContent.message}</p>
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            );
          })}
        </div>
      </div>
      {showFooter && (
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Message"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />



          <button onClick={sendMessage}><svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none" /><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></button>
        </div>
      )}
      <Toaster />
      <Toaster />
    </div>
  );
}

export default Chat;