export function spinReels(setting = 3) {
  const rand = Math.random();

  // 設定別当選確率（例）
  const bigProb = [1/250, 1/240, 1/230, 1/220, 1/210, 1/200];
  const regProb = [1/350, 1/330, 1/310, 1/290, 1/270, 1/250];

  const bigChance = bigProb[setting - 1];
  const regChance = regProb[setting - 1];

  if (rand < bigChance) return "BIG";
  if (rand < bigChance + regChance) return "REG";
  return "MISS";
}
