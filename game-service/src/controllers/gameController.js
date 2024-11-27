const gameService = require('../services/gameService');
const gameMaster = require('../utils/gameMaster');

let players = {}; // Stores players and their cards
let gameStarted = false; // Indicates if a game is ongoing
let currentPlayer = null; // Tracks the current player's turn

// **1. Select Cards**
exports.selectCards = (req, res) => {
    const { playerId, cards } = req.body;

    if (!playerId || !cards || cards.length === 0) {
        return res.status(400).json({ error: 'Invalid request. Missing playerId or cards.' });
    }

    // Add the player and their cards to the system with attributes from the request
    players[playerId] = {
        cards: cards.map(card => ({
            id: card.id,
            type: card.type,
            health: card.health || 100, // Default health: 100 if not provided
            damage: card.damage || 10,
            critChance: card.critChance || 0.2,
            actionCost: card.actionCost || 3,
            defense: card.defense || 5,
            owner: playerId, // Assign owner for identification
        })),
        actionPoints: 0,
    };

    console.log(`Player ${playerId} selected cards: ${JSON.stringify(players[playerId].cards)}`);

    // Start the game if two players have selected cards
    if (Object.keys(players).length === 2 && !gameStarted) {
        const startingPlayer = startGame();
        return res.json({
            message: `Player ${playerId} selected cards successfully. Game started.`,
            startingPlayer,
            actionPoints: players[startingPlayer].actionPoints,
        });
    }

    return res.json({ message: `Player ${playerId} selected cards successfully.` });
};

// **2. Start Game**
const startGame = () => {
    gameStarted = true;

    const playerIds = Object.keys(players);

    // Decide the starting player (attacker) and the other player becomes the defender
    currentPlayer = decideStartingPlayer(playerIds);
    const defenderPlayer = playerIds.find(playerId => playerId !== currentPlayer);

    // Assign attacker and defender roles
    players[currentPlayer].role = 'attacker';
    players[defenderPlayer].role = 'defender';

    // Assign 10 action points to both players
    playerIds.forEach(playerId => {
        players[playerId].actionPoints = 5;
    });

    console.log(`Game started! Player ${currentPlayer} (attacker) will start. Player ${defenderPlayer} (defender) is defending.`);
    return currentPlayer;
};

// Decide the starting player randomly
const decideStartingPlayer = (playerIds) => {
    const randomIndex = Math.floor(Math.random() * playerIds.length);
    return playerIds[randomIndex];
};

// **3. Handle Attack**
exports.playTurn = (req, res) => {
    const { playerId, attackerCard, defenderCard } = req.body;

    if (!playerId || !attackerCard || !defenderCard) {
        return res.status(400).json({ error: 'Invalid request. Missing required parameters.' });
    }

    // Check if it's the player's turn
    if (currentPlayer !== playerId) {
        return res.status(400).json({ error: "It's not your turn!" });
    }

    // Check if the player has enough action points
    if (players[playerId].actionPoints <= 0) {
        return res.status(400).json({ error: 'Not enough action points to play!' });
    }

    try {
        const { attacker, defender, pointsUsed, critical, dodged } = gameMaster.calculateDamage(
            attackerCard,
            defenderCard
        );

        // Deduct action points from the attacker
        players[playerId].actionPoints -= pointsUsed;

        // Update the defender's card state
        const defenderOwner = Object.keys(players).find(player => player !== playerId);
        players[defenderOwner].cards = players[defenderOwner].cards.map(card =>
            card.id === defender.id ? defender : card
        );

        // Update the attacker's card state
        players[playerId].cards = players[playerId].cards.map(card =>
            card.id === attacker.id ? attacker : card
        );

        const isAttackerDestroyed = attacker.health <= 0;
        const isDefenderDestroyed = defender.health <= 0;

        // Notify if the defender's card is destroyed
        if (isDefenderDestroyed) {
            console.log(`Defender's card ${defender.id} has been destroyed.`);
        }
        // Notify if the attacker's card is destroyed
        if (isAttackerDestroyed) {
            console.log(`Attacker's card ${attacker.id} has been destroyed.`);
        }

        // Check if the defender has any cards left
        const defenderCards = players[defenderOwner].cards.filter(card => card.health > 0);

        if (defenderCards.length === 0) {
            // If all defender's cards are destroyed, end the game
            const rewards = gameService.calculateRewards(players[playerId], players[defenderOwner]);
            return res.json({
                message: `Game over! Player ${playerId} wins!`,
                rewards,
            });
        } else if (isDefenderDestroyed) {
            // If the defender's card is destroyed, auto-select the next card
            console.log(`Player ${defenderOwner} must choose a new card.`);
            return res.json({
                message:`Player ${defenderOwner} must choose a new card.`
            });
        }

        // Check if the attacker's card is destroyed and prompt for another card
        const attackerCards = players[playerId].cards.filter(card => card.health > 0);
        if (isAttackerDestroyed && attackerCards.length === 0) {
            // If all attacker's cards are destroyed, end the game
            const rewards = gameService.calculateRewards(players[defenderOwner], players[playerId]);
            return res.json({
                message: `Game over! Player ${defenderOwner} wins!`,
                rewards,
            });
        } else if (isAttackerDestroyed) {
            console.log(`Player ${playerId} must choose a new card to use .`);
            return res.json({
                message:`Player ${playerId} must choose a new card.`
            });
        }

        // Automatically end the turn if no action points remain
        if (players[playerId].actionPoints <= 0) {
            console.log(`Player ${playerId} has no action points left. Automatically ending turn.`);
            return exports.endTurn({ body: { currentPlayerId: playerId } }, res);
        }

        return res.json({
            message: 'Attack processed successfully.',
            result: {
                attacker,
                defender,
                pointsUsed,
                critical,
                dodged,
                isDefenderDestroyed,
            },
            actionPointsRemaining: players[playerId].actionPoints,
        });
    } catch (error) {
        console.error('Error during attack:', error);
        return res.status(500).json({ error: 'An unexpected error occurred during the attack.' });
    }
};

// **4. End Turn**
exports.endTurn = (req, res) => {
    const { currentPlayerId } = req.body;

    if (!players[currentPlayerId] || currentPlayer !== currentPlayerId) {
        return res.status(400).json({ error: 'Invalid turn or not your turn to end.' });
    }

    // Get the next player (current defender)
    const nextPlayerId = Object.keys(players).find(playerId => playerId !== currentPlayer);

    // Check if the next player has any cards left
    const nextPlayerCards = players[nextPlayerId].cards.filter(card => card.health > 0);
    if (nextPlayerCards.length === 0) {
        // If the next player has no cards, the current player wins
        const rewards = gameService.calculateRewards(players[currentPlayer], players[nextPlayerId]);
        return res.json({
            message: `Game over! Player ${currentPlayer} wins!`,
            rewards,
        });
    }

    // Switch roles: current attacker becomes defender and vice versa
    players[currentPlayer].role = 'defender';
    players[nextPlayerId].role = 'attacker';

    // Carry over unused action points and reset for the next turn
    const unusedPoints = players[currentPlayer].actionPoints;
    players[currentPlayer].actionPoints = 0;
    players[nextPlayerId].actionPoints += 5 + unusedPoints;

    // Update the current player
    currentPlayer = nextPlayerId;

    console.log(`Turn passed! Player ${currentPlayer} (attacker) starts the next turn.`);
    return res.json({
        message: `Turn passed! Player ${currentPlayer} (attacker) starts the next turn.`,
        actionPoints: players[currentPlayer].actionPoints,
    });
};
