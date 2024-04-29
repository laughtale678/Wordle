const ranking = [
    { username: 'Jorts', attemps: 3 },
    { username: 'Maru', attemps: 4 },
];

const updateRanking = (username, attemps) => {
    //avoid duplicates and only keep the best attemps
    for(let i = 0; i < ranking.length; i++) {
        if(ranking[i].username === username) {
            if(ranking[i].attemps <= attemps) return;
            ranking[i].attemps = attemps;
            ranking.sort((a, b) => a.attemps - b.attemps);
            return;
        }
    }
    ranking.push({username, attemps});
    ranking.sort((a, b) => a.attemps - b.attemps);
}

module.exports = { ranking, updateRanking };