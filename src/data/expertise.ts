export type ExpertiseGroup = {
  title: string;
  caption: string;
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    title: "PCB Design",
    caption: "Board-level electrical and physical design",
    items: [
      "Schematic Capture",
      "Component Selection",
      "PCB Layout",
      "Multi-layer PCB Design",
      "Design Rules",
      "DRC",
      "Grounding",
      "Power Distribution",
      "Signal Routing",
      "Manufacturing Preparation",
      "Gerber Generation",
    ],
  },
  {
    title: "Embedded Systems",
    caption: "Microcontroller integration and interfaces",
    items: [
      "ESP32",
      "STM32",
      "Microcontrollers",
      "Arduino",
      "Raspberry Pi",
      "FPGA",
      "UART",
      "I2C",
      "SPI",
      "GPIO",
      "Sensors",
      "Displays",
      "Communication Interfaces",
    ],
  },
  {
    title: "Software / Tools",
    caption: "Supporting engineering and development toolchain",
    items: ["Altium Designer", "KiCad", "Git / GitHub", "Python", "JavaScript", "C / C++", "Bash / Shell Scripting", "Linux", "Windows", "MacOS", "VS Code", "Eagle","EasyEDA", "LabVIEW"],
  },
];
