const BASE = 8497;
const EVENTS = {
  POWER_ON: BASE,
  COIN_INSERT: BASE+1,
  SPIN_START: BASE+2,
  REEL_STOP: BASE+3,
  BONUS_HIT: BASE+4,
  JACKPOT_HIT: BASE+5,
  PAYOUT_START: BASE+6,
  LIGHT_ON: BASE+7,
  LIGHT_OFF: BASE+8,
  SOUND_PLAY: BASE+9
};

class EventBus {
  constructor(){ this.handlers = {}; }
  on(code, fn){ (this.handlers[code] ||= []).push(fn); }
  emit(code, payload){ (this.handlers[code]||[]).forEach(h=>h(payload)); }
}
window.EventBus = EventBus;
window.EVENTS = EVENTS;
