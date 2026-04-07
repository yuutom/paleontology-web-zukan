import type { TimelineEntry } from "../timeline";

export type FossilSource = {
  id: string;
  name: string;
  from: number;
  to: number;
  category: string;
  sub_category: string;
  accent: string;
  art: string;
  image: string;
  description: string;
};

export type Fossil = FossilSource & {
  timeline_entries: TimelineEntry[];
};
