const axios = require('axios');
require('dotenv').config();

const postRegister = async body => {
  console.log('enter in the api');
  const result = await axios.post(process.env.URL + 'cookchef/v1/register', {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });
  console.log(result);
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
