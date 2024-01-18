class Cloud extends MovableObject{
    y = 20;
    height = 150;
    width = 500;
    
    
    constructor(x){
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x =  x;
        this.animate();
     }

     
    animate(){
        setInterval(() => {
            this.moveLeft(10, 80)
        }, 80);
    }
}