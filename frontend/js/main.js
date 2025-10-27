const bus = new EventBus();

const status = document.getElementById('status');
const reels = [...document.querySelectorAll('.reel')];
const machine = document.getElementById('machine');

bus.on(EVENTS.POWER_ON, () => {
  status.textContent = '状態: 待機中';
  playSound('power');
});

bus.on(EVENTS.COIN_INSERT, () => {
  status.textContent = '状態: コイン投入';
  playSound('coin');
});

bus.on(EVENTS.SPIN_START, () => {
  status.textContent = '状態: スピン中...';
  playSound('spin');
  reels.forEach((r,i)=>{
    r.textContent = '...';
    setTimeout(()=>{
      const s = ['7','BAR','🍒','🔔','⭐'];
      const sym = s[Math.floor(Math.random()*s.length)];
      r.textContent = sym;
      bus.emit(EVENTS.REEL_STOP, {index:i, symbol:sym});
    }, 500+i*400);
  });
});

let stopped = 0;
bus.on(EVENTS.REEL_STOP, (p)=>{
  stopped++;
  if(stopped===3){
    stopped = 0;
    const s = reels.map(r=>r.textContent);
    if(s[0]===s[1] && s[1]===s[2]){
      bus.emit(EVENTS.JACKPOT_HIT,{symbol:s[0]});
    }else if(s.filter(x=>x==='🍒').length>=2){
      bus.emit(EVENTS.BONUS_HIT,{count:s.filter(x=>x==='🍒').length});
    }else{
      bus.emit(EVENTS.PAYOUT_START,{coins:0});
    }
  }
});

bus.on(EVENTS.JACKPOT_HIT, p=>{
  status.textContent = `🎉 ジャックポット! (${p.symbol})`;
  playSound('jackpot');
  machine.classList.add('flash');
  setTimeout(()=>machine.classList.remove('flash'), 2000);
});

bus.on(EVENTS.BONUS_HIT, p=>{
  status.textContent = `🍒 ボーナス! (${p.count}個)`;
  playSound('bonus');
});

bus.on(EVENTS.PAYOUT_START, p=>{
  status.textContent = `払出し: ${p.coins}枚`;
  playSound('payout');
});

// ボタン操作
document.getElementById('coinBtn').onclick = ()=>bus.emit(EVENTS.COIN_INSERT);
document.getElementById('spinBtn').onclick = ()=>bus.emit(EVENTS.SPIN_START);

// 起動
bus.emit(EVENTS.POWER_ON);
