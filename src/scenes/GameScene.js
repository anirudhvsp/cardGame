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

        // Keep existing code and add player positions
        this.playerPositions = {
            top: { x: 400, y: 100 },
            right: { x: 700, y: 300 },
            bottom: { x: 400, y: 500 },
            left: { x: 100, y: 300 }
        };

        // Add spread button with better positioning and styling
        const spreadButton = this.add.text(400, 700, 'Spread Cards', { 
            fontSize: '24px',
            backgroundColor: '#4a4a4a',
            padding: { x: 8, y: 4 },
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.spreadCards());

        // Add collect button with better positioning and styling
        const collectButton = this.add.text(600, 700, 'Collect Cards', { 
            fontSize: '24px',
            backgroundColor: '#4a4a4a',
            padding: { x: 8, y: 4 },
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.collectCards());
    }
    spreadCards() {
        const players = ['top', 'right', 'bottom', 'left'];
        const cardsPerPlayer = 4;
        let cardIndex = 0;

        // Deal 4 cards to each player in a 2x2 grid
        players.forEach(player => {
            const basePosition = this.playerPositions[player];
            
            for(let row = 0; row < 2; row++) {
                for(let col = 0; col < 2; col++) {
                    if (cardIndex < this.deck.cards.length) {
                        const card = this.deck.cards[cardIndex];
                        // Calculate grid position with fixed spacing
                        const offsetX = (col * 45) - 32; // Reduced to 65 pixels between cards
                        const offsetY = (row * 70) - 42; // Reduced to 85 pixels between rows
                        const randomX = basePosition.x + offsetX + Phaser.Math.Between(-2, 2);
                        const randomY = basePosition.y + offsetY + Phaser.Math.Between(-2, 2);
                        card.targetX = randomX;
                        card.targetY = randomY;
                        cardIndex++;
                    }
                }
            }
        });

        // Remaining cards stay in deck position
        const deckPosition = { x: 400, y: 300 };
        for(let i = cardIndex; i < this.deck.cards.length; i++) {
            const card = this.deck.cards[i];
            card.targetX = deckPosition.x;
            card.targetY = deckPosition.y;
        }
    }
    collectCards() {        const deckPosition = { x: 400, y: 300 };
        this.deck.cards.forEach((card, index) => {
            this.time.delayedCall(index * 100, () => {
                card.targetX = deckPosition.x;
                card.targetY = deckPosition.y;
            });
        });
    }

    update() {
        // Game loop
    }
}

