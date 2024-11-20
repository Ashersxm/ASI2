class Player {
    constructor(id, cards) {
        this.id = id;
        this.cards = cards;
        this.actionPoints = 5; // Points d'action par défaut
    }
}

module.exports = Player;
