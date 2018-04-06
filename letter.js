function Letter(character) {
    this.character = character
    this.guessedCorrectly = false
}

Letter.prototype = {
    // Blank placeholder or the actual character
    printGuessStatus: function() {
        if (this.guessedCorrectly) {
            process.stdout.write(this.character + " ")
        }
        else {
            process.stdout.write("_ ")
        }
    },
    evaluateGuess: function(guess) {
        if (guess == this.character) {
            this.guessedCorrectly = true
            return this.guessedCorrectly
        }
    }
}

module.exports = {
	Letter: Letter
}