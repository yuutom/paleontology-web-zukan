import type { FossilSource } from "./types";

export const megalodon: FossilSource = {
  id: "megalodon",
  name: "メガロドン",
  from: 2.3,
  to: 0.036,
  length: 1800,
  category: "魚類",
  sub_category: "ネズミザメ目",
  accent: "#5d8ca6",
  art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="メガロドンのイラスト"><path d="M35 97C60 63 128 57 192 79C211 86 224 92 234 97C218 104 209 113 197 126C133 145 63 138 35 97Z" fill="#5D8CA6"/><path d="M112 110L147 110" stroke="#B7D3E1" stroke-width="9" stroke-linecap="round"/><path d="M58 98L24 81V113L58 98Z" fill="#9EC1D2"/><path d="M131 72L145 48L160 74" fill="#7FAEC4"/><circle cx="181" cy="87" r="5" fill="#0F1417"/></svg>`,
  image: "/images/megalodon.png",
  description:
    "新生代の海に生息した史上最大級のサメで、巨大な三角形の歯で知られています。現生のホホジロザメに似た生態を持ちながら、はるかに大きな頂点捕食者だったと考えられています。",
};
