const reelImgs = [
  'assets/images/reels/bell.png',
  'assets/images/reels/cherry.png',
  'assets/images/reels/seven.png',
  'assets/images/reels/bar.png'
];

function drawReel(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = reelImgs[Math.floor(Math.random() * reelImgs.length)];
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

document.getElementById('start').addEventListener('click', () => {
  drawReel('reel1');
  drawReel('reel2');
  drawReel('reel3');
});
