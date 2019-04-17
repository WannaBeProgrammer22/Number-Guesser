/*
    RULES
    GAME FUNCTION:
    - player must guess a number between a min and max
    - player gets a certain amount of guesses
    - notify player of guesses remaining
    - notify the player of the correct answer if lose
    - let player choose to play again
*/
let min = 1,
    max = 10,
    winningNumber = generateNumber(min, max),
    guessesLeft = 3;

const gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');


minNum.textContent = min;
maxNum.textContent = max;

gameWrapper.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function () {
    let userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        alert('Enter a number');
        return;
    } else if (userGuess < min || userGuess > max) {
        alert(`Enter a number between ${min} and ${max}`);
        return;
    }

    if (userGuess === winningNumber) {
        gameOver(true, `${winningNumber} is correct, YOU WIN!`)
    } else {
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver(false, `The correct number is ${winningNumber}, you lost.`);
        } else {
            guessInput.value = "";
            setMessage(`You guessed wrong. Guesses left ${guessesLeft}.`, 'red');
        }
    }
});

function gameOver(isWon, msg) {
    let color = (isWon === true) ? 'green' : 'red';

    guessInput.disabled = true;
    guessBtn.value = "Play Again?";
    guessBtn.className = "play-again";

    setMessage(msg, color);
}

function setMessage(msg, color) {
    guessInput.style.borderColor = color;
    message.textContent = msg;
    message.style.color = color;
}

function generateNumber(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}
