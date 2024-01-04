class Cloud extends MovableObject{
    y = 20;
    height = 150;
    width = 500;
    
    
    constructor(){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =  Math.random() * 500;
        this.animate();
     }

    animate(){
        this.moveLeft(0.15, 60/1000)
    }
}