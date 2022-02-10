import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultrender from './views/resultrender.js';
import searchview from './views/searchview.js';
import bookmarksviews from './views/bookmarksviews.js';
import addrecipeview from './views/addrecipeview.js';
import view from './views/view.js';

// // console.log(icons);
// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// console.log('hello ');
// if (model.hot) {
//   model.hot.accept();
// }
const showRacipe = async function () {
  try {
    recipeView.spinner();
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }

    await model.loadRecipe(id);
    // console.log(model.state);
    const { recipe } = model.state;
    recipeView.render(model.state.recipe);

    // console.log(recipe);
  } catch (e) {
    recipeView.errorhndler(
      `No recipes found for your query. Please try again!`
    );
    console.log(e);
  }
};

const controlsearchresult = async function () {
  try {
    resultrender.spinner();
    console.log(resultrender);

    const query = searchview.getquery();
    if (!query) return;
    await model.loadsearchResult(query);
    console.log(model.state.search.results);
    // resultrender.render(model.state.search.results);
    resultrender.render(model.getsearchresultPage());
  } catch (err) {
    console.error(err);
  }
};
const controladdbookmark = function () {
  if (!model.state.recipe.bookmarked) model.addbookmark(model.state.recipe);
  else model.deletebookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  recipeView.render(model.state.recipe);

  bookmarksviews.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    await model.uploadrecipe(newRecipe);

    // [`hashchange`, `load`].forEach(ev => window.addEventListener(ev, showRacipe));
    // window.addEventListener('hashchange', showRacipe);
    // window.addEventListener('load', showRacipe);
  } catch (error) {
    console.log(error);
    // view.errorhndler(error)
  }
};
const init = function () {
  recipeView.addHandlerRender(showRacipe);
  searchview.addHandlersearch(controlsearchresult);
  recipeView.addhandleraddbookmark(controladdbookmark);
  addrecipeview.addHandlerUpload(controlAddRecipe);
  alert("seiafhoseaihfoshfaosihfosahfoshifsahfiudhfsahdfsahfssuihioejsoifjos")
};
init();
