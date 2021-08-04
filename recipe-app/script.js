const mealsContainer = document.getElementById("meals");
const favMeals = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");
const mealInfo = document.getElementById("meal-info");

const getRandomMeal = async () => {
  const getRandomMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const rs = await getRandomMeal.json();
  const randomMeal = rs.meals[0];
  addMeal(randomMeal, true);
};

const getMealById = async (id) => {
  const getMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const rs = await getMeal.json();
  return rs.meals[0];
};

const getMealBySearch = async (term) => {
  const getMeals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const rs = await getMeals.json();
  return rs.meals;
};

const addMeal = (mealData, random = false) => {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random recipe</span>` : ""}
      <img
        src=${mealData.strMealThumb}
        alt=${mealData.strMeal}
      />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>`;

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealFromLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealToLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
  });

  meal.querySelector(".meal-header").addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsContainer.appendChild(meal);
};

const addMealToLS = (meal) => {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, meal]));
};

const removeMealFromLS = (mealId) => {
  const mealIds = getMealsFromLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
};

const getMealsFromLS = () => {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds ? mealIds : [];
};

const fetchFavMeals = async () => {
  // clean container
  favMeals.innerHTML = "";

  const mealIds = getMealsFromLS();

  const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const id = mealIds[i];
    const favMeal = await getMealById(id);
    meals.push(favMeal);
  }
  meals.forEach((meal) => addMealFav(meal));
};

const addMealFav = (meal) => {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
    <img
      src=${meal.strMealThumb}
      alt=${meal.strMeal}
      class="fav_img"
    />
    <span>${meal.strMeal}</span>
    <button class="clear">
      <i class="fas fa-window-close"></i>
    </button>
  `;

  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealFromLS(meal.idMeal);

    fetchFavMeals();
  });

  const favImg = favMeal.querySelector(".fav_img");
  favImg.addEventListener("click", () => {
    showMealInfo(meal);
  });

  favMeals.appendChild(favMeal);
};

searchBtn.addEventListener("click", async () => {
  // clean container
  mealsContainer.innerHTML = "";

  const search = searchTerm.value;
  const meals = await getMealBySearch(search);

  meals &&
    meals.forEach((meal) => {
      addMeal(meal);
    });
});

getRandomMeal();
fetchFavMeals();

const showMealInfo = (mealData) => {
  mealInfo.innerHTML = "";

  // get ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  const mealEl = document.createElement("div");
  mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <p>${mealData.strInstructions}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
  `;
  mealInfo.appendChild(mealEl);
  mealPopup.classList.remove("hidden");
};

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});
