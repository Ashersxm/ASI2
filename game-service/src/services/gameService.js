const gameMaster = require('../utils/gameMaster');

exports.processAttack = (attackerCard, defenderCard) => {
    const attackResult = gameMaster.calculateDamage(attackerCard, defenderCard);
    return attackResult;
};
