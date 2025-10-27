# events.py
# Python側でイベント処理を行うサンプルクラス
BASE = 8497
POWER_ON = BASE
COIN_INSERT = BASE+1
SPIN_START = BASE+2
REEL_STOP = BASE+3
BONUS_HIT = BASE+4
JACKPOT_HIT = BASE+5
PAYOUT_START = BASE+6

class EventBus:
    def __init__(self):
        self.handlers = {}
    def on(self, code, fn):
        self.handlers.setdefault(code, []).append(fn)
    def emit(self, code, payload=None):
        for h in self.handlers.get(code, []):
            h(payload)

bus = EventBus()

# ハンドラ定義
def on_coin(payload):
    print("コイン投入:", payload)
    bus.emit(SPIN_START)

def on_spin(payload):
    print("スピン開始")
    # サーバー側で乱数決定 -> stop sequenceをクライアントへ返却する想定
    import random
    symbols = ['7','BAR','🍒','🔔','⭐']
    result = [random.choice(symbols) for _ in range(3)]
    # 各リールの停止イベントを順に発行（遅延はクライアント側で）
    for idx, sym in enumerate(result):
        bus.emit(REEL_STOP, {'index': idx, 'symbol': sym})
    # 結果判定（簡易）
    if result[0]==result[1]==result[2]:
        bus.emit(JACKPOT_HIT, {'symbol': result[0]})
    elif result.count('🍒') >= 2:
        bus.emit(BONUS_HIT, {'count': result.count('🍒')})
    else:
        bus.emit(PAYOUT_START, {'coins': 0})

def on_reel_stop(payload):
    print("リール停止:", payload)

def on_jackpot(payload):
    print("ジャックポット! -> 払出開始")
    bus.emit(PAYOUT_START, {'coins': 999})

bus.on(COIN_INSERT, on_coin)
bus.on(SPIN_START, on_spin)
bus.on(REEL_STOP, on_reel_stop)
bus.on(JACKPOT_HIT, on_jackpot)

# 動作テスト
if __name__ == "__main__":
    bus.emit(POWER_ON)
    bus.emit(COIN_INSERT, {'value': 1})
