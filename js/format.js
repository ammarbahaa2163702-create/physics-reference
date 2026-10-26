/* js/format.js — Number formatting, SI prefix parsing, engineering notation */
window.REF = window.REF || {};

REF.format = (function() {
  'use strict';

  /**
   * Parse user input that may contain SI prefixes like 4.7k, 10u, 2.2M, 1e-6
   * Returns a number or NaN
   */
  function parseInput(str) {
    if (typeof str !== 'string') return Number(str);
    str = str.trim();
    if (str === '') return NaN;

    // Replace common unicode chars
    str = str.replace(/\u00B5/g, 'u').replace(/\u03BC/g, 'u');
    // Remove spaces, commas
    str = str.replace(/,/g, '').replace(/\s/g, '');

    // Try direct parse first (handles 1e-6, plain numbers)
    var directVal = Number(str);
    if (!isNaN(directVal)) return directVal;

    // Try R-code for resistors: 4R7 = 4.7
    var rMatch = str.match(/^(\d+)[Rr](\d+)$/);
    if (rMatch) {
      return parseFloat(rMatch[1] + '.' + rMatch[2]);
    }

    // Try SI prefix at end: 4.7k, 10u, 2.2M, etc.
    var prefixMatch = str.match(/^([0-9]*\.?[0-9]+)\s*([a-zA-Z\u00B5\u03BC])$/);
    if (prefixMatch) {
      var num = parseFloat(prefixMatch[1]);
      var pfx = prefixMatch[2];
      if (pfx === 'u') pfx = '\u00B5';
      var mult = REF.engPrefixes[pfx];
      if (mult !== undefined) {
        return num * mult;
      }
    }

    return NaN;
  }

  /**
   * Format a number with given significant figures, auto-switch to scientific
   * notation for very large/small numbers. Clean floating point errors.
   */
  function formatNumber(value, sigFigs) {
    if (typeof sigFigs === 'undefined') sigFigs = 10;
    if (sigFigs < 1) sigFigs = 1;
    if (sigFigs > 15) sigFigs = 15;
    if (value === 0) return '0';
    if (!isFinite(value)) return String(value);

    // Clean floating point errors by rounding to 12 sig figs first
    var cleaned = parseFloat(value.toPrecision(12));

    var absVal = Math.abs(cleaned);

    // Use scientific notation for very large or very small
    if (absVal >= 1e12 || (absVal < 1e-4 && absVal > 0)) {
      return cleaned.toExponential(sigFigs - 1);
    }

    // For normal range, use toPrecision but strip trailing zeros
    var str = cleaned.toPrecision(sigFigs);

    // If it contains '.', strip trailing zeros (but keep at least one digit after decimal)
    if (str.indexOf('.') !== -1) {
      str = str.replace(/0+$/, '');
      str = str.replace(/\.$/, '');
    }

    return str;
  }

  /**
   * Format for copy: scientific notation format like 6.62607015e-34
   */
  function formatForCopy(value) {
    if (value === 0) return '0';
    if (!isFinite(value)) return String(value);
    var absVal = Math.abs(value);
    if (absVal >= 1e6 || (absVal < 0.01 && absVal > 0)) {
      return value.toExponential();
    }
    return String(parseFloat(value.toPrecision(15)));
  }

  /**
   * Format to engineering notation with SI prefix (e.g., 4.7 k\u03A9)
   */
  function toEngineering(value, unitSymbol) {
    if (value === 0) return '0 ' + (unitSymbol || '');
    var absVal = Math.abs(value);
    var sign = value < 0 ? '-' : '';

    // Find appropriate prefix
    var prefixes = [
      { exp: 30, sym: 'Q' }, { exp: 27, sym: 'R' }, { exp: 24, sym: 'Y' },
      { exp: 21, sym: 'Z' }, { exp: 18, sym: 'E' }, { exp: 15, sym: 'P' },
      { exp: 12, sym: 'T' }, { exp: 9, sym: 'G' }, { exp: 6, sym: 'M' },
      { exp: 3, sym: 'k' }, { exp: 0, sym: '' },
      { exp: -3, sym: 'm' }, { exp: -6, sym: '\u00B5' }, { exp: -9, sym: 'n' },
      { exp: -12, sym: 'p' }, { exp: -15, sym: 'f' }, { exp: -18, sym: 'a' }
    ];

    for (var i = 0; i < prefixes.length; i++) {
      var p = prefixes[i];
      if (absVal >= Math.pow(10, p.exp) || p.exp === -18) {
        var scaled = absVal / Math.pow(10, p.exp);
        // Clean the scaled value
        scaled = parseFloat(scaled.toPrecision(4));
        var result = sign + scaled + ' ' + p.sym + (unitSymbol || '');
        return result;
      }
    }
    return sign + absVal + ' ' + (unitSymbol || '');
  }

  /**
   * From engineering notation: parse "4.7 k\u03A9" into { value: 4700, unit: "\u03A9" }
   */
  function fromEngineering(str) {
    str = str.trim();
    // Remove common unit symbols at the end
    var unitMatch = str.match(/[\u03A9VFHAWs]$/);
    var unit = unitMatch ? unitMatch[0] : '';
    if (unit) {
      str = str.slice(0, -unit.length).trim();
    }
    var value = parseInput(str);
    return { value: value, unit: unit };
  }

  /**
   * Copy text to clipboard with fallback
   */
  function copyToClipboard(text, btn) {
    var lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = REF.i18n.copied[lang];
        setTimeout(function() { btn.textContent = orig; }, 1200);
      }
    } catch(e) {
      // silent fail
    }
  }

  return {
    parseInput: parseInput,
    formatNumber: formatNumber,
    formatForCopy: formatForCopy,
    toEngineering: toEngineering,
    fromEngineering: fromEngineering,
    copyToClipboard: copyToClipboard
  };
})();
