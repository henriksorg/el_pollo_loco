let level1;
function initLevel(){
    level1 = new Level(
    [
        new NormalChicken(),
        new NormalChicken(),
        new NormalChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],
    [
        
    ],
    [

    ],
    [
        new Coin('img/6_salsa_bottle/salsa_bottle.png'),
        new Coin('img/6_salsa_bottle/salsa_bottle.png'),
        new Coin('img/6_salsa_bottle/salsa_bottle.png'),
        new Coin('img/6_salsa_bottle/salsa_bottle.png'),
        new Coin('img/6_salsa_bottle/salsa_bottle.png'),
        new Bottle('img/8_coin/coin_1.png'),
        new Bottle('img/8_coin/coin_1.png'),
        new Bottle('img/8_coin/coin_1.png'),
        new Bottle('img/8_coin/coin_1.png'),
        new Bottle('img/8_coin/coin_1.png')
    ]
)
}
