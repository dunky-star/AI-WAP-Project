const openai = require('../config/openaiConfig');

const generateChatCompletion = async (req, res, next) => {
  system_role_content =
    'You reply as concisely as possible. If you are not sure about an answer, you will respond with "I don\'t know".';

  messages = [
    { role: 'system', content: system_role_content },
    { role: 'user', content: req.body.user_role_content },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.5,
    max_tokens: 512,
  });

  //console.log(response.data.choices[0].message.content)

  res.status(200).json({
    content: response.data.choices[0].message.content,
  });
};

module.exports = { generateChatCompletion };
