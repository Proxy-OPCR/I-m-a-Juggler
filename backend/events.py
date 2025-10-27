BASE = 8497
EVENTS = {
    "POWER_ON": BASE,
    "COIN_INSERT": BASE+1,
    "SPIN_START": BASE+2,
    "REEL_STOP": BASE+3,
    "BONUS_HIT": BASE+4,
    "JACKPOT_HIT": BASE+5,
    "PAYOUT_START": BASE+6,
}

class EventBus:
    def __init__(self):
        self.handlers = {}
    def on(self, code, fn):
        self.handlers.setdefault(code, []).append(fn)
    def emit(self, code, payload=None):
        for h in self.handlers.get(code, []):
            h(payload)

bus = EventBus()
