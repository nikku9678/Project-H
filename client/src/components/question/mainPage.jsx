import "./mainPage.css"

import React, { useState } from 'react';
import AddQuestionButton from './addQuestionButton';
import QuestionModal from './questionModel';

import QuestionBox from './questiionBox';

const MainPage = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [questionType, setQuestionType] = useState('');
   const [questionData, setQuestionData] = useState(null);

   const handleAddQuestion = (type) => {
      setQuestionType(type);
      setIsModalOpen(true);
   };

   const handleQuestionSubmit = (question) => {
      setQuestionData(question);
      setIsModalOpen(false);
      // Perform any necessary logic to store the question data
      console.log(question);
   };

   const handleToggle = () => {
      setQuestionType(questionType === 'mcq' ? '' : 'mcq');
   };

   return (
      <div>
         <h1>React Page</h1>
         <AddQuestionButton onAddQuestion={handleAddQuestion} />
         <button onClick={handleToggle}>
            Toggle Question Type: {questionType === 'mcq' ? 'MCQ' : 'Normal'}
         </button>
         {isModalOpen && (
            <QuestionModal
               questionType={questionType}
               onClose={() => setIsModalOpen(false)}
               onSubmit={handleQuestionSubmit}
            />
         )}
         {questionData && (
            <div>
               <h2>Stored Question:</h2>
               <pre>{JSON.stringify(questionData, null, 2)}</pre>
            </div>
         )}
      </div>
   );
};

export default MainPage;
