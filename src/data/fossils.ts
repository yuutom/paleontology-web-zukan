export type Fossil = {
  id: string;
  name: string;
  era: string;
  years: string;
  category: string;
  type: string;
  summary: string;
  accent: string;
  art: string;
};

export const fossils: Fossil[] = [
  {
    id: "anomalocaris",
    name: "アノマロカリス",
    era: "カンブリア紀",
    years: "約5億2,000万年前",
    category: "節足動物に近縁",
    type: "海生捕食者",
    summary:
      "カンブリア紀の海で頂点捕食者として君臨した代表的古生物。前方の把握肢と大きな複眼を備え、当時としては極めて洗練された捕食能力を持っていました。",
    accent: "#8cc6ba",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="アノマロカリスのイラスト"><ellipse cx="132" cy="96" rx="70" ry="32" fill="#8CC6BA"/><path d="M68 98C52 92 40 82 31 70" stroke="#D8EAE4" stroke-width="8" stroke-linecap="round"/><path d="M70 111C49 112 34 117 18 131" stroke="#D8EAE4" stroke-width="8" stroke-linecap="round"/><path d="M138 67C156 46 181 42 208 52" stroke="#F3D7A1" stroke-width="10" stroke-linecap="round"/><path d="M141 123C163 139 190 140 214 129" stroke="#F3D7A1" stroke-width="10" stroke-linecap="round"/><circle cx="166" cy="88" r="7" fill="#0F1417"/><path d="M84 73L70 56M98 68L89 48M114 65V44M130 64L135 43M148 66L159 47M164 71L181 58" stroke="#5C948A" stroke-width="5" stroke-linecap="round"/></svg>`,
  },
  {
    id: "trilobite",
    name: "三葉虫",
    era: "古生代",
    years: "約5億2,100万年前 - 約2億5,200万年前",
    category: "節足動物",
    type: "海底生物",
    summary:
      "長期にわたり繁栄した古生代を代表する節足動物。硬い外骨格と三つに分かれた体の構造を持ち、種によって海底を這うものや遊泳するものが存在しました。",
    accent: "#cbb489",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="三葉虫のイラスト"><ellipse cx="130" cy="92" rx="56" ry="68" fill="#CBB489"/><ellipse cx="130" cy="92" rx="18" ry="68" fill="#E7D3AE"/><path d="M94 45H166M88 62H172M82 79H178M78 96H182M82 113H178M88 130H172" stroke="#8E785A" stroke-width="5" stroke-linecap="round"/><path d="M109 30C116 21 124 17 130 17C136 17 144 21 151 30" stroke="#F7E8C9" stroke-width="7" stroke-linecap="round"/></svg>`,
  },
  {
    id: "dunkleosteus",
    name: "ダンクルオステウス",
    era: "デボン紀",
    years: "約3億8,200万年前 - 約3億5,800万年前",
    category: "板皮類",
    type: "海生捕食者",
    summary:
      "強固な頭部装甲と鋭利な顎を持つ大型魚類。歯の代わりに骨質の刃を備え、デボン紀の海における脅威として知られています。",
    accent: "#c98e79",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ダンクルオステウスのイラスト"><path d="M54 92C78 51 138 43 194 78C214 91 221 98 233 102C216 108 208 114 196 127C142 159 79 150 54 92Z" fill="#C98E79"/><path d="M71 94C84 73 116 62 150 67C170 70 186 78 197 89C181 92 170 101 163 115C132 121 95 115 71 94Z" fill="#F0C4B0"/><circle cx="164" cy="84" r="6" fill="#0F1417"/><path d="M41 96L17 80V111L41 96Z" fill="#E5B29D"/></svg>`,
  },
  {
    id: "plesiosaur",
    name: "プレシオサウルス",
    era: "ジュラ紀",
    years: "約2億100万年前 - 約6,600万年前",
    category: "爬虫類",
    type: "海生爬虫類",
    summary:
      "非常に長い首と四枚のヒレを持つ海生爬虫類。湖の怪物伝説とも結びつけられることがありますが、実際には中生代の海で繁栄したグループです。",
    accent: "#7ca7c8",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="プレシオサウルスのイラスト"><ellipse cx="132" cy="112" rx="54" ry="28" fill="#7CA7C8"/><path d="M132 86C129 61 139 34 162 20C175 12 193 13 200 26C207 40 198 56 180 61C166 65 151 71 144 85" stroke="#7CA7C8" stroke-width="14" stroke-linecap="round"/><path d="M103 131L79 150M124 137L111 160M148 136L164 159M166 125L191 140" stroke="#A6CAE3" stroke-width="10" stroke-linecap="round"/><circle cx="190" cy="28" r="4" fill="#0F1417"/></svg>`,
  },
  {
    id: "stegosaurus",
    name: "ステゴサウルス",
    era: "ジュラ紀",
    years: "約1億5,500万年前 - 約1億5,000万年前",
    category: "恐竜",
    type: "植物食恐竜",
    summary:
      "背中の板状装甲と尾のスパイクで知られる植物食恐竜。体温調整やディスプレイ、防御など複数の役割が考えられています。",
    accent: "#d6a56f",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ステゴサウルスのイラスト"><path d="M43 114C53 84 82 71 123 74C158 76 187 87 210 108C200 117 191 127 182 140H70C57 134 49 124 43 114Z" fill="#D6A56F"/><path d="M82 82L90 55L104 80M105 78L116 45L129 76M129 76L143 40L154 78M153 79L166 48L178 84" fill="#F3D7A1"/><path d="M77 137V158M110 140V160M165 139V159M190 131L214 122" stroke="#8E6031" stroke-width="8" stroke-linecap="round"/><circle cx="194" cy="99" r="4" fill="#0F1417"/></svg>`,
  },
  {
    id: "tyrannosaurus",
    name: "ティラノサウルス",
    era: "白亜紀",
    years: "約6,830万年前 - 約6,600万年前",
    category: "恐竜",
    type: "大型獣脚類",
    summary:
      "圧倒的な咬合力と頑丈な頭骨を備えた白亜紀末の大型肉食恐竜。古生物人気の象徴的存在で、羽毛の可能性も議論されてきました。",
    accent: "#b87a68",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ティラノサウルスのイラスト"><path d="M60 117C64 91 85 75 116 73H164C186 73 202 81 211 96C199 99 190 107 185 120H150C138 120 129 127 124 137L117 156H100L103 139C86 137 72 129 60 117Z" fill="#B87A68"/><path d="M163 72L198 50C213 42 229 47 233 59C237 70 230 80 215 83L196 88" fill="#D8A291"/><path d="M123 91L115 108M140 91L132 108" stroke="#8E5A4B" stroke-width="8" stroke-linecap="round"/><path d="M184 121L194 156M96 140L84 160" stroke="#8E5A4B" stroke-width="9" stroke-linecap="round"/><circle cx="212" cy="60" r="4" fill="#0F1417"/></svg>`,
  },
  {
    id: "quetzalcoatlus",
    name: "ケツァルコアトルス",
    era: "白亜紀",
    years: "約7,000万年前 - 約6,600万年前",
    category: "翼竜",
    type: "飛翔爬虫類",
    summary:
      "史上最大級の飛翔動物のひとつ。長大な翼と洗練された軽量骨格を持ち、白亜紀末の空を支配したと考えられています。",
    accent: "#9aa8d3",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ケツァルコアトルスのイラスト"><path d="M129 84L28 47L104 108L129 84Z" fill="#9AA8D3"/><path d="M131 84L232 52L157 108L131 84Z" fill="#C4CDEE"/><path d="M129 84L124 131L114 160M129 84L141 133L153 160" stroke="#E3E8F9" stroke-width="8" stroke-linecap="round"/><path d="M127 84C138 69 153 54 170 46" stroke="#F1F4FD" stroke-width="7" stroke-linecap="round"/><circle cx="172" cy="46" r="4" fill="#0F1417"/></svg>`,
  },
  {
    id: "smilodon",
    name: "スミロドン",
    era: "第四紀",
    years: "約250万年前 - 約1万年前",
    category: "哺乳類",
    type: "剣歯虎",
    summary:
      "非常に長い犬歯で知られる大型ネコ科動物。氷期の環境に適応し、北米から南米にかけて繁栄しました。恐竜ではなく新生代の哺乳類です。",
    accent: "#d3b377",
    art: `<svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="スミロドンのイラスト"><path d="M47 116C56 88 84 70 122 70C161 70 186 84 205 106L184 138H69C57 133 51 125 47 116Z" fill="#D3B377"/><path d="M153 69C164 50 183 40 203 43C218 45 225 58 218 69C213 77 202 83 188 82" stroke="#EBD9B0" stroke-width="10" stroke-linecap="round"/><path d="M92 136L84 158M165 138L172 157" stroke="#8B6A35" stroke-width="8" stroke-linecap="round"/><path d="M186 84L194 109M201 84L206 109" stroke="#FFF3D8" stroke-width="5" stroke-linecap="round"/><circle cx="199" cy="59" r="4" fill="#0F1417"/></svg>`,
  },
];
