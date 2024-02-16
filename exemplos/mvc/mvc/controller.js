// Modelo
const BeerModel = {
  beers: [
    { id: 1, name: 'Stella Artois', type: 'Pilsner' },
    { id: 2, name: 'Guinness', type: 'Stout' },
    { id: 3, name: 'Heineken', type: 'Lager' }
  ],

  getAllBeers: function() {
    return this.beers;
  },

};

// Visão
const BeerView = {
  renderList: function(beerList) {
    const beerListElement = document.getElementById('beer-list');
    beerListElement.innerHTML = '';

    beerList.forEach(function(beer) {
      const li = document.createElement('li');
      li.textContent = `${beer.name} - ${beer.type}`;
      beerListElement.appendChild(li);
    });
  }
};

// Controlador
const BeerController = {
  init: function() {
    BeerView.renderList(BeerModel.getAllBeers());
  },

  addBeer: function(name, type) {
    BeerModel.addBeer(name, type);
    BeerView.renderList(BeerModel.getAllBeers());
  },

};

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
  BeerController.init();
});
