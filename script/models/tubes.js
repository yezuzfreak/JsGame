import conf from '../config.js';

class Tubes {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Dimensioni dei tubi e spazio tra i tubi
        this.tubeWidth = 50;
        this.tubeGap = 150;
        this.tubes = []; // Array per memorizzare i tubi

        this.lastTubeAdded = 0; // Timestamp dell'ultimo tubo aggiunto
    }

    reset() {
        // Resettare l'array dei tubi e l'ultimo tubo aggiunto
        this.tubes = [];
        this.lastTubeAdded = 0;
    }

    update() {
        // Aggiornamento dei tubi
        if (this.lastTubeAdded + conf.tubeInterval < Date.now() - 1000) {
            // Aggiungi un nuovo tubo se è passato l'intervallo di tempo specificato
            this.addTube();
            this.lastTubeAdded = Date.now();
        }

        // Itera sui tubi e muovili verso sinistra
        for (let i = 0; i < this.tubes.length ; i++) {
            this.tubes[i].x -= conf.gameSpeed;

            // Rimuovi i tubi che escono dal canvas
            if (this.tubes[i].x + this.tubeWidth < -50) {
               this.tubes.splice(i, 1);
            }
        }
    }

    draw() {
        // Disegna i tubi sul canvas
        for (let tube of this.tubes) {
            this.ctx.fillStyle = 'green';
            // Disegna il tubo superiore
            this.ctx.fillRect(tube.x, 0, this.tubeWidth, tube.top);
            // Disegna il tubo inferiore
            this.ctx.fillRect(tube.x, tube.bottom, this.tubeWidth, this.canvas.height - tube.bottom);
        }
    }

    addTube() {
        // Aggiungi un nuovo tubo
        const topTubeHeight = Math.random() * (this.canvas.height - this.tubeGap - 100) + 50;
        const bottomTubeHeight = this.canvas.height - this.tubeGap - topTubeHeight;
        this.tubes.push({ x: this.canvas.width, top: topTubeHeight, bottom: this.canvas.height - bottomTubeHeight });
    }

    passedTube(birdX) {
        // Controlla se l'uccello ha superato un tubo
        if (this.tubes.length > 0 && this.tubes[0].x + this.tubeWidth < birdX - 1000) {
            this.tubes.shift(); // Rimuovi il tubo superato
            return true;
        }
        return false;
    }

    checkCollision(bird) {
        // Controlla se c'è una collisione tra l'uccello e i tubi
        for (let tube of this.tubes) {
            if (
                bird.x < tube.x + this.tubeWidth &&
                bird.x + bird.width > tube.x &&
                (bird.y < tube.top || bird.y + bird.height > tube.bottom)
            ) {
                return true; // Collisione rilevata
            }
        }
        return false; // Nessuna collisione rilevata
    }
}

export default Tubes;
