import GameScene from './scenes/GameScene';

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scene: GameScene,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: 0xFFFFFF
};

new Phaser.Game(config);
