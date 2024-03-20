'use strict';
/*
 * Chef-page.html
 */

document
  .getElementById('mealForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const ingredients = document.getElementById('ingredientsInput').value;
    const kcal = parseInt(document.getElementById('kcalInput').value, 10);

    const requestBody = {
      ingredients: ingredients,
      kcal: kcal,
    };

    // Disable form controls and show the loading spinner
    document.getElementById('sendButton').disabled = true;
    document.getElementById('clearButton').disabled = true;
    document.getElementById('ingredientsInput').disabled = true;
    document.getElementById('kcalInput').disabled = true;
    document.getElementById('loadingSpinner').classList.remove('d-none');
    document.getElementById('breakfast').innerHTML = '';
    document.getElementById('lunch').innerHTML = '';
    document.getElementById('dinner').innerHTML = '';

    // Make the API call to "http://localhost:3000/cookchef/v1/meals"
    fetch('http://localhost:3000/cookchef/v1/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Process the data and update the content in the tabs
        const { meals } = data;
        const [breakfast, lunch, dinner] = meals;

        // Function to replace newline characters with <br> tags
        const replaceNewlinesWithBr = text => {
          return text.replace(/\n/g, '<br>');
        };

        document.getElementById('breakfast').innerHTML = `
                    <h2>${breakfast.title}</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <p style="color: white;">${replaceNewlinesWithBr(
                              breakfast.description
                            )}</p>
                        </div>
                        <div class="col-md-6 text-center">
                            <img src="${
                              breakfast.url
                            }" alt="Breakfast Image" class="mt-3">
                        </div>
                    </div>
                `;

        document.getElementById('lunch').innerHTML = `
                    <h2>${lunch.title}</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <p style="color: white;">${replaceNewlinesWithBr(
                              lunch.description
                            )}</p>
                        </div>
                        <div class="col-md-6 text-center">
                            <img src="${
                              lunch.url
                            }" alt="Lunch Image" class="mt-3">
                        </div>
                    </div>
                `;

        document.getElementById('dinner').innerHTML = `
                    <h2>${dinner.title}</h2>
                    <div class="row">
                        <div class="col-md-6">
                            <p style="color: white;">${replaceNewlinesWithBr(
                              dinner.description
                            )}</p>
                        </div>
                        <div class="col-md-6 text-center">
                            <img src="${
                              dinner.url
                            }" alt="Dinner Image" class="mt-3">
                        </div>
                    </div>
                `;

        // Enable form controls and hide the loading spinner
        document.getElementById('sendButton').disabled = false;
        document.getElementById('clearButton').disabled = false;
        document.getElementById('ingredientsInput').disabled = false;
        document.getElementById('kcalInput').disabled = false;
        document.getElementById('loadingSpinner').classList.add('d-none');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Enable form controls and hide the loading spinner (in case of error)
        document.getElementById('sendButton').disabled = false;
        document.getElementById('clearButton').disabled = false;
        document.getElementById('ingredientsInput').disabled = false;
        document.getElementById('kcalInput').disabled = false;
        document.getElementById('loadingSpinner').classList.add('d-none');
      });
  });

// Clear button functionality
document.getElementById('clearButton').addEventListener('click', function () {
  document.getElementById('ingredientsInput').value = '';
  document.getElementById('kcalInput').value = '';
});
