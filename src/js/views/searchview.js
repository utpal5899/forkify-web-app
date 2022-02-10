class searchview {
  #parantEl = document.querySelector('.search');

  getquery() {
    const query = this.#parantEl.querySelector('.search__field').value;
    // this.#clearquery();
    return query;
  }
  #clearquery() {
    this.#parantEl.querySelector('.search__field').value = '';
  }

  addHandlersearch(handler) {
    this.#parantEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchview();
