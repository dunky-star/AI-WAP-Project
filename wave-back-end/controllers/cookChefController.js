const openai = require('../config/openaiConfig');

exports.createHealthyMeals = async (req, res, next) => {
  system_role_content = 'You are a talented cook.';

  prompt = `Create a healthy daily meal plan for breakfast, lunch and dinner based on
  the following ingredients ${req.body.ingredients}.
  Explain each recipe.
  The total daily intake of kcal should be below ${req.body.kcal}.
  Assign a suggestive and concise title to each meal.
  Your answer should end with 'Titles: ' and an ordered list of the title of each recipe.`;

  messages = [
    { role: 'system', content: system_role_content },
    { role: 'user', content: prompt },
  ];

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.99,
    max_tokens: 1024,
    n: 1,
  });

  meals = response.data.choices[0].message.content;

  // console.log(meals);
  const titles = extractMealsTitles(meals);

  // console.log(titles);

  mealsList = extractMeals(meals, titles);

  // console.log(mealsList);
  // Because it takes time to load, so it needs a promise.
  const promises = mealsList.map(meal => {
    return createMealImage(meal['title'], 'white background')
      .then(url => {
        meal['url'] = url;
        return meal;
      })
      .catch(err => {
        console.error('Error creating meal image: ', err);
        return meal;
      });
  });

  mealsList = await Promise.all(promises);

  // Return json
  res.status(200).json({
    meals: mealsList,
  });
};

const createMealImage = async (title, extra = '') => {
  image_prompt = `${title}, ${extra}, high quality food photography`;

  const image = await openai.createImage({
    prompt: image_prompt,
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = image.data.data[0].url;
  return imageUrl;
};

function extractMealsTitles(meals) {
  // split the strings into lines
  const lines = meals.split('\n');

  // Get the last 3 lines
  const lastThreeLines = lines.slice(-3);
  // Map and remove the leading number, dash, or period and space and replace them with an empty character.
  const titles = lastThreeLines.map(line =>
    line.replace(/^\d+\.\s*|^\d+\-\s*/, '')
  );

  return titles; // Return the list
}

function extractMeals(inputString, titles) {
  // Remove the title section from the bottom
  inputString = inputString.split('Titles:')[0];
  const lines = inputString.split('\n');
  const meals = [];
  let currentMeal = null;
  lines.forEach(line => {
    const title = titles.find(t => line.includes(t));
    if (title) {
      if (currentMeal) {
        meals.push(currentMeal);
      }
      // New meal will be created here
      currentMeal = {
        title: title,
        description: '',
        url: '',
      };
    } else if (currentMeal) {
      currentMeal.description += line + '\n';
    }
  });
  if (currentMeal) {
    meals.push(currentMeal);
  }

  return meals;
}

//module.exports = { createHealthyMeals };
