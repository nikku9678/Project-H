const express = require('express');
const router = express.Router();
const SessionDB = require("../models/session.model");
const SessionUserDB = require('../models/sessionUserData.model');

const createSession = async (req, res) => {
   try {
      const { doctorId, cost, time, duration } = req.body;
      const session = await SessionDB.create({ doctorId, cost, time, duration });
      res.status(201).json(session);
   } catch (error) {
      res.status(500).json({ error: 'Failed to create session' });
   }
};

const updateSession = async (req, res) => {
   try {
      const { sessionId } = req.params;
      const { doctorId, cost, time, duration } = req.body;
      const session = await SessionDB.findByPk(sessionId);
      if (!session) {
         return res.status(404).json({ error: 'Session not found' });
      }
      session.doctorId = doctorId;
      session.cost = cost;
      session.time = time;
      session.duration = duration;
      await session.save();
      res.json(session);
   } catch (error) {
      res.status(500).json({ error: 'Failed to update session' });
   }
};

const deleteSession = async (req, res) => {
   try {
      const { sessionId } = req.params;
      const session = await SessionDB.findByPk(sessionId);
      if (!session) {
         return res.status(404).json({ error: 'Session not found' });
      }
      await session.destroy();
      res.sendStatus(204);
   } catch (error) {
      res.status(500).json({ error: 'Failed to delete session' });
   }
};

const getAllSession = async (req, res) => {

   const { doctorId } = req.params;

   try {
      const sessions = await SessionDB.findAll({ where: { doctorId: doctorId } });
      res.json(sessions);
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sessions' });
   }
};

const getAllUserSession = async (req, res) => {
   const { doctorId } = req.params;
   try {
      const sessions = await SessionUserDB.findAll({ where: { doctorId: doctorId } });
      res.json(sessions);
   } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sessions' });
   }
};

module.exports = { getAllSession, deleteSession, updateSession, createSession, getAllUserSession };


