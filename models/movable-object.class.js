class MovableObject extends DrawableObject{
  
    
    speed = Math.random() * 5;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true
        }else{
            return this.y < 140;
        }
        
    }


    

    
   

    

    

    // Formel zur Kollisionsberechnung (vorgegeben)
    isColliding(mo) {
        // return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
        //     (this.y + this.offsetY + this.height) >= obj.y &&
        //     (this.y + this.offsetY) <= (obj.y + obj.height);

        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height


    }


    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
            // console.log('new time: ' ,this.lastHit)
        }
        // console.log('Collision with Character, energy: ', this.energy);
        if (this.energy <= 0) {
            this.isDead();
        }
    }

    

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; //Difference in s
        return timePassed < 1;
    }


    // getHurtAgain(){
    //     let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    //     timePassed = timePassed / 1000; //Difference in s
    //     console.log(timePassed);
    //     return timePassed > 5;
    // }


    isDead() {
        return this.energy == 0;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    moveRight() {
        this.x += this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    }

    fallDown() {
        this.speedY = -20;
    }
}