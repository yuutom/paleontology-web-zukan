import { cambrian } from "./cambrian";
import { carboniferous } from "./carboniferous";
import { cretaceous } from "./cretaceous";
import { devonian } from "./devonian";
import { ediacaran } from "./ediacaran";
import { jurassic } from "./jurassic";
import { neogene } from "./neogene";
import { ordovician } from "./ordovician";
import { paleogene } from "./paleogene";
import { permian } from "./permian";
import { preEdiacaran } from "./pre-ediacaran";
import { quaternary } from "./quaternary";
import { silurian } from "./silurian";
import { triassic } from "./triassic";

export { GeologicalEra, type TimelineEntry } from "./types";

export const timelineEntries = [
  preEdiacaran,
  ediacaran,
  cambrian,
  ordovician,
  silurian,
  devonian,
  carboniferous,
  permian,
  triassic,
  jurassic,
  cretaceous,
  paleogene,
  neogene,
  quaternary,
];
