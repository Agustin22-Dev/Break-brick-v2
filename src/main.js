import GameOverScene from "./scenes/GameOver.js";
import game from "./scenes/game.js"
const config = {
    title: "Breakbrick v2",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#95afc0",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 0
            }
        }
    },
    scene: [
        game,GameOverScene
    ]
};

new Phaser.Game(config);