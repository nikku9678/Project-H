const express = require("express")
const app = express();
const http = require("http");
var cors = require('cors')
require("dotenv").config()
const sequelize = require("./utils/databaseConnection");
const path = require('path');
const fs = require("fs");
const https = require("https");

const UserDB = require("./models/userDB.model");
const DocterDB = require("./models/docter.model")
const AccessKey = require("./models/accessKey.model")
const AdminDB = require("./models/healerJi.model")
const ChatDB = require('./models/chat.model')
const SessionDB = require("./models/session.model")
const QuestionDB = require("./models/question.model")
const SessionUserDB = require("./models/sessionUserData.model")
const Rooms = require("./models/people.model")
const NotificationDB = require("./models/notificationDoctor.model")
const UserAnswerDB = require("./models/userAnswer.model");

const userRoute = require("./routes/userRoute")
const docterRoute = require("./routes/docterRoute")
const adminRoute = require("./routes/adminRoute")

const { Server } = require("socket.io");

const ChatBuffer = require("./utils/chatBuffer");
const RoomTable = require("./models/room.modal");

const PORT = process.env.PORT;

app.use(cors())
const server = http.createServer(app);
app.use(express.json());
app.use('/user', userRoute)
app.use('/docter', docterRoute);
app.use('/admin', adminRoute);
app.use('/Uploads', express.static('./Uploads'));
app.use('/Uploads/Session', express.static('./Uploads/Session'));

//  Production Code
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "../client/dist", "index.html")))

app.get("*", (req, res) => {
   const filePath = path.join(__dirname, "../client/dist", req.url)
   if (fs.existsSync(filePath)) {
      return res.sendFile(filePath)
   }
   return res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// TODO:- Chat Code

const io = new Server(server, {
   cors: {
      // origin: "https://chat-app-healer-ji-frontend.vercel.app",
      // origin: "http://localhost:3000",
      origin: `*`,
      // methods: ["GET", "POST"],
   },
});

io.on("connection", (socket) => {
   console.log(`User Connected: ${socket.id}`);
   const chatBuffer = new ChatBuffer();

   socket.on("join_room", async (payload) => {

      console.log("PAYLOAD==> ", payload);
      let data, userId, docterId;
      data = payload.roomId;
      userId = payload.localUserId;
      docterId = payload.localDocterId;


      socket.join(data);
      // rooms[socket.id] = data; // Store the room associated with the user
      await Rooms.create({
         socketId: socket.id,
         roomId: data,
         userId: userId,
         docterId: docterId
      })

      console.log(`User with ID: ${socket.id} joined room: ${data}`);

      socket.emit("roomInfo", data);
   });



   socket.on("send_message", async (data) => {
      // const room = rooms[socket.id]; // Get the room associated with the user
      const response = await Rooms.findOne({ where: { socketId: socket.id } })
      const room = response.dataValues.roomId;
      const message = data.message;

      const roomData = await Rooms.findAll({
         where: { roomId: room },
         attributes: ['docterId', 'userId'],
      });

      let sendUserId = null;
      let sendDocterId = null;
      for (let i in roomData) {
         if (roomData[i].dataValues.userId) {
            sendUserId = roomData[i].dataValues.userId
         }
         if (roomData[i].dataValues.docterId) {
            sendDocterId = roomData[i].dataValues.docterId
         }
      }

      if (room) {
         socket.to(room).emit("receive_message", data);
      }

      // Save the message to the conversation data
      // chatBuffer.addMessage({
      //    userId: sendUserId,
      //    docterID: sendDocterId,
      //    message: message,
      //    timestamp: new Date()
      // });

      // await chatBuffer.printChatBuffer()
      // await ChatDB.create({
      //    docterId: sendDocterId,
      //    userId: sendUserId,
      //    message: message,
      // })

   });

   socket.on("disconnect", async () => {
      // const room = rooms[socket.id]; // Get the room associated with the user
      try {
         const response = await Rooms.findOne({ where: { socketId: socket.id } })
         const room = response.dataValues.roomId;

         if (room) {
            socket.to(room).emit("receive_message", {
               author: "",
               message: "User Left the chat",
               time: `${new Date(Date.now()).getHours()}:${new Date(
                  Date.now()
               ).getMinutes()}`,
            });

            socket.leave(room); // Leave the room

            // delete rooms[socket.id]; // Remove the user's room association
            await Rooms.destroy({ where: { roomId: room } })


            // await chatBuffer.flushMessages();
            console.log("User Disconnected", socket.id);
         }
      } catch (error) {
         return;
      }
   });
});

//TODO:- CHat code ends

// Creating Tables in Database
sequelize.sync().then(async (res) => {
   //  await UserDB.sync({force: true});
   //  await DocterDB.sync();
   //  await AccessKey.sync();
   //  await AdminDB.sync();
   //  await ChatDB.sync({force: true});
   //  await SessionDB.sync();
   //  await QuestionDB.sync();
   //  await SessionUserDB.sync({force: true});
   //  await Rooms.sync({ force: true })
   //  await ChatDB.sync({force: true})
   //  await RoomTable.sync();
   //  await NotificationDB.sync({ force: true });
   // await UserAnswerDB.sync();
   console.log("Sync Success!");
})
   .catch((err) => {
      console.log(err);
   });

server.listen(PORT, '0.0.0.0', () => {
   console.log(`Server is running http://localhost:${PORT} `);
});
