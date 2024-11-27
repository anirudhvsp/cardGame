export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Create main menu UI
        this.add.text(400, 300, 'Card Game', { fontSize: '64px' }).setOrigin(0.5);

        // Add start game button
        const startButton = this.add.text(400, 400, 'Start Game', { fontSize: '32px' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });
    }
}