async function onInit() {
    const planetArray = await getPlanets();
    showPlanets(planetArray);
    getPlanetDetails(planetArray);
    getPlanetsListFiltered(planetArray)
}

function getPlanets() {
    return new Promise(async resolve => {
        let planets = [];
        for (let i = 1; i <= 6; i++) {
            const response = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
            const data = await response.json();
            planets = planets.concat(data.results);
        }
        resolve(planets);
    });
}

async function getPlanetsListFiltered(planets) {

    document.querySelector('#planete').addEventListener('change', (e) => {

        let planetsFiltered;
        const value = e.target.value;

        switch (value) {
            case "1":
                planetsFiltered = planets.filter(item => item.population <= 100000);
                break;
            case "2":
                planetsFiltered = planets.filter(item => item.population >= 100000 && item.population <= 100000000);
                break;
            case "3":
                planetsFiltered = planets.filter(item => item.population >= 100000 && item.population >= 100000000);
                break;
            case "all":
                planetsFiltered = planets;
                break;
        }
        showPlanets(planetsFiltered);
        getPlanetDetails(planetsFiltered);
    });

}

async function showPlanets(planets) {


    const arrayBody = document.querySelector('.array-body');

    arrayBody.innerHTML = "";

    for (let planet of planets) {
        const name = planet.name;
        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = name;
        nameParagraph.setAttribute('name', name)
        nameParagraph.classList.add('name');


        const zone = planet.terrain
        const zoneParagraph = document.createElement('p');
        zoneParagraph.textContent = zone;
        zoneParagraph.setAttribute('name', name)
        zoneParagraph.classList.add('zone');

        const arrayItem = document.createElement('div');
        arrayItem.classList.add('array-item');
        arrayItem.setAttribute('name', name)
        arrayItem.appendChild(nameParagraph);
        arrayItem.appendChild(zoneParagraph);

        arrayBody.appendChild(arrayItem);
    }
    getPlanetDetails(planets);
    document.querySelector('.item-number .number').textContent = planets.length;
}

async function getPlanetDetails(planets) {

    const planetList = document.querySelectorAll('.array-item');

    for (let planet of planetList) {

        planet.addEventListener('click', (e) => {

            let planetName = e.target.attributes['name'].value;

            const planetFiltered = planets.filter(item => item.name === planetName);
            
            document.querySelector('.planet-details .name').textContent = planetFiltered[0].name;
            document.querySelector('.population-number').textContent = planetFiltered[0].population;
            document.querySelector('.size').textContent = planetFiltered[0].diameter;
            document.querySelector('.climat').textContent = planetFiltered[0].climate;
            document.querySelector('.gravity').textContent = planetFiltered[0].gravity;
            document.querySelector('.planet-infos .zone').textContent = planetFiltered[0].terrain
        });
    }
}

onInit();