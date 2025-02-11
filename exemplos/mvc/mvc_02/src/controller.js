import { BeerModel } from './model.js';
import { BeerView } from './view.js';

export const BeerController = {
  init: function() {
    BeerView.renderList(BeerModel.getAllBeers());

    document.getElementById('add-beer').addEventListener('click', function() {
      const random_beer_names = ['Corona', 'Budweiser', 'Skol', 'Brahma', 'Antarctica', 'Bavaria', 'Bohemia', 'Brahma', 'Cacildis']
      const random_beer_types = ['Pilsner', 'Stout', 'Lager', 'IPA', 'Weiss', 'Ale', 'Porter', 'Sour', 'Barley Wine']
      const random_name = random_beer_names[Math.floor(Math.random() * random_beer_names.length)];
      const random_type = random_beer_types[Math.floor(Math.random() * random_beer_types.length)];
      BeerController.addBeer(random_name, random_type);
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
