import { useEffect, useMemo, useState } from "react";
import { fossils, type Fossil } from "./data/fossils";
import { timelineEntries } from "./data/timeline";

const GRID_DESCRIPTION_MAX_LENGTH = 70;
const GRID_DESCRIPTION_MAX_LENGTH_MOBILE = 40;

const allTimelineEntries = [
  "all",
  ...new Set(fossils.flatMap((item) => item.timeline_entries.map((entry) => entry.name))),
];
const allCategories = ["all", ...new Set(fossils.map((item) => item.category))];

const heroMetrics = [
  { label: "掲載種", value: `${fossils.length}` },
  {
    label: "地質時代",
    value: `${new Set(fossils.flatMap((item) => item.timeline_entries.map((entry) => entry.name))).size}`,
  },
  { label: "分類群", value: `${new Set(fossils.map((item) => item.category)).size}` },
];

const eraDistribution = Object.entries(
  fossils.reduce<Record<string, number>>((acc, fossil) => {
    fossil.timeline_entries.forEach((entry) => {
      acc[entry.name] = (acc[entry.name] || 0) + 1;
    });
    return acc;
  }, {}),
);

const maxEraCount = Math.max(...eraDistribution.map(([, count]) => count));

function getEraTone(era: string) {
  switch (era) {
    case "原生代":
      return "bg-[#7fb0a6]/16 text-[#bfe3d9] border-[#7fb0a6]/30";
    case "古生代":
      return "bg-[#87a8d8]/16 text-[#d5e6ff] border-[#87a8d8]/30";
    case "中生代":
      return "bg-[#d3a06f]/16 text-[#ffe3c5] border-[#d3a06f]/30";
    case "新生代":
      return "bg-[#c98e79]/16 text-[#ffd9ce] border-[#c98e79]/30";
    default:
      return "bg-white/8 text-[#dce6e0] border-white/10";
  }
}

function formatJapaneseYearsAgo(value: number, options?: { approximate?: boolean; withSuffix?: boolean }) {
  if (value === 0) {
    return "現在";
  }

  const withSuffix = options?.withSuffix ?? true;
  const totalTenThousandYears = Math.round(value * 100);
  const oku = Math.floor(totalTenThousandYears / 10000);
  const man = totalTenThousandYears % 10000;

  const parts = [
    oku > 0 ? `${oku}億` : "",
    man > 0 ? `${man}万` : "",
  ].filter(Boolean);

  const body = parts.join("") || "0万";
  const suffix = withSuffix ? "年前" : "年";

  return `${body}${suffix}`;
}

function formatTimelineRange(from: number, to: number) {
  return `${formatJapaneseYearsAgo(from, { approximate: true, withSuffix: false })} - ${formatJapaneseYearsAgo(to, {
    approximate: true,
  })}`;
}

function formatCompactRange(from: number, to: number) {
  if (to === 0) {
    return `${formatJapaneseYearsAgo(from, { withSuffix: false })} - 現在`;
  }

  return `${formatJapaneseYearsAgo(from, { withSuffix: false })} - ${formatJapaneseYearsAgo(to)}`;
}

function formatLength(length: number) {
  return `${length.toLocaleString("ja-JP")} cm`;
}

function formatTimelineEntryLabel(fossil: Fossil) {
  if (fossil.timeline_entries.length === 0) {
    return "時代未設定";
  }

  if (fossil.timeline_entries.length === 1) {
    return fossil.timeline_entries[0].name;
  }

  const first = fossil.timeline_entries[0];
  const last = fossil.timeline_entries[fossil.timeline_entries.length - 1];

  return `${first.name} ~ ${last.name}`;
}

function FossilCardArt({ fossil }: { fossil: Fossil }) {
  return (
    <div
      className="fossil-svg text-white [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[230px]"
      dangerouslySetInnerHTML={{ __html: fossil.art }}
    />
  );
}

function FossilDetailImage({ fossil }: { fossil: Fossil }) {
  if (fossil.image) {
    return (
      <img
        src={fossil.image}
        alt={`${fossil.name}の画像`}
        className="h-auto max-h-[28vh] w-full rounded-2xl object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
      />
    );
  }

  return (
    <div
      className="fossil-svg text-white [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-[280px]"
      dangerouslySetInnerHTML={{ __html: fossil.art }}
    />
  );
}

function getCollapsedDescription(description: string, maxLength = GRID_DESCRIPTION_MAX_LENGTH) {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.slice(0, maxLength).trimEnd()}…`;
}

function HeroWorldIllustration() {
  return (
    <div className="relative mt-7 overflow-hidden rounded-[28px] ,rgba(6,11,14,0.42))]">
        <svg
          viewBox="0 0 860 360"
          role="img"
          aria-label="原始の海と陸、化石層を描いた装飾イラスト"
          className="h-auto w-full"
        >
          <defs>
            <linearGradient id="skyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#162126" />
              <stop offset="55%" stopColor="#1c3130" />
              <stop offset="100%" stopColor="#332720" />
            </linearGradient>
            <linearGradient id="waterFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4f8f8b" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#0c1a1f" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="earthFade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6d5643" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#1a1918" stopOpacity="0.98" />
            </linearGradient>
            <radialGradient id="sunMist" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f3d7a1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f3d7a1" stopOpacity="0" />
            </radialGradient>
            <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <rect width="860" height="360" rx="24" fill="url(#skyGlow)" />
          <circle cx="704" cy="74" r="66" fill="url(#sunMist)" />
          <ellipse cx="684" cy="112" rx="124" ry="42" fill="#d9b988" fillOpacity="0.12" filter="url(#softBlur)" />

          <path
            d="M0 154C72 138 133 132 215 143C288 153 373 190 456 177C538 164 613 100 699 108C758 114 811 138 860 158V360H0Z"
            fill="url(#waterFade)"
          />
          <path
            d="M0 230C79 197 135 188 218 199C312 211 385 247 469 242C556 238 653 198 730 208C786 216 826 242 860 262V360H0Z"
            fill="url(#earthFade)"
          />

          <path d="M0 142C48 126 103 122 157 132" stroke="#b7dcd5" strokeOpacity="0.35" strokeWidth="3" fill="none" />
          <path d="M88 159C136 148 192 149 252 164" stroke="#b7dcd5" strokeOpacity="0.28" strokeWidth="2.5" fill="none" />
          <path d="M500 138C549 120 606 118 674 132" stroke="#ffe2b9" strokeOpacity="0.26" strokeWidth="3" fill="none" />

          <g fill="none" stroke="#d5ece6" strokeOpacity="0.78" strokeLinecap="round">
            <path d="M130 182C153 157 198 155 224 178C248 199 246 235 214 251C176 268 133 241 133 200C133 182 143 166 159 158" strokeWidth="4.5" />
            <path d="M158 178C175 166 197 166 210 180C223 195 220 216 203 227C183 240 159 228 157 206C156 195 161 185 169 179" strokeWidth="3" />
            <path d="M182 188C191 186 200 191 202 200C204 209 198 218 189 219C181 220 173 214 172 205" strokeWidth="2.4" />
            <path d="M104 204C130 200 152 207 170 225" strokeWidth="2.2" strokeOpacity="0.55" />
          </g>

          <g transform="translate(330 150)" fill="none" stroke="#d7c39a" strokeOpacity="0.82" strokeLinecap="round">
            <path d="M0 24C40 0 84 4 116 26C147 47 149 88 113 109C73 132 11 118 -11 76C-22 55 -18 37 0 24Z" strokeWidth="4" />
            <path d="M18 37C43 20 77 22 97 40C118 58 118 84 94 100C66 118 23 109 7 80C-2 64 1 48 18 37Z" strokeWidth="2.6" />
            <path d="M113 47L150 31" strokeWidth="3.5" />
            <path d="M113 58L155 54" strokeWidth="3.2" />
            <path d="M112 70L152 78" strokeWidth="3" />
            <path d="M112 84L144 102" strokeWidth="2.8" />
            <path d="M37 35C58 44 74 61 84 84" strokeWidth="2.4" strokeOpacity="0.55" />
          </g>

          <g fill="#20382f" fillOpacity="0.95" stroke="#8bb7a8" strokeOpacity="0.46" strokeWidth="2">
            <path d="M566 210C576 172 597 146 621 140C617 162 611 182 603 208C629 174 662 158 698 155C678 176 659 194 632 216C667 206 696 210 724 227C684 232 653 232 617 229C631 247 634 266 626 294C611 272 600 253 595 228C580 251 561 262 534 268C543 243 552 228 566 210Z" />
            <path d="M694 200C703 171 718 150 739 145C738 163 734 179 728 198C750 176 777 164 807 166C790 182 773 195 751 211C781 207 803 212 826 225C793 228 767 228 738 225C749 240 751 258 746 281C734 262 726 247 721 225C708 243 692 253 670 257C677 238 684 224 694 200Z" />
          </g>

          <g fill="none" stroke="#c8ddd6" strokeOpacity="0.9" strokeLinecap="round">
            <path d="M484 229C501 212 529 208 548 222C565 235 565 261 547 275C525 292 490 285 476 263C466 248 469 236 484 229Z" strokeWidth="3.8" />
            <path d="M485 244C505 231 528 231 541 244C554 257 551 277 535 285C515 295 488 288 478 270C472 259 474 249 485 244Z" strokeWidth="2.5" />
            <path d="M539 235L572 220" strokeWidth="2.6" />
            <path d="M540 247L578 245" strokeWidth="2.5" />
            <path d="M541 261L575 272" strokeWidth="2.3" />
          </g>

          <g transform="translate(90 254)" fill="#c9b58d" fillOpacity="0.92">
            <circle cx="0" cy="0" r="5" />
            <circle cx="18" cy="-8" r="3.5" />
            <circle cx="34" cy="-2" r="4" />
            <circle cx="52" cy="-10" r="3" />
          </g>

          <g transform="translate(246 238)" stroke="#e2d4b5" strokeOpacity="0.82" strokeLinecap="round">
            <path d="M0 66C18 38 45 13 81 0C95 33 92 61 72 84C54 107 25 120 -1 118C-2 98 -1 82 0 66Z" fill="#37261d" fillOpacity="0.65" strokeWidth="2.5" />
            <path d="M21 84C36 61 50 44 72 28" strokeWidth="2.1" />
            <path d="M36 102C46 82 57 66 73 50" strokeWidth="1.9" />
          </g>

          <g transform="translate(0 0)" strokeLinecap="round" strokeLinejoin="round">
            <path d="M70 278C118 256 184 254 235 277" stroke="#87b2a6" strokeOpacity="0.28" strokeWidth="2" fill="none" />
            <path d="M558 296C621 280 697 285 772 313" stroke="#d6bd90" strokeOpacity="0.18" strokeWidth="2" fill="none" />
          </g>
        </svg>
    </div>
  );
}

function FossilDetailPanel({
  fossil,
  compact = false,
  showEyebrow = true,
}: {
  fossil: Fossil;
  compact?: boolean;
  showEyebrow?: boolean;
}) {
  return (
    <>
      {showEyebrow ? (
        <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Specimen Detail</p>
      ) : null}
      <div className="mt-3 flex items-baseline justify-between gap-4 max-sm:flex-col max-sm:items-start">
        <h3
          className={`font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] ${compact ? "text-[2rem] leading-none" : "text-4xl"}`}
        >
          {fossil.name}
        </h3>
        <span className="text-xs text-[#a7bbb2]">{fossil.sub_category}</span>
      </div>

      <div
        className={`rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(203,180,137,0.22),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.12))] ${compact ? "mt-4 p-4" : "mt-[18px] p-[18px]"}`}
      >
        <FossilDetailImage fossil={fossil} />
      </div>

      <div className={`flex flex-wrap gap-2.5 ${compact ? "mt-4" : "mt-5"}`}>
        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
          {formatTimelineEntryLabel(fossil)}
        </span>
        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
          {fossil.category}
        </span>
        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
          {fossil.sub_category}
        </span>
      </div>

      <p className={`text-[#d1ddd5] ${compact ? "mt-4 text-[0.92rem] leading-6" : "mt-5 text-[0.95rem] leading-7"}`}>
        {fossil.description}
      </p>

      <div className={`flex flex-wrap gap-2.5 ${compact ? "mt-4" : "mt-[18px]"}`}>
        {[
          ["名称", fossil.name],
          ["地質時代", formatTimelineEntryLabel(fossil)],
          ["期間", formatCompactRange(fossil.from, fossil.to)],
          ["体長", formatLength(fossil.length)],
          ["分類", fossil.category],
          ["小分類", fossil.sub_category],
        ].map(([label, value]) => (
          <div
            key={label}
            className="min-w-[140px] flex-1 rounded-2xl border border-white/6 bg-white/[0.03] p-[14px] max-sm:min-w-0"
          >
            <span className="block text-xs text-[#a7bbb2]">{label}</span>
            <strong className="mt-1.5 block text-[0.98rem] text-[#f0f5f1]">{value}</strong>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(fossils[0]?.id ?? "");
  const [isMobile, setIsMobile] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsDetailModalOpen(false);
      return;
    }

    if (!isDetailModalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isDetailModalOpen, isMobile]);

  const filteredFossils = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return fossils.filter((fossil) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          fossil.name,
          fossil.category,
          fossil.sub_category,
          fossil.description,
          ...fossil.timeline_entries.map((entry) => entry.name),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesEra =
        era === "all" || fossil.timeline_entries.some((entry) => entry.name === era);
      const matchesCategory = category === "all" || fossil.category === category;

      return matchesQuery && matchesEra && matchesCategory;
    });
  }, [category, era, query]);

  const selectedFossil =
    filteredFossils.find((item) => item.id === selectedId) ?? filteredFossils[0] ?? null;

  useEffect(() => {
    if (!selectedFossil) {
      setIsDetailModalOpen(false);
    }
  }, [selectedFossil]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(109,147,136,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(201,142,121,0.18),transparent_28%),linear-gradient(180deg,#162126_0%,#0d1215_48%,#090c0e_100%)] text-stone-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]" />

      <div className="relative mx-auto flex w-[min(1240px,calc(100%-32px))] flex-col gap-6 py-6 max-sm:w-[min(100%-20px,1240px)] max-sm:pt-3">
        <header className="overflow-hidden rounded-[36px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-sm:rounded-3xl max-sm:p-5">
          <div className="absolute inset-auto -right-[10%] -bottom-[45%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(203,180,137,0.32),transparent_65%)]" />

          <nav className="relative z-10 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
            <span className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.1rem] tracking-[0.22em] uppercase">
              Ancient Echoes
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">
              Paleontology Archive
            </span>
          </nav>

          <div className="relative z-10 mt-13 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] max-sm:mt-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">
                Curated Fossil Atlas
              </p>

              <h1 className="mt-3 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[clamp(3.6rem,6.8vw,7rem)] leading-[1.02] font-semibold max-sm:text-[clamp(2.2rem,10vw,3.6rem)]">
                古生物Web図鑑
              </h1>

              <p className="mt-3 max-w-[60ch] leading-8 text-[#d1ddd5] max-sm:text-[0.92rem] max-sm:leading-6">
                海から陸、三葉虫から巨大恐竜まで。古生物の姿、時代、分類、生息年代を直感的にたどれるインタラクティブなWeb図鑑です。
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5 max-sm:gap-2.5">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-w-[140px] rounded-2xl border border-white/6 bg-white/[0.03] px-[18px] py-4 max-sm:min-w-[102px] max-sm:px-3 max-sm:py-3"
                  >
                    <span className="text-xs text-[#a7bbb2] max-sm:text-[0.68rem]">{metric.label}</span>
                    <strong className="block font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.7rem] text-[#f3d7a1] max-sm:text-[1.35rem]">
                      {metric.value}
                    </strong>
                  </div>
                ))}
              </div>

              <HeroWorldIllustration />
            </div>

            <aside className="self-end rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))] p-[22px] max-sm:hidden">
              <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Era Spectrum</p>
              <div className="mt-[18px] grid gap-3.5">
                {eraDistribution.map(([name, count]) => (
                  <div
                    key={name}
                    className="grid items-center gap-3 [grid-template-columns:120px_1fr_auto] max-sm:[grid-template-columns:1fr]"
                  >
                    <strong>{name}</strong>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <span
                        className="block h-full rounded-full bg-[linear-gradient(90deg,#8cc6ba,#f3d7a1)]"
                        style={{ width: `${(count / maxEraCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#dce6e0]">{count}種</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <main className="grid min-w-0 gap-6">
          <section className="min-w-0 overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-sm:rounded-3xl max-sm:p-4">
            <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Deep Time</p>
                <h2 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-4xl font-semibold leading-none max-sm:text-[1.7rem]">
                  地質時代のタイムライン
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))] p-5 max-sm:p-3">
              <div className="mx-auto max-w-[980px]">
                <div className="mb-3 flex items-center justify-between gap-4 text-xs text-[#8fa39a] max-sm:flex-col max-sm:items-start">
                  <span>横スクロールで移動</span>
                </div>
              </div>

              <div className="mx-auto max-w-[980px] overflow-x-auto pb-3 [scrollbar-color:rgba(243,215,161,0.4)_transparent] [scrollbar-width:thin]">
                <div className="relative flex min-w-max items-start gap-0 px-2 py-4 max-sm:px-1 max-sm:py-3">
                  <div className="pointer-events-none absolute left-0 right-0 top-[43px] h-px bg-[linear-gradient(90deg,rgba(243,215,161,0.2),rgba(243,215,161,0.75),rgba(140,198,186,0.75),rgba(255,255,255,0.15))]" />

                  {timelineEntries.map((item, index) => (
                    <article
                      key={item.name}
                      className="relative w-[250px] shrink-0 pr-6 last:pr-2 max-sm:w-[176px] max-sm:pr-3"
                    >
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f3d7a1]/30 bg-[#172126] text-sm font-semibold text-[#f3d7a1] shadow-[0_0_0_8px_rgba(22,33,38,0.95)] max-sm:h-8 max-sm:w-8 max-sm:text-[0.7rem] max-sm:shadow-[0_0_0_6px_rgba(22,33,38,0.95)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                      </div>

                      <div className="mt-5 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(5,10,12,0.34))] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] max-sm:mt-4 max-sm:rounded-[20px] max-sm:p-3.5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-[0.72rem] font-medium max-sm:px-2.5 max-sm:py-1 max-sm:text-[0.62rem] ${getEraTone(item.era)}`}
                        >
                          {item.era}
                        </span>
                        <strong className="mt-4 block font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.2rem] leading-tight text-[#f4f7f4] max-sm:mt-3 max-sm:text-[0.98rem]">
                          {item.name}
                        </strong>
                        <p className="mt-3 text-[0.95rem] leading-7 text-[#e5ede8] max-sm:mt-2 max-sm:text-[0.8rem] max-sm:leading-6">
                          {item.summary}
                        </p>
                        <p className="mt-4 text-xs text-[#8fa39a] max-sm:mt-3 max-sm:text-[0.68rem]">
                          {formatTimelineRange(item.from, item.to)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="min-w-0 overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-sm:rounded-3xl max-sm:p-4">
            <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Explorer</p>
                <h2 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-4xl font-semibold leading-none max-sm:text-[1.7rem]">
                  古生物を探す
                </h2>
              </div>
              <p className="text-xs text-[#a7bbb2]">{filteredFossils.length} 件を表示中</p>
            </div>

            <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
              <label className="grid min-w-0 gap-2">
                <span className="text-sm text-[#d6e2db]">キーワード</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="名称・分類・概要で検索"
                  className="w-full rounded-2xl border border-white/8 bg-[rgba(5,10,12,0.4)] px-4 py-3.5 text-stone-100 outline-none transition focus:-translate-y-px focus:border-[#f3d7a1]/60 focus:bg-[rgba(12,20,24,0.72)]"
                />
              </label>

              <label className="grid min-w-0 gap-2">
                <span className="text-sm text-[#d6e2db]">地質時代</span>
                <select
                  value={era}
                  onChange={(event) => setEra(event.target.value)}
                  className="w-full rounded-2xl border border-white/8 bg-[rgba(5,10,12,0.4)] px-4 py-3.5 text-stone-100 outline-none transition focus:-translate-y-px focus:border-[#f3d7a1]/60 focus:bg-[rgba(12,20,24,0.72)]"
                >
                  {allTimelineEntries.map((value) => (
                    <option key={value} value={value}>
                      {value === "all" ? "すべての時代" : value}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid min-w-0 gap-2">
                <span className="text-sm text-[#d6e2db]">分類</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-2xl border border-white/8 bg-[rgba(5,10,12,0.4)] px-4 py-3.5 text-stone-100 outline-none transition focus:-translate-y-px focus:border-[#f3d7a1]/60 focus:bg-[rgba(12,20,24,0.72)]"
                >
                  {allCategories.map((value) => (
                    <option key={value} value={value}>
                      {value === "all" ? "すべての分類" : value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(310px,0.8fr)]">
            <div className="grid min-w-0 gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))] max-sm:gap-2 max-sm:grid-cols-3">
              {filteredFossils.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-dashed border-white/12 px-8 py-10 text-center leading-8 text-[#d0dbd4]">
                  条件に一致する古生物は見つかりませんでした。検索語や絞り込み条件を変更してください。
                </div>
              ) : (
                filteredFossils.map((fossil) => {
                  const isActive = fossil.id === selectedFossil?.id;
                  const collapsedDescription = getCollapsedDescription(
                    fossil.description,
                    isMobile ? GRID_DESCRIPTION_MAX_LENGTH_MOBILE : GRID_DESCRIPTION_MAX_LENGTH,
                  );

                  return (
                    <article
                      key={fossil.id}
                      onClick={() => {
                        setSelectedId(fossil.id);
                        if (isMobile) {
                          setIsDetailModalOpen(true);
                        }
                      }}
                      className={`group cursor-pointer overflow-hidden rounded-[26px] border border-white/10 p-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-[#f3d7a1]/25 max-sm:rounded-[18px] max-sm:p-2 ${
                        isActive ? "-translate-y-1 border-[#f3d7a1]/25 bg-[rgba(17,28,32,0.95)]" : "bg-[rgba(16,28,31,0.82)]"
                      }`}
                      style={{
                        backgroundImage: `radial-gradient(circle at top right, color-mix(in srgb, ${fossil.accent} 20%, transparent), transparent 34%)`,
                      }}
                    >
                      <div
                        className="grid min-h-[188px] place-items-center rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))] max-sm:min-h-[72px] max-sm:rounded-[14px]"
                        style={{
                          backgroundImage: `radial-gradient(circle at top, color-mix(in srgb, ${fossil.accent} 28%, transparent), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.14))`,
                        }}
                      >
                        <FossilCardArt fossil={fossil} />
                      </div>

                      <p className="mt-[18px] text-xs text-[#a7bbb2] max-sm:mt-2 max-sm:text-[0.52rem]">
                        {fossil.sub_category}
                      </p>
                      <h3 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-2xl max-sm:mt-1 max-sm:text-[0.78rem] max-sm:leading-tight">
                        {fossil.name}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2.5 max-sm:mt-2 max-sm:gap-1">
                        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0] max-sm:px-1.5 max-sm:py-1 max-sm:text-[0.48rem]">
                          {formatTimelineEntryLabel(fossil)}
                        </span>
                        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0] max-sm:px-1.5 max-sm:py-1 max-sm:text-[0.48rem]">
                          {fossil.category}
                        </span>
                        <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0] max-sm:hidden">
                          {fossil.sub_category}
                        </span>
                      </div>

                      <div className="mt-4 max-sm:mt-2">
                        <p className="text-[0.92rem] leading-6 text-[#d0dbd4] max-sm:text-[0.64rem] max-sm:leading-4">
                          {collapsedDescription}
                        </p>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <aside className="sticky top-6 min-w-0 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[30px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-lg:static max-lg:max-h-none max-lg:overflow-visible max-sm:hidden">
              {selectedFossil ? (
                <FossilDetailPanel fossil={selectedFossil} />
              ) : (
                <p className="leading-8 text-[#c6d3cb]">
                  表示対象がありません。フィルターを調整すると詳細表示も更新されます。
                </p>
              )}
            </aside>
          </section>
        </main>
      </div>

      {isMobile && isDetailModalOpen && selectedFossil ? (
        <div className="fixed inset-0 z-50 flex items-end bg-[rgba(6,10,12,0.78)] backdrop-blur-sm sm:hidden">
          <button
            type="button"
            aria-label="詳細を閉じる"
            className="absolute inset-0"
            onClick={() => setIsDetailModalOpen(false)}
          />
          <div className="relative max-h-[88vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[rgba(16,28,31,0.96)] p-4 shadow-[0_-24px_80px_rgba(0,0,0,0.35)]">
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-white/15" />
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Specimen Detail</p>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#dce6e0]"
                onClick={() => setIsDetailModalOpen(false)}
              >
                閉じる
              </button>
            </div>
            <FossilDetailPanel fossil={selectedFossil} compact showEyebrow={false} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
