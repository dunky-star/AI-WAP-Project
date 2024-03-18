'use strict';

const readline = require('readline');
const {
  generateChatCompletion,
} = require('./controllers/chatCompletionController');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter Prompt to Send for GPT3.5 ChatCompletion Model: \n',
  user_role_content => generateChatCompletion(user_role_content)
);
