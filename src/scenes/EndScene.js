export default class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    init(data) {
        this.score = data.score;
    }

    create() {
        // Game over scene
        this.add.text(400, 300, 'Game Over', { fontSize: '64px' }).setOrigin(0.5);
        this.add.text(400, 400, `Score: ${this.score}`, { fontSize: '32px' }).setOrigin(0.5);

        const restartButton = this.add.text(400, 500, 'Restart', { fontSize: '32px' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MainMenu');
            });
    }
}