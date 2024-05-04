import conf from '../config.js';

class Tubes {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.tubeWidth = 50;
        this.tubeGap = 150;
        this.tubes = [];

        this.lastTubeAdded = 0;
    }

    reset() {
        this.tubes = [];
        this.lastTubeAdded = 0;
    }

    update() {
        if (this.lastTubeAdded + conf.tubeInterval < Date.now() - 1000) {
            this.addTube();
            this.lastTubeAdded = Date.now();
        }

        for (let i = 0; i < this.tubes.length ; i++) {
            this.tubes[i].x -= conf.gameSpeed;

            if (this.tubes[i].x + this.tubeWidth < -50) {
               this.tubes.splice(i, 1);
               
            }
        }
    }

    draw() {
        for (let tube of this.tubes) {
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(tube.x, 0, this.tubeWidth, tube.top);
            this.ctx.fillRect(tube.x, tube.bottom, this.tubeWidth, this.canvas.height - tube.bottom);
        }
    }

    addTube() {
        const topTubeHeight = Math.random() * (this.canvas.height - this.tubeGap - 100) + 50;
        const bottomTubeHeight = this.canvas.height - this.tubeGap - topTubeHeight;
        this.tubes.push({ x: this.canvas.width, top: topTubeHeight, bottom: this.canvas.height - bottomTubeHeight });
    }

    passedTube(birdX) {
        if (this.tubes.length > 0 && this.tubes[0].x + this.tubeWidth < birdX -1000) {
            this.tubes.shift();
            return true;
        }
        return false;
    }

    checkCollision(bird) {
        for (let tube of this.tubes) {
            if (
                bird.x < tube.x + this.tubeWidth &&
                bird.x + bird.width > tube.x &&
                (bird.y < tube.top || bird.y + bird.height > tube.bottom)
            ) {
                return true;
            }
        }
        return false;
    }
}
export default Tubes;