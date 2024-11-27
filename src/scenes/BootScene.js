export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Load game assets
    }

    create() {
        // Initialize game, transition to main menu
        this.scene.start('MainMenu');
    }
}