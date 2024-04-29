**Wordle Game README**


### Description

Welcome to Wordle Game! This project is a simple word-guessing game where players attempt to guess a secret word by inputting words and receiving feedback on the number of correct letters in their guesses. The game is designed to be interactive and engaging, providing users with a fun and challenging experience.

### How to setup
  - Run "npm install" in this directory
  - Run "npm run build"
  - Run "npm run start" to start the server.
  - Open the browser and go to "http://localhost:3000" to load the game.

### How to Use
This game is divided into two main pages: Game and Ranking. Users need to log in to start playing the game, while Ranking allows viewing real-time rankings of all users without needing to log in.

#### Game(Default):

   Users can see different page depends on your role

##### Normal user:

1. **Logging In**
   - To access the game, users need to log in with their username.
   - Enter your username in the login form and click on the "Login" button.
   - Backend validation is implemented, username must be letters and/or numbers. "dog" is not allowed as username.
   - Once logged in, you can see three main parts: 'available words' shows all the words you can guess. 'guessed words' shows all your valid guess and matched letters. 'game status' shows your valid attemps and provides feed back on your recent guess.

2. **Starting a New Game**
   - If users have an ongoing game, they will be prompted to resume their previous game state or start a new game.
   - If choosing to start a new game, click on the "New Game" button.
   - This will reset your game state for users and generate a new secret word for you to guess.

3. **Making a Guess**
   - Once a game has started, you can begin making guesses.
   - Type your guess into the input field provided and click on the "Guess" button.
   - Backend validation is implemented. 'Valid guess' means a guess that is one of the possible words that has not already been guessed this game.(guess are not case-sensitive)
   - The game will provide feedback on if it's a valid guess or how many letters in your valid guess match the secret word.
   - For test purpose, each time when a new game starts the server side console will print out the secret word.

4. **Winning the Game**
   - Keep guessing words until you correctly guess the secret word.
   - Upon winning, the game will display a congratulatory message and allow you to start a new game. You data will be sent to update ranking as well.

##### Admin:

1. **Logging In**
   - Enter "admin" in the login form and click on the "Login" button.

2. **Add new word to available words**
   - Enter a word in the form and click the "Add" button
   - Both front-end validation and backend validation are implemented. The word must has five lower cased letters and avoid duplicate.
   - Normal user will see the updated availabel words once they start a new game.


#### Ranking
   - Show ranking of all users without login.
   - Real-time ranking with polling.
   - Only contains the best record of each user.