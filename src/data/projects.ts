/**
 * Project portfolio.
 *
 * Content rules for this file:
 * - Everything under `specs` is confirmed information supplied by the designer.
 * - Everything that is not yet confirmed is listed in `pendingSpecs` and shown
 *   as pending in the UI. Never invent layer counts, part numbers, ratings or
 *   measured results.
 * - Case-study sections carry `body`, `list` or `diagram` only where the
 *   information exists. Sections without content carry `pending`, and the UI
 *   renders them as an explicitly labelled documentation slot.
 */

export type Spec = { label: string; value: string };

export type CaseArtifact = {
  label: string;
  note: string;
  /**
   * Real artwork, when it exists.
   *
   * `position` is a CSS `object-position`. These captures are tool
   * screenshots, so the useful content is rarely centred and the frames crop
   * with `object-cover`; this steers which part survives the crop.
   */
  image?: { src: string; alt: string; position?: string };
};

export type CaseSection = {
  id: string;
  index: string;
  title: string;
  body?: string[];
  list?: string[];
  diagram?: string[];
  artifacts?: CaseArtifact[];
  /** What this section will contain once documentation is cleared for release. */
  pending?: string;
};

/** Selects which line-drawing silhouette the artwork frame renders. */
export type BoardKind = "dev-board" | "buck" | "tracker";

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  scope: string[];
  tags: string[];
  specs: Spec[];
  pendingSpecs: string[];
  board: BoardKind;
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "esp32-development-board",
    index: "01",
    title: "ESP32 Custom Development Board",
    summary:
      "Custom ESP32-based development platform designed around power management, GPIO expansion, communication interfaces and manufacturing-ready PCB layout.",
    scope: [
      "MCU integration",
      "Power management",
      "USB / UART interfaces",
      "GPIO expansion",
      "PCB layout and DRC",
      "Manufacturing outputs",
    ],
    tags: ["ESP32", "Embedded Systems", "Power Management", "USB / UART", "PCB Layout", "DRC"],
    specs: [
      { label: "MCU / Platform", value: "ESP32" },
      { label: "PCB layer count", value: "4 layers" },
      { label: "Project type", value: "Embedded development platform" },
    ],
    pendingSpecs: ["Board dimensions", "CAD tool used", "Project status"],
    board: "dev-board",
    sections: [
      {
        id: "overview",
        index: "01",
        title: "Overview",
        body: [
          "A custom ESP32 development board built as a reusable hardware platform rather than a single-purpose circuit. The design work covers the full path from schematic capture through to manufacturing output: power architecture, MCU integration, interface routing and a layout that a fabricator can build without engineering requests or queries.",
          "The board is organised so that the power section, the MCU and the interface circuitry stay electrically separated, which keeps the layout reviewable and makes later revisions local rather than global.",
        ],
        artifacts: [
          {
            label: "Board render — component side",
            note: "Top-side 3D view",
            image: {
              src: "/top 3d.png",
              alt: "Three-dimensional render of the assembled ESP32 development board seen from the component side, showing the two USB connectors, the ESP32 module with its antenna, the regulator and the header rows.",
              position: "left center",
            },
          },
        ],
      },
      {
        id: "requirements",
        index: "02",
        title: "Requirements",
        list: [
          "Power the ESP32 module from a USB supply with regulation and bulk decoupling.",
          "Expose USB and UART for flashing and serial monitoring.",
          "Break out GPIO for prototype wiring and expansion.",
          "Keep the switching and radio sections clear of sensitive analog and clock routing.",
          "Deliver a layout that passes DRC and ships as production-ready fabrication data.",
        ],
      },
      {
        id: "architecture",
        index: "03",
        title: "Architecture",
        body: [
          "The board is a power chain feeding an MCU, with interface blocks arranged around it. Each block is defined before schematic capture so that net naming, power domains and connector pinouts stay consistent.",
        ],
        diagram: [
          "USB Power Input",
          "Power Management",
          "ESP32 Module",
          "UART Bridge",
          "GPIO Header",
        ],
      },
      {
        id: "schematic",
        index: "04",
        title: "Schematic",
        pending:
          "Schematic sheets and net-level detail are published here once the design documentation is released.",
        artifacts: [
          { label: "Schematic — power section", note: "Sheet capture pending" },
          { label: "Schematic — MCU and interfaces", note: "Sheet capture pending" },
        ],
      },
      {
        id: "pcb-layout",
        index: "05",
        title: "PCB Layout",
        body: [
          "A four-layer stack-up carries signal on the outer layers with a dedicated internal plane for the ground return, which keeps the return path under the MCU and the USB pair continuous instead of stitching it back through the signal layers.",
        ],
        artifacts: [
          {
            label: "Board render — component side",
            note: "3D view, populated",
            image: {
              src: "/top 3d 2.png",
              alt: "Second three-dimensional render of the ESP32 development board, showing the same component side at a different zoom with the header pads and module footprint visible.",
              position: "left center",
            },
          },
          {
            label: "Layout — top view, 2D",
            note: "All layers, board outline",
            image: {
              src: "/top 2d.png",
              alt: "Two-dimensional PCB editor view of the whole board with every layer shown, including copper pours, silkscreen designators, header pads and the antenna keep-out.",
              position: "left center",
            },
          },
          {
            label: "Layout — signal routing",
            note: "Top-layer traces and vias",
            image: {
              src: "/esp.png",
              alt: "Close two-dimensional view of the top-layer signal routing, showing GPIO fan-out traces, vias, the module pad array and the ground pad group.",
              position: "left center",
            },
          },
          {
            label: "Layout — power plane and USB",
            note: "Copper pours and pair routing",
            image: {
              src: "/power plane and USB.png",
              alt: "Two-dimensional view of the power section showing the copper pours, the two USB connector footprints and the differential pair routing leaving them.",
              position: "left center",
            },
          },
        ],
      },
        {
        id: "design-decisions",
        index: "06",
        title: "Design Decisions",
        body: [
          "The ground plane is kept continuous under the MCU and the USB pair, with the switching regulator placed on the opposite side of the board from the analog section.",
          "Decoupling capacitors sit within a few millimetres of each power pin rather than grouped at the edge of the board.",
        ],
        list: [
          "Continuous ground plane under the MCU and USB pair",
          "Regulator physically separated from the analog section",
          "Decoupling placed per power pin",
        ],
        artifacts: [
          {
            label: "Layer stack-up",
            note: "4 layer, FR-4, 1 oz copper",
            image: {
              src: "/stackup.png",
              alt: "Layer stack-up table listing the four copper layers as signal, signal, plane and signal, separated by PP-006 prepreg and FR-4 core dielectrics in 1 oz copper, with solder mask and overlay on both faces.",
              position: "left top",
            },
          },
        ],
      },
      {
        id: "validation",
        index: "07",
        title: "DRC / Validation",
        pending:
          "The design-rule report, connectivity check and clearance summary are published here after the final review pass.",
        artifacts: [
          {
            label: "Design rules and constraints",
            note: "Clearance and impedance",
            image: {
              src: "/rules.png",
              alt: "PCB rules and constraints editor showing the clearance rule set at 6 mil, the differential pair clearance at 8 mil, and a per-layer impedance profile giving minimum, preferred and maximum trace width and gap for layers one to four.",
              position: "left top",
            },
          },
        ],
      },
      {
        id: "manufacturing",
        index: "08",
        title: "Manufacturing Output",
        pending:
          "Gerbers, drill files, BOM and pick-and-place data are published here as a downloadable fabrication package.",
        artifacts: [
          { label: "Gerber layers", note: "Package pending" },
          { label: "BOM and pick & place", note: "Package pending" },
        ],
      },
      {
        id: "results",
        index: "09",
        title: "Results",
        pending:
          "Final board status, bring-up notes and any revision history are recorded here once measured results are available.",
      },
    ],
  },

  {
    slug: "buck-converter-supply",
    index: "02",
    title: "Switching Power Supply — Buck Converter",
    summary:
      "A DC/DC buck converter board built around inductor selection, switching-node layout, power routing and thermal behaviour.",
    scope: [
      "DC/DC conversion",
      "Inductor selection",
      "Switching node layout",
      "Power routing",
      "Thermal considerations",
      "Grounding",
      "EMI-conscious layout",
    ],
    tags: ["DC/DC", "Buck Converter", "Power Routing", "Thermal", "EMI", "Grounding"],
    specs: [{ label: "Project type", value: "Switching power supply" }],
    pendingSpecs: [
      "Input / output voltage",
      "Output current",
      "Switching frequency",
      "Controller IC",
      "PCB layer count",
      "CAD tool used",
    ],
    board: "buck",
    sections: [
      {
        id: "overview",
        index: "01",
        title: "Overview",
        body: [
          "A step-down switching supply where the layout carries as much of the design risk as the schematic. At switching frequencies, the physical arrangement of the input loop, the switching node and the output loop determines whether the converter meets its noise and thermal targets.",
          "The work is organised around keeping the high di/dt loops small, giving the converter a continuous return path, and removing heat from the components that generate it.",
        ],
      },
      {
        id: "requirements",
        index: "02",
        title: "Requirements",
        list: [
          "Step a DC input down to a regulated lower rail using a switching topology.",
          "Select the inductor for ripple current, saturation margin and physical size.",
          "Keep the switching node and high-current loops physically compact.",
          "Provide a low-impedance return path for both the power stage and the control circuitry.",
          "Manage heat in the switching device, inductor and output capacitor bank.",
          "Limit emitted noise through layout rather than added filtering where possible.",
        ],
      },
      {
        id: "architecture",
        index: "03",
        title: "Architecture",
        body: [
          "The converter is a closed loop: a controller drives a switching stage into an inductor and output capacitor bank, and a feedback divider closes the loop back to the controller. The layout priority follows the current path, not the signal path.",
        ],
        diagram: [
          "DC Input + Caps",
          "Controller IC",
          "Switching Stage",
          "Inductor + Output Caps",
          "Feedback Divider",
        ],
      },
      {
        id: "schematic",
        index: "04",
        title: "Schematic",
        pending:
          "Converter schematic and the component selection rationale are published here once released.",
        artifacts: [{ label: "Schematic — power stage", note: "Sheet capture pending" }],
      },
      {
        id: "pcb-layout",
        index: "05",
        title: "PCB Layout",
        pending:
          "Layout views showing the input loop, switching node and copper pours are published here once released.",
        artifacts: [
          { label: "PCB 3D render", note: "Render pending" },
          { label: "Layout — power stage copper", note: "Layout capture pending" },
        ],
      },
      {
        id: "design-decisions",
        index: "06",
        title: "Design Decisions",
        pending:
          "Inductor selection trade-offs, switching-node area, thermal relief and ground-plane strategy are documented here.",
      },
      {
        id: "validation",
        index: "07",
        title: "DRC / Validation",
        pending:
          "Design-rule, creepage/clearance and copper-thickness checks are published here after the review pass.",
        artifacts: [{ label: "DRC report", note: "Report pending" }],
      },
      {
        id: "manufacturing",
        index: "08",
        title: "Manufacturing Output",
        pending:
          "Gerbers, drill files, stackup notes and BOM are published here as a fabrication package.",
      },
      {
        id: "results",
        index: "09",
        title: "Results",
        pending:
          "Measured efficiency, thermal behaviour and ripple results are recorded here once bench data is available.",
      },
    ],
  },

  {
    slug: "handheld-gps-tracker",
    index: "03",
    title: "Handheld GPS Tracker / Logger",
    summary:
      "A compact handheld GNSS tracker and data logger built around battery management, power regulation, a display interface and space-constrained PCB layout.",
    scope: [
      "GNSS receiver integration",
      "Microcontroller integration",
      "Display interface",
      "Battery management",
      "Power regulation",
      "Data logging",
      "Compact PCB layout",
    ],
    tags: ["GNSS", "MCU", "Battery Management", "Power Regulation", "Data Logging", "Compact Layout"],
    specs: [{ label: "Project type", value: "Portable GNSS tracker / logger" }],
    pendingSpecs: [
      "MCU part",
      "GNSS module",
      "Battery chemistry / capacity",
      "Enclosure dimensions",
      "PCB layer count",
      "CAD tool used",
    ],
    board: "tracker",
    sections: [
      {
        id: "overview",
        index: "01",
        title: "Overview",
        body: [
          "A handheld unit that receives GNSS position data, logs it, and presents status on a small display. Because the device is carried, the design is constrained by board area, battery life and antenna placement rather than by feature count.",
          "The engineering work concentrates on three things: keeping the regulated rails clean enough for a GNSS receiver, keeping the radio-frequency section clear of digital noise, and fitting the whole system into a board small enough for a handheld enclosure.",
        ],
      },
      {
        id: "requirements",
        index: "02",
        title: "Requirements",
        list: [
          "Receive and decode GNSS position data.",
          "Log position data to onboard storage with a stable time reference.",
          "Run from a single-cell battery with charging and protection.",
          "Provide regulated rails for the MCU, the GNSS receiver and the display.",
          "Drive a small display for live status.",
          "Keep the GNSS antenna region free of digital and switching noise.",
          "Fit the complete system onto a compact board.",
        ],
      },
      {
        id: "architecture",
        index: "03",
        title: "Architecture",
        body: [
          "Power flows from the battery through charging and protection into the regulators, which supply the MCU and the peripherals. The GNSS receiver, the display and the storage sit on the MCU's interface buses.",
        ],
        diagram: [
          "Battery",
          "Charger + Protection",
          "Regulators",
          "MCU",
          "GNSS Receiver",
          "Display + Storage",
        ],
      },
      {
        id: "schematic",
        index: "04",
        title: "Schematic",
        pending:
          "Schematic sheets covering power, MCU and GNSS sections are published here once released.",
        artifacts: [
          { label: "Schematic — power and charging", note: "Sheet capture pending" },
          { label: "Schematic — GNSS and display", note: "Sheet capture pending" },
        ],
      },
      {
        id: "pcb-layout",
        index: "05",
        title: "PCB Layout",
        pending:
          "Board renders and layout views of the compact placement are published here once released.",
        artifacts: [
          { label: "PCB 3D render", note: "Render pending" },
          { label: "Layout — top layer", note: "Layout capture pending" },
        ],
      },
      {
        id: "design-decisions",
        index: "06",
        title: "Design Decisions",
        pending:
          "Antenna keep-out, partitioning of the RF and digital sections, rail sequencing and battery-path choices are documented here.",
      },
      {
        id: "validation",
        index: "07",
        title: "DRC / Validation",
        pending:
          "Design-rule and clearance checks, plus the RF keep-out review, are published here after the review pass.",
        artifacts: [{ label: "DRC report", note: "Report pending" }],
      },
      {
        id: "manufacturing",
        index: "08",
        title: "Manufacturing Output",
        pending:
          "Gerbers, drill files, stackup notes and BOM are published here as a fabrication package.",
      },
      {
        id: "results",
        index: "09",
        title: "Results",
        pending:
          "Runtime, position accuracy and power-consumption results are recorded here once bench data is available.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
