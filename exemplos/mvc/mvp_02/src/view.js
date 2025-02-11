// a View (BeerView) apenas expõe métodos para renderizar a interface e notifica o Presenter (BeerPresenter) sobre interações do usuário (como cliques).
// Toda a lógica de decisão (o que fazer quando o usuário clica em um botão) é tratada pelo Presenter.
export const BeerView = {
    init: function (presenter) {
      this.presenter = presenter;
  
      // Configura o evento de clique no botão "Adicionar"
      document.getElementById('add-beer').addEventListener('click', () => {
        this.presenter.onAddBeer();
      });
  
      // Renderiza a lista inicial de cervejas
      this.presenter.onLoad();
    },
  
    renderList: function (beerList) {
      const beerListElement = document.getElementById('beer-list');
      beerListElement.innerHTML = '';
  
      beerList.forEach((beer) => {
        const li = document.createElement('li');
        li.textContent = `${beer.name} - ${beer.type}`;
        li.addEventListener('click', () => {
          this.presenter.onRemoveBeer(beer.id);
        });
        beerListElement.appendChild(li);
      });
    },
  };