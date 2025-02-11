import { BeerController } from './controller.js';

export const BeerView = {
  renderList: function(beerList) {
    const beerListElement = document.getElementById('beer-list');
    beerListElement.innerHTML = '';

    beerList.forEach(function(beer) {
      const li = document.createElement('li');
      li.textContent = `[${beer.id}] ${beer.name} - ${beer.type}`;
      li.addEventListener('click', function() {
        // O controller deve ser quem chama a função de remoção
        BeerController.removeBeer(beer.id);
      });
      beerListElement.appendChild(li);
    });
  }
};
