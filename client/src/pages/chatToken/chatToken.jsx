import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
// import send from './send.svg';
import LoadingComponent from "../../components/loading_3aug/loading_3aug";
import axios from "axios";
import baseURL from "../../../baseUrl";
import "./ChatToken.css";
const notify = () => toast("Chat Over, recharge your wallet!");
const docterNotJoinedToast = () => toast("Waiting for doctor to join!");
const docterJoinedToast = () =>
  toast('Please press "Enter" again to send the message!');
// const userToken = localStorage.getItem("userToken");
// const userWalletAmount = localStorage.getItem("userWallet");
// const tokenAmount = userWalletAmount/10;
import Navbar from "../../components/navbar/Navbar";
const userToken = localStorage.getItem("userToken");
const userWalletAmount = 10000;
const tokenAmount = userWalletAmount / 10;
let flag = 0;

function ChatToken({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const chatContainerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [maxCharacters, setMaxCharacters] = useState(tokenAmount * 50); // Set your character limit
  const [token, setToken] = useState(tokenAmount);
  const [model, showModel] = useState(false);

  const walletUpdate = async (token, freeTokens) => {
    const stringUserId = localStorage.getItem("userIDWallet");
    const userId = parseInt(stringUserId);
    const payload = {
      cost: token * 10,
      userId: userId,
    };
    const response = await axios.put(`${baseURL}/user/wallet`, payload);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      if (currentMessage.replace(/\s/g, "").length <= maxCharacters) {
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
        if (userToken) {
          setMaxCharacters(
            maxCharacters - currentMessage.replace(/\s/g, "").length
          );
          setToken(
            parseFloat(
              token - parseFloat(currentMessage.replace(/\s/g, "").length / 50)
            )
          );
        }
      } else {
        toast("Character limit exceeded. Message not sent!!");
        toast("Please recharge your wallet!!");
      }
    }
  };

  // useEffect(() => {
  // socket.on("receive_message", (data) => {
  //   setIsLoading(false);
  //   setMessageList((list) => [...list, data]);
  //   if (data.message === "User Left the chat") {
  //     // Handle wallet update and chat ending here
  //     setToken(parseFloat(token - parseFloat((currentMessage.replace(/\s/g, '').length)/50)));
  //     walletUpdate(token,0);
  //     setShowFooter(false);
  //   }
  // });
  // }, [socket]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messageList]);

  const handleEndChat = () => {
    window.location.reload();
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    setCurrentMessage(inputText);
  };
  const handleShowQues = (e) => {
   showModel(!model)
  };
  const handleClose = (e) => {
    showModel(!model)
  };

  const ques_ans = [
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    {
      question: "What is a token?What is a token?What is a token?What is a token?",
      Answer:"Hello",
    },
    
    
  ];


  return (
    <>
      <Navbar></Navbar>{" "}
      <div className="w-chat-window">
        <div className="w-chat-header">
          <div className="w-chat-top">
            <p id="live">Live Chat</p>
          </div>
          <div className="w-chat-right">
            <div className="w-token">
              {
                <p>
                  {" "}
                  Characters:{" "}
                  {maxCharacters - currentMessage.replace(/\s/g, "").length}
                </p>
              }
              {
                <p>
                  {" "}
                  Tokens:{" "}
                  {parseInt(
                    token - currentMessage.replace(/\s/g, "").length / 50
                  )}
                </p>
              }
            </div>
            <button onClick={handleShowQues} className="endChat">
              Feed
            </button>
            <button onClick={handleEndChat} className="endChat">
              End
            </button>
          </div>
        </div>
        <div className="chat-body" ref={chatContainerRef}>
          {isLoading && !/^DOC/.test(username) ? <LoadingComponent /> : ""}
          <div className="message-container">
            {messageList.map((messageContent, index) => (
              <div
                key={index}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <p className="userMsg">{messageContent.message}</p>
                <p id="time">{messageContent.time}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            ))}
          </div>
        </div>
        {showFooter && (
          <div className="w-chat-footer">
            {userToken ? (
              <input
                placeholder={`Type something (Max ${maxCharacters} characters)`}
                value={currentMessage}
                onChange={handleChange}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
            ) : (
              <input
                placeholder={`Type something...`}
                value={currentMessage}
                onChange={handleChange}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
            )}

            <button onClick={sendMessage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28"
                viewBox="0 0 24 24"
                width="30"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        )}
        <Toaster />
      </div>
      {model && (
        <>
          <div className="chat-model">
            <div className="model-close">
              <button onClick={handleClose}>close</button>
            </div>
            <div className="model-ques-ans">
            <ul>

            {ques_ans.map((q,index)=><>
              <li>
                <p style={{fontWeight:'600'}}>Q {index+1}. {q.question}</p>
                <p>A. {q.Answer}</p>
               
              </li>
            </>)}
            {/* <li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            </li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            <li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            </li>
            <li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            </li>
            <li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            </li>
            <li>
            <p>1. Lorem ipsum dolor sit amet.</p>
          <p>Answer. Lorem ipsum dolor sit amet.</p>
            </li> */}
            
            
          </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ChatToken;
