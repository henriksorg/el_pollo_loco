class World {
    character = new Character();

    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    canvasLength = 720;
    // gameLength; //Die Länge des Spiels (das x-fache einer Canvas-Länge)


    constructor(canvas, keyboard) {
        // this.gameLength = 3;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        console.log(this.character)
    }

    setWorld() {
        //Übergabe aller variablen von world zu Character um diese dort zu nutzen
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);

        this.addToMap(this.character);

        this.addObjectsToMap(this.enemies);

        this.addObjectsToMap(this.clouds);
        // this.clouds.cloudMove;
        this.ctx.translate(-this.camera_x, 0);

        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0)
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1
            this.ctx.restore();
        }
    }
}