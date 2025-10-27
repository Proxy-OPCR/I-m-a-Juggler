// 🎰 sound.js – アイムジャグラー風サウンド（WebAudio合成）

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 汎用トーン生成関数
function playTone(frequency, duration, type = 'sine', volume = 0.3) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// 効果音セット
const Sounds = {
  // 🎰 リール回転開始
  reelStart() {
    const noise = audioCtx.createBufferSource();
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.3, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    noise.connect(gain).connect(audioCtx.destination);
    noise.start();
  },

  // 🎯 リール停止音
  reelStop() {
    playTone(220, 0.05, 'square', 0.5);
    setTimeout(() => playTone(180, 0.05, 'square', 0.4), 60);
  },

  // 💡 ペカ点灯音
  peka() {
    playTone(880, 0.2, 'triangle', 0.3);
    setTimeout(() => playTone(1320, 0.3, 'triangle', 0.25), 200);
  },

  // 🎉 ボーナス確定音
  bonus() {
    const seq = [880, 988, 1047, 1175, 1319, 1397, 1568];
    seq.forEach((f, i) => setTimeout(() => playTone(f, 0.1, 'sine', 0.4), i * 120));
  },

  // 🔔 メダル投入音
  insertCoin() {
    playTone(600, 0.05, 'square', 0.5);
    setTimeout(() => playTone(800, 0.05, 'square', 0.4), 60);
  }
};

// イベントテスト用（削除可）
window.addEventListener('keydown', (e) => {
  if (e.key === '1') Sounds.insertCoin();
  if (e.key === '2') Sounds.reelStart();
  if (e.key === '3') Sounds.reelStop();
  if (e.key === '4') Sounds.peka();
  if (e.key === '5') Sounds.bonus();
});
