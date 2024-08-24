class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
      }
    
      create(data) {
        this.add.text(400, 250, 'Game Over', { fontSize: '48px', fill: '#ff0000' }).setOrigin(0.5);
        this.add.text(400, 350, 'Presione espacio para reiniciar', { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
    
        // Mostrar el puntaje y victorias en el game over
        this.add.text(400, 400, `Score: ${data.score}`, { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 430, `Victories: ${data.victories}`, { fontSize: '24px', fill: '#ffffff' }).setOrigin(0.5);
    
        // Reiniciar el juego al presionar la tecla espacio
        this.input.keyboard.once('keydown-SPACE', () => {
          this.scene.start('game'); // Reinicia la escena del juego
        });
      }
    }
export default GameOverScene