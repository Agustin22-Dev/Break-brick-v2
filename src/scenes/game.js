class game extends Phaser.Scene {
    constructor() {
        super('game');
        this.bounceCount = 0;
        this.score = 0;
        this.victories = 0; // Contador de victorias
        this.ballSpeed = 150; // Velocidad inicial de la pelota
      }
    
      create() {
        // Establecer los límites del mundo
        this.physics.world.setBounds(0, 0, 800, 600);
    
        // Crear paddle (rectángulo)
        this.paddle = this.add.rectangle(400, 550, 100, 20, 0x00ff00);
        this.physics.add.existing(this.paddle);
        this.paddle.body.setImmovable(true);
        this.paddle.body.setCollideWorldBounds(true);
    
        // Crear pelota (círculo)
        this.ball = this.add.circle(400, 530, 10, 0xff0000);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.body.setVelocity(this.ballSpeed, -this.ballSpeed);
        this.ball.body.onWorldBounds = true;
    
        // Crear grupo de ladrillos (rectángulos) con 30 bloques
        this.createBricks();
    
        // Crear texto de puntuación
        this.scoreText = this.add.text(100, 10, 'Score: 0', {
          fontSize: '24px',
          fill: '#ffffff'
        });
        this.scoreText.setOrigin(0.5, 0);
    
        // Crear texto de victorias
        this.victoriesText = this.add.text(400, 10, 'Racha de victorias: 0', {
          fontSize: '24px',
          fill: '#ffffff'
        });
    
        // Colisiones
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
    
        // Configurar detección de colisiones con los límites del mundo
        this.ball.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
          if (down) {
            console.log('Ball is out of bounds. Switching to GameOverScene.');
            this.scene.start('GameOverScene', { score: this.score, victories: this.victories });
          }
        });
    
        // Crear controles de teclado
        this.cursors = this.input.keyboard.createCursorKeys();
      }
    
      update() {
        // Movimiento del paddle
        if (this.cursors.left.isDown) {
          this.paddle.body.setVelocityX(-500);
        } else if (this.cursors.right.isDown) {
          this.paddle.body.setVelocityX(500);
        } else {
          this.paddle.body.setVelocityX(0);
        }
    
        // Limitar el movimiento del paddle dentro de los límites de la pantalla
        if (this.paddle.x < this.paddle.width / 2) {
          this.paddle.x = this.paddle.width / 2;
        } else if (this.paddle.x > 800 - this.paddle.width / 2) {
          this.paddle.x = 800 - this.paddle.width / 2;
        }
    
        // Comprobar si todos los bloques han sido destruidos
        if (this.bricks.getTotalUsed() === 0) {
          this.victories++;
          this.victoriesText.setText('Victories: ' + this.victories);
    
          // Aumentar la velocidad de la pelota en un 10%
          this.ballSpeed *= 1.1;
          this.ball.body.setVelocity(this.ballSpeed, -this.ballSpeed);
    
          // Reiniciar los ladrillos
          this.createBricks();
        }
      }
    
      createBricks() {
        // Crear grupo de ladrillos (rectángulos)
        this.bricks = this.physics.add.staticGroup();
        const numRows = 3; // Número de filas
        const numCols = 10; // Número de columnas
        const brickWidth = 60;
        const brickHeight = 20;
        const offsetX = 80;
        const offsetY = 50;
        const spacing = 10; // Espacio entre ladrillos
    
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            if (i * numCols + j >= 30) break; // Limitar a 30 bloques
            const brickX = offsetX + j * (brickWidth + spacing);
            const brickY = offsetY + i * (brickHeight + spacing);
            const brick = this.add.rectangle(brickX, brickY, brickWidth, brickHeight, 0x0000ff);
            this.physics.add.existing(brick, true);
            this.bricks.add(brick);
          }
        }
      }
    
      hitPaddle(ball, paddle) {
        let diff = ball.x - paddle.x;
        ball.body.setVelocityX(10 * diff);
    
        if (this.bounceCount < 3) {
          ball.body.velocity.x *= 1.1;
          ball.body.velocity.y *= 1.1;
          this.bounceCount++;
        } else {
          ball.body.setVelocity(this.ballSpeed, -this.ballSpeed);
          this.bounceCount = 0;
        }
      }
    
      hitBrick(ball, brick) {
        brick.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
      }
    }
export default game;