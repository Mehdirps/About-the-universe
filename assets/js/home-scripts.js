function getPlanetCount() {
    fetch(`https://swapi.dev/api/planets`)
        .then(item => item.json())
        .then(item => {
            document.querySelector('.content-figures-number-planet').textContent = item.count;
        });
}

function getStarShipCount() {
    fetch(`https://swapi.dev/api/starships`)
        .then(item => item.json())
        .then(item => {
            document.querySelector('.content-figures-number-starship').textContent = item.count;
        });
}

function getPeopleCount() {
    fetch(`https://swapi.dev/api/people`)
        .then(item => item.json())
        .then(item => {
            document.querySelector('.content-figures-number-people').textContent = item.count;
        });
}

getPeopleCount();
getStarShipCount();
getPlanetCount();