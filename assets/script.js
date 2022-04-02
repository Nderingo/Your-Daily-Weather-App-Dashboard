
var APIkey = "00089a1cd746d533163603d95646c3b3"

// Select elements by ID
// var input = document.getElementById("cityName");
var button = document.getElementById("btn");

// var queryURL = "http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}"

var searchHistory = localStorage.getItem('searchHistory');
var searchedHistory;


if (!searchHistory) {
    searchedHistory = [];
  } else {
    searchedHistory = JSON.parse(searchHistory);
    displayPreviousCitySearch();
    
}

function savePreviousCitySearch (userInput) {
  userInput = userInput.toLowerCase().trim();
  userInput = userInput.charAt(0).toUpperCase() + userInput.slice(1);
  searchedHistory.forEach((cityName, index) => {
    if (cityName === userInput) {
      searchedHistory.splice(index, 1);    
    }
  });

  searchedHistory.push(userInput);
  localStorage.setItem('searchHistory', JSON.stringify(searchedHistory));
}



function displayPreviousCitySearch() {
  document.getElementById('searchHistory').innerHTML = "";
  //Reversed search display so that most recent search appears on top 
  searchedHistory.slice().reverse().forEach((cityName) => {
    var previousCityButton = document.createElement('button');
    previousCityButton.classList.add('list-group-item');
    previousCityButton.classList.add('list-group-item-action');
    previousCityButton.innerHTML = cityName;
    document.getElementById('searchHistory').appendChild(previousCityButton);
    previousCityButton.addEventListener("click", handleHistoryClick);
  });
}

function handleHistoryClick(event) {
  locationSearch(event.target.innerHTML);
}
  
//Search button
document.getElementById("cityName").addEventListener("submit", citySearch);


//Button grabs user input and fetches data from the API
function citySearch(event) {
    event.preventDefault();
    var userInput = document.getElementById("userInput").value;
    locationSearch(userInput);
}

//Calls on Weather API for local city
function locationSearch(cityName) {
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        savePreviousCitySearch(cityName);
        displayPreviousCitySearch();
        return response.json();
      } else {
        return alert("Error. Please try again.");
      }
    })
    .then(function (data) {
      if (data) {
        findWeather(data);
      }

    });
}


