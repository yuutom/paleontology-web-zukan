import { allosaurus } from "./allosaurus";
import { anomalocaris } from "./anomalocaris";
import { ammonite } from "./ammonite";
import { ankylosaurus } from "./ankylosaurus";
import { archaeopteryx } from "./archaeopteryx";
import { arthropleura } from "./arthropleura";
import { basilosaurus } from "./basilosaurus";
import { brachiosaurus } from "./brachiosaurus";
import { dimetrodon } from "./dimetrodon";
import { dunkleosteus } from "./dunkleosteus";
import { glyptodon } from "./glyptodon";
import { hallucigenia } from "./hallucigenia";
import { ichthyosaurus } from "./ichthyosaurus";
import { megalodon } from "./megalodon";
import { mosasaurus } from "./mosasaurus";
import { opabinia } from "./opabinia";
import { parasaurolophus } from "./parasaurolophus";
import { plesiosaur } from "./plesiosaur";
import { quetzalcoatlus } from "./quetzalcoatlus";
import { smilodon } from "./smilodon";
import { spinosaurus } from "./spinosaurus";
import { stegosaurus } from "./stegosaurus";
import { tiktaalik } from "./tiktaalik";
import { trilobite } from "./trilobite";
import { triceratops } from "./triceratops";
import { tyrannosaurus } from "./tyrannosaurus";
import { velociraptor } from "./velociraptor";
import { woollyMammoth } from "./woolly-mammoth";
import { withTimelineEntries } from "./utils";

export type { Fossil, FossilSource } from "./types";

export const fossils = [
  anomalocaris,
  opabinia,
  hallucigenia,
  trilobite,
  arthropleura,
  dunkleosteus,
  tiktaalik,
  dimetrodon,
  ammonite,
  ichthyosaurus,
  plesiosaur,
  allosaurus,
  archaeopteryx,
  brachiosaurus,
  stegosaurus,
  ankylosaurus,
  parasaurolophus,
  spinosaurus,
  mosasaurus,
  triceratops,
  tyrannosaurus,
  velociraptor,
  quetzalcoatlus,
  basilosaurus,
  megalodon,
  smilodon,
  glyptodon,
  woollyMammoth,
].map(withTimelineEntries);
