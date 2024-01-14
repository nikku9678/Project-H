require("dotenv").config()

const NotificationDB = require("../models/notificationDoctor.model")


//TODO:- FOR USER
const addNotification = async (req, res) => {
   try {
      const { doctorId, userId, userName, userEmail, roomId, userWalletAmount, doctorChatFee, chatTime } = req.body;
      const notificationData = {
         doctorId, userId, userName, roomId, userEmail, userWalletAmount, doctorChatFee, chatTime
      }

      const notification = await NotificationDB.create(notificationData);
      res.send(notification);
   } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
   }
};

//TODO:- FOR DOCTOR 
const deleteNotification = async (req, res) => {
   try {
      const { notificationId } = req.params;
      const notification = await NotificationDB.findAll({ where: { userId: notificationId } });
      if (notification) {
         const response = await NotificationDB.destroy({ where: { userId: notificationId } });
         return true;
      } else {
         throw new Error('Notification not found');
      }
   } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
   }
};

//TODO:- For Doctor
const getNotification = async (req, res) => {
   try {
      const { doctorId } = req.params;
      const notifications = await NotificationDB.findAll({ where: { doctorId: doctorId } });
      res.send(notifications);
   } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
   }
};

//TODO:- For Doctor
const getUniqueNotification = async (req, res) => {
   try {
      const { doctorId, userId } = req.params;
      const notifications = await NotificationDB.findAll({ where: { doctorId: doctorId, userId: userId } });
      res.send(notifications);
   } catch (error) {
      console.error('Error getting notifications:', error);
      throw error;
   }
};

const getNotificationRoomId = async (req, res) => {
   const { roomId } = req.params;
   try {
      const notificationData = await NotificationDB.findAll({ where: { roomId: roomId } });
      res.send(notificationData)
   } catch (error) {
      console.error('Error getting notifications based on roomId:', error);
      throw error;
   }
};

module.exports = { getNotification, deleteNotification, addNotification, getUniqueNotification, getNotificationRoomId };