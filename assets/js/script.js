// Text area for meme content
var memeTextEL = document.querySelector('#meme-text');
// Button to generate meme and fact
var memeButtonEL = document.querySelector('#meme-button');
// Need a cat fact element for where the cat fact will go
var factTextEL = document.querySelector('#cat-fact');
// Need a cat meme image element for where the meme will go
var catMemeEL = document.querySelector('#cat-meme');


// Global Variables
var baseURL = "https://cataas.com";


// Get Cat Fact API
function getCatFact(){
    fetch("https://catfact.ninja/fact?max_length=140")
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        console.log(data.fact);
        factTextEL.textContent = data.fact;

    })
    .catch(function(err) {
      // catch any errors
      console.log(err);
  });
};

// Get Cat Meme API
function getCatMeme(){

    catMemeEL.innerHTML = '';

    var memeText = memeTextEL.value.trim();

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
};

function getRandomCatImg() {

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



// On init, get a random cat image and put in the image box, read history from storage
function init() {

    getRandomCatImg()
    getCatFact();

    // readHistoryFromStorage();
};

memeButtonEL.addEventListener('click', getCatMeme);

init();
