using UnityEngine;
using System;
using System.Collections.Generic;

public static class EventCodes {
    public const int BASE = 8497;
    public const int POWER_ON = BASE;
    public const int COIN_INSERT = BASE+1;
    public const int SPIN_START = BASE+2;
    public const int REEL_STOP = BASE+3;
    public const int BONUS_HIT = BASE+4;
    public const int JACKPOT_HIT = BASE+5;
    public const int PAYOUT_START = BASE+6;
}

public class EventBus {
    private static Dictionary<int, Action<object>> handlers = new();
    public static void On(int code, Action<object> fn){
        if(!handlers.ContainsKey(code)) handlers[code] = delegate{};
        handlers[code] += fn;
    }
    public static void Emit(int code, object payload = null){
        if(handlers.ContainsKey(code)) handlers[code](payload);
    }
}
