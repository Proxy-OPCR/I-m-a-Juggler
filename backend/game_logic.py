import random
from events import bus, EVENTS

def spin_logic():
    symbols = ['7','BAR','🍒','🔔','⭐']
    result = [random.choice(symbols) for _ in range(3)]
    for i, sym in enumerate(result):
        bus.emit(EVENTS['REEL_STOP'], {'index': i, 'symbol': sym})
    if result[0] == result[1] == result[2]:
        bus.emit(EVENTS['JACKPOT_HIT'], {'symbol': result[0]})
    elif result.count('🍒') >= 2:
        bus.emit(EVENTS['BONUS_HIT'], {'count': result.count('🍒')})
    else:
        bus.emit(EVENTS['PAYOUT_START'], {'coins': 0})

def on_coin(_):
    print("コイン投入")
    bus.emit(EVENTS['SPIN_START'])
    spin_logic()

bus.on(EVENTS['COIN_INSERT'], on_coin)
