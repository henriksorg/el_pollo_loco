class Chicken extends MovableObject{
    y = 365;
    height = 50;
    width = 50;
    x = 400 + Math.random() * 4000;
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }

    
    constructor(){
        super();
    }


    animate(){
        setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft(this.speed, 80);
        }, 80);
    }
}