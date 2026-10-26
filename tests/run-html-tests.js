const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve('c:/phisics/physics-reference');
const html = fs.readFileSync(path.join(baseDir, 'tests/tests.html'), 'utf-8');

// Extract test script from tests.html
const scriptMatch = html.match(/<!-- Test Suite Script -->\s*<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('Could not find test script in tests.html');
  process.exit(1);
}
const testScript = scriptMatch[1];

const context = {
  window: {},
  document: {
    getElementById(id) {
      return {
        set innerHTML(val) { this._innerHTML = val; },
        get innerHTML() { return this._innerHTML || ''; }
      };
    }
  },
  console: console,
  Math,
  parseInt,
  parseFloat,
  isNaN,
  isFinite,
  String,
  Number,
  Array,
  Object,
  Date,
  RegExp
};
context.window = context;
context.REF = {};
context.window.REF = context.REF;
vm.createContext(context);

// Load the exact scripts specified in tests.html
const scripts = [
  'data/prefixes.js',
  'data/units.js',
  'data/resistor-data.js',
  'data/constants.js',
  'data/formulas.js',
  'data/symbols.js',
  'data/i18n.js',
  'js/format.js',
  'js/convert.js',
  'js/lib/svg.js'
];

for (const s of scripts) {
  const code = fs.readFileSync(path.join(baseDir, s), 'utf-8');
  vm.runInContext(code, context, { filename: s });
}

// Expose tests on window before IIFE ends
const wrappedScript = testScript.replace(
  'document.getElementById(\'test-results\').innerHTML = html;',
  'window.__tests = tests; document.getElementById(\'test-results\').innerHTML = html;'
);

vm.runInContext(wrappedScript, context);

const tests = context.window.__tests || [];
let passedCount = 0;
let failedCount = 0;
const failures = [];

for (const t of tests) {
  if (t.passed) {
    passedCount++;
  } else {
    failedCount++;
    failures.push(t);
  }
}

console.log(`\n========================================`);
console.log(`TESTS.HTML RESULTS:`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
console.log(`Total:  ${tests.length}`);
console.log(`========================================`);

if (failures.length > 0) {
  console.error('\nFailures detected:');
  for (const f of failures) {
    console.error(`- [${f.category}] ${f.name}`);
    console.error(`    Expected: ${f.expected}`);
    console.error(`    Actual:   ${f.actual}`);
  }
  process.exit(1);
} else {
  console.log('ALL TESTS IN tests.html PASSED WITH 0 FAILURES!');
}
