class Chicken extends MovableObject{
    y = 365;
    height = 60;
    width = 60;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING)
        this.animate()
    }

    animate(){
        // setInterval( () => {
        //     this.x -= 0.5;
        // }, 1000 / 60)
        setInterval(() => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        // this.x -= this.speed;
        }, 80);
        this.moveLeft(this.speed, 80);
    }
}