// Modelo
const BeerModel = {
  beers: [
    { id: 1, name: 'Stella Artois', type: 'Pilsner' },
    { id: 2, name: 'Guinness', type: 'Stout' },
    { id: 3, name: 'Heineken', type: 'Lager' },
  ],

  getAllBeers: function() {
    return this.beers;
  },

  addBeer: function(name, type) {
    const id = this.beers.length + 1;
    this.beers.push({ id, name, type });
  },

  removeBeer: function(id) {
    this.beers = this.beers.filter(function(beer) {
      return beer.id !== id;
    });
  }

};

// Visão
// No padrão MVC, a View geralmente tem menos responsabilidades e recebe os dados diretamente do Controller, que pode chamar BeerView.renderList(data).
const BeerView = {
  renderList: function(beerList) {
    const beerListElement = document.getElementById('beer-list');
    beerListElement.innerHTML = '';

    beerList.forEach(function(beer) {
      const li = document.createElement('li');
      li.textContent = `${beer.name} - ${beer.type}`;
      li.addEventListener('click', function() {
        BeerModel.removeBeer(beer.id);
        BeerView.renderList(BeerModel.getAllBeers());
      });
      beerListElement.appendChild(li);
    });
  }
};

// Controlador
const BeerController = {
  init: function() {
    BeerView.renderList(BeerModel.getAllBeers());

    document.getElementById('add-beer').addEventListener('click', function() {
      const random_beer_names = ['Corona', 'Budweiser', 'Skol', 'Brahma', 'Antarctica', 'Bavaria', 'Bohemia', 'Brahma', 'Cacildis']
      const random_beer_types = ['Pilsner', 'Stout', 'Lager', 'IPA', 'Weiss', 'Ale', 'Porter', 'Sour', 'Barley Wine']
      const random_name = random_beer_names[Math.floor(Math.random() * random_beer_names.length)];
      const random_type = random_beer_types[Math.floor(Math.random() * random_beer_types.length)];
      BeerController.addBeer(random_name, random_type);
      BeerView.renderList(BeerModel.getAllBeers());
    });
  },

  addBeer: function(name, type) {
    BeerModel.addBeer(name, type);
    BeerView.renderList(BeerModel.getAllBeers());
  },

  removeBeer: function(id) {
    BeerModel.removeBeer(id);
    BeerView.renderList(BeerModel.getAllBeers());
  }

};

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
  BeerController.init();
});
