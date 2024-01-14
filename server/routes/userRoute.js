const express = require("express");
const router = express.Router();
const {
   getDocterProfile,
   userLogin,
   userRegister,
   userWelcome,
   getUserProfile,
   getDocterList,
   chatWithDocter,
   addWalletMoney,
   userHomePage,
   getAllDocterList,
   getDocterRoomId,
   updateWallet
} = require("../controllers/user.controller");
const validateToken = require("../middleware/validateToken");
const { storeSessionData, getSession, fileRetriveID, upload } = require("../controllers/sessionUser.controller");
const { addNotification, getNotificationRoomId } = require("../controllers/notification.controller");
const {
   saveUsersAnswers,
   getUserAnswers,
} = require("../controllers/question.controller");


router.post('/signup', userRegister)
router.post('/login', userLogin);
router.get('/home', userHomePage);
router.get('/welcome', userWelcome); // ? Testing ONLY
router.get('/profile/:id', getUserProfile);
// router.post('/wallet/:walletId', validateToken, addWalletMoney);
router.post('/list/docter', validateToken, getDocterList);
router.post('/list/docter/chat/:chatId', validateToken, chatWithDocter);

router.get('/docters', getAllDocterList);
router.get('/docter/profile/:id', getDocterProfile);

//SESSIONUser
router.post('/session', upload, storeSessionData);
router.get('/session/:userId', getSession);
// router.put('/yourmodels/:id')
// router.delete('/yourmodels/:id')

router.get('/session/file/:id', fileRetriveID);

router.get('/chat/docter/room/:doctorId', getDocterRoomId);

//NOTIFICATION
router.post('/send/notification', addNotification);
router.get('/see/User/notification/:roomId', getNotificationRoomId);

//WALLET
router.put('/wallet', updateWallet);

// Sedn mail after adding money.
router.get('/sendMail/:mail', addWalletMoney);

router.post("/ans", saveUsersAnswers);
router.get("/ans", getUserAnswers);

module.exports = router;