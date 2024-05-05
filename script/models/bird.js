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

        // Assicura che l'uccello sia disegnato solo dopo che l'immagine è stata caricata
        this.birdImage.onload = () => {
            this.draw(); // Disegna l'uccello una volta che l'immagine è stata caricata
        };
    }

    flap() {    
        // Fa "sbattere" l'uccello verso l'alto dando un'accelerazione verso l'alto
        this.velocity = this.jumpStrength;
    }

    update() {
        // Aggiorna la posizione dell'uccello in base alla gravità e alla velocità
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw() {
        // Disegna l'immagine dell'uccello sulla posizione corrente
        this.ctx.drawImage(this.birdImage, this.x, this.y, this.width, this.height);
    }

    reset() {
        // Riposiziona l'uccello nella posizione iniziale e resetta la velocità
        this.y = this.canvas.height / 2;
        this.velocity = 0;
    }
}

export default Bird;
