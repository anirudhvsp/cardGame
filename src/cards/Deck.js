import Card from './Card.js';

export default class Deck {
    constructor(scene) {
        this.scene = scene;
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck() {
        // Create initial deck of cards
        const cardTypes = ['attack', 'defense', 'special'];
        for (let type of cardTypes) {
            for (let i = 1; i <= 10; i++) {
                this.cards.push(
                    new Card(
                        this.scene, 
                        0, 0, 
                        `cardBack`, 
                        type, 
                        i
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