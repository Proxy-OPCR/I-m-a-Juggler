// SlotMachineEvents.cs
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
    private static Dictionary<int, Action<object>> handlers = new Dictionary<int, Action<object>>();
    public static void On(int code, Action<object> fn){
        if(!handlers.ContainsKey(code)) handlers[code] = delegate{};
        handlers[code] += fn;
    }
    public static void Emit(int code, object payload = null){
        if(handlers.ContainsKey(code)) handlers[code].Invoke(payload);
    }
}

public class SlotController : MonoBehaviour {
    void Start(){
        EventBus.On(EventCodes.COIN_INSERT, OnCoinInsert);
        EventBus.On(EventCodes.SPIN_START, OnSpinStart);
        EventBus.On(EventCodes.JACKPOT_HIT, OnJackpot);
        EventBus.Emit(EventCodes.POWER_ON);
    }

    void OnCoinInsert(object p){
        Debug.Log("コイン投入");
        EventBus.Emit(EventCodes.SPIN_START);
    }

    void OnSpinStart(object p){
        Debug.Log("スピン開始");
        // リール制御はCoroutineで実装するのが現実的
        StartCoroutine(SpinRoutine());
    }

    System.Collections.IEnumerator SpinRoutine(){
        string[] symbols = new string[]{"7","BAR","🍒","🔔","⭐"};
        for(int i=0;i<3;i++){
            yield return new WaitForSeconds(0.4f + i*0.2f);
            string sym = symbols[UnityEngine.Random.Range(0,symbols.Length)];
            Debug.Log($"リール{i+1}停止: {sym}");
            EventBus.Emit(EventCodes.REEL_STOP, new { index = i, symbol = sym });
        }
    }

    void OnJackpot(object p){
        Debug.Log("ジャックポット！演出開始");
        // エフェクト再生等
    }
}
