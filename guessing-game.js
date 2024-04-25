function guessingGame() {
    // first let's us generate a random number between 0 and 99
    const secretNumb = Math.floor(Math.random() * 100)
    let guesses = 0;
    let hasGuessed = false;
    return function (numb) {
        if (hasGuessed) {
            return "The game is over, you already won!"
        }
        guesses++;

        if (numb === secretNumb) {
            hasGuessed = true;
            return `You win! You found ${secretNumb} in ${guesses} guesses.`
        }
        else if (numb > secretNumb) {
            return `${numb} is too high!`
        }
        else {
            return `${numb} is too low!`
        }
    }

}

module.exports = { guessingGame };
