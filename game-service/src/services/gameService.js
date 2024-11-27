const gameMaster = require('../utils/gameMaster');

exports.processAttack = (attackerCard, defenderCard, terrain) => {
    const attackResult = gameMaster.calculateDamage(attackerCard, defenderCard);
    return attackResult;
};

// Gestion des récompenses
exports.calculateRewards = (winner, loser) => {
    const baseReward = 100;
    const bonus = winner.cards.length * 10; // Exemple : bonus basé sur le nombre de cartes restantes
    const totalReward = baseReward + bonus;

    return {
        winner: winner.id,
        coins: totalReward,
        message: "Congratulations! You've earned coins based on your performance.",
    };
};
