//Global Variables List

var wordArray =
    [
        "tombstone",
        "overwatch",
        "revolver",
        "mustang",
        "saloon",
        "westworld",
        "sundance",
        "pecos bill",
        "cactus juice",
        "armadillo",
        "rattlesnake",
        "cayote",
        "sasparillo"
    ];

const maxLives = 8;                //number of lives
var guessedLetters = [];            //holds letters that are guessed
var currentWordIndex;               //index of words in the array
var currentWord = [];               //This will holds the word being used
var livesLeft = 0;                  //Number of lives left
var gameStart = false;              //Whether or not the game is running
var gameOver = false;               //Whether or not the game is over
var wins = 0;                       //number of wins


//Set background for the game
document.body.style.backgroundImage = "url(./assets/images/parchment-background.jpg)";

//Prompt to get the player's name to add it to the html and reset the game immediately after promp
var user = prompt("Please enter your name");
document.getElementById("enterName").innerText = user;
resetGame();

//Function to reset variables actively used in the game
function resetGame() {
    livesLeft = maxLives;
    gameStart = true;

    //Randomly Selects word from array
    currentWordIndex = Math.floor(Math.random() * (wordArray.length));

    //clear letters in array
    guessedLetters = [];
    currentWord = [];

    for (var i = 0; i < wordArray[currentWordIndex].length; i++) {
        currentWord.push("_");
    };
    console.log(wordArray[currentWordIndex]);
    document.getElementById("info").innerText = "Press any key for the next guess";
    updateNumbers();
};

//Updates the html elements on the page
function updateNumbers() {

    document.getElementById("winCounter").innerText = "Wins: " + wins;
    document.getElementById("hiddenWord").innerText = "";
    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("hiddenWord").innerText += currentWord[i];
    }
    document.getElementById("livesLeft").innerText = "Number of Lives Left: " + livesLeft;
    document.getElementById("listing").innerText = guessedLetters;
    if (livesLeft <= 0) {
        gameOver = true;
        document.getElementById("info").innerText = "YOU LOSE! Press any key to start a new game";
    }

};

//records keypresses and passes the key values to the makeGuess function
document.onkeydown = function (event) {
    if (gameOver) {
        resetGame();
        gameOver = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key);
            console.log(event.key);
        }
    }
};

//takes the recorded key and checks to see if there are lives to even make guesses.
function makeGuess(letter) {
    if (livesLeft > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateNumbers();
    checkWin();
};

//This function goes and looks for all instances of the letter within the array 
function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < wordArray[currentWordIndex].length; i++) {
        if (wordArray[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        livesLeft--;
        updateNumbers();
    }
    else {
        for (var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
}

//Checks to see if there are spaces still in the word. Adds to the win count.
function checkWin() {
    if (currentWord.indexOf("_") === -1) {
        console.log(currentWord.indexOf("_"));
        wins++;
        gameOver = true;
    }
};
