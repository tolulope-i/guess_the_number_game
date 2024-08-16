// GETTING ALL MY TARGET ELEMENTS
const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");
const prevGuess = document.querySelector(".prev-guess");
const wrongOrRight = document.querySelector(".wrong-or-right")
const lowOrHigh = document.querySelector(".low-or-high");
const restartBtn = document.querySelector(".restart-btn");

// GIVING MY RESTERT BUTTON A DISPLAY OF NONE TO HELP HIDE IT FOR NOW
restartBtn.style.display = "none";

// SETTING MY RANDOM NUMEBER
let randomNum = Math.floor(Math.random() * 100) + 1;
let count = 1;
let prevGuesses = [];

let savedGame = localStorage.getItem("userGame");
if (savedGame){
    let parsedGame = JSON.parse(savedGame);
    randomNum = parsedGame.randomNum;
    count = parsedGame.count;
    prevGuesses = parsedGame.prevGuesses || [];
    updatePrevGuess();
}
function updatePrevGuess(){
    prevGuess.textContent = "Previous Guesses:" + prevGuesses.join(",");
}

submitBtn.addEventListener("click", checkGuess)
function checkGuess(){
    const userGuess = parseInt(userInput.value);

    if(userInput.value.trim() === ""){
        wrongOrRight.textContent = "enter a valid number";
        wrongOrRight.style.backgroundColor = "red";
        userInput.value = "";
        userInput.focus();
        return;

    }
    prevGuesses.push(userGuess);


    if (count === 1){
        prevGuess.textContent = "Previous Guesses:"
    }
    prevGuess.textContent = `${prevGuess.textContent} ${userGuess}`;


    if (userGuess === randomNum){
        wrongOrRight.textContent = "Congratulation! you got it right!";
        wrongOrRight.style.backgroundColor = "green";
        lowOrHigh.textContent = "" ;
        userInput.disabled = true;
        submitBtn.disabled = true;
        restartBtn.style.display = "flex";
        prevGuess.textContent = "";
    }else if(count === 5){
        wrongOrRight.textContent = "!!!GAME OVER!!!";
        lowOrHigh.textContent = "";
    }else{
        wrongOrRight.textContent = "Wrong! Try Again!";
        wrongOrRight.style.backgroundColor = "red";
        if(userGuess < randomNum){
            lowOrHigh.textContent = "your guess was too low!"
        }else if (userGuess > randomNum){
            lowOrHigh.textContent = "your guess was too high!"
        }
    }
    if(wrongOrRight.textContent === "!!!GAME OVER!!!"){
        userInput.disabled = true;
        submitBtn.disabled = true;
        restartBtn.style.display = "flex";
    }
    saveToLocalStorage();



    count++;
    userInput.value = "";
    userInput.focus();
    localStorage.setItem("userGame", JSON.stringify({randomNum: randomNum, count: count, savedPrevGuess:savedPrevGuess}));
}


restartBtn.addEventListener("click", restart)
function restart(){
    userInput.disabled = false;
    submitBtn.disabled = false;
    userInput.value = "";
    userInput.focus();
    prevGuesses = [];
    restartBtn.style.display = "none";
    updatePrevGuess();
    prevGuess.textContent = "";
    wrongOrRight.textContent = "";
    lowOrHigh.textContent = "";
    wrongOrRight.style.backgroundColor ="transparent"
    count = 1;
    randomNum = Math.floor(Math.random() * 100) + 1;
    localStorage.removeItem("userGame");
}




function saveToLocalStorage(){
    let gameData = {
        randomNum: randomNum,
        count: count,
        prevGuesses: prevGuesses
    };
    localStorage.setItem("userGame", JSON.stringify(gameData));
}
updatePrevGuess();


