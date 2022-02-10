import icons from '../../img/icons.svg';

export default class view {
  _data;
  render(recipedata) {
    this._data = recipedata;
    console.log(recipedata);
    // this._parantElement._clear();
    const markup = this._generateMarkup();
    this._clear;
    this._parantElement.innerHTML = '';
    this._parantElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parantElement.innerHTML = '';
  }
  spinner() {
    const markup = `<div class="spinner">
    <h1>spinner is not working</h1>
      <svg>
        <use href="${icons}_icon-loader"></use>
      </svg>
    </div>  `;
    this._clear();

    this._parantElement.insertAdjacentHTML('afterBegin', markup);
  }

  errorhndler(
    message = 'default massage can runs if we do not pass any argument'
  ) {
    let markup = `
   <div class="error">
         <div>
         <svg>
         <use href="${icons}_icon-alert-triangle"></use>
         </svg>
         </div>
         <p>${message}</p>
         </div> 
         `;
    this._parantElement.innerHTML = '';
    // console.log(markup);
    //  this._clear;
    this._parantElement.insertAdjacentHTML('afterBegin', markup);
  }
}
