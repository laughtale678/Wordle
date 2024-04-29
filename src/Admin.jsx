import { useState } from "react";

function Admin({ words, onAdd }) {
  const [newWord, setNewWord] = useState("");
  const [error, setError] = useState("");
  const addWord = (e) => {
    e.preventDefault();
    if (words.includes(newWord)) {
      setError("This word is already in the list, please enter a new word");
      return;
    }
    if (!isValidWord(newWord)) {
      setError(
        "Invalid word, please enter a valid word (5 lowercase letters only)"
      );
      return;
    }
    onAdd(newWord);
    setError("");
    setNewWord("");
  };

  const isValidWord = (word) => {
    let isValid = true;
    isValid = !!word && word.trim();
    isValid = isValid && word.length === 5;
    isValid = isValid && word.match(/^[a-z]+$/);
    return isValid;
  };

  return (
    <div className="admin">
      <h3 className="words__title">Available Words</h3>
      <p className="words">{words.join(" ")}</p>
      <form className="words__form" onSubmit={addWord}>
        <label className="words__label">
          Add a new word:
          <input
            type="text"
            className="words__input"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
          />
        </label>
        {error && <p className="words__error">{error}</p>}
        <button className="form__button">Add </button>
      </form>
    </div>
  );
}

export default Admin;
