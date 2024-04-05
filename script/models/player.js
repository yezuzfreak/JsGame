import Vector2D from './vector2d.js';
import Clock from './clock.js';
import conf from '../config.js';
import Sprite from './sprite.js';
import Fireball from './fireball.js';
import Hitbox from './hitbox.js';

class Player extends Hitbox {
    name;
    score;
    velocity; // e non speed, mi raccomando
    hp304;
    currentImageIndex;
    images;
    moving;
    update_timer;

    maxHealthPoints;
    healthBarWidth;
    healthBarHeight;
    healthBarColor;

    constructor(images_srcs, name) {
        super(50, conf.GROUND_Y,165,175);
        this.name = name;
        // importo le immagini dello sprite_sheet nel vettore di immagini
        this.images = [];
        for(let src of images_srcs) {
            let img = new Image();
            img.src = src;
            this.images.push(img);
        }
        //  inizialmente uso la prima immagine
        this.currentImageIndex = 0; 

        this.velocity = new Vector2D();
        this.velocity.set(0, 0);
        this.score = 0;
        this.moving = false;
        this.update_timer = new Clock(125);
        this.canJump = true;
        this.bullets = [];

        this.hp304 = 104;                  // Impostare i punti vita iniziali del giocatore
        this.maxHealthPoints = this.hp304; // Impostare i massimi punti vita del giocatore
        this.healthBarWidth = 100; 
        this.healthBarHeight = 10; 
        this.healthBarColor = 'green'; 
    }

    jump() {
        if(this.canJump) {
            this.velocity.y = 32;
            //this.velocity.x = 10;
        }
        //  TODO: Fix double jump based on whatever ground collision
        // Not only ground
        if(this.position.y > conf.GROUND_Y) {
            this.canJump = false;
        }
    }

    shoot(ctx) {
        console.log("Shooting: " + ctx.canvas.clientHeight);
        console.log("y: " + this.position.y);

        let fireball = new Fireball(this.position.x + 75, this.position.y - 50);
        this.bullets.push(fireball);
    }

    drawHealthBar(ctx) {

        const healthPercentage = this.hp304 / this.maxHealthPoints;
        const healthBarWidth = this.healthBarWidth * healthPercentage;

        ctx.fillStyle = this.healthBarColor;
        ctx.fillRect(this.position.x + 15, this.position.y + 10, healthBarWidth, this.healthBarHeight);
    }

    draw(ctx) {
        // Disegna il giocatore
        ctx.drawImage(this.images[this.currentImageIndex], this.position.x, 
            ctx.canvas.clientHeight - this.position.y, 
            175, 175);

        // Disegna il nome del giocatore
        ctx.font = "30px Verdana";
        ctx.fillStyle = "white";
        ctx.fillText(this.name, this.position.x + 50, (ctx.canvas.clientHeight - (this.position.y + 5)));

        // Disegna la barra dei punti vita
        this.drawHealthBar(ctx);

        // Disegna le munizioni sparate dal giocatore
        this.bullets.forEach((b) => b.draw(ctx));

        super.draw(ctx);
    }

    update() {
        this.position.add(this.velocity);
        this.moving = this.velocity.x != 0;
        this.update_timer.update();

        //  accelerazione gravitazionale se lascio la terra
        // if(this.position.y > conf.GROUND_Y) {
        //     this.velocity.y -= 1.2;
        // }
        this.velocity.y += -1.2;
        if(this.moving) {
            if(this.update_timer.tick()) {
                this.currentImageIndex += 1;
                this.currentImageIndex %= this.images.length;
            }
            
        }
        else {
            this.currentImageIndex = 0;
        }

        this.bullets.forEach((b) => b.update());
    }
}

export default Player;
