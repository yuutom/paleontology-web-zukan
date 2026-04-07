import { anomalocaris } from "./anomalocaris";
import { dunkleosteus } from "./dunkleosteus";
import { plesiosaur } from "./plesiosaur";
import { quetzalcoatlus } from "./quetzalcoatlus";
import { smilodon } from "./smilodon";
import { stegosaurus } from "./stegosaurus";
import { trilobite } from "./trilobite";
import { tyrannosaurus } from "./tyrannosaurus";
import { withTimelineEntries } from "./utils";

export type { Fossil, FossilSource } from "./types";

export const fossils = [
  anomalocaris,
  trilobite,
  dunkleosteus,
  plesiosaur,
  stegosaurus,
  tyrannosaurus,
  quetzalcoatlus,
  smilodon,
].map(withTimelineEntries);
