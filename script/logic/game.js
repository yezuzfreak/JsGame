import Bird from '../models/bird.js';
import Tubes from '../models/tubes.js';
import conf from '../config.js';

 class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.bird = new Bird(this.canvas);
        this.tubes = new Tubes(this.canvas);
        this.scoreSound = new Audio('../assets/audio/scoreSound.mp3');
        this.hitSound = new Audio('../assets/audio/hitSound.mp3');
        

        this.score = 0;
        this.gameOver = false;

        this.initialize();
    }

    initialize() {
        this.canvas.addEventListener('click', () => {
            if (!this.gameOver) {
                this.bird.flap();
   
            } else {
                this.reset();
                this.canvas.addEventListener('click', this.clickHandler);
            }
        });

        this.reset();
        this.animate();
    }

    reset() {
        this.bird.reset();
        this.tubes.reset();
        this.score = 0;
        this.gameOver = false;
    }

    animate() {
        if (!this.gameOver) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.animate());
        }
    }

    update() {
        if (this.bird.y + this.bird.height >= this.canvas.height || this.tubes.checkCollision(this.bird)) {
            this.gameOver = true;
            this.hitSound.play();
        }

        if (!this.gameOver) {
            this.bird.update();
            this.tubes.update();

            if (this.tubes.passedTube(this.bird.x +1000)) {
                this.score++;
                this.scoreSound.play();
            }
        }
    }

    draw() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.bird.draw();
        this.tubes.draw();
        this.drawScore();

        if (this.gameOver) {
            this.drawGameOver();
        }
    }

    drawScore() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }

    drawGameOver() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '36px Arial';
        this.ctx.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2 - 50);
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2 - 50, this.canvas.height / 2);
        this.ctx.fillText('Click to play again', this.canvas.width / 2 - 150, this.canvas.height / 2 + 50);
    }

    keyboardPressedHandler(key) {
        if (key === ' ') {
            this.bird.flap();
        }
    }
}

export default Game;