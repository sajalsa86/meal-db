const defaultMealCount = 6; // Number of default meals to display initially
let allMealsData = []; // Store all meals data

// Function to display a specified number of meals
const displayMeals = (meals, count) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        if (meals[i]) {
            const meal = meals[i];
            const mealItem = document.createElement('div');
            mealItem.innerHTML = `
                <!-- Your card HTML template -->
                <div class="card mb-3" style="max-width: 620px;">
          <div class="row g-0">
                        <div class="col-md-5">
                            <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body ms-3">
                                <h5 class="card-title mt-5">${meal.strMeal}</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional
                                    content. This content is a little bit longer.</p>
                                </p>
                            <!-- Button trigger modal -->
                       <p onClick="mealDetails(${meal.idMeal})" class="view-details-btn" data-bs-toggle="modal" data-bs-target="#mealsModal">View Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            mealContainer.appendChild(mealItem);
        }
    }
};

// Function to load all meals data from the API
const loadAllMeals = (searchText) => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(mealsUrl)
        .then(res => res.json())
        .then(data => {
            allMealsData = data.meals;
            displayMeals(allMealsData, defaultMealCount); // Display the default meals
        })
        .catch(error => console.log(error))
};

// Function to handle "Show All" button click
const showAllMeals = () => {
    displayMeals(allMealsData, allMealsData.length);
};

// Event listener for the "Show All" button
document.getElementById('show-all-btn').addEventListener('click', showAllMeals);
// search items
const searchItems = () => {
    const searchKeword = document.getElementById('search-field').value.trim();
    //console.log(searchKeword);
    if (searchKeword !== '') {
        loadAllMeals(searchKeword);
    }
    document.getElementById('search-field').value = '';
}
// mealDetails
const displayMealsDetails = meal => {
    console.log(meal);
    const mealsModalLabel = document.getElementById('mealsModalLabel');
    mealsModalLabel.innerText = meal.strMeal;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img class="img-thumbnail rounded img-fluid" src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h6 class="mt-2">Category : ${meal.strCategory}</h6>
    <h6 class="mt-2">Area : ${meal.strArea}</h6>
    <p class="mt-2">Instructions : ${meal.strInstructions}</p>
    <a href="${meal.strYoutube}"target="_blank">Play on Youtube for this Recipe</a>
    `;
};
const mealDetails = async (itemId) => {
    try {
        const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
        const res = await fetch(idUrl)
        const data = await res.json()
        //console.log(data.meals[0])
        displayMealsDetails(data.meals[0])
    }
    catch (error) {
        console.log(error);
    }
};
// Load default meals
loadAllMeals('fish');
