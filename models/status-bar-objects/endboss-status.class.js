class EndbossStatus extends StatusBar {
    IMAGES_ENDBOSS = [
      'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
      'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
  
    coinImage = 0;
    percentage;
  
    
    constructor() {
      super();
      this.loadImages(this.IMAGES_ENDBOSS);
      this.x = 450;
      this.y = 0;
      this.width = 200;
      this.height = 55;
      this.setPercentage(100);
    }


    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  }