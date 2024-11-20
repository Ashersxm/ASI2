const express = require('express');
const router = express.Router();
const matchmakingController = require('../controllers/matchmakingController');

// Définir les routes
router.post('/join', matchmakingController.addToQueue);

module.exports = router;
