exports.calculateDamage = (attackerCard, defenderCard, terrain = "neutral") => {
    // Exemple de statistiques des cartes avec types et terrain
    const attackerStats = {
        damage: 10,
        critChance: 0.2,
        actionCost: 3,
        type: "physical", // Types : physical, magical, ranged
    };
    const defenderStats = {
        health: 20,
        dodgeChance: 0.1,
        defense: 5, // Défense pour réduire les dégâts
        type: "magical", // Types : physical, magical, ranged
    };

    // Gestion du terrain : Exemple de bonus/malus en fonction du type
    const terrainBonus = {
        physical: terrain === "forest" ? 1.2 : 1.0,
        magical: terrain === "desert" ? 1.2 : 1.0,
        ranged: terrain === "plains" ? 1.2 : 1.0,
    };

    // Application du bonus de terrain
    const terrainMultiplier = terrainBonus[attackerStats.type] || 1.0;

    // Calcul d'aléatoire pour coups critiques ou esquives
    const isCritical = Math.random() < attackerStats.critChance;
    const isDodged = Math.random() < defenderStats.dodgeChance;

    let damageDealt = isCritical
        ? attackerStats.damage * 2 * terrainMultiplier
        : attackerStats.damage * terrainMultiplier;

    // Réduction des dégâts par la défense
    damageDealt = Math.max(damageDealt - defenderStats.defense, 0);

    // Si esquivé, aucun dégât n'est infligé
    if (isDodged) {
        damageDealt = 0;
    }

    // Mise à jour des statistiques des cartes
    const defenderHealth = Math.max(defenderStats.health - damageDealt, 0);

    return {
        attacker: {
            ...attackerCard,
            actionCost: attackerStats.actionCost,
        },
        defender: {
            ...defenderCard,
            health: defenderHealth,
        },
        pointsUsed: attackerStats.actionCost,
        critical: isCritical,
        dodged: isDodged,
    };
};

// Gestion des effets spéciaux
exports.applySpecialEffects = (attackerCard, defenderCard) => {
    const effects = [];

    // Exemple : Ajout de poison
    if (attackerCard.effect === "poison") {
        defenderCard.status = "poisoned";
        effects.push("poison applied");
    }

    // Exemple : Ajout de soin pour les alliés
    if (attackerCard.effect === "heal") {
        attackerCard.health += 5; // Exemple : soigne l'attaquant
        effects.push("heal applied");
    }

    return { updatedAttacker: attackerCard, updatedDefender: defenderCard, effects };
};

// Gestion des points d'action
exports.calculateActionPoints = (player, unusedPoints) => {
    // Exemple : Augmente les points d'action avec un maximum
    const MAX_ACTION_POINTS = 10;
    player.actionPoints = Math.min(player.actionPoints + unusedPoints + 5, MAX_ACTION_POINTS);
    return player.actionPoints;
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
