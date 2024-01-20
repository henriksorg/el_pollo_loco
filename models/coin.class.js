class Coin extends CollectableObject{
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    
    constructor(){
        super().loadImage('img/8_coin/coin_1.png');
        this.width = 100;
        this.height = 100;
        this.y = 330;
        this.loadImages(this.IMAGES);
        this.animate();
    }


    /**
     * animation from coin --> getting smaller and bigger
     */
    animate(){
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 500);
    }
}