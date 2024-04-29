import { useState } from "react";

function GameControl({ game, onGuess, onNew }) {
  const [guessWord, setGuessWord] = useState("");

  function onNewSubmit(event) {
    event.preventDefault();
    onNew();
  }

  function onGuessSubmit(event) {
    event.preventDefault();
    onGuess(guessWord);
    setGuessWord("");
  }

  return (
    <div className="game__action">
      {!game.hasWon  && (
        <div className="game__input">
          <form className="guess__form" onSubmit={onGuessSubmit}>
            <label>
              Word:
              <input
                type="text"
                className="form__input"
                placeholder="guess a word from available words"
                value={guessWord}
                onChange={(event) => setGuessWord(event.target.value)}
                required
              />
            </label>
            <button type="submit" className="form__button">
              Guess
            </button>
          </form>
        </div>
      )}
      <form className="newgame-form" onSubmit={onNewSubmit}>
        <button type="submit" className="form__button">
          New Game
        </button>
      </form>
    </div>
  );
}

export default GameControl;
