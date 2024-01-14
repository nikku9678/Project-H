const { docterLogin, docterHomePage, doctorProfileUpdate, getDocterProfile, docterWelcome, requestFund, userListPage, chatWithUser, doctorStats} = require('../controllers/docter.controller');
const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { getAllSession, deleteSession, updateSession, createSession, getAllUserSession } = require("../controllers/session.controller")
const { createQuestion, deleteQuestion, updateQuestion, getDocterQuestions } = require("../controllers/question.controller");
const { deleteNotification, getNotification, getUniqueNotification } = require('../controllers/notification.controller');

router.post('/login',docterLogin);
router.get('/home',validateToken,docterHomePage);
router.get('/welcome',validateToken,docterWelcome); // ? Testing ONLY
router.get('/profile/:email',getDocterProfile);
router.post('/wallet/:email/:amount',validateToken,requestFund);
router.post('/list/user',validateToken,userListPage);
router.post('/list/user/chat/:chatId',validateToken,chatWithUser);
router.get('/docStats/:docId', validateToken, doctorStats);
router.post("/profile/update",doctorProfileUpdate);

router.post('/sessions',createSession);
router.put('/sessions/:sessionId', updateSession);
router.delete('/sessions/:sessionId', deleteSession);
router.get('/sessions/:doctorId',getAllSession);
router.get('/userSessions/:doctorId',getAllUserSession);

router.post('/questions',createQuestion);
router.put('/questions/:questionId', updateQuestion);
router.delete('/questions/:questionId', deleteQuestion);
router.get('/doc/questions/:doctorId', getDocterQuestions);

router.delete('/remove/notification/:notificationId', deleteNotification);
router.get('/see/notification/:doctorId', getNotification);
router.get('/see/notification/:doctorId/:userId', getUniqueNotification);

module.exports = router;