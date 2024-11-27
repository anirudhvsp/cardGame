import Deck from '../cards/Deck.js';
import Card from '../cards/Card.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    preload() {
        this.load.image('cardBack', 'assets/cards/cardBack1.png');
    }
    create() {
        // Initialize game logic
        this.deck = new Deck(this);
        this.deck.shuffle();

        // Example of dealing cards
        for (let i = 0; i < 5; i++) {
            const card = this.deck.dealCard();
            card.setPosition(100 + i * 150, 400);
        }
    }

    update() {
        // Game loop
    }
}


