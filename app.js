/*
    RULES
    GAME FUNCTION:
    - player must guess a number between a min and max
    - player gets a certain amount of guesses
    - notify player of guesses remaining
    - notify the player of the correct answer if lose
    - let player choose to play again
*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomeNum(min, max),
    guessesLeft = 3;

// test 
console.log(`winnum ${winningNum}`)


// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// assign UI dynamic min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// listen for guess btn
guessBtn.addEventListener('click', function () {
    let userGuess = parseInt(guessInput.value);
    // validate input
    if (isNaN(userGuess) || userGuess < min || userGuess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        // check if won
        if (userGuess === winningNum) {
            // Game over - won
            gameOver(true, `${winningNum} is correct, YOU WIN!`)
        } else {
            // Wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game overr - lost
                gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
            } else {
                // Game continues - answer wrong
                // change border to green
                guessInput.style.borderColor = 'red';
                // clear input
                guessInput.value = "";
                // tell user its the wrong number
                setMessage(`${userGuess} is not correct, ${guessesLeft} guesses left`, 'red');
            }
        }
    }

});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // change border to green
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);

    // play again?
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

// get winning number generate
function getRandomeNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}