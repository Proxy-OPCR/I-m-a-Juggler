function playSound(name){
  const sounds = {
    power: "assets/sounds/power.mp3",
    coin: "assets/sounds/coin.mp3",
    spin: "assets/sounds/spin.mp3",
    bonus: "assets/sounds/bonus.mp3",
    jackpot: "assets/sounds/jackpot.mp3",
    payout: "assets/sounds/payout.mp3"
  };
  const url = sounds[name];
  if(url){
    const a = new Audio(url);
    a.volume = 0.5;
    a.play();
  }
}
