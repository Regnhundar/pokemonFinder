'use strict';

// När sidan laddas händer allt i kodblocket under. 
window.addEventListener('load',() => {
    let buttonOne = document.querySelector(`#buttonGroup button`)
    buttonOne.textContent = `Visa alla Pokemon`
    buttonOne.addEventListener(`click`, showAllCards) 
    // Notera att när man lägger till en funktion i en eventlyssnare skriver man utan parantes.
    //  Dvs inte showAllCards(). Inkluderar man parantes väntar den inte på klick utan kör direkt.
    let buttonTwo = document.querySelectorAll(`#buttonGroup button`)[1]
    buttonTwo.textContent = `Slumpa en Pokemon`
    buttonTwo.addEventListener(`click`, randomizer)

    let buttonGroup = document.querySelector(`#buttonGroup`);

    let inputField = document.createElement(`input`);
    inputField.type = `search`;
    inputField.placeholder = `Skriv in namnet på en Pokemon...`;
    inputField.classList.add(`d-none`, `search-field`);
    // Lägger till eventlyssnare på inputfältet så när du trycker enter så skickas sökningen till funktionen. 
    // If satsen kollar specifikt efter att du trycker på enter.
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let searchWord = inputField.value.toLowerCase();
            pokeSearch(searchWord);
        }
    });
    buttonGroup.appendChild(inputField);

    let inputButton = document.createElement(`button`)
    inputButton.textContent = `Sök`
    inputButton.classList.add(`d-none`)
    buttonGroup.appendChild(inputButton);
    inputButton.addEventListener(`click`, () => {
        let searchWord = inputField.value.toLowerCase();
        pokeSearch(searchWord)
    });
    // Har endast en toggle för att ta fram eller dölja sökfältet med knapp.
    let buttonThree = document.querySelectorAll(`#buttonGroup button`)[2]
    buttonThree.textContent = `Sök efter en Pokemon`
    buttonThree.addEventListener(`click`, () => {
        inputField.classList.toggle(`d-none`);
        inputButton.classList.toggle(`d-none`)
    })

});

// Funktionen togglar utility classen "d-none" på #cardContainer. När sidan laddas in så är den redan inskriven så vid första knapptryck tas den bort.
// Sedan läggs klassen d-none till på #form och #randomGen. För att lägga till den på båda via en queryselectorall så görs det via en forEach länk.
// Om man inte använder forEach läggs den bara på den första inom parantesen. Dvs #form. 
// Funktionen kollar också ifall #cardContainer är tom. Ifall den är tom körs renderCard() och renderar alla kort. Om den inte är tom togglar man enbart 
// d-none klassen.
function showAllCards () {
    let containerRef = document.querySelector('#cardContainer');
    containerRef.classList.toggle(`d-none`)
    document.querySelectorAll('#form, #randomGen').forEach(classAdd => { classAdd.classList.add('d-none');
    });
    if(containerRef.innerHTML === ``){
    pokemons.forEach(pokemon => {
        renderCard(pokemon, containerRef)
    });
}}

// Ger dig ett random kort baserat på index-platsen i pokemons arrayen. 
function randomizer() {
    let containerRef = document.querySelector('#randomGen');
    containerRef.innerHTML = ``;
    containerRef.classList.remove(`d-none`)
    document.querySelectorAll('#form, #cardContainer').forEach(classAdd => { classAdd.classList.add('d-none');
    });
    let randomizedNumber = Math.floor(Math.random()*pokemons.length);
    let randomPokemon = pokemons[randomizedNumber]

    renderCard(randomPokemon, containerRef);
}

// Funktionen söker i pokemons arrayen. Den kollar ifall det du skrivit in är en siffra eller inte. 
// OM det är bokstäver så kollar den efter namnet i objekten i pokemons arrayen och jämför ifall bokstavskombinationen inkluderas i något objekts namn.
// Är det inte bokstäver så kollar den ifall det du skrivit in finns som id i något objekt. Förhoppningsvis är det en siffra men kontrolleras inte.
function pokeSearch(searchWord) {
    let containerRef = document.querySelector('#form');
    containerRef.innerHTML = ``;
    containerRef.classList.remove(`d-none`)
    document.querySelectorAll('#randomGen, #cardContainer').forEach(classAdd => { classAdd.classList.add('d-none');
    });
    if(isNaN(searchWord)){
    let pokemonToFind = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchWord));
    pokemonToFind.forEach(pokemonCard => {
        renderCard(pokemonCard, containerRef);
    })}
    else {
        let pokemonFindId = pokemons.filter(pokemon => pokemon.id === parseInt(searchWord));
        renderCard(...pokemonFindId, containerRef);
    }
}

function renderCard(pokemon, containerRef) {

    const cardRef = document.createElement('div');
    cardRef.classList.add('card');
    containerRef.appendChild(cardRef);

    let divRef = document.createElement('div');
    divRef.classList.add('image-container');
    cardRef.appendChild(divRef);
    
    const imgRef = document.createElement('img');
    imgRef.classList.add('card-image');
    imgRef.style.backgroundColor = pokemon.type[0].color;
    imgRef.src = pokemon.image;
    imgRef.alt = 'Bild på ' + pokemon.name;
    divRef.appendChild(imgRef);

    const spanRef = document.createElement('span');
    spanRef.classList.add('index-span');
    spanRef.textContent = '#' + pokemon.id;
    divRef.appendChild(spanRef);

    divRef = document.createElement('div');
    divRef.classList.add('card-info');
    cardRef.appendChild(divRef);

    let headingRef = document.createElement('h2');
    headingRef.textContent = pokemon.name;
    divRef.appendChild(headingRef);
    
    let textRef = document.createElement('p');
    if(pokemon.type.length === 1) {
        textRef.textContent = pokemon.type[0].name;
    } else {
        textRef.textContent = pokemon.type[0].name + ' / ' + pokemon.type[1].name;
    }
    divRef.appendChild(textRef);

    divRef = document.createElement('div');
    divRef.classList.add('card-stats');
    cardRef.appendChild(divRef);

    headingRef = document.createElement('h3');
    headingRef.textContent = 'Base Stats:';
    divRef.appendChild(headingRef);

    const tableRef = document.createElement('table');
    tableRef.classList.add('table');
    divRef.appendChild(tableRef);

    let rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);

    rowRef.appendChild(renderCell('HP', pokemon.stats.hp));
    rowRef.appendChild(renderCell('Speed', pokemon.stats.speed));

    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);

    rowRef.appendChild(renderCell('Attack', pokemon.stats.attack));
    rowRef.appendChild(renderCell('Special Attack', pokemon.stats.specialAttack));
    
    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);
    
    rowRef.appendChild(renderCell('Defense', pokemon.stats.defense));
    rowRef.appendChild(renderCell('Special Defense', pokemon.stats.specialDefense));
    
    rowRef = document.createElement('tr');
    tableRef.appendChild(rowRef);
    
    rowRef.appendChild(renderCell('Total', pokemon.stats.total));
}

function renderCell(statName, stat) {
    let cellRef = document.createElement('td');
    cellRef.classList.add('table-cell');
    cellRef.textContent = statName + ': ' + stat;
    return cellRef;
}