export default class Button extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, text, onClick) {
        super(scene, x, y, width, height, 0x00ff00);
        
        this.setInteractive()
            .on('pointerdown', onClick)
            .on('pointerover', () => this.setFillStyle(0x00cc00))
            .on('pointerout', () => this.setFillStyle(0x00ff00));

        const buttonText = scene.add.text(x, y, text, { fontSize: '24px' })
            .setOrigin(0.5);

        scene.add.existing(this);
    }
}