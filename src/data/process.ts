export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  outputs: string[];
};

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Requirements",
    description: "Understand the product and electrical requirements.",
    outputs: ["Interface list", "Voltage rails", "Constraints"],
  },
  {
    index: "02",
    title: "Architecture",
    description: "Define components, interfaces and power architecture.",
    outputs: ["Block diagram", "Part shortlist", "Power budget"],
  },
  {
    index: "03",
    title: "Schematic",
    description: "Create and validate the electrical design.",
    outputs: ["Schematic sheets", "Netlist", "ERC"],
  },
  {
    index: "04",
    title: "PCB Layout",
    description: "Placement, routing, grounding and design rules.",
    outputs: ["Placement", "Routing", "Copper pours"],
  },
  {
    index: "05",
    title: "Validation",
    description: "ERC / DRC / connectivity / manufacturing checks.",
    outputs: ["DRC report", "Layer review", "Stackup check"],
  },
  {
    index: "06",
    title: "Manufacturing",
    description: "Gerbers, drill files, BOM and production-ready outputs.",
    outputs: ["Gerbers", "Drill files", "BOM", "Pick & place"],
  },
];
