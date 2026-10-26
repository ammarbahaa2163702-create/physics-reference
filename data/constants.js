/* data/constants.js — Physical constants (exact values from spec / CODATA 2022) */
window.REF = window.REF || {};

REF.constants = [
  {
    name: { ar: "\u0633\u0631\u0639\u0629 \u0627\u0644\u0636\u0648\u0621 \u0641\u064A \u0627\u0644\u0641\u0631\u0627\u063A", en: "Speed of light in vacuum" },
    symbol: "c",
    value: "299792458",
    valueNum: 299792458,
    unit: "m/s",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0628\u0644\u0627\u0646\u0643", en: "Planck constant" },
    symbol: "h",
    value: "6.62607015e-34",
    valueNum: 6.62607015e-34,
    unit: "J\u00B7s",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0628\u0644\u0627\u0646\u0643 \u0627\u0644\u0645\u062E\u062A\u0632\u0644", en: "Reduced Planck constant" },
    symbol: "\u0127 = h/2\u03C0",
    value: "1.054571817e-34",
    valueNum: 1.054571817e-34,
    unit: "J\u00B7s",
    exact: false,
    uncertainty: null,
    note: { ar: "\u0645\u0634\u062A\u0642 \u0645\u0646 h/2\u03C0", en: "Derived from h/2\u03C0" }
  },
  {
    name: { ar: "\u0627\u0644\u0634\u062D\u0646\u0629 \u0627\u0644\u0623\u0648\u0644\u064A\u0629", en: "Elementary charge" },
    symbol: "e",
    value: "1.602176634e-19",
    valueNum: 1.602176634e-19,
    unit: "C",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0628\u0648\u0644\u062A\u0632\u0645\u0627\u0646", en: "Boltzmann constant" },
    symbol: "k_B",
    value: "1.380649e-23",
    valueNum: 1.380649e-23,
    unit: "J/K",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u0639\u062F\u062F \u0623\u0641\u0648\u062C\u0627\u062F\u0631\u0648", en: "Avogadro number" },
    symbol: "N_A",
    value: "6.02214076e23",
    valueNum: 6.02214076e23,
    unit: "mol\u207B\u00B9",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0641\u0627\u0631\u0627\u062F\u0627\u064A", en: "Faraday constant" },
    symbol: "F = N_A\u00B7e",
    value: "96485.33212331001",
    valueNum: 96485.33212331001,
    unit: "C/mol",
    exact: false,
    uncertainty: null,
    note: { ar: "\u0645\u0634\u062A\u0642 \u0645\u0646 N_A\u00B7e", en: "Derived: N_A\u00B7e" }
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u063A\u0627\u0632 \u0627\u0644\u0639\u0627\u0645", en: "Gas constant" },
    symbol: "R = N_A\u00B7k_B",
    value: "8.31446261815324",
    valueNum: 8.31446261815324,
    unit: "J/(mol\u00B7K)",
    exact: false,
    uncertainty: null,
    note: { ar: "\u0645\u0634\u062A\u0642 \u0645\u0646 N_A\u00B7k_B", en: "Derived: N_A\u00B7k_B" }
  },
  {
    name: { ar: "\u062A\u0633\u0627\u0631\u0639 \u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0627\u0644\u0642\u064A\u0627\u0633\u064A", en: "Standard acceleration of gravity" },
    symbol: "g\u2080",
    value: "9.80665",
    valueNum: 9.80665,
    unit: "m/s\u00B2",
    exact: true,
    uncertainty: null,
    note: { ar: "\u062F\u0642\u064A\u0642 \u0628\u0627\u0644\u062A\u0639\u0631\u064A\u0641", en: "exact by definition" }
  },
  {
    name: { ar: "\u0627\u0644\u0636\u063A\u0637 \u0627\u0644\u062C\u0648\u064A \u0627\u0644\u0642\u064A\u0627\u0633\u064A", en: "Standard atmosphere" },
    symbol: "atm",
    value: "101325",
    valueNum: 101325,
    unit: "Pa",
    exact: true,
    uncertainty: null
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0633\u062A\u064A\u0641\u0627\u0646-\u0628\u0648\u0644\u062A\u0632\u0645\u0627\u0646", en: "Stefan\u2013Boltzmann constant" },
    symbol: "\u03C3",
    value: "5.670374419e-8",
    valueNum: 5.670374419e-8,
    unit: "W/(m\u00B2\u00B7K\u2074)",
    exact: false,
    uncertainty: null,
    note: { ar: "\u0645\u0634\u062A\u0642", en: "derived" }
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0627\u0644\u062C\u0630\u0628 \u0627\u0644\u0639\u0627\u0645", en: "Gravitational constant" },
    symbol: "G",
    value: "6.67430e-11",
    valueNum: 6.67430e-11,
    unit: "m\u00B3/(kg\u00B7s\u00B2)",
    exact: false,
    uncertainty: "(15)",
    note: { ar: "CODATA\u060C \u0645\u0639 \u0627\u0644\u0634\u0643", en: "CODATA, with uncertainty" }
  },
  {
    name: { ar: "\u0633\u0645\u0627\u062D\u064A\u0629 \u0627\u0644\u0641\u0631\u0627\u063A", en: "Vacuum permittivity" },
    symbol: "\u03B5\u2080",
    value: "8.8541878188e-12",
    valueNum: 8.8541878188e-12,
    unit: "F/m",
    exact: false,
    uncertainty: "(14)",
    note: { ar: "CODATA 2022", en: "CODATA 2022" }
  },
  {
    name: { ar: "\u0646\u0641\u0627\u0630\u064A\u0629 \u0627\u0644\u0641\u0631\u0627\u063A", en: "Vacuum permeability" },
    symbol: "\u00B5\u2080",
    value: "1.25663706127e-6",
    valueNum: 1.25663706127e-6,
    unit: "N/A\u00B2",
    exact: false,
    uncertainty: "(20)",
    note: { ar: "CODATA 2022", en: "CODATA 2022" }
  },
  {
    name: { ar: "\u0643\u062A\u0644\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646", en: "Electron mass" },
    symbol: "m\u2091",
    value: "9.1093837139e-31",
    valueNum: 9.1093837139e-31,
    unit: "kg",
    exact: false,
    uncertainty: "(28)",
    note: { ar: "CODATA 2022", en: "CODATA 2022" }
  },
  {
    name: { ar: "\u0643\u062A\u0644\u0629 \u0627\u0644\u0628\u0631\u0648\u062A\u0648\u0646", en: "Proton mass" },
    symbol: "m\u209A",
    value: "1.67262192595e-27",
    valueNum: 1.67262192595e-27,
    unit: "kg",
    exact: false,
    uncertainty: "(52)",
    note: { ar: "CODATA 2022", en: "CODATA 2022" }
  },
  {
    name: { ar: "\u062B\u0627\u0628\u062A \u0643\u0648\u0644\u0648\u0645", en: "Coulomb constant" },
    symbol: "k = 1/(4\u03C0 \u03B5\u2080)",
    value: "8.98755179e9",
    valueNum: 8.98755179e9,
    unit: "N\u00B7m\u00B2/C\u00B2",
    exact: false,
    uncertainty: null,
    note: { ar: "\u062A\u0642\u0631\u064A\u0628\u064A", en: "approximate" }
  },
  {
    name: { ar: "\u0627\u0644\u062C\u0647\u062F \u0627\u0644\u062D\u0631\u0627\u0631\u064A \u0639\u0646\u062F 300 K", en: "Thermal voltage at 300 K" },
    symbol: "V_T = k_B\u00B7T/e",
    value: "0.02585",
    valueNum: 0.02585,
    unit: "V",
    exact: false,
    uncertainty: null,
    note: { ar: "\u2248 25.85 mV\u060C \u064A\u062A\u063A\u064A\u0631 \u0645\u0639 T", en: "\u2248 25.85 mV, varies with T" }
  },
  {
    name: { ar: "\u0627\u0644\u0635\u0641\u0631 \u0627\u0644\u0645\u0637\u0644\u0642", en: "Absolute zero" },
    symbol: "",
    value: "-273.15",
    valueNum: -273.15,
    unit: "\u00B0C",
    exact: true,
    uncertainty: null
  }
];
