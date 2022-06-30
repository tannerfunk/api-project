const gallery = document.querySelector('#gallery');


const cardImgContainer = document.querySelector(".card-img-container");


const firstNames = [];
const lastNames = [];
const emails = [];
const images = [];
const cities = [];
const states = [];
const cellNumbers = [];
const detailedAddressLine1 = [];
const detailedAddressLine2 = [];
const detailedAddressLine3 = [];
var dateFixer = '';
const birthdays = []

function left(str, chr) {
    return str.slice(0, chr - str.length);
  }

fetch('https://randomuser.me/api/?results=12') //connects to the API
    .then(response => response.json()) //returns a promise that resolves to JSON
    .then(data => {
        console.log(data) //to figure out what to set to the arrays
        for (let i = 0; i<12; ++i){
        firstNames[i] = data.results[i].name.first;
        lastNames[i] = data.results[i].name.last;
        emails[i] = data.results[i].email;
        images[i] = data.results[i].picture.medium;
        cities[i] = data.results[i].location.city;
        states[i] = data.results[i].location.state
        cellFixer = data.results[i].cell;
        cellFixer = cellFixer.replace(/\D/g, ''); //strips down to just the numbers so far... will put other formating in laterr
        cellNumbers[i] = cellFixer;
        detailedAddressLine1[i] = data.results[i].location.street.number + " " + data.results[i].location.street.name;
        detailedAddressLine2[i] = cities[i] + ", " + states[i] + " " + data.results[i].location.postcode;
        detailedAddressLine3[i] = data.results[i].location.country;
        dateFixer = left(data.results[i].dob.date, 10);
        dateFixer = dateFixer[5] + dateFixer[6] + "/" +  dateFixer[8] + dateFixer[9] + "/" + dateFixer[0] + dateFixer[1]+ dateFixer[2] + dateFixer[3];
        birthdays[i] = dateFixer;
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${images[i]}" alt="profile pic">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstNames[i]} ${lastNames[i]}</h3>
                <p class="card-text">${emails[i]}</p>
                <p class="card-text cap">${cities[i]}, ${states[i]}</p>
            </div>
        </div> `)
        }})