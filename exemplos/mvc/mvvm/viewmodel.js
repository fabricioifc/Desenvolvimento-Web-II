// Model
// A função Beer define o modelo de dados para uma cerveja, representando a estrutura de dados que será manipulada pela aplicação.
function Beer(id, name, type) {
  this.id = id
  this.name = name;
  this.type = type;
}

// ViewModel
// A função BeerViewModel age como o ViewModel, contendo a lógica de apresentação e a manipulação dos dados do modelo.
// No ViewModel, self.beers é uma ObservableArray que armazena os dados das cervejas. Essa propriedade é acessível pela View e notifica automaticamente a View sobre mudanças, garantindo que a interface do usuário seja atualizada conforme os dados do modelo mudam.
// As funções addBeer e removeBeer permitem que a View interaja com os dados do modelo, adicionando e removendo cervejas da lista de cervejas.
function BeerViewModel() {
  var self = this;

  self.beers = ko.observableArray([
    new Beer(1, 'Stella Artois', 'Pilsner'),
    new Beer(2, 'Guinness', 'Stout'),
    new Beer(3, 'Heineken', 'Lager')
  ]);

  self.newBeer = ko.observable({
    name: '',
    type: ''
  });

  self.addBeer = function() {
    self.beers.push(new Beer(self.beers().length + 1, self.newBeer().name, self.newBeer().type));
    self.newBeer({
      name: '',
      type: ''
    });
    
  };

  self.removeBeer = function(beer) {
    self.beers.remove(beer);
  };
}

// Inicialização do ViewModel
var viewModel = new BeerViewModel();
ko.applyBindings(viewModel);
