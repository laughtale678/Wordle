import GameControl from "./GameControl";
import GameStatus from "./GameStatus";

function Play({ words, game, onGuess, onNew }) {

  return (
    <div className="game">
      <div className="game__main">
        <div className="game__words-container">
          <h3 className="game__header">Available Words</h3>
          <p className="game__words">{words.join(" ")}</p>
        </div>
        <div className="game__guessed-words">
          <h3 className="game__header">Guessed Words</h3>
          <ul className="guessed__words">
            {game.guesses.map((word, index) => (
              <li key={word}>
                {word} - Matched Letters: {game.matchedLetters[index]}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GameStatus game={game} />
      <GameControl game={game} onGuess={onGuess} onNew={onNew} />
    </div>
  );
}

export default Play;
