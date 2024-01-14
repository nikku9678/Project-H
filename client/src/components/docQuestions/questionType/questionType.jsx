import "./questionType.css"
import React, { useState } from 'react';

const Popup = ({ onClose, onAddQuestion }) => {
   const [questionText, setQuestionText] = useState('');
   const [option1, setOption1] = useState('');
   const [option2, setOption2] = useState('');
   const [option3, setOption3] = useState('');
   const [option4, setOption4] = useState('');

   const handleQuestionSubmit = () => {
      const question = {
         questionText,
         options: [option1, option2, option3, option4],
      };
      onAddQuestion(question);
      onClose();
   };

   return (
      <div className="popup">
         <h2>Add MCQ Question</h2>
         <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter the question"
         />
         <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            placeholder="Option 1"
         />
         <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            placeholder="Option 2"
         />
         <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            placeholder="Option 3"
         />
         <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            placeholder="Option 4"
         />
         <button onClick={handleQuestionSubmit}>Submit</button>
         <button onClick={onClose}>Cancel</button>
      </div>
   );
};


export default Popup;
