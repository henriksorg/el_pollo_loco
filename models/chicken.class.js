class Chicken extends MovableObject{
    y = 375;
    height = 50;
    width = 50;
    x = 400 + Math.random() * 4000;
    offset = {
        top: 0,
        left: 10,
        right: 10,
        bottom: 10
    }
    getHit = false;

    
    constructor(){
        super();
    }


    /**
     * animates the chicken
     * walking animation + moving to the left with a random speed
     * dying animation if getting hit by bottle or character
     */
    animate(){
        setStoppableInterval(() => {
            if(this.getHit){
                this.playAnimation(this.IMAGES_DEAD);
            }else{
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft(this.speed, 80);
            }
        
        }, 80);
    }
}