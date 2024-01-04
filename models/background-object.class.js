class BackgroundObject extends MovableObject {
x;
y;
width = 1440;
height = 480;

    constructor(path, x){
        super().loadImage(path)
        this.x = x;
        this.y = this.height;

    }
}