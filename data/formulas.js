/* data/formulas.js — All formulas for electricity, physics, etc. */
window.REF = window.REF || {};

REF.formulas = {
  dc: [
    { id: "ohm", name: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0623\u0648\u0645", en: "Ohm's Law" }, formula: "V = I \u00B7 R", symbols: "V [\u0627\u0644\u062C\u0647\u062F, V], I [\u0627\u0644\u062A\u064A\u0627\u0631, A], R [\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629, \u03A9]" },
    { id: "power", name: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629", en: "Power" }, formula: "P = V \u00B7 I = I\u00B2R = V\u00B2/R", symbols: "P [\u0627\u0644\u0642\u062F\u0631\u0629, W]" },
    { id: "energy", name: { ar: "\u0627\u0644\u0637\u0627\u0642\u0629", en: "Energy" }, formula: "W = P \u00B7 t", symbols: "W [\u0627\u0644\u0637\u0627\u0642\u0629, J], t [\u0627\u0644\u0632\u0645\u0646, s]" },
    { id: "rseries", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0627\u062A \u062A\u0648\u0627\u0644\u064A", en: "Resistors in Series" }, formula: "R_eq = R\u2081 + R\u2082 + \u2026" },
    { id: "rparallel", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0627\u062A \u062A\u0648\u0627\u0632\u064A", en: "Resistors in Parallel" }, formula: "1/R_eq = 1/R\u2081 + 1/R\u2082 + \u2026\n\u0627\u062B\u0646\u064A\u0646: R_eq = R\u2081\u00B7R\u2082/(R\u2081+R\u2082)" },
    { id: "vdiv", name: { ar: "\u0645\u0642\u0633\u0645 \u0627\u0644\u062C\u0647\u062F", en: "Voltage Divider" }, formula: "V_out = V_in \u00B7 R\u2082/(R\u2081 + R\u2082)" },
    { id: "idiv", name: { ar: "\u0645\u0642\u0633\u0645 \u0627\u0644\u062A\u064A\u0627\u0631", en: "Current Divider" }, formula: "I\u2081 = I_total \u00B7 R\u2082/(R\u2081 + R\u2082)" },
    { id: "kcl", name: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0643\u064A\u0631\u0634\u0648\u0641 \u0644\u0644\u062A\u064A\u0627\u0631 KCL", en: "Kirchhoff's Current Law (KCL)" }, formula: "\u03A3 I_in = \u03A3 I_out" },
    { id: "kvl", name: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0643\u064A\u0631\u0634\u0648\u0641 \u0644\u0644\u062C\u0647\u062F KVL", en: "Kirchhoff's Voltage Law (KVL)" }, formula: "\u03A3 V = 0  (\u062D\u0648\u0644 \u0645\u0633\u0627\u0631 \u0645\u063A\u0644\u0642)" },
    { id: "thevenin", name: { ar: "\u0646\u0638\u0631\u064A\u0629 \u062B\u064A\u0641\u0646\u0646", en: "Thevenin's Theorem" }, formula: "V_th, R_th" },
    { id: "norton", name: { ar: "\u0646\u0638\u0631\u064A\u0629 \u0646\u0648\u0631\u062A\u0646", en: "Norton's Theorem" }, formula: "I_N = V_th/R_th, R_N = R_th" },
    { id: "maxpower", name: { ar: "\u0623\u0642\u0635\u0649 \u0646\u0642\u0644 \u0642\u062F\u0631\u0629", en: "Maximum Power Transfer" }, formula: "R_L = R_th\nP_max = V_th\u00B2/(4\u00B7R_th)" },
    { id: "conductor", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629 \u0645\u0648\u0635\u0644", en: "Conductor Resistance" }, formula: "R = \u03C1\u00B7L/A" },
    { id: "tempcoeff", name: { ar: "\u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u062D\u0631\u0627\u0631\u0629", en: "Temperature Effect" }, formula: "R = R\u2080[1 + \u03B1(T \u2212 T\u2080)]" },
    { id: "wheatstone", name: { ar: "\u062C\u0633\u0631 \u0648\u064A\u062A\u0633\u062A\u0648\u0646", en: "Wheatstone Bridge" }, formula: "R\u2081/R\u2082 = R\u2083/R_x  (\u0639\u0646\u062F \u0627\u0644\u0627\u062A\u0632\u0627\u0646)" },
    { id: "ledres", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629 LED", en: "LED Resistor" }, formula: "R = (V_s \u2212 V_f)/I_f" },
  ],
  capInd: [
    { id: "charge", name: { ar: "\u0634\u062D\u0646\u0629 \u0627\u0644\u0645\u0643\u062B\u0641", en: "Capacitor Charge" }, formula: "Q = C \u00B7 V" },
    { id: "ecap", name: { ar: "\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0643\u062B\u0641", en: "Capacitor Energy" }, formula: "E = \u00BDC\u00B7V\u00B2" },
    { id: "eind", name: { ar: "\u0637\u0627\u0642\u0629 \u0627\u0644\u0645\u0644\u0641", en: "Inductor Energy" }, formula: "E = \u00BDL\u00B7I\u00B2" },
    { id: "taurc", name: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u0632\u0645\u0646 RC", en: "RC Time Constant" }, formula: "\u03C4 = R \u00B7 C" },
    { id: "taurl", name: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u0632\u0645\u0646 RL", en: "RL Time Constant" }, formula: "\u03C4 = L/R" },
    { id: "rccharge", name: { ar: "\u0634\u062D\u0646 \u0627\u0644\u0645\u0643\u062B\u0641", en: "Capacitor Charging" }, formula: "v(t) = V_s(1 \u2212 e^(\u2212t/\u03C4))" },
    { id: "rcdischarge", name: { ar: "\u062A\u0641\u0631\u064A\u063A \u0627\u0644\u0645\u0643\u062B\u0641", en: "Capacitor Discharging" }, formula: "v(t) = V\u2080 \u00B7 e^(\u2212t/\u03C4)" },
    { id: "cseries", name: { ar: "\u0645\u0643\u062B\u0641\u0627\u062A \u062A\u0648\u0627\u0644\u064A", en: "Capacitors in Series" }, formula: "1/C_eq = 1/C\u2081 + 1/C\u2082 + \u2026" },
    { id: "cparallel", name: { ar: "\u0645\u0643\u062B\u0641\u0627\u062A \u062A\u0648\u0627\u0632\u064A", en: "Capacitors in Parallel" }, formula: "C_eq = C\u2081 + C\u2082 + \u2026" },
    { id: "lseries", name: { ar: "\u0645\u0644\u0641\u0627\u062A \u062A\u0648\u0627\u0644\u064A", en: "Inductors in Series" }, formula: "L_eq = L\u2081 + L\u2082 + \u2026" },
    { id: "lparallel", name: { ar: "\u0645\u0644\u0641\u0627\u062A \u062A\u0648\u0627\u0632\u064A", en: "Inductors in Parallel" }, formula: "1/L_eq = 1/L\u2081 + 1/L\u2082 + \u2026" },
  ],
  ac: [
    { id: "vrms", name: { ar: "V_rms", en: "V_rms" }, formula: "V_rms = V_p/\u221A2" },
    { id: "vpp", name: { ar: "V_pp", en: "V_pp" }, formula: "V_pp = 2\u00B7V_p" },
    { id: "omega", name: { ar: "\u0627\u0644\u0633\u0631\u0639\u0629 \u0627\u0644\u0632\u0627\u0648\u064A\u0629", en: "Angular Frequency" }, formula: "\u03C9 = 2\u03C0f" },
    { id: "period", name: { ar: "\u0627\u0644\u062F\u0648\u0631\u0629", en: "Period" }, formula: "T = 1/f" },
    { id: "vavg", name: { ar: "\u0627\u0644\u0645\u062A\u0648\u0633\u0637 \u0646\u0635\u0641 \u0627\u0644\u062F\u0648\u0631\u0629", en: "Half-cycle Average" }, formula: "V_avg = 2V_p/\u03C0" },
    { id: "xc", name: { ar: "\u0645\u0641\u0627\u0639\u0644\u0629 \u0633\u0639\u0648\u064A\u0629", en: "Capacitive Reactance" }, formula: "X_C = 1/(2\u03C0fC)" },
    { id: "xl", name: { ar: "\u0645\u0641\u0627\u0639\u0644\u0629 \u062D\u062B\u064A\u0629", en: "Inductive Reactance" }, formula: "X_L = 2\u03C0fL" },
    { id: "impedance", name: { ar: "\u0627\u0644\u0645\u0639\u0627\u0648\u0642\u0629", en: "Impedance" }, formula: "Z = \u221A(R\u00B2 + (X_L \u2212 X_C)\u00B2)" },
    { id: "phase", name: { ar: "\u0632\u0627\u0648\u064A\u0629 \u0627\u0644\u0637\u0648\u0631", en: "Phase Angle" }, formula: "\u03C6 = arctan((X_L \u2212 X_C)/R)" },
    { id: "resonance", name: { ar: "\u062A\u0631\u062F\u062F \u0627\u0644\u0631\u0646\u064A\u0646", en: "Resonant Frequency" }, formula: "f\u2080 = 1/(2\u03C0\u221A(LC))" },
    { id: "qfactor", name: { ar: "\u0639\u0627\u0645\u0644 \u0627\u0644\u062C\u0648\u062F\u0629", en: "Quality Factor" }, formula: "Q = X_L/R  (\u062A\u0648\u0627\u0644\u064A)" },
    { id: "bandwidth", name: { ar: "\u0639\u0631\u0636 \u0627\u0644\u0646\u0637\u0627\u0642", en: "Bandwidth" }, formula: "BW = f\u2080/Q" },
    { id: "realpower", name: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629 \u0627\u0644\u0641\u0639\u0644\u064A\u0629", en: "Real Power" }, formula: "P = V\u00B7I\u00B7cos\u03C6  [W]" },
    { id: "reactivepower", name: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629 \u0627\u0644\u0627\u0631\u062A\u062F\u0627\u062F\u064A\u0629", en: "Reactive Power" }, formula: "Q = V\u00B7I\u00B7sin\u03C6  [var]" },
    { id: "apparentpower", name: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629 \u0627\u0644\u0638\u0627\u0647\u0631\u064A\u0629", en: "Apparent Power" }, formula: "S = V\u00B7I  [VA]" },
    { id: "pf", name: { ar: "\u0645\u0639\u0627\u0645\u0644 \u0627\u0644\u0642\u062F\u0631\u0629", en: "Power Factor" }, formula: "cos\u03C6 = P/S" },
    { id: "3phv", name: { ar: "\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0637\u0648\u0627\u0631 (\u0646\u062C\u0645\u0629)", en: "Three Phase (Star)" }, formula: "V_L = \u221A3 \u00B7 V_ph" },
    { id: "3phi", name: { ar: "\u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0637\u0648\u0627\u0631 (\u062F\u0644\u062A\u0627)", en: "Three Phase (Delta)" }, formula: "I_L = \u221A3 \u00B7 I_ph" },
    { id: "3php", name: { ar: "\u0642\u062F\u0631\u0629 \u062B\u0644\u0627\u062B\u064A \u0627\u0644\u0623\u0637\u0648\u0627\u0631", en: "Three Phase Power" }, formula: "P = \u221A3 \u00B7 V_L \u00B7 I_L \u00B7 cos\u03C6" },
    { id: "filterrc", name: { ar: "\u062A\u0631\u062F\u062F \u0642\u0637\u0639 RC", en: "RC Cutoff Frequency" }, formula: "f_c = 1/(2\u03C0RC)" },
    { id: "filterrl", name: { ar: "\u062A\u0631\u062F\u062F \u0642\u0637\u0639 RL", en: "RL Cutoff Frequency" }, formula: "f_c = R/(2\u03C0L)" },
    { id: "gaindb", name: { ar: "\u0627\u0644\u0643\u0633\u0628 \u0628\u0627\u0644\u062F\u064A\u0633\u0628\u0644", en: "Gain in dB" }, formula: "dB = 20\u00B7log\u2081\u2080(V_out/V_in)\ndB = 10\u00B7log\u2081\u2080(P_out/P_in)" },
    { id: "transformer", name: { ar: "\u0627\u0644\u0645\u062D\u0648\u0644 \u0627\u0644\u0645\u062B\u0627\u0644\u064A", en: "Ideal Transformer" }, formula: "V\u2081/V\u2082 = N\u2081/N\u2082 = I\u2082/I\u2081" },
  ],
  em: [
    { id: "coulomb", name: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0643\u0648\u0644\u0648\u0645", en: "Coulomb's Law" }, formula: "F = k\u00B7q\u2081\u00B7q\u2082/r\u00B2" },
    { id: "efield", name: { ar: "\u0627\u0644\u0645\u062C\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u064A", en: "Electric Field" }, formula: "E = F/q = k\u00B7q/r\u00B2" },
    { id: "epotential", name: { ar: "\u0627\u0644\u062C\u0647\u062F \u0627\u0644\u0643\u0647\u0631\u0628\u064A", en: "Electric Potential" }, formula: "V = k\u00B7q/r" },
    { id: "platecap", name: { ar: "\u0633\u0639\u0629 \u0627\u0644\u0645\u0643\u062B\u0641 \u0627\u0644\u0645\u0633\u062A\u0648\u064A", en: "Parallel Plate Capacitance" }, formula: "C = \u03B5\u2080\u00B7\u03B5_r\u00B7A/d" },
    { id: "forcecond", name: { ar: "\u0642\u0648\u0629 \u0639\u0644\u0649 \u0645\u0648\u0635\u0644", en: "Force on Conductor" }, formula: "F = B\u00B7I\u00B7L\u00B7sin\u03B8" },
    { id: "forcecharge", name: { ar: "\u0642\u0648\u0629 \u0639\u0644\u0649 \u0634\u062D\u0646\u0629", en: "Force on Charge" }, formula: "F = q\u00B7v\u00B7B\u00B7sin\u03B8" },
    { id: "faraday", name: { ar: "\u0642\u0627\u0646\u0648\u0646 \u0641\u0627\u0631\u0627\u062F\u0627\u064A", en: "Faraday's Law" }, formula: "\u03B5 = \u2212N\u00B7d\u03A6/dt" },
    { id: "solenoid", name: { ar: "\u062D\u062B \u0630\u0627\u062A\u064A \u0644\u0645\u0644\u0641 \u0637\u0648\u064A\u0644", en: "Solenoid Self-Inductance" }, formula: "L = \u00B5\u2080\u00B7\u00B5_r\u00B7N\u00B2\u00B7A/\u2113" },
  ]
};

/* Resistivity table at 20 °C */
REF.resistivity = [
  { material: { ar: "\u0646\u062D\u0627\u0633", en: "Copper" }, rho: 1.68e-8 },
  { material: { ar: "\u0623\u0644\u0645\u0646\u064A\u0648\u0645", en: "Aluminum" }, rho: 2.65e-8 },
  { material: { ar: "\u0630\u0647\u0628", en: "Gold" }, rho: 2.44e-8 },
  { material: { ar: "\u0641\u0636\u0629", en: "Silver" }, rho: 1.59e-8 },
  { material: { ar: "\u062D\u062F\u064A\u062F", en: "Iron" }, rho: 9.71e-8 },
  { material: { ar: "\u062A\u0646\u062C\u0633\u062A\u0646", en: "Tungsten" }, rho: 5.6e-8 }
];

/* LED forward voltage ranges */
REF.ledVoltages = [
  { color: { ar: "\u0623\u062D\u0645\u0631", en: "Red" }, vf: "1.8\u20132.2 V" },
  { color: { ar: "\u0623\u062E\u0636\u0631", en: "Green" }, vf: "2.0\u20133.0 V" },
  { color: { ar: "\u0623\u0632\u0631\u0642/\u0623\u0628\u064A\u0636", en: "Blue/White" }, vf: "2.8\u20133.6 V" }
];

/* Time constant table */
REF.tauTable = [
  { tau: "1\u03C4", chargePercent: 63.2, dischargePercent: 36.8 },
  { tau: "2\u03C4", chargePercent: 86.5, dischargePercent: 13.5 },
  { tau: "3\u03C4", chargePercent: 95.0, dischargePercent: 5.0 },
  { tau: "4\u03C4", chargePercent: 98.2, dischargePercent: 1.8 },
  { tau: "5\u03C4", chargePercent: 99.3, dischargePercent: 0.7 }
];

/* Delta-Wye conversion formulas */
REF.deltaWye = {
  deltaToWye: {
    R1: "R_a = R_ab\u00B7R_ca / (R_ab + R_bc + R_ca)",
    R2: "R_b = R_ab\u00B7R_bc / (R_ab + R_bc + R_ca)",
    R3: "R_c = R_bc\u00B7R_ca / (R_ab + R_bc + R_ca)"
  },
  wyeToDelta: {
    R1: "R_ab = (R_a\u00B7R_b + R_b\u00B7R_c + R_c\u00B7R_a) / R_c",
    R2: "R_bc = (R_a\u00B7R_b + R_b\u00B7R_c + R_c\u00B7R_a) / R_a",
    R3: "R_ca = (R_a\u00B7R_b + R_b\u00B7R_c + R_c\u00B7R_a) / R_b"
  }
};
