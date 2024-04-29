import { LOGIN_STATUS, CLIENT, ACTIONS } from "./constants";
//only handle state for the game not for ranking
export const initialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
  words: [],
  game: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        game: action.game,
        username: action.username,
        words: action.wordList,
      };

    case ACTIONS.GUESS:
      return {
        ...state,
        game: action.game,
        error: "",
      };

    case ACTIONS.NEW_GAME:
      return {
        ...state,
        game: action.game,
        words: action.wordList,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: "",
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: "",
        words: [],
        game: {},
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || "ERROR",
      };

    case ACTIONS.ADD_WORD:
      return {
        ...state,
        words: action.wordList,
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
  }
}

export default reducer;
