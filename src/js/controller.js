import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const constrolRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpiner(recipeContainer);

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Loading recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
constrolRecipes();

// window.addEventListener(`hashchange`, constrolRecipes);
// window.addEventListener(`load`, constrolRecipes);
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, constrolRecipes)
);
