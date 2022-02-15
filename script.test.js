const insereItemLista = require('../projeto-bonus-trybar/insereItem');

const arrayDrinksVodka = ['Vodka and Tonic', 'Bloody Mary', 'Sex On the Beach', 'Moscow Mule', 'Cosmopolitan', 'Vodka Martini', 'White Russian', 'Screwdriver', 'Espresso Martini', 'Blue Lagoon', 'Harvey Wallbanger', 'Freddy Kruger'];

describe('1 - Teste a função insereItemLista', () => {
  it('insereItemLista é uma função?', () => {
    expect(typeof(insereItemLista)).toBe('function');
  });
  it('insereItemLista retorna o array correto?', () => {
    expect(insereItemLista(arrayDrinksVodka)).toEqual(arrayDrinksVodka);
  });
});