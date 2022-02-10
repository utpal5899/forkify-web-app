import { compileString } from 'sass';
import { API_URL, key } from './config';
import { getJSON, sendJson } from './helper';

export const state = {
  recipe: {},
  search: { query: {}, results: [], page: 1, resultsPerPage: 10 },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    console.log(data.data);
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      publisher: recipe.publisher,
      sourceurl: recipe.source_url,
      cookingtime: recipe.cooking_time,
      ingredint: recipe.ingredients,
      searvings: recipe.servings,
    };
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    // alert(err)
    // console.error(`${err} yoooooooooooooo`);
    throw err;
  }
};

export const loadsearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // console.log(data.data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getsearchresultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const addbookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const deletebookmark = function (id) {
  console.log(id);
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

export const uploadrecipe = async function (newrecipe) {
  try {
    const ingredients = Object.entries(newrecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        // console.log(ing);
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3) throw new Error('wrong format!!');

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log (newrecipe.cookingTime);
    const recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceurl,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      cooking_time: +newrecipe.cookingTime,
      servings: +newrecipe.servings,
      ingredients,
    };
    // console.log(recipe);
    const data = await sendJson(`${API_URL}?key=${key}`, recipe);
    console.log(data);
  } catch (err) {
    throw err;
    // console.Error(err);
  }
  // console.log(ingredients);
};
// loadsearchResult('pizza');
// console.log(state.search.results);
