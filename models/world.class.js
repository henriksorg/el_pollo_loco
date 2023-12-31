class World {
    character = new Character();
    level = level1;


    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    canvasLength = 720;
    statusBar = new StatusBar();
    throwableObjects = []

    constructor(canvas, keyboard) {
        // this.gameLength = 3;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        //Übergabe aller variablen von world zu Character um diese dort zu nutzen
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();

            this.checkThrowObjects();

        }, 200);
    }

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle)
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((e) => {
            if (this.character.isColliding(e)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObjects)

        this.ctx.translate(-this.camera_x, 0); //Back
        // ------------ Space for fix Objects
        this.addToMap(this.statusBar);
        this.ctx.translate(this.camera_x, 0); //Forward


        this.addObjectsToMap(this.level.clouds);
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
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}