import view from './view';
import icons from '../../img/icons.svg';
class resultsview extends view {
  _parantElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkuppreview).join('');
  }

  _generateMarkuppreview(result) {
    return `
    
      <li class="preview">
        <a class="preview__link" href=#${result.id}>
          <figure class="preview__fig">
            <img src=${result.image} alt=${result.title} />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#  icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
  
  addHandlersearch(handler) {
    this._parantElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    })}
  
}


export default new resultsview();

