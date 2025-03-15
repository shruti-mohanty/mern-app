const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent= document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-closed-btn');



//Function to get recipes but usins TheMealDb API
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListener to recipe button

        button.addEventListener('click',() =>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    })
  } 
catch (error) {   
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
  } 
  
} 
//Function to fetch Ingrident
const fetchIngredint = (meal) => {
    let ingredientslist = " ";
    for(let i=1; i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientslist;
};
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientslist">${fetchIngredint(meal)}</ul>
        <div class="recipeInstructions">
           <h3>Instructions: </h3>
           <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn .addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none";
})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`
    } else{
    fetchRecipes(searchInput);
    }
   
});
