import React from 'react';

const QuestionList = ({ questions, onDeleteQuestion, isMCQ }) => {
   console.log("Question mcq ==>  ",questions);

   return (
      <div className="question-list">
         {questions.map((question, index) => (
            <div key={index} className="question">
               <p>{question.questionText}</p>
               <ul>
                  {question.options.map((option, optionIndex) => (
                     <li key={optionIndex}>{option}</li>
                  ))}
               </ul>
               <div className="button-container">
                  <button onClick={() => onDeleteQuestion(index)}>Delete</button>
               </div>
               
            </div>
         ))}
      </div>
   );

   // if (isMCQ){
   //    return (
   //       <div className="question-list">
   //          {questions.map((question, index) => (
   //             <div key={index} className="question">
   //                <p>{question.questionText}</p>
   //                <ul>
   //                   {question.options.map((option, optionIndex) => (
   //                      <li key={optionIndex}>{option}</li>
   //                   ))}
   //                </ul>
   //                <div className="button-container">
   //                   <button onClick={() => onDeleteQuestion(index)}>Delete</button>
   //                </div>
   //             </div>
   //          ))}
   //       </div>
   //    );
   // }else{
   //    return (
   //       <div className="question-list">
   //          {questions.map((question, index) => (
   //             <div key={index} className="question">
   //                <p>{question}</p>
   //                <div className="button-container">
   //                   <button onClick={() => onDeleteQuestion(index)}>Delete</button>
   //                </div>
   //             </div>
   //          ))}
   //       </div>
   //    );
   // }
   
};

export default QuestionList;
