const vodka = document.getElementById('vodka');
const gin = document.getElementById('gin');
const whisky = document.getElementById('whisky');
const cachaça = document.getElementById('cachaça');
const cerveja = document.getElementById('cerveja');
const rum = document.getElementById('rum');
const listaSugestao = document.getElementById('lista-sugestao');
const botaoPesquisar = document.getElementById('botao-pesquisar');
const nomeDrink = document.getElementById('nome-drink');
const imgDrink = document.getElementById('img-drink');
const copo = document.getElementById('copo');
const ingredientes = document.getElementById('ingredientes');
const doses = document.getElementById('doses');
const instrucoes = document.getElementById('instrucoes');

const arrayDrinksVodka = ['Vodka and Tonic', 'Bloody Mary', 'Sex On the Beach', 'Moscow Mule', 'Cosmopolitan', 'Vodka Martini', 'White Russian', 'Screwdriver', 'Espresso Martini', 'Blue Lagoon', 'Harvey Wallbanger', 'Freddy Kruger'];
const arrayDrinksGin = ['Gin Tonic', 'Gin Sour', 'Negroni', 'Gin Fizz', 'Martini', 'Gimlet', 'Tom Collins', 'French 75', 'Clover Club', 'Monkey Gland', 'Aviation'];
const arrayDrinksWhisky = ['Old Fashioned', 'Manhattan', 'Bourbon Sour', 'Sazerac', 'Mint Julep', 'John Collins', 'Godfather', 'Rob Roy', 'Penicillin', 'Rusty Nail'];
const arrayDrinksCachaça = ['Caipirinha', 'Dark Caipirinha', 'Elderflower Caipirinha', 'Girl From Ipanema'];
const arrayDrinksCerveja = ['Zambeer', 'Campari Beer', 'Diesel', 'Snake Bite', 'Green Goblin', '110 in the shade', 'Snakebite and black', 'Michelada', 'Radler'];
const arrayDrinksRum = ['Daiquiri', 'Mojito', 'Mai Tai', 'Cuba Libre', 'Piña Colada', 'Rum Punch', 'Planter’s Punch', 'Rum Fizz', 'Rum Sour', 'Hurricane', 'Sidecar', 'Dark and Stormy'];

const getElementOrClosest = (sectionClass, target) => {
  if (target.classList.contains(sectionClass)) {
    return target.firstElementChild.innerText;
  }
  return target.closest(sectionClass).firstElementChild.innerText;
}

const limpaListaSugestao = () => {
  const listaSugestao = document.querySelectorAll('.sugestoesDrink');
  for (let index = 0; index < listaSugestao.length; index += 1) {
    const listaOl = document.getElementById('lista-sugestao');
    listaOl.removeChild(listaOl.firstElementChild);
  }  
}

const insereItemLista = (arrayDrinks) => {
  limpaListaSugestao();
  arrayDrinks.forEach((element) => {
    const li = document.createElement('li');
    li.style.color = 'rgb(255, 217, 0)';
    li.style.listStyle = 'none';
    li.style.fontSize = '25px';
    li.className = 'sugestoesDrink'
    li.innerHTML = element;    
    listaSugestao.appendChild(li);
  });
}

const imprimeLista = ({ target }) => {
  let bebidas = getElementOrClosest('.bebidas', target);
  switch(bebidas) {
    case bebidas = 'Vodka':
      insereItemLista(arrayDrinksVodka);
      break;
    case bebidas = 'Gin':
      insereItemLista(arrayDrinksGin);
      break;
    case bebidas = 'Whisky':
      insereItemLista(arrayDrinksWhisky);
      break;
    case bebidas = 'Cachaça':
      insereItemLista(arrayDrinksCachaça);
      break;
    case bebidas = 'Cerveja':
      insereItemLista(arrayDrinksCerveja);
      break;
    case bebidas = 'Rum':
      insereItemLista(arrayDrinksRum);
      break;
  }
}

const fetchDrink = async () => {  
  const inputDrink = document.getElementById('input-pesquisa').value;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputDrink}`;
  const response = await fetch(URL);
  const data = await response.json();  
  return data.drinks[0];
};

const criaIngredientes = async () => {
  const objetoDrink = await fetchDrink();
  for (let index = 1; index <= 15 ; index += 1) {
    const indexIngrediente = `strIngredient${index}`;
    const itemDrink = objetoDrink[indexIngrediente];
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.innerHTML = itemDrink;    
    ingredientes.appendChild(li);
  }
};

const criaDoses = async () => {
  const objetoDrink = await fetchDrink();
  for (let index = 1; index <= 15 ; index += 1) {
    const indexMeasure = `strMeasure${index}`;
    const itemDrink = objetoDrink[indexMeasure];
    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.innerHTML = itemDrink;    
    doses.appendChild(li);
  }
};

const imprimeReceita = async (event) => {
  event.preventDefault();
  const objetoDrink = await fetchDrink();
  const { strDrink, strGlass, strInstructions, strDrinkThumb } = objetoDrink;
  nomeDrink.innerText = strDrink;
  imgDrink.src = strDrinkThumb;
  copo.innerText = strGlass;
  criaIngredientes();
  criaDoses();
  instrucoes.innerText = strInstructions;
};

vodka.addEventListener('click', imprimeLista);
gin.addEventListener('click', imprimeLista);
whisky.addEventListener('click', imprimeLista);
cachaça.addEventListener('click', imprimeLista);
cerveja.addEventListener('click', imprimeLista);
rum.addEventListener('click', imprimeLista);
botaoPesquisar.addEventListener('click', imprimeReceita)
