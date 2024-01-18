class CoinStatus extends StatusBar {
  IMAGES_COINS = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  coinImage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINS);
    this.x = 10;
    this.y = 40;
    this.width = 200;
    this.height = 55;
    this.setImage(0);
  }

  setImage(index) {
    let path = this.IMAGES_COINS[index];
    this.img = this.imageCache[path];
  }
}
