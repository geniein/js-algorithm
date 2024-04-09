//메트로이드

class Conin {
  constructor(won) {
    this.won = won;
    this.count = 0;
  }
}

function changeCoin(money) {
  let coins = [];
  coins.push(new Conin(500));
  coins.push(new Conin(100));
  coins.push(new Conin(50));
  coins.push(new Conin(10));

  for (let i = 0; i < coins.length; i++) {
    while (coins[i].won <= money) {
      coins[i].count++;
      money -= coins[i].won;
    }
    console.log(coins[i]);
  }
}

changeCoin(2380);
