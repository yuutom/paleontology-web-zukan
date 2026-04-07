import { useMemo, useState } from "react";
import { fossils, type Fossil } from "./data/fossils";
import { timelineEntries } from "./data/timeline";

const GRID_DESCRIPTION_MAX_LENGTH = 70;

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

function App() {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(fossils[0]?.id ?? "");

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

              <h1 className="mt-3 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[clamp(3.6rem,6.8vw,7rem)] leading-[1.02] font-semibold max-sm:text-[clamp(2.8rem,12vw,5rem)]">
                古生物Web図鑑
              </h1>

              <p className="mt-5 max-w-[60ch] leading-8 text-[#d1ddd5]">
                海から陸、三葉虫から巨大恐竜まで。古生物の姿、時代、分類、生息年代を直感的にたどれるインタラクティブなWeb図鑑です。
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-w-[140px] rounded-2xl border border-white/6 bg-white/[0.03] px-[18px] py-4"
                  >
                    <span className="text-xs text-[#a7bbb2]">{metric.label}</span>
                    <strong className="block font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.7rem] text-[#f3d7a1]">
                      {metric.value}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <aside className="self-end rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))] p-[22px]">
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

        <main className="grid gap-6">
          <section className="rounded-[28px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-sm:rounded-3xl">
            <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Deep Time</p>
                <h2 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-4xl font-semibold leading-none">
                  地質時代のタイムライン
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))] p-5">
              <div className="mx-auto max-w-[980px]">
                <div className="mb-3 flex items-center justify-between gap-4 text-xs text-[#8fa39a] max-sm:flex-col max-sm:items-start">
                  <span>横スクロールで移動</span>
                </div>
              </div>

              <div className="mx-auto max-w-[980px] overflow-x-auto pb-3 [scrollbar-color:rgba(243,215,161,0.4)_transparent] [scrollbar-width:thin]">
                <div className="relative flex w-max min-w-[3500px] items-start gap-0 px-2 py-4">
                  <div className="pointer-events-none absolute left-0 right-0 top-[43px] h-px bg-[linear-gradient(90deg,rgba(243,215,161,0.2),rgba(243,215,161,0.75),rgba(140,198,186,0.75),rgba(255,255,255,0.15))]" />

                  {timelineEntries.map((item, index) => (
                    <article
                      key={item.name}
                      className="relative w-[250px] shrink-0 pr-6 last:pr-2"
                    >
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f3d7a1]/30 bg-[#172126] text-sm font-semibold text-[#f3d7a1] shadow-[0_0_0_8px_rgba(22,33,38,0.95)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                      </div>

                      <div className="mt-5 rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(5,10,12,0.34))] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-[0.72rem] font-medium ${getEraTone(item.era)}`}
                        >
                          {item.era}
                        </span>
                        <strong className="mt-4 block font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-[1.2rem] leading-tight text-[#f4f7f4]">
                          {item.name}
                        </strong>
                        <p className="mt-3 text-[0.95rem] leading-7 text-[#e5ede8]">
                          {item.summary}
                        </p>
                        <p className="mt-4 text-xs text-[#8fa39a]">
                          {formatTimelineRange(item.from, item.to)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-sm:rounded-3xl">
            <div className="flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Explorer</p>
                <h2 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-4xl font-semibold leading-none">
                  古生物を探す
                </h2>
              </div>
              <p className="text-xs text-[#a7bbb2]">{filteredFossils.length} 件を表示中</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
              <label className="grid gap-2">
                <span className="text-sm text-[#d6e2db]">キーワード</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="名称・分類・概要で検索"
                  className="w-full rounded-2xl border border-white/8 bg-[rgba(5,10,12,0.4)] px-4 py-3.5 text-stone-100 outline-none transition focus:-translate-y-px focus:border-[#f3d7a1]/60 focus:bg-[rgba(12,20,24,0.72)]"
                />
              </label>

              <label className="grid gap-2">
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

              <label className="grid gap-2">
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

          <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(310px,0.8fr)]">
            <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
              {filteredFossils.length === 0 ? (
                <div className="col-span-full rounded-3xl border border-dashed border-white/12 px-8 py-10 text-center leading-8 text-[#d0dbd4]">
                  条件に一致する古生物は見つかりませんでした。検索語や絞り込み条件を変更してください。
                </div>
              ) : (
                filteredFossils.map((fossil) => {
                  const isActive = fossil.id === selectedFossil?.id;
                  const collapsedDescription = getCollapsedDescription(fossil.description);

                  return (
                    <article
                      key={fossil.id}
                      onClick={() => setSelectedId(fossil.id)}
                      className={`group cursor-pointer overflow-hidden rounded-[26px] border border-white/10 p-[18px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-[#f3d7a1]/25 ${
                        isActive ? "-translate-y-1 border-[#f3d7a1]/25 bg-[rgba(17,28,32,0.95)]" : "bg-[rgba(16,28,31,0.82)]"
                      }`}
                      style={{
                        backgroundImage: `radial-gradient(circle at top right, color-mix(in srgb, ${fossil.accent} 20%, transparent), transparent 34%)`,
                      }}
                    >
                      <div
                        className="grid min-h-[188px] place-items-center rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.14))]"
                        style={{
                          backgroundImage: `radial-gradient(circle at top, color-mix(in srgb, ${fossil.accent} 28%, transparent), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.14))`,
                        }}
                      >
                        <FossilCardArt fossil={fossil} />
                      </div>

                      <p className="mt-[18px] text-xs text-[#a7bbb2]">{fossil.sub_category}</p>
                      <h3 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-2xl">
                        {fossil.name}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2.5">
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

                      <div className="mt-4">
                        <p className="text-[0.92rem] leading-6 text-[#d0dbd4]">
                          {collapsedDescription}
                        </p>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            <aside className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[30px] border border-white/10 bg-[rgba(16,28,31,0.82)] p-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl max-lg:static max-lg:max-h-none max-lg:overflow-visible">
              {selectedFossil ? (
                <>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#a7bbb2]">Specimen Detail</p>
                  <div className="mt-3 flex items-baseline justify-between gap-4 max-sm:flex-col max-sm:items-start">
                    <h3 className="font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',serif] text-4xl">
                      {selectedFossil.name}
                    </h3>
                    <span className="text-xs text-[#a7bbb2]">{selectedFossil.sub_category}</span>
                  </div>

                  <div className="mt-[18px] rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(203,180,137,0.22),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.12))] p-[18px]">
                    <FossilDetailImage fossil={selectedFossil} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
                      {formatTimelineEntryLabel(selectedFossil)}
                    </span>
                    <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
                      {selectedFossil.category}
                    </span>
                    <span className="rounded-full border border-white/6 bg-white/5 px-3 py-2 text-xs text-[#dce6e0]">
                      {selectedFossil.sub_category}
                    </span>
                  </div>

                  <p className="mt-5 text-[0.95rem] leading-7 text-[#d1ddd5]">
                    {selectedFossil.description}
                  </p>

                  <div className="mt-[18px] flex flex-wrap gap-2.5">
                    {[
                      ["名称", selectedFossil.name],
                      [
                        "地質時代",
                        formatTimelineEntryLabel(selectedFossil),
                      ],
                      ["期間", formatCompactRange(selectedFossil.from, selectedFossil.to)],
                      ["体長", formatLength(selectedFossil.length)],
                      ["分類", selectedFossil.category],
                      ["小分類", selectedFossil.sub_category],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="min-w-[140px] flex-1 rounded-2xl border border-white/6 bg-white/[0.03] p-[14px]"
                      >
                        <span className="block text-xs text-[#a7bbb2]">{label}</span>
                        <strong className="mt-1.5 block text-[0.98rem] text-[#f0f5f1]">{value}</strong>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="leading-8 text-[#c6d3cb]">
                  表示対象がありません。フィルターを調整すると詳細表示も更新されます。
                </p>
              )}
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
