// model.js
const getBeersFromStorage = () => {
    const beers = localStorage.getItem('beers');
    return beers ? JSON.parse(beers) : [];
  };
  
  const saveBeersToStorage = (beers) => {
    localStorage.setItem('beers', JSON.stringify(beers));
  };
  
  export const BeerModel = {
    getAllBeers: function () {
      return getBeersFromStorage();
    },
  
    addBeer: function (name, type) {
      const beers = getBeersFromStorage();
      const maxId = beers.reduce((max, beer) => (beer.id > max ? beer.id : max), 0);
      const id = maxId + 1;
      const newBeer = { id, name, type };
      beers.push(newBeer);
      saveBeersToStorage(beers);
    },
  
    removeBeer: function (id) {
      let beers = getBeersFromStorage();
      beers = beers.filter((beer) => beer.id !== id);
      saveBeersToStorage(beers);
    },
  };