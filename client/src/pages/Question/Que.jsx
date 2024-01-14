import React, { useState } from "react";
import "./Que.css";
import { Navigate, useNavigate } from "react-router-dom";
import UserAns from "./UserAns";
import Navbar from "../../components/navbar/Navbar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import baseURL from "../../../baseUrl";

function Que() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userAns, setuserAns] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const userToken = localStorage.getItem("token");
  const docId = jwtDecode(userToken).userId;

  const addQuesHandler = () => {
    setShow(true);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {

      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
      setShow(false);
    }
    console.log(questions);
  };

  const handleEditQuestion = (index) => {
    setEditIndex(index);
    setNewQuestion(questions[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(-1);
      setNewQuestion("");
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setNewQuestion("");
  };
  const cancelHandler = () => {
    setShow(false);
  };
  const submitQuestions= async()=>{
    await axios.post(`${baseURL}/docter/questions`, {
      doctorId: docId,
      question: questions
    }).then( navigate('/docHome'));
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <>
    <Navbar/>
      <div className="main-add-ques">
      <div className="add-ques">
        <button onClick={addQuesHandler}>Add question</button>
        <button onClick={submitQuestions}>Submit Questions</button>
      </div>

      <ul className="ques-list">
        {questions.map((question, index) => (
          <li key={index} className="show-ques">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <br></br>
                <div className="list-edit">
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="show-ques">
                  <p className="question">
                    {index + 1}. {question}
                  </p>
                  <div className="list-edit">
                    <button onClick={() => handleEditQuestion(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteQuestion(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {show && (
        <>
          <div className="ques-set">
            <input
              type="text"
              placeholder="Enter your Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <div className="add-cancel">
              <button onClick={handleAddQuestion}>Add</button>
              <button onClick={cancelHandler}>Discard</button>
            </div>
          </div>
        </>
      )}
      {userAns && (
        <>
          <UserAns questions={questions}></UserAns>
        </>
      )}
      </div>
    </>
  );
}

export default Que;
