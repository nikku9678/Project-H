import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const notify = (msg) => toast(msg);
const chatTime = 60;
import "./conversation.css";
function Conversation({ socket, username, room }) {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatContainerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true); // add state for showing/hiding footer
  const [timer, setTimer] = useState(chatTime);

  const [startTimer, setStartTimer] = useState(false);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      setStartTimer(true);
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
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setStartTimer(true);
      setMessageList((list) => [...list, data]);

      if (data.message === "User Left the chat") {
        setShowFooter(false); // update state to hide footer
        notify("User left the Chat");
        setTimeout(function () {
          navigate("/doctorList");
        }, 2000); // 2000 milliseconds = 2 seconds
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

      // Clear interval and hide footer when timer expires
      if (timer === 0) {
        notify("Chat Over, recharge your wallet !");
        clearInterval(interval);
        setTimeout(function () {
          navigate("/doctorList");
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

  const formatTime = (time) => {
    if (startTimer) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-body" ref={chatContainerRef}>
          <div className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <span id="time">{messageContent.time}</span>
                    <span id="author">{messageContent.author}</span>
                  </div>
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
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <div className="timer">{formatTime(timer)}</div>
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default Conversation;
