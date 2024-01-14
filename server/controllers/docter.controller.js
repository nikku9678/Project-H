require("dotenv").config()

const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const saltRound = 10
const DocterDB = require("../models/docter.model");
const ChatDB = require('../models/chat.model');
const reqFundMailTemplate = require("../SMTP/mailTemplate");
const adminDB = require('../models/healerJi.model')


const docterLogin = async (req, res) => {
   const { email, password } = req.body;

   try {
      if (!(email && password)) {
         res.send(`Missing email or password !`)
      }

      const docterInfo = await DocterDB.findOne({ where: { email: email } });
      if (!docterInfo) {
         res.status(404);
         res.send('Not found !');
         return;
      }
      else if (! await bcrypt.compare(req.body.password, docterInfo.password)) {
         res.send('Incorrect password !');
         return;
      }

      const token = await generateToken(docterInfo.dataValues.id);
      res.json({ docterToken: token });

   } catch (error) {
      console.log(`Error in docterLogin ${error}`);
   }

}

const docterHomePage = async (req, res) => {

}

const docterWelcome = async (req, res) => {

}

const getDocterProfile = async (req, res) => {
   const { email } = req.params;

   try {
      const profile = await DocterDB.findOne({ where: { email: email } });

      if (!profile) {
         res.send('Invalid Id!!, No doctor found.');
         return;
      };

      res.send(profile.dataValues);
   } catch (error) {
      console.log(error);
   }
};

const requestFund = async (req, res) => {
   const { email, amount } = req.params;

   const docData = await DocterDB.findOne({ where: { email: email } });
   const adminData = await adminDB.findOne({ where: { doctorId: docData.dataValues.id } });

   if (reqFundMailTemplate('requestDocFund', docData.dataValues.name, docData.dataValues.email, amount) && reqFundMailTemplate('requestDocFundToAdmin', docData.dataValues.name, adminData.dataValues.email, amount)) {
      res.send(`Mail sent to doctor and admin`);
      return;
   } else {
      res.send(`Mail not sent. Some error occured`);
      return;
   }
};

const userListPage = async (req, res) => {

}

const chatWithUser = async (req, res) => {

}

const doctorStats = async (req, res) => {
   const { id } = req.body;

   const totalChats = await ChatDB.count({
      where: {
         docId: id,
      }
   });

   const totalMinutes = await ChatDB.sum('chatTime', {
      where: {
         docId: id,
      }
   });

   const earningByChat = await DocterDB.findOne('feePerMin', {
      where: {
         docId: id,
      }
   });

   const earningBySession = await DocterDB.findOne('feePerMinSession', {
      where: {
         docId: id,
      }
   });

   // Total Session is Pending.
   const totalEarning = totalChats * earningByChat + totalChats * earningBySession;
   const totalSession = totalChats;

   // TODO :- Get user data in docStat. But How? Need Relation between ChatDB and DocDB and UserDB.
   // const patientData = await ChatDB.findOne();
   // res.send(totalChats, totalMinutes, totalEarning, totalSession);
   res.send('totalChats, totalMinutes, totalEarning, totalSession');

}


const doctorProfileUpdate = async (req, res) => {
   const {
      id,
      nameDoc,
      emailId,
      about,
      language,
      timings,
      feePerSession,
      feePerMin,
      availability,
   } = req.body;
   try {
      await DocterDB.update({
         name: nameDoc,
         language: language,
         about: about,
         email: emailId,
         feePerMin: feePerMin,
         feePerMinSession: feePerSession,
         timings: timings,
         available: availability,
      },
         {
            where: {
               id: id
            }
         }
      )

      res.status(200);
      res.send("Profile Updated !");

   } catch (error) {
      res.status(404);
      res.send("Error in Updating profile")
   }

};

module.exports = { doctorProfileUpdate, docterLogin, docterHomePage, docterWelcome, getDocterProfile, requestFund, userListPage, chatWithUser, doctorStats }


