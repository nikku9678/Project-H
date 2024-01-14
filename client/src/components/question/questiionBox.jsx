import React from 'react';
import './questionBox.css';

const QuestionBox = ({ questionType, questionData, onEdit, onDelete }) => {
   if (questionType === 'mcq') {
      const { question, options } = questionData;
      return (
         <div className="question-box">
            <div className="question-text">{question}</div>
            <div className="options">
               {options.map((option, index) => (
                  <div key={index} className="option">
                     <input type="radio" name={`option-${index}`} id={`option-${index}`} />
                     <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
               ))}
            </div>
            <div className="buttons">
               <button onClick={onEdit}>Edit</button>
               <button onClick={onDelete}>Delete</button>
            </div>
         </div>
      );
   } else if (questionType === 'normal') {
      const { question } = questionData;
      return (
         <div className="question-box">
            <div className="question-text">{question}</div>
            <div className="buttons">
               <button onClick={onEdit}>Edit</button>
               <button onClick={onDelete}>Delete</button>
            </div>
         </div>
      );
   } else {
      return null;
   }
};

export default QuestionBox;
