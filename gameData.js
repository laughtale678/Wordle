const words = require('./words.js');
const rank = require('./rank.js');

function initGameData() {

    const game = {
        secretWord: words.getSecretWord(),
        guesses: [],
        matchedLetters: [],
        attempts: 0,
        message: 'Start guessing by typing a word from available words, then press the "Guess" button.',
        hasWon: false
    };

    const operation = {};

    operation.getGame = function() {
        return game;
    }

    operation.newGame = function() {
        game.secretWord = words.getSecretWord();
        game.guesses = [];
        game.matchedLetters = [];
        game.attempts = 0;
        game.message = 'Start guessing by typing a word from available words, then press the "Guess" button.';
        game.hasWon = false;
    }

    operation.makeGuess = function(guess, username) {
        if (!valid(guess)) {
            game.message = `Your most recent guess is: ${guess}. The word is not from the available words or you have already guessed it. Try again.`;
            return;
        }
        const matches = matchCount(game.secretWord, guess);
        game.attempts++;
        game.guesses.push(guess);
        game.matchedLetters.push(matches);
        if(guess.toLowerCase() === game.secretWord.toLowerCase()) {
            game.hasWon = true;
            // update global ranking
            rank.updateRanking(username, game.attempts);
            game.message = `Congratulations! You have guessed the word correctly: ${game.secretWord}.`;
        } else {
            game.message = `Your most recent guess is: ${guess}. Matched letters: ${matches}. Continue guessing.`;
        }

    }

    const valid = (guess) => {
        const wordsList = words.getWords();
        return wordsList.map((word) => word.toLowerCase()).includes(guess.toLowerCase()) &&
        !game.guesses.map((word) => word.toLowerCase()).includes(guess.toLowerCase());
    }

    const matchCount = (secret, guess) => {
        const secretWord = secret.toLowerCase();
        const guessedWord = guess.toLowerCase();
        let matches = 0;
        const secretCount = {};
        for (let letter of secretWord) {
          secretCount[letter] = secretCount[letter] + 1 || 1;
        }
        for (let letter of guessedWord) {
          if (secretCount[letter]) {
            matches++;
            secretCount[letter]--;
          }
        }
        return matches;
      };

    return operation;
}

module.exports = { initGameData };