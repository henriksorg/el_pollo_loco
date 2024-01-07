class Level {
    enemies;
    clouds;
    backgroundObjects;
    
    level_end_x = 2000;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.createBackground();
    }

    createBackground() {
        let gameLength = 4;
        for (let i = 0; i <= gameLength; i += 2) {
            let xShift = i * 720;
            let xShift2 = xShift + 720
            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png',xShift),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png',xShift),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png',xShift),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', xShift2), 
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png',xShift2), 
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', xShift2)
            )
        }
    }
}