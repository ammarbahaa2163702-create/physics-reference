/* data/symbols.js — Circuit symbol definitions for SVG rendering */
window.REF = window.REF || {};

REF.circuitSymbols = {
  passive: [
    { id: "resistor", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629", en: "Resistor" }, hasVariants: true },
    { id: "resistor_var", name: { ar: "\u0645\u0642\u0627\u0648\u0645\u0629 \u0645\u062A\u063A\u064A\u0631\u0629 (\u0631\u064A\u0648\u0633\u062A\u0627\u062A)", en: "Variable Resistor (Rheostat)" } },
    { id: "potentiometer", name: { ar: "\u0628\u0648\u062A\u0646\u0634\u064A\u0648\u0645\u062A\u0631", en: "Potentiometer" } },
    { id: "capacitor", name: { ar: "\u0645\u0643\u062B\u0641", en: "Capacitor" } },
    { id: "capacitor_pol", name: { ar: "\u0645\u0643\u062B\u0641 \u0625\u0644\u0643\u062A\u0631\u0648\u0644\u064A\u062A\u064A (\u0642\u0637\u0628\u064A)", en: "Electrolytic Capacitor (Polarized)" } },
    { id: "capacitor_var", name: { ar: "\u0645\u0643\u062B\u0641 \u0645\u062A\u063A\u064A\u0631", en: "Variable Capacitor" } },
    { id: "inductor", name: { ar: "\u0645\u0644\u0641", en: "Inductor" } },
    { id: "inductor_core", name: { ar: "\u0645\u0644\u0641 \u0628\u0642\u0644\u0628 \u062D\u062F\u064A\u062F", en: "Iron Core Inductor" } },
    { id: "transformer", name: { ar: "\u0645\u062D\u0648\u0644", en: "Transformer" } },
  ],
  sources: [
    { id: "cell", name: { ar: "\u062E\u0644\u064A\u0629", en: "Cell" } },
    { id: "battery", name: { ar: "\u0628\u0637\u0627\u0631\u064A\u0629", en: "Battery" } },
    { id: "dc_source", name: { ar: "\u0645\u0635\u062F\u0631 \u062C\u0647\u062F DC", en: "DC Voltage Source" } },
    { id: "ac_source", name: { ar: "\u0645\u0635\u062F\u0631 \u062C\u0647\u062F AC", en: "AC Voltage Source" } },
    { id: "current_source", name: { ar: "\u0645\u0635\u062F\u0631 \u062A\u064A\u0627\u0631", en: "Current Source" } },
    { id: "controlled_source", name: { ar: "\u0645\u0635\u062F\u0631 \u0645\u064F\u062A\u062D\u0643\u0651\u064E\u0645", en: "Controlled Source" } },
  ],
  grounds: [
    { id: "earth", name: { ar: "\u0623\u0631\u0636\u064A (earth)", en: "Earth Ground" } },
    { id: "chassis", name: { ar: "\u0647\u064A\u0643\u0644 (chassis)", en: "Chassis Ground" } },
    { id: "signal_gnd", name: { ar: "\u0625\u0634\u0627\u0631\u0629 (signal)", en: "Signal Ground" } },
  ],
  semiconductors: [
    { id: "diode", name: { ar: "\u062F\u0627\u064A\u0648\u062F", en: "Diode" } },
    { id: "led", name: { ar: "LED", en: "LED" } },
    { id: "zener", name: { ar: "\u062F\u0627\u064A\u0648\u062F \u0632\u064A\u0646\u0631", en: "Zener Diode" } },
    { id: "schottky", name: { ar: "\u062F\u0627\u064A\u0648\u062F \u0634\u0648\u062A\u0643\u064A", en: "Schottky Diode" } },
    { id: "photodiode", name: { ar: "\u0641\u0648\u062A\u0648\u062F\u0627\u064A\u0648\u062F", en: "Photodiode" } },
    { id: "npn", name: { ar: "NPN BJT", en: "NPN BJT" } },
    { id: "pnp", name: { ar: "PNP BJT", en: "PNP BJT" } },
    { id: "nmos", name: { ar: "N-MOSFET", en: "N-MOSFET" } },
    { id: "pmos", name: { ar: "P-MOSFET", en: "P-MOSFET" } },
    { id: "jfet", name: { ar: "JFET", en: "JFET" } },
    { id: "scr", name: { ar: "\u062A\u064A\u0631\u0633\u062A\u0648\u0631/SCR", en: "Thyristor/SCR" } },
    { id: "triac", name: { ar: "\u062A\u0631\u0627\u064A\u0627\u0643", en: "TRIAC" } },
  ],
  switches: [
    { id: "spst", name: { ar: "\u0645\u0641\u062A\u0627\u062D SPST", en: "SPST Switch" } },
    { id: "spdt", name: { ar: "\u0645\u0641\u062A\u0627\u062D SPDT", en: "SPDT Switch" } },
    { id: "pushbutton_no", name: { ar: "\u0632\u0631 \u0636\u063A\u0637 NO", en: "Push Button NO" } },
    { id: "pushbutton_nc", name: { ar: "\u0632\u0631 \u0636\u063A\u0637 NC", en: "Push Button NC" } },
    { id: "relay", name: { ar: "\u0631\u064A\u0644\u064A\u0647", en: "Relay" } },
    { id: "fuse", name: { ar: "\u0641\u064A\u0648\u0632", en: "Fuse" } },
    { id: "breaker", name: { ar: "\u0642\u0627\u0637\u0639", en: "Circuit Breaker" } },
  ],
  loads: [
    { id: "lamp", name: { ar: "\u0644\u0645\u0628\u0629", en: "Lamp" } },
    { id: "motor", name: { ar: "\u0645\u0648\u062A\u0648\u0631", en: "Motor" } },
    { id: "generator", name: { ar: "\u0645\u0648\u0644\u062F", en: "Generator" } },
    { id: "speaker", name: { ar: "\u0633\u0645\u0627\u0639\u0629", en: "Speaker" } },
    { id: "buzzer", name: { ar: "\u062C\u0631\u0633/\u0628\u0627\u0632\u0631", en: "Buzzer" } },
    { id: "crystal", name: { ar: "\u0643\u0631\u064A\u0633\u062A\u0627\u0644", en: "Crystal" } },
    { id: "thermistor", name: { ar: "\u062B\u0631\u0645\u064A\u0633\u062A\u0648\u0631", en: "Thermistor" } },
    { id: "ldr", name: { ar: "LDR", en: "LDR" } },
  ],
  measurement: [
    { id: "ammeter", name: { ar: "\u0623\u0645\u064A\u062A\u0631", en: "Ammeter" } },
    { id: "voltmeter", name: { ar: "\u0641\u0648\u0644\u062A\u0645\u064A\u062A\u0631", en: "Voltmeter" } },
    { id: "ohmmeter", name: { ar: "\u0623\u0648\u0645\u064A\u062A\u0631", en: "Ohmmeter" } },
  ],
  misc: [
    { id: "opamp", name: { ar: "\u0645\u0643\u0628\u0631 \u0639\u0645\u0644\u064A\u0627\u062A", en: "Op-Amp" } },
    { id: "wire_connected", name: { ar: "\u062A\u0642\u0627\u0637\u0639 \u0645\u062A\u0635\u0644", en: "Connected Junction" } },
    { id: "wire_notconnected", name: { ar: "\u062A\u0642\u0627\u0637\u0639 \u063A\u064A\u0631 \u0645\u062A\u0635\u0644", en: "Not Connected" } },
    { id: "antenna", name: { ar: "\u0647\u0648\u0627\u0626\u064A", en: "Antenna" } },
    { id: "connector", name: { ar: "\u0645\u0648\u0635\u0644", en: "Connector" } },
  ]
};
