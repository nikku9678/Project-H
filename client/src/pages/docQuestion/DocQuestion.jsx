import "./docQuestion.css"
import MCQQuestionType from "../../components/docQuestions/questionType/questionType";
import NormalQuestionType from "../../components/docQuestions/questionType/questionType1"
import QuestionList from "../../components/docQuestions/questionList/questionList";
import QuestionList1 from "../../components/docQuestions/questionList/questionList1";
import React, { useState } from 'react';

const DocQuestion = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [questions, setQuestions] = useState([]);
   const [isMCQ, setIsMCQ] = useState(false);

   const handleAddQuestionClick = () => {
      setIsMCQ(true)
      setIsOpen(true);
      setIsOpen1(false);
   };

   const handleClosePopup = () => {
      setIsOpen(false);
      setIsMCQ(false)
   };

   const handleAddQuestion = (question) => {
      setQuestions([...questions, question]);
   };

   const handleDeleteQuestion = (index) => {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
   };

   const handleSubmit = () => {
      console.log(questions);
   };

   const [isOpen1, setIsOpen1] = useState(false);
   const [questions1, setQuestions1] = useState([]);

   const handleAddQuestionClick1 = () => {
      setIsOpen1(true);
      setIsOpen(false)
   };

   const handleClosePopup1 = () => {
      setIsOpen1(false);
   };

   const handleAddQuestion1 = (question) => {
      setQuestions1([...questions1, question]);
   };



   return (
      <div>
         {/* <button onClick={handleAddQuestionClick}>Add MCQ Question</button>
         {isOpen && <MCQQuestionType onClose={handleClosePopup} onAddQuestion={handleAddQuestion} />} */}

         {/* NORMAL ====== */}

         <button onClick={handleAddQuestionClick1}>Add Normal Question</button>
         {isOpen1 && <NormalQuestionType onClose1={handleClosePopup1} onAddQuestion1={handleAddQuestion1} />} 
         {<QuestionList1 questions={questions1} onDeleteQuestion={handleDeleteQuestion} />}

         {/* {<QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />}
        
         
         {/* {
            isMCQ ?
                  :<QuestionList1 questions={questions1} onDeleteQuestion={handleDeleteQuestion} />
         } */}


         <button onClick={handleSubmit}>Submit</button>
      </div>
   );
};


export default DocQuestion;