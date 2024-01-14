require("dotenv").config()

const QuestionDB = require("../models/question.model");
const UserAnswerDB = require("../models/userAnswer.model");



// Create questions
const createQuestion = async (req, res) => {
   try {
      const { doctorId, question } = req.body;

      const delimiter = '#*';
      const stringQuestion = question.join(delimiter);

      const data = {
         doctorId: doctorId,
         question: stringQuestion
      };

      const newQuestion = await QuestionDB.create(data);
      res.status(201).json(newQuestion);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

// Read questions based on doctorId
const getDocterQuestions = async (req, res) => {
   try {
      const  {doctorId}  = req.params;
      const questions = await QuestionDB.findOne({ where: { doctorId: doctorId } });

      const delimiter = '#*';
      const outputArray = questions.dataValues.question.split(delimiter);

      res.status(200).json(outputArray);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

// Update a question
const updateQuestion = async (req, res) => {
   try {
      const { questionId } = req.params;
      const { doctorId, question } = req.body;
      const [updatedRows] = await QuestionDB.update(
         { doctorId, question },
         { where: { questionId } }
      );
      if (updatedRows === 1) {
         res.status(200).json({ message: 'Question updated successfully' });
      } else {
         res.status(404).json({ error: 'Question not found' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

// Delete a question
const deleteQuestion = async (req, res) => {
   try {
      const { questionId } = req.params;
      const deletedRows = await QuestionDB.destroy({ where: { questionId: questionId } });
      if (deletedRows === 1) {
         res.status(200).json({ message: 'Question deleted successfully' });
      } else {
         res.status(404).json({ error: 'Question not found' });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

const saveUsersAnswers = async (req, res) => {
      try {
         const { doctorId, userId, questionAns } = req.body;

         // const delimiter = "#*";
         // const stringQuestion = question.join(delimiter);

         const data = {
            doctorId: doctorId,
            userId: userId,
            question: questionAns,
         };

         const newQuestion = await UserAnswerDB.create(data);
         res.status(201).json(newQuestion);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Internal server error" });
      }
}

const getUserAnswers = async (req, res) => {
   try {
      const { doctorId, userId } = req.params;
      const questions = await UserAnswerDB.findOne({
         where: {
            doctorId: doctorId,
            userId: userId
         },
      });

      const delimiter = "#*";
      const quesAns = questions.dataValues.question.split(delimiter);

      const delimiter1 = "*";
      const fileredQuesAns = quesAns.split(delimiter1);

      res.status(200).json(fileredQuesAns);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
};

module.exports = {
   getDocterQuestions,
   createQuestion,
   deleteQuestion,
   updateQuestion,
   saveUsersAnswers,
   getUserAnswers,
};