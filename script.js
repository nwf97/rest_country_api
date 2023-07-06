// Récupérer l'élément "donneesAPI" pour afficher les données
const donneesAPI = document.getElementById('donneesAPI');

// Créer une div pour contenir les éléments des pays
let countries = document.createElement("div");
countries.classList.add("pays");

// Envoyer une requête GET à l'URL spécifiée
fetch('https://restcountries.com/v3.1/all')
    // Convertir la réponse en format JSON
    .then(response => response.json())
    .then(data => {
        // Sélectionner 8 pays au hasard
        let randomCountries = getRandomCountries(data, 8);

        // Parcourir les pays sélectionnés et afficher leurs informations
        randomCountries.forEach(country => {
            // Créer une div pour chaque pays
            let card = document.createElement('div');
            card.classList.add('element-pays');

            // Créer les éléments HTML pour afficher les informations du pays
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
            capital.textContent = 'Capitale: ' + country.capital[0];

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
    })
    .catch(error => {
        // Gérer les erreurs
        console.log('Une erreur s\'est produite :', error);
    });

// Fonction pour sélectionner des pays au hasard
function getRandomCountries(countries, number) {
    let randomCountries = [];
    let indexes = [];

    // Générer des indexes uniques au hasard
    while (indexes.length < number) {
        let index = Math.floor(Math.random() * countries.length);
        if (!indexes.includes(index)) {
            indexes.push(index);
        }
    }

    // Sélectionner les pays correspondant aux indexes
    indexes.forEach(index => {
        randomCountries.push(countries[index]);
    });

    return randomCountries;
}
