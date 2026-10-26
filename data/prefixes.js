/* data/prefixes.js — SI prefixes and binary prefixes (exact from spec) */
window.REF = window.REF || {};

REF.siPrefixes = [
  { name: { ar: "\u0643\u0648\u064A\u062A\u0627", en: "quetta" }, symbol: "Q", power: 30, exponent: 1e30 },
  { name: { ar: "\u0631\u0648\u0646\u0627", en: "ronna" }, symbol: "R", power: 27, exponent: 1e27 },
  { name: { ar: "\u064A\u0648\u062A\u0627", en: "yotta" }, symbol: "Y", power: 24, exponent: 1e24 },
  { name: { ar: "\u0632\u064A\u062A\u0627", en: "zetta" }, symbol: "Z", power: 21, exponent: 1e21 },
  { name: { ar: "\u0625\u0643\u0633\u0627", en: "exa" }, symbol: "E", power: 18, exponent: 1e18 },
  { name: { ar: "\u0628\u064A\u062A\u0627", en: "peta" }, symbol: "P", power: 15, exponent: 1e15 },
  { name: { ar: "\u062A\u064A\u0631\u0627", en: "tera" }, symbol: "T", power: 12, exponent: 1e12 },
  { name: { ar: "\u062C\u064A\u062C\u0627", en: "giga" }, symbol: "G", power: 9, exponent: 1e9 },
  { name: { ar: "\u0645\u064A\u062C\u0627", en: "mega" }, symbol: "M", power: 6, exponent: 1e6 },
  { name: { ar: "\u0643\u064A\u0644\u0648", en: "kilo" }, symbol: "k", power: 3, exponent: 1e3 },
  { name: { ar: "\u0647\u0643\u062A\u0648", en: "hecto" }, symbol: "h", power: 2, exponent: 1e2 },
  { name: { ar: "\u062F\u064A\u0643\u0627", en: "deca" }, symbol: "da", power: 1, exponent: 1e1 },
  { name: { ar: "\u062F\u064A\u0633\u064A", en: "deci" }, symbol: "d", power: -1, exponent: 1e-1 },
  { name: { ar: "\u0633\u0646\u062A\u064A", en: "centi" }, symbol: "c", power: -2, exponent: 1e-2 },
  { name: { ar: "\u0645\u0644\u064A", en: "milli" }, symbol: "m", power: -3, exponent: 1e-3 },
  { name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648", en: "micro" }, symbol: "\u00B5", power: -6, exponent: 1e-6 },
  { name: { ar: "\u0646\u0627\u0646\u0648", en: "nano" }, symbol: "n", power: -9, exponent: 1e-9 },
  { name: { ar: "\u0628\u064A\u0643\u0648", en: "pico" }, symbol: "p", power: -12, exponent: 1e-12 },
  { name: { ar: "\u0641\u064A\u0645\u062A\u0648", en: "femto" }, symbol: "f", power: -15, exponent: 1e-15 },
  { name: { ar: "\u0623\u062A\u0648", en: "atto" }, symbol: "a", power: -18, exponent: 1e-18 },
  { name: { ar: "\u0632\u064A\u0628\u062A\u0648", en: "zepto" }, symbol: "z", power: -21, exponent: 1e-21 },
  { name: { ar: "\u064A\u0648\u0643\u062A\u0648", en: "yocto" }, symbol: "y", power: -24, exponent: 1e-24 },
  { name: { ar: "\u0631\u0648\u0646\u062A\u0648", en: "ronto" }, symbol: "r", power: -27, exponent: 1e-27 },
  { name: { ar: "\u0643\u0648\u064A\u0643\u062A\u0648", en: "quecto" }, symbol: "q", power: -30, exponent: 1e-30 }
];

REF.binaryPrefixes = [
  { name: { ar: "\u0643\u064A\u0628\u064A", en: "kibi" }, symbol: "Ki", power: 10, multiplier: 1024 },
  { name: { ar: "\u0645\u064A\u0628\u064A", en: "mebi" }, symbol: "Mi", power: 20, multiplier: 1048576 },
  { name: { ar: "\u062C\u064A\u0628\u064A", en: "gibi" }, symbol: "Gi", power: 30, multiplier: 1073741824 },
  { name: { ar: "\u062A\u064A\u0628\u064A", en: "tebi" }, symbol: "Ti", power: 40, multiplier: 1099511627776 },
  { name: { ar: "\u0628\u064A\u0628\u064A", en: "pebi" }, symbol: "Pi", power: 50, multiplier: 1125899906842624 },
  { name: { ar: "\u0625\u0643\u0633\u0628\u064A", en: "exbi" }, symbol: "Ei", power: 60, multiplier: 1152921504606846976 }
];

/* Engineering notation prefixes for parsing input like 4.7k, 10u */
REF.engPrefixes = {
  'Q': 1e30, 'R': 1e27, 'Y': 1e24, 'Z': 1e21, 'E': 1e18, 'P': 1e15,
  'T': 1e12, 'G': 1e9, 'M': 1e6, 'k': 1e3, 'K': 1e3,
  'h': 1e2, 'da': 1e1,
  'd': 1e-1, 'c': 1e-2, 'm': 1e-3,
  'u': 1e-6, '\u00B5': 1e-6,
  'n': 1e-9, 'p': 1e-12, 'f': 1e-15, 'a': 1e-18
};
