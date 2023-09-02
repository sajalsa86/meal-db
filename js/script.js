const getAllMeals = (searchText) => {
    const mealsUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(mealsUrl)
        .then(res => res.json())
        .then(data => displayAllMeals(data.meals))
        .catch(error => console.log(error))
};

const displayAllMeals = allMeals => {
    //console.log(allMeals);
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    allMeals.forEach(meal => {
        //console.log(meal)
        const mealItem = document.createElement('div');
        mealItem.innerHTML = `
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
                                <p class="view-details-btn">View Details</p>
                            </div>
                        </div>
                    </div>
                </div>
        
        `;
        mealContainer.appendChild(mealItem);
    });

};

const searchItems = () => {
    const searchKeword = document.getElementById('search-field').value.trim();
    //console.log(searchKeword);
    if (searchKeword !== '') {
        getAllMeals(searchKeword);
    }
    document.getElementById('search-field').value = '';
}

//by defalt fish items
getAllMeals('fish')