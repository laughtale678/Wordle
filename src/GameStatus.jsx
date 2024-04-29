function GameStatus({ game }) {
  return (
    <div className="game__status">
      <h3>Game Status</h3>
      <p>Valid Guesses: {game.attempts}</p>
      <p>{game.message}</p>
    </div>
  );
}

export default GameStatus;
