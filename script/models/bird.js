class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.width = 40;
        this.height = 30;
        this.x = this.canvas.width / 4;
        this.y = this.canvas.height / 2;
        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpStrength = -8;
    }

    flap() {    
        this.velocity = this.jumpStrength;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = this.canvas.height / 2;
        this.velocity = 0;
    }
}

export default Bird;