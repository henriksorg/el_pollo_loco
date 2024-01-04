class Level {
    enemies;
    clouds;
    backgroundObjects;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.createBackground();
    }

    createBackground() {
        for (let i = 0; i < 3; i++) {
            let xShift = i * 1440
            this.backgroundObjects.push(
                new BackgroundObject('img/5_background/layers/3_third_layer/full.png', xShift),
                new BackgroundObject('img/5_background/layers/2_second_layer/full.png', xShift),
                new BackgroundObject('img/5_background/layers/1_first_layer/full.png', xShift),
                // new BackgroundObject('img/5_background/layers/3_third_layer/2.png', xShift * 2), 
                // new BackgroundObject('img/5_background/layers/2_second_layer/2.png', xShift * 2), 
                // new BackgroundObject('img/5_background/layers/1_first_layer/2.png', xShift * 2)
            )
        }
    }
}