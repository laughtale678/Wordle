import Status from "./Status";
import Loading from "./Loading";
import Login from "./Login";
import Logout from "./Logout";
import Play from "./Play";
import Admin from "./Admin";
import { useEffect, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import {
  fetchLogin,
  fetchSession,
  fetchGuess,
  fetchNewGame,
  fetchLogout,
  fetchAddWord
} from "./services";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function checkForSession() {
    fetchSession()
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, ...data });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, ...data });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onGuess(guessWord) {
    fetchGuess(guessWord)
      .then((data) => {
        dispatch({ type: ACTIONS.GUESS, ...data });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onNew() {
    fetchNewGame()
      .then((data) => {
        dispatch({ type: ACTIONS.NEW_GAME, ...data });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    fetchLogout()
      .then(() => {
        dispatch({ type: ACTIONS.LOG_OUT });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onAdd(newWord) {
    fetchAddWord(newWord)
      .then((data) => {
        dispatch({ type: ACTIONS.ADD_WORD, ...data });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }


  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <>
      {state.error && <Status error={state.error} />}
      {state.loginStatus === LOGIN_STATUS.PENDING && (
        <Loading className="login__waiting">Loading...</Loading>
      )}
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} />
      )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          <Logout username={state.username} onLogout={onLogout} />
          {state.username === "admin" && <Admin words={state.words} onAdd={onAdd}/>}
          {state.username !== "admin" && (
            <Play
              words={state.words}
              game={state.game}
              onGuess={onGuess}
              onNew={onNew}
            />
          )}
        </>
      )}
    </>
  );
}

export default Game;
