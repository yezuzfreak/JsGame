import Bird from '../models/bird.js';
import Tubes from '../models/tubes.js';
import conf from '../config.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Inizializzazione degli elementi del gioco
        this.bird = new Bird(this.canvas);
        this.tubes = new Tubes(this.canvas);
        this.scoreSound = new Audio('../assets/audio/scoreSound.mp3');
        this.hitSound = new Audio('../assets/audio/hitSound.mp3');

        // Inizializzazione dello stato del gioco
        this.score = 0;
        this.gameOver = false;

        // Inizializzazione del gioco
        this.initialize();
    }

    initialize() {
        // Aggiunta dell'evento di click per far "sbattere" l'uccello
        this.canvas.addEventListener('click', () => {
            if (!this.gameOver) {
                this.bird.flap();
            } else {
                // Se il gioco è finito, resettalo e ascolta nuovamente i click per ricominciare
                this.reset();
                this.canvas.addEventListener('click', this.clickHandler);
            }
        });

        // Inizializzazione del gioco
        this.reset();
        this.animate();
    }

    reset() {
        // Resetta tutti gli elementi del gioco
        this.bird.reset();
        this.tubes.reset();
        this.score = 0;
        this.gameOver = false;
    }

    animate() {
        if (!this.gameOver) {
            // Se il gioco non è ancora finito, aggiorna e disegna il frame successivo
            this.update();
            this.draw();
            requestAnimationFrame(() => this.animate());
        }
    }

    update() {
        // Controlla se il gioco è finito a causa di una collisione o se l'uccello ha superato un tubo
        if (this.bird.y + this.bird.height >= this.canvas.height || this.tubes.checkCollision(this.bird)) {
            this.gameOver = true;
            this.hitSound.play();
        }

        if (!this.gameOver) {
            // Se il gioco non è ancora finito, aggiorna la posizione dell'uccello e dei tubi
            this.bird.update();
            this.tubes.update();

            // Se l'uccello ha superato un tubo, incrementa il punteggio e riproduci il suono del punteggio
            if (this.tubes.passedTube(this.bird.x + 1000)) {
                this.score++;
                this.scoreSound.play();
            }
        }
    }

    draw() {
        // Pulisce il canvas e disegna gli elementi del gioco
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bird.draw();
        this.tubes.draw();
        this.drawScore();

        if (this.gameOver) {
            // Se il gioco è finito, disegna il messaggio di "Game Over"
            this.drawGameOver();
        }
    }

    drawScore() {
        // Disegna il punteggio corrente
        this.ctx.fillStyle = 'black';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 30);
    }

    drawGameOver() {
        // Disegna il messaggio di "Game Over"
        this.ctx.fillStyle = 'black';
        this.ctx.font = '36px Arial';
        this.ctx.fillText('Game Over', this.canvas.width / 2 - 100, this.canvas.height / 2 - 50);
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2 - 50, this.canvas.height / 2);
        this.ctx.fillText('Click to play again', this.canvas.width / 2 - 150, this.canvas.height / 2 + 50);
    }

    keyboardPressedHandler(key) {
        // Gestisce l'evento di pressione del tasto "spazio" per far "sbattere" l'uccello
        if (key === ' ') {
            this.bird.flap();
        }
    }
}

export default Game;
