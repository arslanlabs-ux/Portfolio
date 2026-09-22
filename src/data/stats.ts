/**
 * Capability summary shown directly under the hero.
 *
 * These describe scope and toolchain only. No counts, no durations, no
 * client numbers — nothing here is a claim that cannot be backed by a
 * project on this site.
 */
export type Stat = {
  label: string;
  value: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    label: "PCB Design",
    value: "Schematic → Layout → DRC",
    detail: "Capture, placement, routing, design-rule verification",
  },
  {
    label: "CAD Tools",
    value: "Altium Designer · KiCad, Eagle, EasyEDA",
    detail: "Schematic capture and multi-layer board layout",
  },
  {
    label: "Hardware",
    value: "ESP32 · STM32 · MCU, Arduino, Raspberry Pi, FPGA",
    detail: "Microcontroller integration and supporting circuitry",
  },
  {
    label: "Focus",
    value: "Embedded & Connected Hardware",
    detail: "Power, interfaces, manufacturability, real constraints",
  },
];
