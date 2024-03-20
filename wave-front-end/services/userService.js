const axios = require('axios');
require('dotenv').config();

const postRegister = async body => {
  const result = await axios.post(process.env.URL + 'users/register', {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });
  return result;
};

const postLogin = async body => {
  const result = await axios.post(process.env.URL + 'users/login', {
    email: body.email,
    password: body.password,
  });
  return result;
};

module.exports = { postRegister, postLogin };
