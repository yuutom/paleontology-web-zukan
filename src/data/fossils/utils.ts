import { timelineEntries, type TimelineEntry } from "../timeline";
import type { Fossil, FossilSource } from "./types";

function overlapsTimeline(source: FossilSource, entry: TimelineEntry) {
  return source.from >= entry.to && source.to <= entry.from;
}

export function withTimelineEntries(source: FossilSource): Fossil {
  return {
    ...source,
    timeline_entries: timelineEntries.filter((entry) => overlapsTimeline(source, entry)),
  };
}
