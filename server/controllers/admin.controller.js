require("dotenv").config()

const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const saltRound = 10

const AdminDB = require("../models/healerJi.model");
const AccessKey = require("../models/accessKey.model")

const DocterDB = require("../models/docter.model");
const UserDB = require("../models/userDB.model");
const ChatDb = require("../models/chat.model");
const RoomTable = require("../models/room.modal");
const Op = require('sequelize').Op;
const { updateUserWalletByAdmin } = require("../SMTP/mailTemplate");

const multer = require("multer");
const path = require("path");

const authAccessKey = async (req, res) => {
   try {
      const inputKey = req.body;
      let key = inputKey.key;
      console.log("Input Key ", inputKey, " ", key);

      const data = await AccessKey.findOne({ where: { key: key } })
      if (data) {
         res.send(data)
      }
   } catch (error) {
      console.log(`Error from authAccessKey HealerJiController :- ${error}`);
   }
}

const addAccessKey = async (req, res) => {
   try {
      const key = req.body;
      await AccessKey.create(key);
   } catch (error) {
      console.log("Error in adding Access Key ", error);
      return;
   }
   res.send("Access Key Created");
}


const adminLogin = async (req, res) => {
   const { email, password } = req.body;


   try {
      if (!(email && password)) {
         res.send(`Missing email or password !`)
      }

      const adminInfo = await AdminDB.findOne({ where: { email: email } });
      console.log("Admin Info", adminInfo);
      if (!adminInfo) {
         res.send("Admin Not found");
         return;
      } else if (!await bcrypt.compare(req.body.password, adminInfo.password)) {
         res.send("Wrong Password !");
         return;
      } else {
         if (adminInfo) {
            res.send(adminInfo);
         }
      }
   } catch (error) {
      console.log(`Error in Admin Login ${error}`);
   }

}

const adminRegister = async (req, res) => {
   let { name, email, pass } = req.body;

   try {
      if (!(name || email || pass)) {
         res.send(`Missing name or email or password or phone !`);
      }

      const adminInfo = await AdminDB.findOne({ where: { email: email } });
      console.log("Admin Info ", adminInfo);
      if (adminInfo) {
         res.send(`Admin already exists!`);
         return;
      };

      const password = await bcrypt.hash(req.body.pass, saltRound);
      await AdminDB.create({ name, email, password });

      res.send({
         name: name,
         password: password,
      });

   } catch (error) {
      console.log(`Error in adminRegister ${error} !`);
   }

}

const getMoney = async (req, res) => {
   //TODO:- Fetching Money from DB
}

const adminDocterAdd = async (req, res) => {
   let { name, email, password, phone, feePerMin, feePerMinSession, about, language, timings, rating, available } = req.body;
   let photo = req.file ? req.file.path : "";

   try {
      if (!(name || email || password || phone || about || language)) {
         res.status(404);
         res.send(`Missing name or email or password or phone or any other relevant data !`);
      }

      if (!photo) {
         photo = "dummy.jpg";
      }

      const docterInfo = await DocterDB.findOne({ where: { email: email } });
      if (docterInfo) {
         res.status(404);
         res.send(`User already exists!`)
         return;
      }

      password = await bcrypt.hash(req.body.password, saltRound);
      const docData = await DocterDB.create({ ...req.body, photo: photo, password });

      await RoomTable.create({
         roomId: docData.dataValues.id,
         doctorId: docData.dataValues.id
      });

      res.send({
         name: name,
         password: password,
      })

   } catch (error) {
      console.log(`Error in docterRegister ${error} !`);
   }
}

const getDocterList = async (req, res) => {
   const docterData = await DocterDB.findAll();
   res.send(docterData);
}

const payDocter = async (req, res) => {

}

const getUserList = async (req, res) => {
   const userData = await UserDB.findAll();
   res.send(userData);
};

const getChatList = async (req, res) => {
   const { mail } = req.params;

   const docId = await DocterDB.findOne({
      where: {
         email: mail
      },
      attributes: ['id'],
   });

   const userId = await UserDB.findOne({
      where: {
         email: mail
      },
      attributes: ['id'],
   });

   let id = (docId ? docId : userId);

   const chatData = await ChatDb.findAll({
      where: {
         [Op.or]: [
            { docId: id },
            { userId: id }
         ],
      },
   });

   return chatData;
};

const getChat = async (req, res) => {
   const { id } = req.params;

   const chatData = await ChatDb.findOne({
      where: {
         id: id,
      },
   });
};

const changeAccessKey = async (req, res) => {
   try {
      const { oldAccessKey, newAccessKey, confirmNewAccessKey } = req.body;

      const oldAccKey = await AccessKey.findAll();

      if (oldAccKey[0].dataValues.key != oldAccessKey) {
         res.send('Invalid Access Key.');
         return;
      };

      await AccessKey.destroy({ where: {}, truncate: true });

      if (newAccessKey != confirmNewAccessKey) {
         res.send('New and ConfirmNew Access Keys do not match. Try again!!.');
         return;
      };

      await AccessKey.create({ key: newAccessKey });

      res.send('Access Key changed Successfully!!');
   } catch (error) {
      console.error('Error while editing AccessKey', error);
   }
};

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'Uploads')
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
   }
});

const upload = multer({
   storage: storage,
   limits: { fileSize: '1000000' },
   fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
         return cb(null, true)
      }
      cb('Give proper files formate to upload')
   }
}).single('photo');

const updateWallet = async (req, res) => {
   const { amount, userId } = req.body;
   try {
      const data = await UserDB.findOne({ where: { id: userId } });
      let money = parseFloat(data.dataValues.wallet_price) + parseFloat(amount);

      const response = await UserDB.update({ wallet_price: money },
         {
            where: { id: userId }
         }
      )

      await updateUserWalletByAdmin(data.dataValues.email, amount, money)
      res.send(response);
   } catch (error) {
      console.log("ERROR IN UPDATING USER WALLET => ", error);
   }
};

module.exports = {
   authAccessKey,
   addAccessKey,
   adminRegister,
   adminLogin,
   getMoney,
   adminDocterAdd,
   getDocterList,
   payDocter,
   getUserList,
   getChatList,
   getChat,
   changeAccessKey,
   upload,
   updateWallet
}