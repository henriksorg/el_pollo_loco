class DrawableObject {
    x = 120;
    y;
    img;
    imageCache = {};
    currentImage = 0;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e)
            console.log('could not load image:', this.img);
        }
    }


    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}