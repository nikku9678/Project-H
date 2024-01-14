import React, { useState } from "react";
import "./Quiz.css";
import Result from "./Result";
import Answer from "./Answer";
import { Navigate, useNavigate } from "react-router-dom";
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    id: 4,
    question:
      "Which programming language is often used for building web applications?",
    options: ["Java", "Python", "C#", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    id: 5,
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showScore, setshowScore] = useState(false);
  const [showAnswer, setshowAnswer] = useState(false);
  const [showQuiz, setshowQuiz] = useState(true);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    // Calculate the score
    const newScore = questions.reduce((acc, { id, correctAnswer }) => {
      return answers[id] === correctAnswer ? acc + 1 : acc;
    }, 0);

    // Set the score
    setScore(newScore);
    setshowQuiz(false);
    setshowScore(true);
  };

  const handleShowAllAnswers = () => {
    setShowAllAnswers(true);

    setshowAnswer(true)
    setshowScore(false)
  };
const handleGoBack=()=>{
    navigate('/upload')
}
  return (
    <div>
      {showQuiz && (
        <>
          <div className="quiz">
            <h2>Quiz App</h2>
            <form>
              {questions.map(({ id, question, options }, index) => (
                <div key={id} className="quiz-que">
                  <p>
                    {index + 1}. {question}
                  </p>
                  {options.map((option) => (
                    <label key={option} className="que-label">
                      <input
                        type="radio"
                        name={`question_${id}`}
                        value={option}
                        checked={answers[id] === option}
                        onChange={() => handleOptionChange(id, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button type="button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      {showScore && (
        <>
          <div className="res">
            {score !== null && (
              <div className="res-cont">
                <h2>Result</h2>
                <p>
                  Your score: {score} out of {questions.length}
                </p>
                {!showAllAnswers && (
                  <div className="ans-btn">
                    <button type="button" onClick={handleShowAllAnswers}>
                    Show All Answers
                  </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {showAnswer && (
        <>
          <div className="answer">
            {showAllAnswers && (
              <div>
                <h2>Answers</h2>
                {questions.map(({ id, question, correctAnswer },index) => (
                  <p key={id}>
                    <strong>{index+1}. {question}</strong> - {correctAnswer}
                  </p>
                ))}
                <div className="ans-btn">
                    <button onClick={handleGoBack}>Go Home</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
