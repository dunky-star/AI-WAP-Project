const express = require('express');

const { generateChatCompletion } = require('./controllers/chatController');

// app setup
const app = express();

// middleware
app.use(express.json());

// routes
app.post('/cookchef/v1/chatting', generateChatCompletion);

app.listen(3000, () =>
  console.log('Server started and listening to requests on port 3000')
);
