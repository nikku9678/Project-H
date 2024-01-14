import React, { useState } from 'react';
import './questionModel.css';


const QuestionModal = ({ questionType, onClose, onSubmit }) => {
   const [question, setQuestion] = useState('');
   const [option1, setOption1] = useState('');
   const [option2, setOption2] = useState('');
   const [option3, setOption3] = useState('');
   const [option4, setOption4] = useState('');

   const handleSubmit = () => {
      
      if (questionType === 'mcq') {
         const questionData = {
            question,
            options: [option1, option2, option3, option4],
         };
        

         onSubmit(questionData);
      } else {
         const questionData = { question };
         onSubmit(questionData);
      }
      setQuestion('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
   };

   return (
      <div className="modal">
         <h2>Add Question</h2>
         <label>Question:</label>
         <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
         />
         {questionType === 'mcq' && (
            <>
               <label>Option 1:</label>
               <input
                  type="text"
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
               />
               <label>Option 2:</label>
               <input
                  type="text"
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
               />
               <label>Option 3:</label>
               <input
                  type="text"
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
               />
               <label>Option 4:</label>
               <input
                  type="text"
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
               />
            </>
         )}
         <div className="modal-buttons">
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
         </div>
      </div>
   );
};

export default QuestionModal;
