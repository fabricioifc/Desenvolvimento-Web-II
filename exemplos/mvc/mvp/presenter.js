// Modelo
class BeerModel {
  constructor() {
    this.beers = [
      { id: 1, name: 'Stella Artois', type: 'Pilsner' },
      { id: 2, name: 'Guinness', type: 'Stout' },
      { id: 3, name: 'Heineken', type: 'Lager' }
    ];
  }

  getAllBeers() {
    return this.beers;
  }
}

// Visão
class BeerView {
  constructor() {
    this.beerListElement = document.getElementById('beer-list');
  }

  renderList(beerList) {
    this.beerListElement.innerHTML = '';

    beerList.forEach(beer => {
      const li = document.createElement('li');
      li.textContent = `${beer.name} - ${beer.type}`;
      this.beerListElement.appendChild(li);
    });
  }
}

// Presenter
class BeerPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init() {
    this.view.renderList(this.model.getAllBeers());
  }
}

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
  const model = new BeerModel();
  const view = new BeerView();
  const presenter = new BeerPresenter(model, view);
});
