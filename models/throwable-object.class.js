class ThrowableObject extends MovableObject{
    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        console.log(this.img);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}