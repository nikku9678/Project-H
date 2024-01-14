const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const { authAccessKey, adminRegister, adminLogin, getMoney, adminDocterAdd, getDocterList, payDocter, getUserList, getChatList, getChat, addAccessKey, changeAccessKey, upload, updateWallet } = require("../controllers/admin.controller")


// TODO :- ADMIN
router.post('/accessKey', authAccessKey);
router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.post('/getMoney', getMoney);
router.post('/editAccessKey', changeAccessKey);

// TODO :- DOCTER
router.post('/add/docter', upload, adminDocterAdd);
router.get('/docterList', getDocterList);
router.post('/payDocter', payDocter);

// TODO :- USER 
router.get('/userList', getUserList);

// TODO :- CHAT
router.get('/chatList/:mail', getChatList);
router.get('/getChat/:id', getChat);

router.post('/add/accesskey', addAccessKey);

//Update user wallet
router.put('/update/user/wallet', updateWallet);

module.exports = router;


