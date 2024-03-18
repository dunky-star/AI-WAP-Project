const express = require('express');
const router = express.Router();
const { generateChatCompletion } = require('../controllers/chatController');

router.post('/cookchef/v1/chatting', generateChatCompletion);

module.exports = router;
