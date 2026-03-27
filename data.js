const BRAWLERS = [
  { name: "Shelly", role: "damage", tier: "A", description: "近距離火力が高い万能タイプ。" },
  { name: "Colt", role: "damage", tier: "A", description: "長射程で継続火力を出しやすい。" },
  { name: "Bull", role: "tank", tier: "B", description: "近距離で圧をかけるタンク。" },
  { name: "Poco", role: "support", tier: "B", description: "味方を支援しやすいヒーラー。" },
  { name: "Spike", role: "control", tier: "S", description: "高い制圧力と汎用性を持つ。" },
  { name: "Crow", role: "control", tier: "S", description: "継続ダメージと妨害が優秀。" },
  { name: "El Primo", role: "tank", tier: "C", description: "刺さる場面では強い近接ファイター。" },
  { name: "Gene", role: "support", tier: "A", description: "牽制と引き寄せで試合を動かせる。" }
];

const MAPS = [
  { name: "ハードロック鉱山", mode: "ジェムグラブ", best: ["Spike", "Gene", "Poco"] },
  { name: "炎の輪", mode: "ホットゾーン", best: ["Crow", "Spike", "Poco"] },
  { name: "乾いた入り江", mode: "ノックアウト", best: ["Colt", "Spike", "Gene"] }
];
