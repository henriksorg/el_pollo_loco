class HealthStatus extends StatusBar {
  IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
  ];
  percentage = 100;

  constructor() {
    super().loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png');
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 10;
    this.y = -10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
