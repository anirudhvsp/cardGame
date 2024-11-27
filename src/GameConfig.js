import BootScene from './scenes/BootScene.js';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene.js';
import EndScene from './scenes/EndScene.js';

export default {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        BootScene,
        MainMenu,
        GameScene,
        EndScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: 0xFFFFFF
}