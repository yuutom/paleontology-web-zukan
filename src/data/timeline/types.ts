export enum GeologicalEra {
  Proterozoic = "原生代",
  Paleozoic = "古生代",
  Mesozoic = "中生代",
  Cenozoic = "新生代",
}

export type TimelineEntry = {
  name: string;
  from: number;
  to: number;
  era: GeologicalEra;
  description: string;
};
