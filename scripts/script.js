'use strict';

window.addEventListener('load',() => {
    let buttonOne = document.querySelector(`#buttonGroup button`)
    buttonOne.textContent = `Visa alla Pokemon`
    buttonOne.addEventListener(`click`, showAllCards)

    let buttonTwo = document.querySelectorAll(`#buttonGroup button`)[1]
    buttonTwo.textContent = `Slumpa en Pokemon`
    buttonTwo.addEventListener(`click`, randomizer)

    let buttonGroup = document.querySelector(`#buttonGroup`);
    let inputField = document.createElement(`input`);
    inputField.type = `search`;
    inputField.placeholder = `Skriv in namnet på en Pokemon`;
    inputField.classList.add(`d-none`);
    buttonGroup.appendChild(inputField);
    let inputButton = document.createElement(`button`)
    inputButton.textContent = `Sök`
    inputButton.classList.add(`d-none`)
    buttonGroup.appendChild(inputButton);
    inputButton.addEventListener(`click`, () => {
        let searchWord = inputField.value.toLowerCase();
        pokeSearch(searchWord)});


    let buttonThree = document.querySelectorAll(`#buttonGroup button`)[2]
    buttonThree.textContent = `Sök efter en Pokemon`
    buttonThree.addEventListener(`click`, () => {
        inputField.classList.toggle(`d-none`);
        inputButton.classList.toggle(`d-none`)
    })

});

function showAllCards () {
    let containerRef = document.querySelector('#cardContainer');
    containerRef.innerHTML = ``;
    containerRef.classList.toggle(`d-none`)
    document.querySelectorAll('#form, #randomGen').forEach(classAdd => { classAdd.classList.add('d-none');
    });
    pokemons.forEach(pokemon => {
        renderCard(pokemon, containerRef)
    });
}

function randomizer() {
    let containerRef = document.querySelector('#randomGen');
    containerRef.innerHTML = ``;
    containerRef.classList.remove(`d-none`)
    document.querySelectorAll('#form, #cardContainer').forEach(classAdd => { classAdd.classList.add('d-none');
    });
    let randomizedNumber = Math.floor(Math.random()*pokemons.length);
    // let randomPokemon = pokemons.filter(hund => hund.id === randomizedNumber);
    let randomPokemon = pokemons[randomizedNumber]

    renderCard(randomPokemon, containerRef);
}

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