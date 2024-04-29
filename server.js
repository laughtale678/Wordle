const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('./sessions');
const PORT = 3000;
const gameData= require('./gameData');
const words = require('./words');
const users = require('./user');
const rank = require('./rank');


const app = express();
app.use(express.static('./dist'));
app.use(cookieParser());
app.use(express.json());

//get session
app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const game = users.getUserData(username).getGame();
    const wordList = words.getWords();
    res.json({ username, game, wordList });
});

//login
app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;
    if(!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if(!existingUserData) {
        users.addUserData(username, gameData.initGameData());
    }
    const game = users.getUserData(username).getGame();
    const wordList = words.getWords();
    res.cookie('sid', sid);
    res.json({ username, game, wordList});
 });

 //logout
app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if(sid) {
        res.clearCookie('sid');
    }
    if(username) {
        sessions.deleteSession(sid);
    }
    res.json({ username });
});

//guess
app.post('/api/v1/game-guess', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { guessWord } = req.body;
    const userData = users.getUserData(username);
    userData.makeGuess(guessWord, username);
    const game = userData.getGame();
    res.json({ game });
});

//new game
app.put('/api/v1/game', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const userData = users.getUserData(username);
    userData.newGame();
    const game = userData.getGame();
    const wordList = words.getWords();
    res.json({ game, wordList });
});

//get ranking
app.get('/api/v1/ranking', (req, res) => {
    const ranking = rank.ranking;
    res.json({ ranking });
});


//add given words
app.patch('/api/v1/words', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getSessionUser(sid);
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const wordList = words.getWords();
    if(username !== 'admin') {
        res.status(403).json({ error: 'access-denied' });
        return;
    }
    const { word } = req.body;
    if(wordList.includes(word)) {
        res.status(400).json({ error: 'duplicate-word' });
        return;
    }
    if(!words.isValidWord(word)) {
        res.status(400).json({ error: 'invalid-word' });
        return;
    }
    words.addWord(word);
    res.json({ wordList });
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});




