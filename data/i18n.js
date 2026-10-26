/* data/i18n.js — All UI text in Arabic & English */
window.REF = window.REF || {};

REF.i18n = {
  // App title
  appTitle: { ar: "\u0645\u0631\u062C\u0639 \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621 \u0648\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621", en: "Physics & Electrical Reference" },

  // Sidebar navigation
  navUnits: { ar: "\u0645\u062D\u0648\u0651\u0644 \u0627\u0644\u0648\u062D\u062F\u0627\u062A", en: "Unit Converter" },
  navPrefixes: { ar: "\u0628\u0627\u062F\u0626\u0627\u062A SI", en: "SI Prefixes" },
  navConstants: { ar: "\u0627\u0644\u062B\u0648\u0627\u0628\u062A \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629", en: "Physical Constants" },
  navElectricity: { ar: "\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621: \u0642\u0648\u0627\u0646\u064A\u0646 \u0648\u062D\u0627\u0633\u0628\u0627\u062A", en: "Electricity: Laws & Calculators" },
  navResistors: { ar: "\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0627\u062A", en: "Resistors" },
  navMultimeter: { ar: "\u0627\u0644\u0623\u0641\u0648\u0645\u064A\u062A\u0631", en: "Multimeter" },
  navDiodeTransistor: { ar: "\u0627\u0644\u062F\u0627\u064A\u0648\u062F \u0648\u0627\u0644\u062A\u0631\u0627\u0646\u0632\u0633\u062A\u0648\u0631", en: "Diode & Transistor" },
  navGates: { ar: "\u0627\u0644\u0628\u0648\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0646\u0637\u0642\u064A\u0629", en: "Logic Gates" },
  navSymbols: { ar: "\u0631\u0645\u0648\u0632 \u0627\u0644\u062F\u0648\u0627\u0626\u0631", en: "Circuit Symbols" },
  navPhysics: { ar: "\u0642\u0648\u0627\u0646\u064A\u0646 \u0641\u064A\u0632\u064A\u0627\u0626\u064A\u0629", en: "Physics Laws" },
  navSIUnits: { ar: "\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064F\u0639\u062F\u064A", en: "SI Units & Dimensional Analysis" },

  // Common UI
  search: { ar: "\u0628\u062D\u062B...", en: "Search..." },
  copy: { ar: "\u0646\u0633\u062E", en: "Copy" },
  copied: { ar: "\u062A\u0645 \u0627\u0644\u0646\u0633\u062E", en: "Copied" },
  exact: { ar: "\u062F\u0642\u064A\u0642", en: "exact" },
  approx: { ar: "\u062A\u0642\u0631\u064A\u0628\u064A", en: "approx" },
  measured: { ar: "\u0645\u064F\u0642\u0627\u0633", en: "measured" },
  from: { ar: "\u0645\u0646", en: "From" },
  to: { ar: "\u0625\u0644\u0649", en: "To" },
  value: { ar: "\u0627\u0644\u0642\u064A\u0645\u0629", en: "Value" },
  result: { ar: "\u0627\u0644\u0646\u062A\u064A\u062C\u0629", en: "Result" },
  category: { ar: "\u0627\u0644\u0641\u0626\u0629", en: "Category" },
  precision: { ar: "\u0627\u0644\u062F\u0642\u0629", en: "Precision" },
  sigFigs: { ar: "\u0623\u0631\u0642\u0627\u0645 \u0645\u0639\u0646\u0648\u064A\u0629", en: "sig. figs" },
  swap: { ar: "\u062A\u0628\u062F\u064A\u0644", en: "Swap" },
  calculate: { ar: "\u0627\u062D\u0633\u0628", en: "Calculate" },
  addResistor: { ar: "\u0623\u0636\u0641 \u0645\u0642\u0627\u0648\u0645\u0629", en: "Add Resistor" },
  series: { ar: "\u062A\u0648\u0627\u0644\u064A", en: "Series" },
  parallel: { ar: "\u062A\u0648\u0627\u0632\u064A", en: "Parallel" },
  symbol: { ar: "\u0627\u0644\u0631\u0645\u0632", en: "Symbol" },
  unit: { ar: "\u0627\u0644\u0648\u062D\u062F\u0629", en: "Unit" },
  name: { ar: "\u0627\u0644\u0627\u0633\u0645", en: "Name" },
  formula: { ar: "\u0627\u0644\u0635\u064A\u0627\u063A\u0629", en: "Formula" },
  description: { ar: "\u0627\u0644\u0648\u0635\u0641", en: "Description" },
  note: { ar: "\u0645\u0644\u0627\u062D\u0638\u0629", en: "Note" },
  tolerance: { ar: "\u0627\u0644\u062A\u0633\u0627\u0645\u062D", en: "Tolerance" },
  bands: { ar: "\u0623\u0634\u0631\u0637\u0629", en: "Bands" },
  resistanceValue: { ar: "\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629", en: "Resistance Value" },
  enterValue: { ar: "\u0623\u062F\u062E\u0644 \u0627\u0644\u0642\u064A\u0645\u0629", en: "Enter value" },
  conversionFactor: { ar: "\u0645\u0639\u0627\u0645\u0644 \u0627\u0644\u062A\u062D\u0648\u064A\u0644", en: "Conversion factor" },
  tempNote: { ar: "\u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629 \u062A\u0633\u062A\u062E\u062F\u0645 \u062F\u0648\u0627\u0644 \u062A\u062D\u0648\u064A\u0644 \u0644\u064A\u0633\u062A \u0645\u0639\u0627\u0645\u0644\u0627\u062A \u0636\u0631\u0628", en: "Temperature uses conversion functions, not multiplication factors" },
  yearNote: { ar: "\u0627\u0644\u0633\u0646\u0629 \u0647\u0646\u0627 Julian \u0633\u0646\u0629 = 365.25 \u064A\u0648\u0645", en: "Year here is Julian year = 365.25 days" },
  binaryNote: { ar: "\u0644\u0627\u062D\u0638 \u0627\u0644\u0641\u0631\u0642 \u0628\u064A\u0646 kB (\u0639\u0634\u0631\u064A) \u0648 KiB (\u062B\u0646\u0627\u0626\u064A)", en: "Note the difference between kB (decimal) and KiB (binary)" },
  colorCode: { ar: "\u0642\u0627\u0631\u0626 \u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629", en: "Resistor Color Code Reader" },
  smdCode: { ar: "\u0623\u0643\u0648\u0627\u062F \u0645\u0642\u0627\u0648\u0645\u0627\u062A SMD", en: "SMD Resistor Codes" },
  eSeries: { ar: "\u0633\u0644\u0627\u0633\u0644 \u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0639\u064A\u0627\u0631\u064A\u0629", en: "Standard Value Series" },
  resistorInfo: { ar: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0639\u0645\u0644\u064A\u0629", en: "Practical Information" },
  reverseMode: { ar: "\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0639\u0643\u0633\u064A: \u0645\u0646 \u0627\u0644\u0642\u064A\u0645\u0629 \u0644\u0644\u0623\u0644\u0648\u0627\u0646", en: "Reverse: Value to Colors" },
  forwardMode: { ar: "\u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0639\u0627\u062F\u064A: \u0645\u0646 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0644\u0644\u0642\u064A\u0645\u0629", en: "Forward: Colors to Value" },
  readDirection: { ar: "\u0627\u0642\u0631\u0623 \u0645\u0646 \u0627\u0644\u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u0642\u0631\u0628 \u0644\u0637\u0631\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629 (\u0627\u0644\u0623\u0648\u0644) \u0628\u0627\u062A\u062C\u0627\u0647 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0633\u0627\u0645\u062D (\u0627\u0644\u0645\u0641\u0635\u0648\u0644 \u0628\u0645\u0633\u0627\u0641\u0629 \u0623\u0643\u0628\u0631)", en: "Read from the band closest to the resistor edge (first) toward the tolerance band (separated by a larger gap)" },
  nearestStd: { ar: "\u0623\u0642\u0631\u0628 \u0642\u064A\u0645\u0629 \u0645\u0639\u064A\u0627\u0631\u064A\u0629", en: "Nearest Standard Value" },
  power: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629", en: "Power" },
  resistance: { ar: "\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629", en: "Resistance" },
  voltage: { ar: "\u0627\u0644\u062C\u0647\u062F", en: "Voltage" },
  current: { ar: "\u0627\u0644\u062A\u064A\u0627\u0631", en: "Current" },

  // Resistor band labels
  band1: { ar: "\u0627\u0644\u0631\u0642\u0645 1", en: "Digit 1" },
  band2: { ar: "\u0627\u0644\u0631\u0642\u0645 2", en: "Digit 2" },
  band3: { ar: "\u0627\u0644\u0631\u0642\u0645 3", en: "Digit 3" },
  multiplier: { ar: "\u0627\u0644\u0645\u0636\u0627\u0639\u0650\u0641", en: "Multiplier" },
  toleranceBand: { ar: "\u0627\u0644\u062A\u0633\u0627\u0645\u062D", en: "Tolerance" },
  tempCoeff: { ar: "\u0645\u0639\u0627\u0645\u0644 \u0627\u0644\u062D\u0631\u0627\u0631\u0629", en: "Temp. Coeff." },

  // Colors
  black: { ar: "\u0623\u0633\u0648\u062F", en: "Black" },
  brown: { ar: "\u0628\u0646\u064A", en: "Brown" },
  red: { ar: "\u0623\u062D\u0645\u0631", en: "Red" },
  orange: { ar: "\u0628\u0631\u062A\u0642\u0627\u0644\u064A", en: "Orange" },
  yellow: { ar: "\u0623\u0635\u0641\u0631", en: "Yellow" },
  green: { ar: "\u0623\u062E\u0636\u0631", en: "Green" },
  blue: { ar: "\u0623\u0632\u0631\u0642", en: "Blue" },
  violet: { ar: "\u0628\u0646\u0641\u0633\u062C\u064A", en: "Violet" },
  grey: { ar: "\u0631\u0645\u0627\u062F\u064A", en: "Grey" },
  white: { ar: "\u0623\u0628\u064A\u0636", en: "White" },
  gold: { ar: "\u0630\u0647\u0628\u064A", en: "Gold" },
  silver: { ar: "\u0641\u0636\u064A", en: "Silver" },
  none: { ar: "\u0628\u062F\u0648\u0646", en: "None" },

  // Gate names
  gateAND: { ar: "\u0628\u0648\u0627\u0628\u0629 AND", en: "AND Gate" },
  gateOR: { ar: "\u0628\u0648\u0627\u0628\u0629 OR", en: "OR Gate" },
  gateNOT: { ar: "\u0628\u0648\u0627\u0628\u0629 NOT", en: "NOT Gate (Inverter)" },
  gateNAND: { ar: "\u0628\u0648\u0627\u0628\u0629 NAND", en: "NAND Gate" },
  gateNOR: { ar: "\u0628\u0648\u0627\u0628\u0629 NOR", en: "NOR Gate" },
  gateXOR: { ar: "\u0628\u0648\u0627\u0628\u0629 XOR", en: "XOR Gate" },
  gateXNOR: { ar: "\u0628\u0648\u0627\u0628\u0629 XNOR", en: "XNOR Gate" },
  gateBuffer: { ar: "\u0645\u0624\u0642\u062A (Buffer)", en: "Buffer" },

  // Multimeter
  mmParts: { ar: "\u0623\u062C\u0632\u0627\u0621 \u0627\u0644\u062C\u0647\u0627\u0632", en: "Parts of the Instrument" },
  mmMeasuring: { ar: "\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u0642\u064A\u0627\u0633", en: "Measurement Steps" },
  mmErrors: { ar: "\u0627\u0644\u0623\u062E\u0637\u0627\u0621 \u0627\u0644\u0634\u0627\u0626\u0639\u0629", en: "Common Errors" },
  mmSafety: { ar: "\u0627\u0644\u0633\u0644\u0627\u0645\u0629", en: "Safety" },
  mmReading: { ar: "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0634\u0627\u0634\u0629", en: "Reading the Display" },
  mmAccuracy: { ar: "\u062D\u0627\u0633\u0628\u0629 \u062F\u0642\u0629 \u0627\u0644\u0642\u064A\u0627\u0633", en: "Measurement Accuracy Calculator" },

  // Source note
  sourceNote: { ar: "\u0627\u0644\u0645\u0635\u062F\u0631: CODATA 2022 / BIPM SI Brochure (\u0627\u0644\u0625\u0635\u062F\u0627\u0631 9)", en: "Source: CODATA 2022 / BIPM SI Brochure (Edition 9)" },

  // Sections for electricity
  dcCircuits: { ar: "\u0627\u0644\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u0645\u0631", en: "DC Circuits" },
  acCircuits: { ar: "\u0627\u0644\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062A\u0631\u062F\u062F", en: "AC Circuits" },
  capIndTime: { ar: "\u0627\u0644\u0645\u0643\u062B\u0641 \u0648\u0627\u0644\u0645\u0644\u0641 \u0648\u0627\u0644\u0632\u0645\u0646", en: "Capacitor, Inductor & Time" },
  emBasic: { ar: "\u0627\u0644\u0643\u0647\u0631\u0648\u0645\u063A\u0646\u0627\u0637\u064A\u0633\u064A\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629", en: "Basic Electromagnetism" },

  // Diode & Transistor
  diode: { ar: "\u0627\u0644\u062F\u0627\u064A\u0648\u062F", en: "Diode" },
  bjt: { ar: "\u062A\u0631\u0627\u0646\u0632\u0633\u062A\u0648\u0631 BJT", en: "BJT Transistor" },
  mosfet: { ar: "\u062A\u0631\u0627\u0646\u0632\u0633\u062A\u0648\u0631 MOSFET", en: "MOSFET Transistor" },
  designNotes: { ar: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062A\u0635\u0645\u064A\u0645", en: "Design Notes" },

  // Physics sections
  mechanics: { ar: "\u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627", en: "Mechanics" },
  fluids: { ar: "\u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0645\u0648\u0627\u0626\u0639", en: "Materials & Fluids" },
  heat: { ar: "\u0627\u0644\u062D\u0631\u0627\u0631\u0629", en: "Heat & Thermodynamics" },
  waves: { ar: "\u0627\u0644\u0645\u0648\u062C\u0627\u062A \u0648\u0627\u0644\u0635\u0648\u062A", en: "Waves & Sound" },
  optics: { ar: "\u0627\u0644\u0636\u0648\u0621", en: "Optics" },

  // Number system conversion
  numConversion: { ar: "\u062A\u062D\u0648\u064A\u0644 \u0623\u0639\u062F\u0627\u062F", en: "Number System Conversion" },
  decimal: { ar: "\u0639\u0634\u0631\u064A", en: "Decimal" },
  binary: { ar: "\u062B\u0646\u0627\u0626\u064A", en: "Binary" },
  octal: { ar: "\u062B\u0645\u0627\u0646\u064A", en: "Octal" },
  hexadecimal: { ar: "\u0633\u062A \u0639\u0634\u0631\u064A", en: "Hexadecimal" },

  // Ohm's law
  ohmsLaw: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0623\u0648\u0645", en: "Ohm's Law" },
  voltageDivider: { ar: "\u0645\u0642\u0633\u0645 \u0627\u0644\u062C\u0647\u062F", en: "Voltage Divider" },
  currentDivider: { ar: "\u0645\u0642\u0633\u0645 \u0627\u0644\u062A\u064A\u0627\u0631", en: "Current Divider" },
  ledResistor: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629 LED", en: "LED Resistor" },
  resCombo: { ar: "\u0645\u0642\u0627\u0648\u0645\u0627\u062A \u062A\u0648\u0627\u0644\u064A/\u062A\u0648\u0627\u0632\u064A", en: "Series/Parallel Resistors" },
  kirchhoff: { ar: "\u0642\u0627\u0646\u0648\u0646\u0627 \u0643\u064A\u0631\u0634\u0648\u0641", en: "Kirchhoff's Laws" },
  thevenin: { ar: "\u062B\u064A\u0641\u0646\u0646 \u0648\u0646\u0648\u0631\u062A\u0646", en: "Thevenin & Norton" },
  wheatstone: { ar: "\u062C\u0633\u0631 \u0648\u064A\u062A\u0633\u062A\u0648\u0646", en: "Wheatstone Bridge" },
  deltaWye: { ar: "\u062A\u062D\u0648\u064A\u0644 \u062F\u0644\u062A\u0627 \u2194 \u0648\u0627\u064A", en: "Delta-Wye Conversion" },
  conductorR: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629 \u0627\u0644\u0645\u0648\u0635\u0644", en: "Conductor Resistance" },
  rcTime: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u0632\u0645\u0646 RC", en: "RC Time Constant" },
  rlTime: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u0632\u0645\u0646 RL", en: "RL Time Constant" },
  resonance: { ar: "\u0627\u0644\u0631\u0646\u064A\u0646", en: "Resonance" },
  acPower: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629 \u0641\u064A AC", en: "AC Power" },
  threePhase: { ar: "\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0637\u0648\u0627\u0631", en: "Three Phase" },
  filters: { ar: "\u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A", en: "Filters" },
  transformer: { ar: "\u0627\u0644\u0645\u062D\u0648\u0644", en: "Transformer" },
  bjtSwitch: { ar: "\u062D\u0627\u0633\u0628\u0629 BJT \u0643\u0645\u0641\u062A\u0627\u062D", en: "BJT Switch Calculator" },

  // SI Units section
  baseSIUnits: { ar: "\u0648\u062D\u062F\u0627\u062A SI \u0627\u0644\u0633\u0628\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629", en: "Seven SI Base Units" },
  derivedUnits: { ar: "\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0627\u0644\u0645\u0634\u062A\u0642\u0629", en: "Derived Units" },
  dimAnalysis: { ar: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064F\u0639\u062F\u064A", en: "Dimensional Analysis" },

  // Prefixes tool
  prefixTool: { ar: "\u0623\u062F\u0627\u0629 \u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0647\u0646\u062F\u0633\u064A", en: "Engineering Notation Tool" },
  binaryPrefixes: { ar: "\u0627\u0644\u0628\u0627\u062F\u0626\u0627\u062A \u0627\u0644\u062B\u0646\u0627\u0626\u064A\u0629", en: "Binary Prefixes" },
  commonMistakes: { ar: "\u0623\u062E\u0637\u0627\u0621 \u0634\u0627\u0626\u0639\u0629", en: "Common Mistakes" },

  // ANSI/IEC labels
  ansi: { ar: "ANSI (\u0623\u0645\u0631\u064A\u0643\u064A)", en: "ANSI (American)" },
  iec: { ar: "IEC (\u0623\u0648\u0631\u0648\u0628\u064A)", en: "IEC (European)" },

  // Symbols page
  passiveComp: { ar: "\u0639\u0646\u0627\u0635\u0631 \u0633\u0644\u0628\u064A\u0629", en: "Passive Components" },
  sources: { ar: "\u0645\u0635\u0627\u062F\u0631", en: "Sources" },
  grounds: { ar: "\u0623\u0631\u0636\u064A", en: "Grounds" },
  semiconductors: { ar: "\u0623\u0634\u0628\u0627\u0647 \u0645\u0648\u0635\u0644\u0627\u062A", en: "Semiconductors" },
  switchesProtection: { ar: "\u0645\u0641\u0627\u062A\u064A\u062D \u0648\u062D\u0645\u0627\u064A\u0629", en: "Switches & Protection" },
  loadsTransducers: { ar: "\u062D\u0645\u0644 \u0648\u0645\u062D\u0648\u0644\u0627\u062A", en: "Loads & Transducers" },
  measInst: { ar: "\u0642\u064A\u0627\u0633", en: "Measurement" },
  miscSymbols: { ar: "\u0645\u062A\u0646\u0648\u0639", en: "Miscellaneous" },
};
