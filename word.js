// ADD: require letter.js
var Letter = require("./letter.js")

function Word(chosenTerm) {
    // Array of Letter objects
    this.letters = []
    this.chosenTerm = chosenTerm
    this.stringSize = chosenTerm.length
}

Word.prototype = {
    printWord: function() {
        for (var i = 0; i < this.stringSize; i++) {
            this.letters[i].printGuessStatus()
        }
        
        process.stdout.write("\n")
    },
    
    findMatches: function(guess) {
        let verdict = false
        
        for (var i = 0; i < this.stringSize; i++) {
            if (this.letters[i].evaluateGuess(guess)) {
                verdict = true
            }
        }
        
        process.stdout.write("\n")
        return verdict
    },
    
    generateLetters: function() {
        var currentCharacter
        
        for (var i = 0; i < this.stringSize; i++) {
            currentCharacter = new Letter.Letter(this.chosenTerm[i])
            
            this.letters.push(currentCharacter)
        }
            
        return this.letters
    }
}

module.exports = {
	Word: Word
}