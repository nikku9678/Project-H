import React, { useState, useEffect } from "react";
import './UserAns.css';
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import baseURL from "../../../baseUrl";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function QuestionForm() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const navigate = useNavigate();
  
  let docId = localStorage.getItem("clickedDocter");
  let idocId = parseInt(docId);

  const userToken = localStorage.getItem("userToken")
  const userId = jwtDecode(userToken).userId;


  const getQuestions = async () => {
    const res = await axios.get(`${baseURL}/docter/doc/questions/${idocId}`);
    setQuestions(res.data);
  };

  useEffect(()=>{
      getQuestions();
  },[docId]);


  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const delimiterQA = '*'; // Delimiter between question and answer
    const delimiterPair = '#*'; // Delimiter between question-answer pairs

  // Combine questions and answers
    const formattedQA = questions.map((question, index) => {
      const answer = answers[index] || '';
      return `${question}${delimiterQA}${answer}`;
    }).join(delimiterPair);

    await axios.post(`${baseURL}/user/ans`,{
      userId: userId,
      doctorId: docId,
      questionAns: formattedQA
    }).then(navigate('/chat'));
  };

  return (
    <>
   <Navbar/>
    <div className="user-ans">
      <form onSubmit={handleSubmit}>
      <h2>Question Form</h2>
        {questions.map((question, index) => (
          <div key={index} className="ques">
            <label>{index+1}. {question}</label>
            <input
              type="text"
              value={answers[index]}
              onChange={(event) => handleAnswerChange(index, event)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

export default QuestionForm;
