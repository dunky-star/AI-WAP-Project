'use strict';
const { createHealthyMeals } = require('./controllers/cookChefController');
const foods = 'broccoli, chicken, fish, vegetables, cabbage, eggs, olive oil';
createHealthyMeals(foods).then(meals => {
  console.log(meals);
});
