 class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Carica l'immagine dell'uccello
        this.birdImage = new Image();
        this.birdImage.src = '../assets/img/player/uccello.png'; 

        // Posizione e dimensioni dell'uccello
        this.width = 40;
        this.height = 30;
        this.x = this.canvas.width / 4;
        this.y = this.canvas.height / 2;
        this.velocity = 0;
        this.gravity = 0.5;
        this.jumpStrength = -8;

       
        this.birdImage.onload = () => {
            this.draw(); // Disegna l'uccello una volta che l'immagine è stata caricata
        };
    }

    flap() {    
        this.velocity = this.jumpStrength;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw() {
        // Disegna l'immagine dell'uccello
        this.ctx.drawImage(this.birdImage, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = this.canvas.height / 2;
        this.velocity = 0;
    }
}
export default Bird;