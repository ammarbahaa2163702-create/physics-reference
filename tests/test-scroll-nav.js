/**
 * Comprehensive verification script for in-page smooth-scroll navigation,
 * section IDs, scroll-margin-top CSS, and router console.warn behavior.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = path.resolve('c:/phisics/physics-reference');

// 1. Verify CSS scroll-margin-top
const baseCss = fs.readFileSync(path.join(baseDir, 'css/base.css'), 'utf-8');
if (!baseCss.includes('scroll-margin-top: calc(var(--header-h) + 16px)')) {
  console.error('FAIL: CSS missing scroll-margin-top with header offset');
  process.exit(1);
}
console.log('PASS: CSS base.css contains scroll-margin-top for section targets.');

// 2. Setup mock DOM environment in Node
const logs = { warn: [], log: [] };
const mockedLocation = {
  _hash: '#/units',
  get hash() { return this._hash; },
  set hash(val) {
    this._hash = val;
    if (this._onchange) this._onchange();
  }
};

const dom = {
  scrollCalls: [],
  elements: {},
  bodyListeners: {},
  documentListeners: {},
  windowListeners: {}
};

function createMockElement(tagName, id, className) {
  const el = {
    tagName: tagName.toUpperCase(),
    id: id || '',
    className: className || '',
    classList: {
      _classes: new Set(className ? className.split(' ') : []),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c) { if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c); },
      contains(c) { return this._classes.has(c); }
    },
    attributes: {},
    setAttribute(name, val) { this.attributes[name] = String(val); },
    getAttribute(name) { return this.attributes[name] !== undefined ? this.attributes[name] : null; },
    removeAttribute(name) { delete this.attributes[name]; },
    hasAttribute(name) { return this.attributes[name] !== undefined; },
    style: {},
    children: [],
    _innerHTML: '',
    get innerHTML() { return this._innerHTML; },
    set innerHTML(val) {
      this._innerHTML = val;
      parseChildren(this, val);
    },
    textContent: '',
    value: '',
    listeners: {},
    addEventListener(evt, fn) {
      this.listeners[evt] = this.listeners[evt] || [];
      this.listeners[evt].push(fn);
    },
    dispatchEvent(evt) {
      const fns = this.listeners[evt.type] || [];
      for (const fn of fns) fn.call(this, evt);
    },
    scrollIntoView(options) {
      dom.scrollCalls.push({ id: this.id, options });
    },
    querySelectorAll(selector) {
      return querySelectorAll(this, selector);
    },
    querySelector(selector) {
      const list = querySelectorAll(this, selector);
      return list[0] || null;
    },
    appendChild(child) {
      this.children.push(child);
      if (child.id) dom.elements[child.id] = child;
      return child;
    },
    contains(other) {
      return this === other;
    }
  };
  return el;
}

function parseChildren(parent, html) {
  // Simple regex parser to extract elements with id or class
  // specifically buttons and headings
  const idRegex = /<([a-zA-Z0-9]+)\s+[^>]*id=["']([^"']+)["'][^>]*>/g;
  let match;
  while ((match = idRegex.exec(html)) !== null) {
    const tag = match[1];
    const id = match[2];
    const el = createMockElement(tag, id);
    dom.elements[id] = el;
  }
}

function querySelectorAll(root, selector) {
  const results = [];
  const matchesSel = (el) => {
    if (selector === '.btn-scroll') return el.classList.contains('btn-scroll');
    if (selector.startsWith('#')) return el.id === selector.slice(1);
    return false;
  };

  // Check buttons inside innerHTML by regex
  if (selector === '.btn-scroll' && root._innerHTML) {
    const btnRegex = /<button\s+[^>]*class=["'][^"']*btn-scroll[^"']*["'][^>]*data-scroll-to=["']([^"']+)["'][^>]*>(.*?)<\/button>/g;
    let match;
    while ((match = btnRegex.exec(root._innerHTML)) !== null) {
      const targetId = match[1];
      const btn = createMockElement('button', '', 'btn btn-scroll');
      btn.setAttribute('data-scroll-to', targetId);
      btn.textContent = match[2];
      results.push(btn);
    }
  }
  return results;
}

// Build VM sandbox
const context = {
  window: {
    location: mockedLocation,
    addEventListener(evt, fn) {
      if (evt === 'hashchange') mockedLocation._onchange = fn;
    },
    scrollTo(x, y) {}
  },
  document: {
    documentElement: { lang: 'ar', dir: 'rtl' },
    getElementById(id) {
      if (!dom.elements[id]) {
        dom.elements[id] = createMockElement('div', id);
      }
      return dom.elements[id];
    },
    createElement(tag) {
      return createMockElement(tag);
    },
    createElementNS(ns, tag) {
      return createMockElement(tag);
    },
    addEventListener(evt, fn) {
      dom.documentListeners[evt] = dom.documentListeners[evt] || [];
      dom.documentListeners[evt].push(fn);
    }
  },
  console: {
    log(...args) { logs.log.push(args.join(' ')); },
    warn(...args) { logs.warn.push(args.join(' ')); },
    error(...args) { console.error(...args); }
  },
  localStorage: {
    getItem(k) { return null; },
    setItem(k, v) {}
  },
  Math,
  parseInt,
  parseFloat,
  isNaN,
  isFinite,
  String,
  Number,
  Array,
  Object,
  Set,
  Date,
  RegExp
};
context.window.window = context.window;
context.window.document = context.document;
context.REF = {};
context.window.REF = context.REF;
vm.createContext(context);

// Load all script files in exact order as index.html
const scripts = [
  'data/prefixes.js',
  'data/units.js',
  'data/constants.js',
  'data/formulas.js',
  'data/resistor-data.js',
  'data/symbols.js',
  'data/i18n.js',
  'js/format.js',
  'js/convert.js',
  'js/lib/svg.js',
  'js/pages/units.js',
  'js/pages/prefixes.js',
  'js/pages/constants.js',
  'js/pages/electricity.js',
  'js/pages/resistors.js',
  'js/pages/multimeter.js',
  'js/pages/semiconductors.js',
  'js/pages/logic.js',
  'js/pages/symbols.js',
  'js/pages/physics.js',
  'js/pages/si-units.js',
  'js/app.js'
];

for (const s of scripts) {
  const code = fs.readFileSync(path.join(baseDir, s), 'utf-8');
  vm.runInContext(code, context, { filename: s });
}

console.log('PASS: All application scripts loaded without syntax or evaluation errors.');

// 3. Test router fallback warning
logs.warn = [];
context.window.location.hash = '#/unknown-route-test';
const hasWarn = logs.warn.some(w => w.includes('[Router] Unregistered or unknown route hash'));
if (!hasWarn) {
  console.error('FAIL: app.js did not log console.warn for unknown route!');
  process.exit(1);
}
console.log('PASS: Router logs console.warn on unregistered hash:', logs.warn[0]);

// 4. Test page section buttons across all pages
const pagesToTest = [
  { page: 'electricity', name: 'الكهرباء: قوانين وحاسبات' },
  { page: 'multimeter', name: 'استخدام الأفوميتر (DMM)' },
  { page: 'semiconductors', name: 'الدايود والترانزستور' },
  { page: 'resistors', name: 'المقاومات وكود الألوان' },
  { page: 'logic', name: 'البوابات المنطقية' },
  { page: 'physics', name: 'قوانين فيزيائية' },
  { page: 'si-units', name: 'الوحدات والتحليل البُعدي' },
  { page: 'prefixes', name: 'البادئات والصيغة الهندسية' }
];

let totalButtonsTested = 0;

for (const pt of pagesToTest) {
  const container = createMockElement('div', 'page-' + pt.page);
  // Clear elements for this page
  dom.elements = {};
  container.id = 'page-' + pt.page;
  dom.elements[container.id] = container;

  context.REF.pages[pt.page].render(container);

  // Find all buttons with data-scroll-to in this container
  const btnRegex = /<button\s+[^>]*class=["'][^"']*btn-scroll[^"']*["'][^>]*data-scroll-to=["']([^"']+)["'][^>]*>(.*?)<\/button>/g;
  let match;
  const foundTargets = [];
  while ((match = btnRegex.exec(container._innerHTML)) !== null) {
    foundTargets.push({ targetId: match[1], label: match[2].trim() });
  }

  if (foundTargets.length === 0) {
    console.error(`FAIL: Page ${pt.page} has no .btn-scroll buttons!`);
    process.exit(1);
  }

  console.log(`\nTesting page [${pt.page}] (${pt.name}) - ${foundTargets.length} quick-scroll buttons:`);

  for (const item of foundTargets) {
    totalButtonsTested++;
    const targetId = item.targetId;

    // Check if target element exists in rendered HTML
    // It should exist as an id="targetId"
    const targetExists = dom.elements[targetId] ||
      new RegExp(`id=["']${targetId}["']`).test(container._innerHTML) ||
      Object.values(dom.elements).some(el => new RegExp(`id=["']${targetId}["']`).test(el._innerHTML));
    if (!targetExists) {
      console.error(`  FAIL: Button target ID "${targetId}" not found in page HTML!`);
      process.exit(1);
    }

    // Test calling REF.scrollToSection
    dom.scrollCalls = [];
    const hashBefore = context.window.location.hash;

    // Simulate clicking the button
    const targetEl = createMockElement('h2', targetId);
    dom.elements[targetId] = targetEl;

    context.REF.scrollToSection(targetId);

    const hashAfter = context.window.location.hash;

    // Verify hash did NOT change
    if (hashBefore !== hashAfter) {
      console.error(`  FAIL: Button changed window.location.hash from "${hashBefore}" to "${hashAfter}"!`);
      process.exit(1);
    }

    // Verify scrollIntoView called with smooth
    if (dom.scrollCalls.length === 0 || dom.scrollCalls[0].id !== targetId) {
      console.error(`  FAIL: scrollIntoView was not called on target "${targetId}"!`);
      process.exit(1);
    }
    const opts = dom.scrollCalls[0].options;
    if (!opts || opts.behavior !== 'smooth' || opts.block !== 'start') {
      console.error(`  FAIL: scrollIntoView called with incorrect options:`, opts);
      process.exit(1);
    }

    console.log(`  ✓ Button [${item.label}] -> targets #${targetId} (smooth scroll confirmed, hash unchanged: ${hashAfter})`);
  }
}

console.log(`\n========================================`);
console.log(`ALL TESTS PASSED!`);
console.log(`Total section quick-jump buttons tested across 8 pages: ${totalButtonsTested}`);
console.log(`========================================`);
