import React from 'react';
import "./addQuestionButton.css"

const AddQuestionButton = ({ onAddQuestion }) => {
   return (
      <button onClick={() => onAddQuestion('')}>
         Add Question
      </button>
   );
};

export default AddQuestionButton;
