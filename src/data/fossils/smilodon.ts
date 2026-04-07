import type { FossilSource } from "./types";

export const smilodon: FossilSource = {
  id: "smilodon",
  name: "スミロドン",
  from: 0.25,
  to: 0.001,
  category: "哺乳類",
  sub_category: "ネコ科",
  accent: "#d3b377",
  art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="スミロドンのイラスト"><path d="M47 116C56 88 84 70 122 70C161 70 186 84 205 106L184 138H69C57 133 51 125 47 116Z" fill="#D3B377"/><path d="M153 69C164 50 183 40 203 43C218 45 225 58 218 69C213 77 202 83 188 82" stroke="#EBD9B0" stroke-width="10" stroke-linecap="round"/><path d="M92 136L84 158M165 138L172 157" stroke="#8B6A35" stroke-width="8" stroke-linecap="round"/><path d="M186 84L194 109M201 84L206 109" stroke="#FFF3D8" stroke-width="5" stroke-linecap="round"/><circle cx="199" cy="59" r="4" fill="#0F1417"/></svg>`,
  image: "/images/smilodon.png",
  description:
    "非常に長い犬歯で知られる大型ネコ科動物。氷期の環境に適応し、北米から南米にかけて繁栄しました。恐竜ではなく新生代の哺乳類です。",
};
