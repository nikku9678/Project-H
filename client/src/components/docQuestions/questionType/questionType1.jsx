import "./questionType.css"
import React, { useState } from 'react';

const Popup = ({ onClose1, onAddQuestion1 }) => {
   const [questionText1, setQuestionText1] = useState('');
  

   const handleQuestionSubmit1 = () => {
      const question = questionText1

      onAddQuestion1(question);
      onClose1();
   };

   return (
      <div className="popup">
         <h2>Add Normal Question</h2>
         <input
            type="text"
            value={questionText1}
            onChange={(e) => setQuestionText1(e.target.value)}
            placeholder="Enter the question"
         />
         <button onClick={handleQuestionSubmit1}>Submit</button>
         <button onClick={onClose1}>Cancel</button>
      </div>
   );
};


export default Popup;
