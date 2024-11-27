exports.calculateDamage = (attackerCard, defenderCard, terrain = "neutral") => {
    // Terrain-specific bonuses/maluses
    const terrainBonus = {
        physical: terrain === "forest" ? 1.2 : 1.0,
        magical: terrain === "desert" ? 1.2 : 1.0,
        ranged: terrain === "plains" ? 1.2 : 1.0,
    };

    // Apply terrain multiplier based on attacker type
    const terrainMultiplier = terrainBonus[attackerCard.type] || 1.0;

    // Random chance for critical hits or dodging
    const isCritical = Math.random() < attackerCard.critChance;
    const isDodged = Math.random() < defenderCard.dodgeChance;

    // Calculate damage with critical multiplier and terrain bonuses
    let damageDealt = isCritical
        ? attackerCard.damage * 2 * terrainMultiplier
        : attackerCard.damage * terrainMultiplier;

    // Reduce damage based on defender's defense
    damageDealt = Math.max(damageDealt - defenderCard.defense, 0);

    // If the attack is dodged, no damage is dealt
    if (isDodged) {
        damageDealt = 0;
    }

    // Update defender's health after the attack
    const defenderHealth = Math.max(defenderCard.health - damageDealt, 0);

    return {
        attacker: {
            ...attackerCard,
        },
        defender: {
            ...defenderCard,
            health: defenderHealth,
        },
        pointsUsed: attackerCard.actionCost,
        critical: isCritical,
        dodged: isDodged,
    };
};

// Special effects handling remains unchanged
exports.applySpecialEffects = (attackerCard, defenderCard) => {
    const effects = [];

    // Apply poison effect
    if (attackerCard.effect === "poison") {
        defenderCard.status = "poisoned";
        effects.push("poison applied");
    }

    // Apply healing effect
    if (attackerCard.effect === "heal") {
        attackerCard.health += 5; // Heals the attacker
        effects.push("heal applied");
    }

    return { updatedAttacker: attackerCard, updatedDefender: defenderCard, effects };
};

// Gestion des points d'action
exports.calculateActionPoints = (player, unusedPoints) => {
    // Exemple : Augmente les points d'action avec un maximum
    const MAX_ACTION_POINTS = 10;
    player.actionPoints = Math.min(player.actionPoints + unusedPoints + 2, MAX_ACTION_POINTS);
    return player.actionPoints;
};

