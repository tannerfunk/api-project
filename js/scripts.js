// variables to hold HTML elements
const gallery = document.querySelector('#gallery');
const cardImgContainer = document.querySelector(".card-img-container");

//arrays to hold ALL the different peices of data we want for our users
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
const birthdays = []

//variables for cleaning up the data
var dateFixer = '';
var cellFixer = 0;
var cellFixerArray = [];

//a variable to figure out which index in the array we should pull the data from based off of which card was clicked.
var findNum = '';

//data cleaning function to be used later for fixing the date.
function left(str, chr) {
    return str.slice(0, chr - str.length);
  }

//my fetch function
fetch('https://randomuser.me/api/?nat=us&results=12') //connects to the API
    .then(response => response.json()) //returns a promise that resolves to JSON
    .then(data => {
        //console.log(data) //to figure out what to set to the arrays
        //loop through each result and throw it into the array
        for (let i = 0; i<12; ++i){
        firstNames[i] = data.results[i].name.first;
        lastNames[i] = data.results[i].name.last;
        emails[i] = data.results[i].email;
        images[i] = data.results[i].picture.large;
        cities[i] = data.results[i].location.city;
        states[i] = data.results[i].location.state
        cellFixer = data.results[i].cell;
        cellFixer = cellFixer.replace(/\D/g, ''); //strips down to just the numbers
        cellFixerArray = cellFixer.split(""); // splits it all into different pieces
        cellFixer = `(${cellFixerArray[0]}${cellFixerArray[1]}${cellFixerArray[2]}) ${cellFixerArray[3]}${cellFixerArray[4]}${cellFixerArray[5]}-${cellFixerArray[6]}${cellFixerArray[7]}${cellFixerArray[8]}${cellFixerArray[9]}` //format number correctly
        cellNumbers[i] = cellFixer;
        detailedAddressLine1[i] = data.results[i].location.street.number + " " + data.results[i].location.street.name;
        detailedAddressLine2[i] = cities[i] + ", " + states[i] + " " + data.results[i].location.postcode;
        detailedAddressLine3[i] = data.results[i].location.country;
        dateFixer = left(data.results[i].dob.date, 10); //format date correctly
        dateFixer = dateFixer[5] + dateFixer[6] + "/" +  dateFixer[8] + dateFixer[9] + "/" + dateFixer[0] + dateFixer[1]+ dateFixer[2] + dateFixer[3];
        birthdays[i] = dateFixer;
        // throw the html card with the correct data onto the screen
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card space ${i}">
            <div class="card-img-container space ${i}">
                <img class="card-img space ${i}" src="${images[i]}" alt="profile pic">
            </div>
            <div class="card-info-container space ${i}">
                <h3 id="name" class="card-name cap ${i}">${firstNames[i]} ${lastNames[i]}</h3>
                <p class="card-text space ${i}">${emails[i]}</p>
                <p class="card-text cap ${i}">${cities[i]}, ${states[i]}</p>
            </div>
        </div> `) 
        }});
    // event listener for clicking on each card
    gallery.addEventListener('click', function (e){
        if (e.target.classList.contains('card') || e.target.classList.contains('card-img-container') || e.target.classList.contains('card-img') || e.target.classList.contains('card-info-container') || e.target.classList.contains('card-name') || e.target.classList.contains('card-text')) {
            findNum = e.target.classList[2];
            displayModal(findNum);
        }
    });
    // event listener for clicking off the modal
    gallery.addEventListener('click', function (e){
        if (e.target.classList.contains('modal-container') || e.target.classList.contains('close') || e.target.classList.contains('modal-close-btn')) {
            document.querySelector(".modal-container").remove();
        }
    });

function displayModal(num){

    gallery.insertAdjacentHTML('beforeend', `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong class="close">X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${images[num]}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${firstNames[num]} ${lastNames[num]}</h3>
                        <p class="modal-text">${emails[num]}</p>
                        <p class="modal-text cap">${cities[num]}</p>
                        <hr>
                        <p class="modal-text">${cellNumbers[num]}</p>
                        <p class="modal-text">${detailedAddressLine1[num]}, ${detailedAddressLine2[num]}</p>
                        <p class="modal-text">Birthday: ${birthdays[num]}</p>
                    </div>
                </div>
    `)
};