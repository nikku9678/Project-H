import React from 'react';

const QuestionList = ({ questions, onDeleteQuestion, isMCQ }) => {
   console.log("Question NORMAL==>  ", questions);

   return (
      <div className="question-list">
         {questions.map((question, index) => (
            <div key={index} className="question">
               <p>{question}</p>
               <div className="button-container">
                  <button onClick={() => onDeleteQuestion(index)}>Delete</button>
               </div>
            </div>
         ))}
      </div>
   );
};

export default QuestionList;
