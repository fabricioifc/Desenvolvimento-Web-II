// o Presenter substitui o Controller e assume um papel mais ativo na manipulação da lógica de apresentação. A View no MVP é mais passiva e delegada, enquanto o Presenter atua como intermediário entre a View e o Model.
import { BeerModel } from './model.js';
import { BeerView } from './view.js';

export const BeerPresenter = {
  init: function () {
    BeerView.init(this);
  },

  onLoad: function () {
    const beers = BeerModel.getAllBeers();
    BeerView.renderList(beers);
  },

  onAddBeer: function () {
    const random_beer_names = ['Corona', 'Budweiser', 'Skol', 'Brahma', 'Antarctica', 'Bavaria', 'Bohemia', 'Cacildis'];
    const random_beer_types = ['Pilsner', 'Stout', 'Lager', 'IPA', 'Weiss', 'Ale', 'Porter', 'Sour', 'Barley Wine'];
    const random_name = random_beer_names[Math.floor(Math.random() * random_beer_names.length)];
    const random_type = random_beer_types[Math.floor(Math.random() * random_beer_types.length)];

    BeerModel.addBeer(random_name, random_type);
    const beers = BeerModel.getAllBeers();
    BeerView.renderList(beers);
  },

  onRemoveBeer: function (id) {
    BeerModel.removeBeer(id);
    const beers = BeerModel.getAllBeers();
    BeerView.renderList(beers);
  },
};