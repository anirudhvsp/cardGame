import Deck from '../cards/Deck.js';
import Card from '../cards/Card.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        this.load.image('cardBack', 'assets/cards/cardBack1.png');
        
        // Load all card fronts
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        suits.forEach(suit => {
            ranks.forEach(rank => {
                this.load.image(`cardFront_${suit}_${rank}`, `assets/cards/cardFront_${suit}_${rank}.png`);
            });
        });
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
        this.deck.shuffle();
        const players = ['top', 'right', 'bottom', 'left'];
        const cardsPerPlayer = 4;
        let cardIndex = 0;

        // Deal 4 cards to each player in a 2x2 grid
        players.forEach(player => {
            const basePosition = this.playerPositions[player];
            
            for(let row = 0; row < 1; row++) {
                for(let col = 0; col < 3; col++) {
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
    collectCards() {        
        const deckPosition = { x: 400, y: 300 };
        this.deck.cards.forEach((card, index) => {
            if (card.targetX !== deckPosition.x || card.targetY !== deckPosition.y) {
                this.time.delayedCall(index * 50, () => {
                    if(card.isFlipped){
                        card.flip();
                    }
                    card.targetX = deckPosition.x;
                    card.targetY = deckPosition.y;
                    this.deck.shuffle();
                });
            }
        });        
    }

    update() {
        this.deck.cards.forEach((card, index) => {
            if (card.targetX !== undefined && card.targetY !== undefined) {
                const dx = card.targetX - card.x;
                const dy = card.targetY - card.y;
                
                // Move cards with easing
                card.x += dx * 0.1;
                card.y += dy * 0.1;
    
                // Create 3D effect using scale and angle
                const scaleX = 1 - Math.abs(dx * 0.001);
                card.scaleX = Math.max(0.7, scaleX);
                card.angle = -dx * 0.1;
    
                // Calculate lift and offset based on movement
                const speed = Math.sqrt(dx * dx + dy * dy);
                const lift = Math.min(speed * 0.05, 15);
                const movementOffset = Math.min(speed * 0.1, 10);
                
                // Apply lift and offset
                card.y -= lift;
                card.x -= movementOffset;
                card.y -= movementOffset;
    
            }
        });
    }
}

