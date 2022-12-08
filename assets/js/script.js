// Text area for meme content
var memeTextEL = document.querySelector('#meme-text');
// Button to generate meme and fact
var memeButtonEL = document.querySelector('#meme-button');
// Need a cat fact element for where the cat fact will go
var factTextEL = document.querySelector('#cat-fact');
// Need a cat meme image element for where the meme will go
var catMemeEL = document.querySelector('#cat-meme');
// Need a place to show cat fact history
var catFactHistoryEL = document.querySelector('#cat-fact-history');


// Global Variables
var baseURL = "https://cataas.com";


// Get Cat Fact API
function getCatFact(){
    fetch("https://catfact.ninja/fact?max_length=140")
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {

        // Render returned cat fact to screen
        factTextEL.textContent = data.fact;

        // Save cat fact to storage
        var factHistory = readHistoryFromStorage();
        factHistory.push(data.fact);
        saveHistoryToStorage(factHistory);

    })
    .catch(function(err) {
      // catch any errors
      console.log(err);
  });
};

// Get Cat Meme API
var getCatMeme = function (event) {
    event.preventDefault();    

    // "Refresh element" so new memes don't stack next to each other
    catMemeEL.innerHTML = '';

    // Get the meme text from user input
    var memeText = memeTextEL.value.trim();

    if (memeText == ''){
      catMemeEL.textContent = "Enter in some text to get a meme!  We'll still give you a fact, though..."
    } else {
      fetch("https://cataas.com/cat/says/" + memeText + "?json=true")
      .then(function(resp) { return resp.json() }) // Convert data to json
      .then(function(data) {
          // Creat the cat image and append to the cat-meme div
          var catImageEL = document.createElement('img');
          catImageEL.src = baseURL + data.url;
          catMemeEL.appendChild(catImageEL);
      })
      .catch(function(err) {
        // catch any errors
        console.log(err);
      });
    }

  getCatFact();
  readHistoryFromStorage();
};

function getRandomCatImg() {

    // "Refresh element" so new memes don't stack next to each other
    catMemeEL.innerHTML = '';

    fetch("https://cataas.com//cat?json=true")
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        // Creat the cat image and append to the cat-meme div
        var catImageEL = document.createElement('img');
        catImageEL.src = baseURL + data.url;
        catMemeEL.appendChild(catImageEL);
    })
    .catch(function(err) {
      // catch any errors
      console.log(err);
  });    

};

// Takes an search result and saves to local storage.
function saveHistoryToStorage(catFact) {
    localStorage.setItem('catFactHistory', JSON.stringify(catFact));
};

// Reads history from local storage and returns array of search history objects.
// Returns an empty array ([]) if there aren't any search results.
function readHistoryFromStorage() {

    // "Refresh element" so facts don't stack next to each other
    catFactHistoryEL.innerHTML = '';

    var factHistory = localStorage.getItem('catFactHistory');
    if (factHistory) {
        factHistory = JSON.parse(factHistory);
    } else {
        factHistory = [];
    };

    // Need to display factHistory to screen so users can see past cat facts
    // Only want to return last 10 results.  Otherwise this list is gonna get too long.
    if (factHistory.length < 10) {
      varLength = factHistory.length;
    } else {
      varLength = 10;
    };

    // And finally, render results to screen as a list
    for (var i = 0; i < varLength; i++){
      var liHistoryResult = document.createElement("li");
      liHistoryResult.textContent = factHistory[i];
      liHistoryResult.classList.add("historyResults");
      catFactHistoryEL.appendChild(liHistoryResult);
    };

    return factHistory;
};



// On init, get a random cat image and put in the image box, read history from storage
function init() {
    getRandomCatImg()
    readHistoryFromStorage();
};

memeButtonEL.addEventListener('click', getCatMeme);

init();
