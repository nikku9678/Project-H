const { sessionMailTemplate, mailToAdmin } = require("../SMTP/mailTemplate");
const DocterDB = require("../models/docter.model");
const SessionUserDB = require("../models/sessionUserData.model");
const UserDB = require("../models/userDB.model");
const multer = require("multer");
const path = require("path");

// Create
const storeSessionData = async (req, res) => {
   try {
      const { doctorId, userId, age, consent, gender, medicalHistory, presentingIssue, treatmentGoal, phone } = req.body;
      let file = req.file ? req.file.path : "";

      const newRecord = await SessionUserDB.create({
         doctorId,
         userId,
         age,
         consent,
         file,
         phone,
         gender,
         medicalHistory,
         presentingIssue,
         treatmentGoal
      });

      const docEmail = await DocterDB.findOne({
         where: { id: doctorId },
         attributes: ['email', 'name'],
      });

      const userMail = await UserDB.findOne({
         where: { id: userId },
         attributes: ['email', 'name'],
      });

      const sessionData = {
         docEMail: docEmail.dataValues.name,
         userEMail: userMail.dataValues.name,
         ...newRecord.dataValues,
      };

      const mailToDoc = {
         id: 'sessionBookedForDoc',
         docname: docEmail.dataValues.name,
         username: userMail.dataValues.name,
         email: docEmail.dataValues.email
      };

      const mailToUser = {
         id: 'sessionBookedForUser',
         docname: docEmail.dataValues.name,
         username: userMail.dataValues.name,
         email: userMail.dataValues.email
      };

      if (mailToAdmin(sessionData) &&
         sessionMailTemplate(mailToDoc.id, mailToDoc.docname, mailToDoc.username, mailToDoc.email)
         && sessionMailTemplate(mailToUser.id, mailToUser.docname, mailToUser.username, mailToUser.email)) {
         res.status(201).json(newRecord);
      };

   } catch (error) {
      res.status(500).json({ error: 'Failed to create record.' });
   }
};

// Read all :- For Admins who want to knwo all session
const getAllSessionAdmin = async (req, res) => {
   try {
      const records = await YourModel.findAll();
      res.json(records);
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve records.' });
   }
};


// Read single For Docters who want to knwo all his/her session
const getSession = async (req, res) => {
   try {
      const { userId } = req.params;

      const record = await SessionUserDB.findAll({ where: { userId: userId } });

      if (record) {
         res.json(record);
      } else {
         res.status(404).json({ error: 'Record not found.' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve record.' });
   }
};

// Update
const updateSession = async (req, res) => {
   try {
      const { id } = req.params;
      const { age, consent, file, gender, medicalHistory, presentingIssue, treatmentGoal } = req.body;

      const record = await YourModel.findByPk(id);

      if (record) {
         await record.update({
            age,
            consent,
            file,
            gender,
            medicalHistory,
            presentingIssue,
            treatmentGoal
         });

         res.json(record);
      } else {
         res.status(404).json({ error: 'Record not found.' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to update record.' });
   }
};

// Delete
const deleteSession = async (req, res) => {
   try {
      const { sessionId } = req.params;

      const record = await YourModel.findByPk(sessionId);

      if (record) {
         await record.destroy();
         res.sendStatus(204);
      } else {
         res.status(404).json({ error: 'Record not found.' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to delete record.' });
   }
};


const fileRetriveID = async (req, res) => {
   // Retrieve file by ID
   try {
      const { id } = req.params;

      // Find record by ID
      const record = await SessionUserDB.findByPk(id);

      if (record && record.file) {
         // Set appropriate headers for the file response
         res.setHeader('Content-Type', 'application/octet-stream'); // Set the appropriate MIME type
         res.setHeader('Content-Disposition', `attachment; filename="${record.file}"`); // Set the file name

         // Send the file as the response
         const fileData = record.file.toString('base64');
         console.log("record ===> ", fileData);
         res.send(record.file);
      } else {
         res.status(404).json({ error: 'File not found.' });
      }
   } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve file.' });
   }
};

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'Uploads/Session')
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
   }
})

const upload = multer({
   storage: storage,
   limits: { fileSize: '10000000' },
   fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|pdf/
      const mimeType = fileTypes.test(file.mimetype)
      const extname = fileTypes.test(path.extname(file.originalname))

      if (mimeType && extname) {
         return cb(null, true)
      }
      cb('Give proper files formate to upload')
   }
}).single('file')



module.exports = { storeSessionData, getSession, fileRetriveID, upload }