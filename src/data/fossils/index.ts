import { allosaurus } from "./allosaurus";
import { acanthostega } from "./acanthostega";
import { anomalocaris } from "./anomalocaris";
import { ammonite } from "./ammonite";
import { ankylosaurus } from "./ankylosaurus";
import { ambulocetus } from "./ambulocetus";
import { archaeopteryx } from "./archaeopteryx";
import { arthropleura } from "./arthropleura";
import { basilosaurus } from "./basilosaurus";
import { bangiomorpha } from "./bangiomorpha";
import { birkenia } from "./birkenia";
import { bothriolepis } from "./bothriolepis";
import { brachiosaurus } from "./brachiosaurus";
import { cameroceras } from "./cameroceras";
import { carnotaurus } from "./carnotaurus";
import { deinonychus } from "./deinonychus";
import { charnia } from "./charnia";
import { dickinsonia } from "./dickinsonia";
import { endoceras } from "./endoceras";
import { dimetrodon } from "./dimetrodon";
import { diplodocus } from "./diplodocus";
import { dunkleosteus } from "./dunkleosteus";
import { dilophosaurus } from "./dilophosaurus";
import { edaphosaurus } from "./edaphosaurus";
import { elasmotherium } from "./elasmotherium";
import { acutiramus } from "./acutiramus";
import { glyptodon } from "./glyptodon";
import { gorgonops } from "./gorgonops";
import { grypania } from "./grypania";
import { hallucigenia } from "./hallucigenia";
import { horodyskia } from "./horodyskia";
import { hylonomus } from "./hylonomus";
import { ichthyosaurus } from "./ichthyosaurus";
import { kimberella } from "./kimberella";
import { liopleurodon } from "./liopleurodon";
import { lystrosaurus } from "./lystrosaurus";
import { marella } from "./marella";
import { megalodon } from "./megalodon";
import { meganeura } from "./meganeura";
import { mosasaurus } from "./mosasaurus";
import { opabinia } from "./opabinia";
import { orthoceras } from "./orthoceras";
import { otavia } from "./otavia";
import { pachycephalosaurus } from "./pachycephalosaurus";
import { parasaurolophus } from "./parasaurolophus";
import { plesiosaur } from "./plesiosaur";
import { platybelodon } from "./platybelodon";
import { postosuchus } from "./postosuchus";
import { pteranodon } from "./pteranodon";
import { pterygotus } from "./pterygotus";
import { pulmonoscorpius } from "./pulmonoscorpius";
import { quetzalcoatlus } from "./quetzalcoatlus";
import { sarcosuchus } from "./sarcosuchus";
import { sacabambaspis } from "./sacabambaspis";
import { scutosaurus } from "./scutosaurus";
import { smilodon } from "./smilodon";
import { spinosaurus } from "./spinosaurus";
import { spriggina } from "./spriggina";
import { stegosaurus } from "./stegosaurus";
import { cephalaspis } from "./cephalaspis";
import { jaekelopterus } from "./jaekelopterus";
import { therizinosaurus } from "./therizinosaurus";
import { tiktaalik } from "./tiktaalik";
import { trilobite } from "./trilobite";
import { tribrachidium } from "./tribrachidium";
import { triceratops } from "./triceratops";
import { tyrannosaurus } from "./tyrannosaurus";
import { velociraptor } from "./velociraptor";
import { wiwaxia } from "./wiwaxia";
import { woollyMammoth } from "./woolly-mammoth";
import { withTimelineEntries } from "./utils";

export type { Fossil, FossilSource } from "./types";

export const fossils = [
  grypania,
  bangiomorpha,
  horodyskia,
  otavia,
  charnia,
  dickinsonia,
  kimberella,
  spriggina,
  tribrachidium,
  anomalocaris,
  opabinia,
  hallucigenia,
  marella,
  wiwaxia,
  trilobite,
  acutiramus,
  arthropleura,
  orthoceras,
  cameroceras,
  endoceras,
  sacabambaspis,
  pterygotus,
  birkenia,
  dunkleosteus,
  cephalaspis,
  bothriolepis,
  jaekelopterus,
  tiktaalik,
  acanthostega,
  hylonomus,
  dimetrodon,
  edaphosaurus,
  lystrosaurus,
  ammonite,
  postosuchus,
  liopleurodon,
  ichthyosaurus,
  plesiosaur,
  dilophosaurus,
  allosaurus,
  archaeopteryx,
  brachiosaurus,
  diplodocus,
  stegosaurus,
  deinonychus,
  ankylosaurus,
  pachycephalosaurus,
  parasaurolophus,
  spinosaurus,
  sarcosuchus,
  mosasaurus,
  triceratops,
  therizinosaurus,
  tyrannosaurus,
  carnotaurus,
  velociraptor,
  pteranodon,
  quetzalcoatlus,
  ambulocetus,
  basilosaurus,
  megalodon,
  elasmotherium,
  platybelodon,
  meganeura,
  pulmonoscorpius,
  gorgonops,
  scutosaurus,
  smilodon,
  glyptodon,
  woollyMammoth,
].map(withTimelineEntries);
