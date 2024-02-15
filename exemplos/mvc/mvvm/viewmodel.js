function Beer(id, name, type) {
  this.id = id
  this.name = name;
  this.type = type;
}

// ViewModel
function BeerViewModel() {
  var self = this;

  self.beers = ko.observableArray([
    new Beer(1, 'Stella Artois', 'Pilsner'),
    new Beer(2, 'Guinness', 'Stout'),
    new Beer(3, 'Heineken', 'Lager')
  ]);

  self.addBeer = function() {
    self.beers.push(new Beer(4, 'Brahma', 'Pilsner'));
  };

  self.removeBeer = function(beer) {
    self.beers.remove(beer);
  };
}

// Inicialização
ko.applyBindings(new BeerViewModel());
