export type Tool = {
  name: string;
  /** Two-character monogram rendered in the monochrome tile. */
  monogram: string;
  category: string;
  usage: string;
};

export const tools: Tool[] = [
  {
    name: "Altium Designer",
    monogram: "AD",
    category: "EDA / PCB",
    usage: "Schematic capture and multi-layer PCB layout",
  },
  {
    name: "KiCad",
    monogram: "KC",
    category: "EDA / PCB",
    usage: "Schematic capture, layout and fabrication outputs",
  },
  {
    name: "ESP32",
    monogram: "32",
    category: "MCU Platform",
    usage: "Wi-Fi / Bluetooth embedded targets",
  },
  {
    name: "STM32",
    monogram: "ST",
    category: "MCU Platform",
    usage: "ARM Cortex-M embedded targets",
  },
  {
    name: "Python",
    monogram: "PY",
    category: "Scripting",
    usage: "Test tooling, data logging and automation",
  },
  {
    name: "C / C++",
    monogram: "CC",
    category: "Programming",
    usage: "Embedded software development and system programming",
  },
  {
    name: "Arduino/ Raspberry Pi",
    monogram: "AR",
    category: "MCU Platform",
    usage: "Rapid prototyping and development of embedded systems",
  },
  {
    name: "GitHub",
    monogram: "GH",
    category: "Version Control",
    usage: "Design revision control and collaboration",
  }
];
