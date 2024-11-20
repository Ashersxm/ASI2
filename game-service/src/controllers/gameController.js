const gameService = require('../services/gameService');

let players = {}; // Contient les joueurs et leurs cartes

// Sélection des cartes
exports.selectCards = (req, res) => {
    const { playerId, cards } = req.body;

    if (!playerId || !cards || cards.length === 0) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    players[playerId] = { cards, actionPoints: 5 }; // Exemple : Chaque joueur a 5 points d'action
    console.log(`Player ${playerId} selected cards: ${cards}`);
    res.json({ message: 'Cards selected successfully' });
};

// Gestion de l'attaque
exports.handleAttack = (data, callback) => {
    const { attackerId, defenderId, attackerCard, defenderCard } = data;

    if (!players[attackerId] || !players[defenderId]) {
        return callback({ error: 'Invalid players' });
    }

    const result = gameService.processAttack(attackerCard, defenderCard);
    players[attackerId].actionPoints -= result.pointsUsed;

    callback({
        attackerCard: result.attacker,
        defenderCard: result.defender,
        actionPoints: players[attackerId].actionPoints,
    });
};

// Passage du tour
exports.endTurn = (req, res) => {
    const { currentPlayerId, nextPlayerId } = req.body;

    if (!players[currentPlayerId] || !players[nextPlayerId]) {
        return res.status(400).json({ error: 'Invalid players' });
    }

    const unusedPoints = players[currentPlayerId].actionPoints;
    players[currentPlayerId].actionPoints = 0;
    players[nextPlayerId].actionPoints += 5 + unusedPoints;

    res.json({ message: `Turn passed to player ${nextPlayerId}` });
};
