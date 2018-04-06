var prompt = require('prompt')
var Word = require("./word.js")
prompt.start()
var wordBank = ['zebra', 'giraffe', 'platypus', 'flamingo', 'lion']
var currentWord, wordChoice
var previousGuesses = []

var roundsLeft = 8

chooseWord()
currentWord.printWord()
playRound()

function playRound() {
    prompt.get([{
            name: 'guess',
            description: 'Guess your letter!',
            type: 'string',
            pattern: /^[^a-z]*([a-z])[^a-z]*$/i, 
            message: 'We only take single letters only',
            required: true
        }],
        function (e, result) {
        if (e) {
            console.log(e)
        }
        
        // Lose Condition
        if (roundsLeft == 1) {
            console.log("You... are DONE. The word was " + currentWord.chosenTerm + "!")
            return
        }
        
        // Was the guessed letter in the word?
        if (!currentWord.findMatches(result.guess)) {
            roundsLeft--
        }
        
        // Did the user already guess something?
        if (previousGuesses.includes(result.guess)) {
            console.log("Sorry, you already guessed that.")
        }
        
        previousGuesses.push(result.guess)
        currentWord.printWord()
        
        // Win Condition
        if (userWon()) {
            console.log("Congrats! You got it!")
            return
        }
        
        console.log("Guesses left: " + roundsLeft + "\n")
        playRound()
    })
}

function chooseWord() {
    wordChoice = wordBank[Math.floor(Math.random() * wordBank.length)]
    console.log("================")
    console.log("Category: Animals")
    console.log("Guess the word! The word has " + wordChoice.length + " letters.")
    
    // Create Word object with choice
    currentWord = new Word.Word(wordChoice.toLowerCase())
    currentWord.generateLetters()
    return
}

function userWon() {
    let verdict = true
    
    for (var i = 0; i < currentWord.stringSize; i++) {
        if (currentWord.letters[i].guessedCorrectly == false) {
            verdict = false
        }
    }
    
    return verdict
}