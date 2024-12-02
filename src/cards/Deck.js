import Card from './Card.js';

export default class Deck {
    constructor(scene) {
        this.scene = scene;
        this.cards = [];
        this.deckX = this.scene.cameras.main.centerX;
        this.deckY = this.scene.cameras.main.centerY;        
        this.initializeDeck();
    }

    // Add this new method
    setDeckPosition(x, y) {
        this.deckX = x;
        this.deckY = y;
        // Position all cards in deck
        this.cards.forEach(card => {
            card.setPosition(this.deckX, this.deckY);
        });
    }

    initializeDeck() {
        // Create initial deck of cards
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(
                    new Card(
                        this.scene, 
                        0, 0, 
                        `cardBack`, 
                        suit, 
                        value
                    )
                );
            }
        }
    }

    shuffle() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}