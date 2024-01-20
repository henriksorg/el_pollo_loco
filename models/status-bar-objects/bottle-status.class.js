class BottleStatus extends StatusBar {
  IMAGES_BOTTLES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  bottleImage = 0;

  
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 10;
    this.y = 85;
    this.width = 200;
    this.height = 60;
    this.setImage(0);
  }


  setImage(index) {
    index = Math.round(index / 2);
    let path = this.IMAGES_BOTTLES[index];
    this.img = this.imageCache[path];
  }
}
