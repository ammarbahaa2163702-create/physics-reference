/* data/units.js — All unit categories and conversion factors (exact from spec) */
window.REF = window.REF || {};

REF.unitCategories = [
  {
    id: "length",
    name: { ar: "\u0627\u0644\u0637\u0648\u0644", en: "Length" },
    base: "m",
    units: [
      { id: "m", name: { ar: "\u0645\u062A\u0631", en: "meter" }, symbol: "m", toBase: 1, exact: true },
      { id: "km", name: { ar: "\u0643\u064A\u0644\u0648\u0645\u062A\u0631", en: "kilometer" }, symbol: "km", toBase: 1000, exact: true },
      { id: "cm", name: { ar: "\u0633\u0646\u062A\u064A\u0645\u062A\u0631", en: "centimeter" }, symbol: "cm", toBase: 0.01, exact: true },
      { id: "mm", name: { ar: "\u0645\u0644\u064A\u0645\u062A\u0631", en: "millimeter" }, symbol: "mm", toBase: 0.001, exact: true },
      { id: "um", name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648\u0645\u062A\u0631", en: "micrometer" }, symbol: "\u00B5m", toBase: 1e-6, exact: true },
      { id: "nm", name: { ar: "\u0646\u0627\u0646\u0648\u0645\u062A\u0631", en: "nanometer" }, symbol: "nm", toBase: 1e-9, exact: true },
      { id: "angstrom", name: { ar: "\u0623\u0646\u063A\u0633\u062A\u0631\u0648\u0645", en: "angstrom" }, symbol: "\u00C5", toBase: 1e-10, exact: true },
      { id: "in", name: { ar: "\u0628\u0648\u0635\u0629", en: "inch" }, symbol: "in", toBase: 0.0254, exact: true },
      { id: "ft", name: { ar: "\u0642\u062F\u0645", en: "foot" }, symbol: "ft", toBase: 0.3048, exact: true },
      { id: "yd", name: { ar: "\u064A\u0627\u0631\u062F\u0629", en: "yard" }, symbol: "yd", toBase: 0.9144, exact: true },
      { id: "mi", name: { ar: "\u0645\u064A\u0644", en: "mile" }, symbol: "mi", toBase: 1609.344, exact: true },
      { id: "nmi", name: { ar: "\u0645\u064A\u0644 \u0628\u062D\u0631\u064A", en: "nautical mile" }, symbol: "nmi", toBase: 1852, exact: true },
      { id: "mil", name: { ar: "\u0645\u0644 (thou)", en: "mil (thou)" }, symbol: "mil", toBase: 2.54e-5, exact: true },
      { id: "furlong", name: { ar: "\u0641\u0631\u0644\u0646\u063A", en: "furlong" }, symbol: "fur", toBase: 201.168, exact: true },
      { id: "fathom", name: { ar: "\u0641\u0627\u062B\u0648\u0645", en: "fathom" }, symbol: "ftm", toBase: 1.8288, exact: true },
      { id: "au", name: { ar: "\u0648\u062D\u062F\u0629 \u0641\u0644\u0643\u064A\u0629", en: "astronomical unit" }, symbol: "AU", toBase: 149597870700, exact: true },
      { id: "ly", name: { ar: "\u0633\u0646\u0629 \u0636\u0648\u0626\u064A\u0629", en: "light-year" }, symbol: "ly", toBase: 9460730472580800, exact: true },
      { id: "pc", name: { ar: "\u0628\u0627\u0631\u0633\u0643", en: "parsec" }, symbol: "pc", toBase: 3.0856775814913673e16, exact: false }
    ]
  },
  {
    id: "mass",
    name: { ar: "\u0627\u0644\u0643\u062A\u0644\u0629", en: "Mass" },
    base: "kg",
    units: [
      { id: "kg", name: { ar: "\u0643\u064A\u0644\u0648\u063A\u0631\u0627\u0645", en: "kilogram" }, symbol: "kg", toBase: 1, exact: true },
      { id: "g", name: { ar: "\u063A\u0631\u0627\u0645", en: "gram" }, symbol: "g", toBase: 0.001, exact: true },
      { id: "mg", name: { ar: "\u0645\u0644\u064A\u063A\u0631\u0627\u0645", en: "milligram" }, symbol: "mg", toBase: 1e-6, exact: true },
      { id: "ug", name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648\u063A\u0631\u0627\u0645", en: "microgram" }, symbol: "\u00B5g", toBase: 1e-9, exact: true },
      { id: "t", name: { ar: "\u0637\u0646 \u0645\u062A\u0631\u064A", en: "metric ton" }, symbol: "t", toBase: 1000, exact: true },
      { id: "lb", name: { ar: "\u0631\u0637\u0644", en: "pound" }, symbol: "lb", toBase: 0.45359237, exact: true },
      { id: "oz", name: { ar: "\u0623\u0648\u0642\u064A\u0629", en: "ounce" }, symbol: "oz", toBase: 0.028349523125, exact: true },
      { id: "stone", name: { ar: "\u0633\u062A\u0648\u0646", en: "stone" }, symbol: "st", toBase: 6.35029318, exact: true },
      { id: "short_ton", name: { ar: "\u0637\u0646 \u0642\u0635\u064A\u0631", en: "short ton" }, symbol: "sh tn", toBase: 907.18474, exact: true },
      { id: "long_ton", name: { ar: "\u0637\u0646 \u0637\u0648\u064A\u0644", en: "long ton" }, symbol: "lg tn", toBase: 1016.0469088, exact: true },
      { id: "grain", name: { ar: "\u062D\u0628\u0629", en: "grain" }, symbol: "gr", toBase: 6.479891e-5, exact: true },
      { id: "carat", name: { ar: "\u0642\u064A\u0631\u0627\u0637", en: "carat" }, symbol: "ct", toBase: 2e-4, exact: true },
      { id: "u", name: { ar: "\u0648\u062D\u062F\u0629 \u0643\u062A\u0644\u0629 \u0630\u0631\u064A\u0629", en: "atomic mass unit" }, symbol: "u", toBase: 1.66053906892e-27, exact: false }
    ]
  },
  {
    id: "time",
    name: { ar: "\u0627\u0644\u0632\u0645\u0646", en: "Time" },
    base: "s",
    units: [
      { id: "s", name: { ar: "\u062B\u0627\u0646\u064A\u0629", en: "second" }, symbol: "s", toBase: 1, exact: true },
      { id: "ms", name: { ar: "\u0645\u0644\u064A \u062B\u0627\u0646\u064A\u0629", en: "millisecond" }, symbol: "ms", toBase: 1e-3, exact: true },
      { id: "us", name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648 \u062B\u0627\u0646\u064A\u0629", en: "microsecond" }, symbol: "\u00B5s", toBase: 1e-6, exact: true },
      { id: "ns", name: { ar: "\u0646\u0627\u0646\u0648 \u062B\u0627\u0646\u064A\u0629", en: "nanosecond" }, symbol: "ns", toBase: 1e-9, exact: true },
      { id: "min", name: { ar: "\u062F\u0642\u064A\u0642\u0629", en: "minute" }, symbol: "min", toBase: 60, exact: true },
      { id: "h", name: { ar: "\u0633\u0627\u0639\u0629", en: "hour" }, symbol: "h", toBase: 3600, exact: true },
      { id: "day", name: { ar: "\u064A\u0648\u0645", en: "day" }, symbol: "d", toBase: 86400, exact: true },
      { id: "week", name: { ar: "\u0623\u0633\u0628\u0648\u0639", en: "week" }, symbol: "wk", toBase: 604800, exact: true },
      { id: "year", name: { ar: "\u0633\u0646\u0629 (Julian)", en: "year (Julian)" }, symbol: "yr", toBase: 31557600, exact: true, note: { ar: "\u0627\u0644\u0633\u0646\u0629 \u0647\u0646\u0627 Julian \u0633\u0646\u0629 = 365.25 \u064A\u0648\u0645", en: "Julian year = 365.25 days" } }
    ]
  },
  {
    id: "temperature",
    name: { ar: "\u062F\u0631\u062C\u0629 \u0627\u0644\u062D\u0631\u0627\u0631\u0629", en: "Temperature" },
    base: "K",
    isTemperature: true,
    units: [
      { id: "K", name: { ar: "\u0643\u0644\u0641\u0646", en: "kelvin" }, symbol: "K" },
      { id: "C", name: { ar: "\u062F\u0631\u062C\u0629 \u0645\u0626\u0648\u064A\u0629", en: "degree Celsius" }, symbol: "\u00B0C" },
      { id: "F", name: { ar: "\u0641\u0647\u0631\u0646\u0647\u0627\u064A\u062A", en: "degree Fahrenheit" }, symbol: "\u00B0F" },
      { id: "R", name: { ar: "\u0631\u0627\u0646\u0643\u0646", en: "degree Rankine" }, symbol: "\u00B0R" }
    ]
  },
  {
    id: "area",
    name: { ar: "\u0627\u0644\u0645\u0633\u0627\u062D\u0629", en: "Area" },
    base: "m\u00B2",
    units: [
      { id: "m2", name: { ar: "\u0645\u062A\u0631 \u0645\u0631\u0628\u0639", en: "square meter" }, symbol: "m\u00B2", toBase: 1, exact: true },
      { id: "km2", name: { ar: "\u0643\u064A\u0644\u0648\u0645\u062A\u0631 \u0645\u0631\u0628\u0639", en: "square kilometer" }, symbol: "km\u00B2", toBase: 1e6, exact: true },
      { id: "cm2", name: { ar: "\u0633\u0646\u062A\u064A\u0645\u062A\u0631 \u0645\u0631\u0628\u0639", en: "square centimeter" }, symbol: "cm\u00B2", toBase: 1e-4, exact: true },
      { id: "mm2", name: { ar: "\u0645\u0644\u064A\u0645\u062A\u0631 \u0645\u0631\u0628\u0639", en: "square millimeter" }, symbol: "mm\u00B2", toBase: 1e-6, exact: true },
      { id: "ha", name: { ar: "\u0647\u0643\u062A\u0627\u0631", en: "hectare" }, symbol: "ha", toBase: 1e4, exact: true },
      { id: "in2", name: { ar: "\u0628\u0648\u0635\u0629 \u0645\u0631\u0628\u0639\u0629", en: "square inch" }, symbol: "in\u00B2", toBase: 6.4516e-4, exact: true },
      { id: "ft2", name: { ar: "\u0642\u062F\u0645 \u0645\u0631\u0628\u0639", en: "square foot" }, symbol: "ft\u00B2", toBase: 0.09290304, exact: true },
      { id: "yd2", name: { ar: "\u064A\u0627\u0631\u062F\u0629 \u0645\u0631\u0628\u0639\u0629", en: "square yard" }, symbol: "yd\u00B2", toBase: 0.83612736, exact: true },
      { id: "acre", name: { ar: "\u0641\u062F\u0627\u0646", en: "acre" }, symbol: "ac", toBase: 4046.8564224, exact: true },
      { id: "mi2", name: { ar: "\u0645\u064A\u0644 \u0645\u0631\u0628\u0639", en: "square mile" }, symbol: "mi\u00B2", toBase: 2589988.110336, exact: true }
    ]
  },
  {
    id: "volume",
    name: { ar: "\u0627\u0644\u062D\u062C\u0645", en: "Volume" },
    base: "m\u00B3",
    units: [
      { id: "m3", name: { ar: "\u0645\u062A\u0631 \u0645\u0643\u0639\u0628", en: "cubic meter" }, symbol: "m\u00B3", toBase: 1, exact: true },
      { id: "L", name: { ar: "\u0644\u062A\u0631", en: "liter" }, symbol: "L", toBase: 1e-3, exact: true },
      { id: "mL", name: { ar: "\u0645\u0644\u064A\u0644\u062A\u0631", en: "milliliter" }, symbol: "mL", toBase: 1e-6, exact: true },
      { id: "cm3", name: { ar: "\u0633\u0646\u062A\u064A\u0645\u062A\u0631 \u0645\u0643\u0639\u0628", en: "cubic centimeter" }, symbol: "cm\u00B3", toBase: 1e-6, exact: true },
      { id: "mm3", name: { ar: "\u0645\u0644\u064A\u0645\u062A\u0631 \u0645\u0643\u0639\u0628", en: "cubic millimeter" }, symbol: "mm\u00B3", toBase: 1e-9, exact: true },
      { id: "in3", name: { ar: "\u0628\u0648\u0635\u0629 \u0645\u0643\u0639\u0628\u0629", en: "cubic inch" }, symbol: "in\u00B3", toBase: 1.6387064e-5, exact: true },
      { id: "ft3", name: { ar: "\u0642\u062F\u0645 \u0645\u0643\u0639\u0628", en: "cubic foot" }, symbol: "ft\u00B3", toBase: 0.028316846592, exact: true },
      { id: "yd3", name: { ar: "\u064A\u0627\u0631\u062F\u0629 \u0645\u0643\u0639\u0628\u0629", en: "cubic yard" }, symbol: "yd\u00B3", toBase: 0.764554857984, exact: true },
      { id: "usgal", name: { ar: "\u063A\u0627\u0644\u0648\u0646 \u0623\u0645\u0631\u064A\u0643\u064A", en: "US gallon" }, symbol: "US gal", toBase: 3.785411784e-3, exact: true },
      { id: "usqt", name: { ar: "\u0631\u0628\u0639 \u063A\u0627\u0644\u0648\u0646 \u0623\u0645\u0631\u064A\u0643\u064A", en: "US quart" }, symbol: "US qt", toBase: 9.46352946e-4, exact: true },
      { id: "uspint", name: { ar: "\u0628\u0627\u064A\u0646\u062A \u0623\u0645\u0631\u064A\u0643\u064A", en: "US pint" }, symbol: "US pt", toBase: 4.73176473e-4, exact: true },
      { id: "uscup", name: { ar: "\u0643\u0648\u0628 \u0623\u0645\u0631\u064A\u0643\u064A", en: "US cup" }, symbol: "US cup", toBase: 2.365882365e-4, exact: true },
      { id: "usfloz", name: { ar: "\u0623\u0648\u0642\u064A\u0629 \u0633\u0627\u0626\u0644\u0629 \u0623\u0645\u0631\u064A\u0643\u064A\u0629", en: "US fluid ounce" }, symbol: "US fl oz", toBase: 2.95735295625e-5, exact: true },
      { id: "ukgal", name: { ar: "\u063A\u0627\u0644\u0648\u0646 \u0628\u0631\u064A\u0637\u0627\u0646\u064A", en: "UK gallon" }, symbol: "UK gal", toBase: 4.54609e-3, exact: true },
      { id: "oilbarrel", name: { ar: "\u0628\u0631\u0645\u064A\u0644 \u0646\u0641\u0637", en: "oil barrel" }, symbol: "bbl", toBase: 0.158987294928, exact: true }
    ]
  },
  {
    id: "speed",
    name: { ar: "\u0627\u0644\u0633\u0631\u0639\u0629", en: "Speed" },
    base: "m/s",
    units: [
      { id: "ms", name: { ar: "\u0645\u062A\u0631/\u062B\u0627\u0646\u064A\u0629", en: "meter per second" }, symbol: "m/s", toBase: 1, exact: true },
      { id: "kmh", name: { ar: "\u0643\u064A\u0644\u0648\u0645\u062A\u0631/\u0633\u0627\u0639\u0629", en: "kilometer per hour" }, symbol: "km/h", toBase: 1/3.6, exact: true },
      { id: "mph", name: { ar: "\u0645\u064A\u0644/\u0633\u0627\u0639\u0629", en: "mile per hour" }, symbol: "mph", toBase: 0.44704, exact: true },
      { id: "fts", name: { ar: "\u0642\u062F\u0645/\u062B\u0627\u0646\u064A\u0629", en: "foot per second" }, symbol: "ft/s", toBase: 0.3048, exact: true },
      { id: "knot", name: { ar: "\u0639\u0642\u062F\u0629", en: "knot" }, symbol: "kn", toBase: 1852/3600, exact: true },
      { id: "c", name: { ar: "\u0633\u0631\u0639\u0629 \u0627\u0644\u0636\u0648\u0621", en: "speed of light" }, symbol: "c", toBase: 299792458, exact: true }
    ]
  },
  {
    id: "force",
    name: { ar: "\u0627\u0644\u0642\u0648\u0629", en: "Force" },
    base: "N",
    units: [
      { id: "N", name: { ar: "\u0646\u064A\u0648\u062A\u0646", en: "newton" }, symbol: "N", toBase: 1, exact: true },
      { id: "kN", name: { ar: "\u0643\u064A\u0644\u0648\u0646\u064A\u0648\u062A\u0646", en: "kilonewton" }, symbol: "kN", toBase: 1000, exact: true },
      { id: "kgf", name: { ar: "\u0643\u064A\u0644\u0648\u063A\u0631\u0627\u0645 \u0642\u0648\u0629", en: "kilogram-force" }, symbol: "kgf", toBase: 9.80665, exact: true },
      { id: "lbf", name: { ar: "\u0631\u0637\u0644 \u0642\u0648\u0629", en: "pound-force" }, symbol: "lbf", toBase: 4.4482216152605, exact: true },
      { id: "dyn", name: { ar: "\u062F\u0627\u064A\u0646", en: "dyne" }, symbol: "dyn", toBase: 1e-5, exact: true },
      { id: "ozf", name: { ar: "\u0623\u0648\u0642\u064A\u0629 \u0642\u0648\u0629", en: "ounce-force" }, symbol: "ozf", toBase: 0.27801385095, exact: true }
    ]
  },
  {
    id: "pressure",
    name: { ar: "\u0627\u0644\u0636\u063A\u0637", en: "Pressure" },
    base: "Pa",
    units: [
      { id: "Pa", name: { ar: "\u0628\u0627\u0633\u0643\u0627\u0644", en: "pascal" }, symbol: "Pa", toBase: 1, exact: true },
      { id: "kPa", name: { ar: "\u0643\u064A\u0644\u0648\u0628\u0627\u0633\u0643\u0627\u0644", en: "kilopascal" }, symbol: "kPa", toBase: 1e3, exact: true },
      { id: "MPa", name: { ar: "\u0645\u064A\u062C\u0627\u0628\u0627\u0633\u0643\u0627\u0644", en: "megapascal" }, symbol: "MPa", toBase: 1e6, exact: true },
      { id: "bar", name: { ar: "\u0628\u0627\u0631", en: "bar" }, symbol: "bar", toBase: 1e5, exact: true },
      { id: "mbar", name: { ar: "\u0645\u0644\u064A\u0628\u0627\u0631", en: "millibar" }, symbol: "mbar", toBase: 100, exact: true },
      { id: "atm", name: { ar: "\u0636\u063A\u0637 \u062C\u0648\u064A", en: "atmosphere" }, symbol: "atm", toBase: 101325, exact: true },
      { id: "psi", name: { ar: "psi", en: "psi" }, symbol: "psi", toBase: 6894.757293168361, exact: false },
      { id: "mmHg", name: { ar: "\u0645\u0644\u064A\u0645\u062A\u0631 \u0632\u0626\u0628\u0642", en: "mmHg" }, symbol: "mmHg", toBase: 133.322387415, exact: false, note: { ar: "\u062A\u0639\u0631\u064A\u0641 \u062A\u0642\u0644\u064A\u062F\u064A", en: "conventional definition" } },
      { id: "torr", name: { ar: "\u062A\u0648\u0631", en: "torr" }, symbol: "Torr", toBase: 101325/760, exact: true },
      { id: "inHg", name: { ar: "\u0628\u0648\u0635\u0629 \u0632\u0626\u0628\u0642", en: "inHg" }, symbol: "inHg", toBase: 3386.389, exact: false, note: { ar: "\u062A\u0642\u0644\u064A\u062F\u064A", en: "conventional" } },
      { id: "kgfcm2", name: { ar: "kgf/cm\u00B2", en: "kgf/cm\u00B2" }, symbol: "kgf/cm\u00B2", toBase: 98066.5, exact: true }
    ]
  },
  {
    id: "energy",
    name: { ar: "\u0627\u0644\u0637\u0627\u0642\u0629", en: "Energy" },
    base: "J",
    units: [
      { id: "J", name: { ar: "\u062C\u0648\u0644", en: "joule" }, symbol: "J", toBase: 1, exact: true },
      { id: "kJ", name: { ar: "\u0643\u064A\u0644\u0648\u062C\u0648\u0644", en: "kilojoule" }, symbol: "kJ", toBase: 1e3, exact: true },
      { id: "MJ", name: { ar: "\u0645\u064A\u062C\u0627\u062C\u0648\u0644", en: "megajoule" }, symbol: "MJ", toBase: 1e6, exact: true },
      { id: "cal", name: { ar: "\u0633\u0639\u0631\u0629 \u062D\u0631\u0627\u0631\u064A\u0629", en: "calorie" }, symbol: "cal", toBase: 4.184, exact: true },
      { id: "kcal", name: { ar: "\u0643\u064A\u0644\u0648\u0633\u0639\u0631\u0629", en: "kilocalorie" }, symbol: "kcal", toBase: 4184, exact: true },
      { id: "Wh", name: { ar: "\u0648\u0627\u0637.\u0633\u0627\u0639\u0629", en: "watt-hour" }, symbol: "Wh", toBase: 3600, exact: true },
      { id: "kWh", name: { ar: "\u0643\u064A\u0644\u0648\u0648\u0627\u0637.\u0633\u0627\u0639\u0629", en: "kilowatt-hour" }, symbol: "kWh", toBase: 3.6e6, exact: true },
      { id: "eV", name: { ar: "\u0625\u0644\u0643\u062A\u0631\u0648\u0646 \u0641\u0648\u0644\u062A", en: "electronvolt" }, symbol: "eV", toBase: 1.602176634e-19, exact: true },
      { id: "BTU", name: { ar: "BTU", en: "BTU (IT)" }, symbol: "BTU", toBase: 1055.05585262, exact: true },
      { id: "ftlbf", name: { ar: "\u0642\u062F\u0645.\u0631\u0637\u0644 \u0642\u0648\u0629", en: "foot-pound force" }, symbol: "ft\u00B7lbf", toBase: 1.3558179483314004, exact: true },
      { id: "erg", name: { ar: "\u0625\u0631\u063A", en: "erg" }, symbol: "erg", toBase: 1e-7, exact: true }
    ]
  },
  {
    id: "power",
    name: { ar: "\u0627\u0644\u0642\u062F\u0631\u0629", en: "Power" },
    base: "W",
    units: [
      { id: "W", name: { ar: "\u0648\u0627\u0637", en: "watt" }, symbol: "W", toBase: 1, exact: true },
      { id: "kW", name: { ar: "\u0643\u064A\u0644\u0648\u0648\u0627\u0637", en: "kilowatt" }, symbol: "kW", toBase: 1e3, exact: true },
      { id: "MW", name: { ar: "\u0645\u064A\u062C\u0627\u0648\u0627\u0637", en: "megawatt" }, symbol: "MW", toBase: 1e6, exact: true },
      { id: "hp_mech", name: { ar: "\u062D\u0635\u0627\u0646 (\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u064A)", en: "horsepower (mechanical)" }, symbol: "hp", toBase: 745.69987158227, exact: false },
      { id: "hp_metric", name: { ar: "\u062D\u0635\u0627\u0646 (\u0645\u062A\u0631\u064A PS)", en: "horsepower (metric PS)" }, symbol: "PS", toBase: 735.49875, exact: true },
      { id: "btuh", name: { ar: "BTU/h", en: "BTU/h" }, symbol: "BTU/h", toBase: 0.29307107017, exact: false },
      { id: "cals", name: { ar: "\u0633\u0639\u0631\u0629/\u062B\u0627\u0646\u064A\u0629", en: "calorie per second" }, symbol: "cal/s", toBase: 4.184, exact: true },
      { id: "ftlbfs", name: { ar: "\u0642\u062F\u0645.\u0631\u0637\u0644/\u062B\u0627\u0646\u064A\u0629", en: "ft\u00B7lbf/s" }, symbol: "ft\u00B7lbf/s", toBase: 1.3558179483314004, exact: true }
    ]
  },
  {
    id: "torque",
    name: { ar: "\u0639\u0632\u0645 \u0627\u0644\u062F\u0648\u0631\u0627\u0646", en: "Torque" },
    base: "N\u00B7m",
    units: [
      { id: "Nm", name: { ar: "\u0646\u064A\u0648\u062A\u0646.\u0645\u062A\u0631", en: "newton-meter" }, symbol: "N\u00B7m", toBase: 1, exact: true },
      { id: "kgfm", name: { ar: "kgf\u00B7m", en: "kgf\u00B7m" }, symbol: "kgf\u00B7m", toBase: 9.80665, exact: true },
      { id: "lbfft", name: { ar: "lbf\u00B7ft", en: "lbf\u00B7ft" }, symbol: "lbf\u00B7ft", toBase: 1.3558179483314004, exact: true },
      { id: "lbfin", name: { ar: "lbf\u00B7in", en: "lbf\u00B7in" }, symbol: "lbf\u00B7in", toBase: 0.1129848290276167, exact: true },
      { id: "ozfin", name: { ar: "ozf\u00B7in", en: "ozf\u00B7in" }, symbol: "ozf\u00B7in", toBase: 0.007061551814, exact: false }
    ]
  },
  {
    id: "angle",
    name: { ar: "\u0627\u0644\u0632\u0627\u0648\u064A\u0629", en: "Angle" },
    base: "rad",
    units: [
      { id: "rad", name: { ar: "\u0631\u0627\u062F\u064A\u0627\u0646", en: "radian" }, symbol: "rad", toBase: 1, exact: true },
      { id: "deg", name: { ar: "\u062F\u0631\u062C\u0629", en: "degree" }, symbol: "\u00B0", toBase: Math.PI/180, exact: true },
      { id: "grad", name: { ar: "\u062C\u0631\u0627\u062F", en: "gradian" }, symbol: "grad", toBase: Math.PI/200, exact: true },
      { id: "arcmin", name: { ar: "\u062F\u0642\u064A\u0642\u0629 \u0642\u0648\u0633\u064A\u0629", en: "arcminute" }, symbol: "arcmin", toBase: Math.PI/10800, exact: true },
      { id: "arcsec", name: { ar: "\u062B\u0627\u0646\u064A\u0629 \u0642\u0648\u0633\u064A\u0629", en: "arcsecond" }, symbol: "arcsec", toBase: Math.PI/648000, exact: true },
      { id: "turn", name: { ar: "\u062F\u0648\u0631\u0629", en: "turn" }, symbol: "turn", toBase: 2*Math.PI, exact: true }
    ]
  },
  {
    id: "frequency",
    name: { ar: "\u0627\u0644\u062A\u0631\u062F\u062F", en: "Frequency" },
    base: "Hz",
    units: [
      { id: "Hz", name: { ar: "\u0647\u0631\u062A\u0632", en: "hertz" }, symbol: "Hz", toBase: 1, exact: true },
      { id: "kHz", name: { ar: "\u0643\u064A\u0644\u0648\u0647\u0631\u062A\u0632", en: "kilohertz" }, symbol: "kHz", toBase: 1e3, exact: true },
      { id: "MHz", name: { ar: "\u0645\u064A\u062C\u0627\u0647\u0631\u062A\u0632", en: "megahertz" }, symbol: "MHz", toBase: 1e6, exact: true },
      { id: "GHz", name: { ar: "\u062C\u064A\u062C\u0627\u0647\u0631\u062A\u0632", en: "gigahertz" }, symbol: "GHz", toBase: 1e9, exact: true },
      { id: "rpm", name: { ar: "\u062F\u0648\u0631\u0629/\u062F\u0642\u064A\u0642\u0629", en: "RPM" }, symbol: "rpm", toBase: 1/60, exact: true },
      { id: "rads", name: { ar: "rad/s", en: "rad/s" }, symbol: "rad/s", toBase: 1/(2*Math.PI), exact: true }
    ]
  },
  {
    id: "charge",
    name: { ar: "\u0627\u0644\u0634\u062D\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u064A\u0629", en: "Electric Charge" },
    base: "C",
    units: [
      { id: "C", name: { ar: "\u0643\u0648\u0644\u0648\u0645", en: "coulomb" }, symbol: "C", toBase: 1, exact: true },
      { id: "mC", name: { ar: "\u0645\u0644\u064A\u0643\u0648\u0644\u0648\u0645", en: "millicoulomb" }, symbol: "mC", toBase: 1e-3, exact: true },
      { id: "uC", name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648\u0643\u0648\u0644\u0648\u0645", en: "microcoulomb" }, symbol: "\u00B5C", toBase: 1e-6, exact: true },
      { id: "nC", name: { ar: "\u0646\u0627\u0646\u0648\u0643\u0648\u0644\u0648\u0645", en: "nanocoulomb" }, symbol: "nC", toBase: 1e-9, exact: true },
      { id: "Ah", name: { ar: "\u0623\u0645\u0628\u064A\u0631.\u0633\u0627\u0639\u0629", en: "ampere-hour" }, symbol: "Ah", toBase: 3600, exact: true },
      { id: "mAh", name: { ar: "\u0645\u0644\u064A \u0623\u0645\u0628\u064A\u0631.\u0633\u0627\u0639\u0629", en: "milliampere-hour" }, symbol: "mAh", toBase: 3.6, exact: true },
      { id: "e", name: { ar: "\u0627\u0644\u0634\u062D\u0646\u0629 \u0627\u0644\u0623\u0648\u0644\u064A\u0629", en: "elementary charge" }, symbol: "e", toBase: 1.602176634e-19, exact: true }
    ]
  },
  {
    id: "magflux",
    name: { ar: "\u0643\u062B\u0627\u0641\u0629 \u0627\u0644\u0641\u064A\u0636 \u0627\u0644\u0645\u063A\u0646\u0627\u0637\u064A\u0633\u064A", en: "Magnetic Flux Density" },
    base: "T",
    units: [
      { id: "T", name: { ar: "\u062A\u0633\u0644\u0627", en: "tesla" }, symbol: "T", toBase: 1, exact: true },
      { id: "mT", name: { ar: "\u0645\u0644\u064A\u062A\u0633\u0644\u0627", en: "millitesla" }, symbol: "mT", toBase: 1e-3, exact: true },
      { id: "uT", name: { ar: "\u0645\u0627\u064A\u0643\u0631\u0648\u062A\u0633\u0644\u0627", en: "microtesla" }, symbol: "\u00B5T", toBase: 1e-6, exact: true },
      { id: "G", name: { ar: "\u062C\u0627\u0648\u0633", en: "gauss" }, symbol: "G", toBase: 1e-4, exact: true }
    ]
  },
  {
    id: "density",
    name: { ar: "\u0627\u0644\u0643\u062B\u0627\u0641\u0629", en: "Density" },
    base: "kg/m\u00B3",
    units: [
      { id: "kgm3", name: { ar: "kg/m\u00B3", en: "kg/m\u00B3" }, symbol: "kg/m\u00B3", toBase: 1, exact: true },
      { id: "gcm3", name: { ar: "g/cm\u00B3", en: "g/cm\u00B3" }, symbol: "g/cm\u00B3", toBase: 1000, exact: true },
      { id: "gmL", name: { ar: "g/mL", en: "g/mL" }, symbol: "g/mL", toBase: 1000, exact: true },
      { id: "kgL", name: { ar: "kg/L", en: "kg/L" }, symbol: "kg/L", toBase: 1000, exact: true },
      { id: "lbft3", name: { ar: "lb/ft\u00B3", en: "lb/ft\u00B3" }, symbol: "lb/ft\u00B3", toBase: 16.01846337396014, exact: false },
      { id: "lbin3", name: { ar: "lb/in\u00B3", en: "lb/in\u00B3" }, symbol: "lb/in\u00B3", toBase: 27679.904710203125, exact: false }
    ]
  },
  {
    id: "datastorage",
    name: { ar: "\u0633\u0639\u0629 \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0631\u0642\u0645\u064A", en: "Digital Storage" },
    base: "B",
    units: [
      { id: "B", name: { ar: "\u0628\u0627\u064A\u062A", en: "byte" }, symbol: "B", toBase: 1, exact: true },
      { id: "kB", name: { ar: "\u0643\u064A\u0644\u0648\u0628\u0627\u064A\u062A", en: "kilobyte" }, symbol: "kB", toBase: 1e3, exact: true },
      { id: "MB", name: { ar: "\u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A", en: "megabyte" }, symbol: "MB", toBase: 1e6, exact: true },
      { id: "GB", name: { ar: "\u062C\u064A\u062C\u0627\u0628\u0627\u064A\u062A", en: "gigabyte" }, symbol: "GB", toBase: 1e9, exact: true },
      { id: "TB", name: { ar: "\u062A\u064A\u0631\u0627\u0628\u0627\u064A\u062A", en: "terabyte" }, symbol: "TB", toBase: 1e12, exact: true },
      { id: "KiB", name: { ar: "\u0643\u064A\u0628\u064A\u0628\u0627\u064A\u062A", en: "kibibyte" }, symbol: "KiB", toBase: 1024, exact: true },
      { id: "MiB", name: { ar: "\u0645\u064A\u0628\u064A\u0628\u0627\u064A\u062A", en: "mebibyte" }, symbol: "MiB", toBase: 1048576, exact: true },
      { id: "GiB", name: { ar: "\u062C\u064A\u0628\u064A\u0628\u0627\u064A\u062A", en: "gibibyte" }, symbol: "GiB", toBase: 1073741824, exact: true },
      { id: "TiB", name: { ar: "\u062A\u064A\u0628\u064A\u0628\u0627\u064A\u062A", en: "tebibyte" }, symbol: "TiB", toBase: 1099511627776, exact: true },
      { id: "bit", name: { ar: "\u0628\u062A", en: "bit" }, symbol: "bit", toBase: 1/8, exact: true }
    ]
  }
];

/* Temperature conversion functions */
REF.tempConvert = {
  toK: {
    K: function(v) { return v; },
    C: function(v) { return v + 273.15; },
    F: function(v) { return (v + 459.67) * 5/9; },
    R: function(v) { return v * 5/9; }
  },
  fromK: {
    K: function(v) { return v; },
    C: function(v) { return v - 273.15; },
    F: function(v) { return v * 9/5 - 459.67; },
    R: function(v) { return v * 9/5; }
  }
};
