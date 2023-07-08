// Récupérer l'élément "donneesAPI" pour afficher les données
const donneesAPI = document.getElementById('donneesAPI');

let data; // Déclarer la variable data

// Ecouteur d'evenement liste déroulante
let regionAfrica = document.getElementById('region-africa');
let regionAmerica = document.getElementById('region-america');
let regionAsia = document.getElementById('region-asia');
let regionEurope = document.getElementById('region-europe');
let regionOceania = document.getElementById('region-oceania');

// Envoyer une requête GET à l'URL spécifiée
fetch('https://restcountries.com/v3.1/all')
    // Convertir la réponse en format JSON
    .then(response => response.json())
    .then(responseData => {
        data = responseData; // Assigner les données à la variable data

        // Ajouter les écouteurs d'événements pour les filtres par continent
        regionAfrica.addEventListener('click', () => {
            displayCountriesByContinent('Africa');
        });

        regionAmerica.addEventListener('click', () => {
            displayCountriesByContinent('Americas');
        });

        regionAsia.addEventListener('click', () => {
            displayCountriesByContinent('Asia');
        });

        regionEurope.addEventListener('click', () => {
            displayCountriesByContinent('Europe');
        });

        regionOceania.addEventListener('click', () => {
            displayCountriesByContinent('Oceania');
        });

        // Afficher tous les pays au chargement de la page
        displayAllCountries();

    })
    .catch(error => {
        // Gérer les erreurs
        console.log('Une erreur s\'est produite :', error);
    });

// Fonction pour afficher tous les pays
function displayAllCountries() {
    // Supprime les pays affichés précédemment
    donneesAPI.innerHTML = '';

    // Créer une div pour contenir les éléments des pays
    let countries = document.createElement("div");
    countries.classList.add("pays");

    // Parcourir les pays et afficher leurs informations
    data.forEach(country => {
        // Créer une div pour chaque pays
        let card = document.createElement('div');
        card.classList.add('element-pays');

        let flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.alt = 'Drapeau du pays';

        let countryName = document.createElement('p');
        countryName.textContent = country.name.common;

        let population = document.createElement('p');
        population.textContent = 'Population: ' + country.population;

        let region = document.createElement('p');
        region.textContent = 'Région: ' + country.region;

        let capital = document.createElement('p');
        capital.textContent = 'Capitale: ' + country.capital;

        // Ajouter les éléments à la div du pays
        card.appendChild(flag);
        card.appendChild(countryName);
        card.appendChild(population);
        card.appendChild(region);
        card.appendChild(capital);

        // Ajouter la div du pays à la div des pays
        countries.appendChild(card);
    });

    // Ajouter la div des pays à l'élément donneesAPI
    donneesAPI.appendChild(countries);
}

// Fonction pour afficher les pays par continent
function displayCountriesByContinent(continent) {
    // Supprime les pays affichés précédemment
    donneesAPI.innerHTML = '';

    // Créer une div pour contenir les éléments des pays
    let countries = document.createElement("div");
    countries.classList.add("pays");

    // Filtrer les pays correspondant au continent sélectionné
    let countriesByContinent = data.filter(country => country.region === continent);

    // Parcourir les pays filtrés et afficher leurs informations
    countriesByContinent.forEach(country => {
        // Créer les éléments HTML pour afficher les informations du pays
        let card = document.createElement('div');
        card.classList.add('element-pays');

        let flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.alt = 'Drapeau du pays';

        let countryName = document.createElement('p');
        countryName.textContent = country.name.common;

        let population = document.createElement('p');
        population.textContent = 'Population: ' + country.population;

        let region = document.createElement('p');
        region.textContent = 'Région: ' + country.region;

        let capital = document.createElement('p');
        capital.textContent = 'Capitale: ' + country.capital;

        // Ajouter les éléments à la div du pays
        card.appendChild(flag);
        card.appendChild(countryName);
        card.appendChild(population);
        card.appendChild(region);
        card.appendChild(capital);

        // Ajouter la div du pays à la div des pays
        countries.appendChild(card);
    });

    // Ajouter la div des pays à l'élément donneesAPI
    donneesAPI.appendChild(countries);
}
