const sounds = {
  start: new Audio("assets/sounds/start.mp3"),
  stop: new Audio("assets/sounds/stop.mp3"),
  big: new Audio("assets/sounds/big.mp3"),
  reg: new Audio("assets/sounds/reg.mp3"),
  fanfare: new Audio("assets/sounds/fanfare.mp3")
};

export function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}
