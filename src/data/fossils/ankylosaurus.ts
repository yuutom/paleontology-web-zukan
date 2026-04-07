import type { FossilSource } from "./types";

export const ankylosaurus: FossilSource = {
  id: "ankylosaurus",
  name: "アンキロサウルス",
  from: 6.85,
  to: 6.6,
  length: 800,
  category: "恐竜",
  sub_category: "装盾類",
  accent: "#8a7556",
  art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="アンキロサウルスのイラスト"><path d="M44 116C52 89 80 73 122 74C158 75 187 88 209 108C200 117 191 128 183 140H70C57 135 49 125 44 116Z" fill="#8A7556"/><path d="M74 84L86 73L98 84M98 81L111 68L123 80M123 78L137 66L148 79M148 79L162 69L174 83" fill="#CBB28B"/><path d="M183 128L214 121" stroke="#6A5640" stroke-width="10" stroke-linecap="round"/><path d="M82 138V158M116 140V160M164 139V159" stroke="#6A5640" stroke-width="8" stroke-linecap="round"/><circle cx="193" cy="100" r="4" fill="#0F1417"/></svg>`,
  image: "/images/ankylosaurus.png",
  description:
    "全身を骨質の装甲で覆い、尾の先端に大きなクラブを備えた植物食恐竜です。白亜紀末の陸上で高い防御力を発揮したと考えられています。",
};
