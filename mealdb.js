document.getElementById("errorMessage").style.display = "none";
const searchItem = () => {
    const inputField = document.getElementById("inputField");
    const inputValue = inputField.value;
    //loading start here
    troglesPinner("block");
    //when loading searchitem display property is none
    document.getElementById("searchResult").style.display = "none";
    document.getElementById("searchForResult").style.display = "none";
    // resultDivRemove("none");
    // console.log(inputValue) ;
    inputField.value = "";
    document.getElementById("errorMessage").style.display = "none";
    if (inputValue == "") {
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => loadMeal(data))
            .catch((error) => errorDisplay(error));
    }
};

const errorDisplay = (error) => {
    document.getElementById("errorMessage").style.display = "block";
};

const troglesPinner = (styleLoad) => {
    // console.log(styleLoad);
    const styleTroggle = document.getElementById("troggleSPinner");
    styleTroggle.style.display = styleLoad;
    // console.log(styleTroggle);
};

// const resultDivRemove = (resultDivStyle) => {
//     document.getElementById("resultDiv").style.display = resultDivStyle;
// };

const loadMeal = (foods) => {
    const searchFood = foods.meals;
    // console.log(searchFood);
    const resultDiv = document.getElementById("resultDiv");

    // clear previous item in two ways 1. clear innerHTML 2. clear textcontent
    // resultDiv.innerHTML = '' ;
    resultDiv.textContent = "";
    // if no result fount
    // console.log(searchFood.length);
    let count = 0;
    for (const food of searchFood) {
        //fount amount of food item by count++
        if (food) {
            count++;
        }

        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = ` 
        <div onclick="mealDetail(${food.idMeal})" class="card">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">${food.strInstructions.slice(0, 200)}.</p>
        </div>
        `;
        resultDiv.appendChild(div);
    }

    const searchResult = document.getElementById("searchResult");
    searchResult.style.display = "block";
    searchResult.innerHTML = `
        <h3> Result Found ${count}</h3> 
    `;
    console.log(count);
    troglesPinner("none");
    // resultDivRemove("block");
};

const mealDetail = (idMeal) => {
    // console.log(idMeal);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    // console.log(url) ;
    fetch(url)
        .then((res) => res.json())
        .then((data) => loadMealDetails(data.meals[0]));
};

const loadMealDetails = (food) => {
    console.log(food);
    const mealDetails = document.getElementById("mealDetails");
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${food.strMeal}</h5>
        <p class="card-text">${food.strInstructions.slice(0, 200)}</p>
        <a href="${food.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
};
