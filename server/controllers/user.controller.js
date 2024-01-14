require("dotenv").config();

const UserDB = require("../models/userDB.model");
const DocterDB = require("../models/docter.model");
const RoomTable = require("../models/room.modal");

const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const generateName = require("./anonymous/data");
const { sendMail } = require("../SMTP/mailer");
const { where } = require("sequelize");
const { addMoneyUser } = require("../SMTP/mailTemplate");

const saltRound = 10;
const anoNames = [];

// let mail = 'baibhavkumar303@gmail.com';
let mail = "adi22maurya@gmail.com";

const msg = {
   to: [mail],
   from: {
      name: "HealerJi",
      email: "adi22maurya@gmail.com",
   },
   subject: "Testing MAIL",
   text: "Start Living instead of surviving.",
   html: `Welcome to HealerJi ${mail}`,
};

const userWelcome = (req, res) => {
   res.send("Welcome !");
};

const userLogin = async (req, res) => {
   const { email, pass } = req.body;
   const password = pass;

   try {
      if (!(email && password)) {
         res.send(`Missing email or password !`);
      }

      const userInfo = await UserDB.findOne({ where: { email: email } });
      console.log(userInfo);
      if (!userInfo) {
         res.status(404);
         res.send("User Not found !");
         return;
      } else if (!(await bcrypt.compare(req.body.pass, userInfo.password))) {
         res.status(400);
         res.send("Incorrect password !");
         return;
      }

      const token = await generateToken(userInfo.dataValues.id);
      res.json({ userToken: token });
   } catch (error) {
      console.log(`Error in userLogin ${error}`);
   }
};

const userRegister = async (req, res) => {
   let { name, email, pass, phone, photo } = req.body;

   try {
      if (!(name || email || pass)) {
         res.send(`Missing name or email or password or phone !`);
      }

      if (!photo) {
         photo = "dummy.jpg";
      }

      const userInfo = await UserDB.findOne({ where: { email: email } });
      if (userInfo) {
         res.send(`User already exists!`);
         return;
      }

      const anonymousName = await generateName();
      const password = await bcrypt.hash(pass, saltRound);
      await UserDB.create({ ...req.body, anonymousName, password });
      await sendMail(msg);
      res.send({
         name: name,
         password: password,
      });

   } catch (error) {
      console.log(`Error in userRegister ${error} !`);
   }
};

const getUserProfile = async (req, res) => {
   const { id } = req.params;

   const userProfile = await UserDB.findOne({
      where: {
         id: id,
      },
   });

   if (!userProfile) {
      res.send(`User not found with id: ${id}`);
   }

   res.send(userProfile.dataValues);
};

const addWalletMoney = async (req, res) => {
   const { mail } = req.params;
   try {
      const userInfo = await UserDB.findOne({ where: { email: mail } });

      await addMoneyUser(mail, userInfo.dataValues.id);

      res.send("Mail sent");
   } catch (error) {
      throw new Error("Unable to add money to wallet.");
   }
};

const userHomePage = async (req, res) => { };

const getDocterList = async (req, res) => {
   const allDocs = await DocterDB.findAll();
   res.send(allDocs);
};

const chatWithDocter = async (req, res) => { };

const getAllDocterList = async (req, res) => {
   try {
      const doctors = await DocterDB.findAll({
         attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
         },
      });

      res.json(doctors);
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: "An error occurred while retrieving doctors",
      });
   }
};

const getDocterProfile = async (req, res) => {
   const { id } = req.params;

   try {
      const profile = await DocterDB.findOne({
         where: { id: id },
         attributes: { exclude: ["password", "phone"] },
      });

      if (!profile) {
         res.send("Invalid Id, No doctor found.");
         return;
      }

      res.send(profile.dataValues);
   } catch (error) {
      console.log(error);
   }
};

const getDocterRoomId = async (req, res) => {
   const { doctorId } = req.params;
   const response = await RoomTable.findAll({ where: { doctorId: doctorId } });

   const roomId = String(response[0].roomId);
   res.status(200).send(roomId);
};

const updateWallet = async (req, res) => {
   const { cost, userId } = req.body;
   try {
      const response = await UserDB.update(
         { wallet_price: cost },
         {
            where: { id: userId },
         }
      );
      res.send(response);
   } catch (error) {
      console.log("ERROR IN UPDATING USER WALLET => ", error);
   }
};

module.exports = {
   getDocterRoomId,
   getDocterProfile,
   getAllDocterList,
   userLogin,
   userRegister,
   userWelcome,
   getUserProfile,
   userHomePage,
   addWalletMoney,
   getDocterList,
   chatWithDocter,
   updateWallet,
};
