/* js/convert.js — Conversion engine */
window.REF = window.REF || {};

REF.convert = (function() {
  'use strict';

  /**
   * Convert a value between units in the same category
   * Returns { result, factor, isExact, isTemperature }
   */
  function convertUnits(categoryId, fromUnitId, toUnitId, value) {
    var category = null;
    for (var i = 0; i < REF.unitCategories.length; i++) {
      if (REF.unitCategories[i].id === categoryId) {
        category = REF.unitCategories[i];
        break;
      }
    }
    if (!category) return null;

    // Temperature special case
    if (category.isTemperature) {
      return convertTemperature(fromUnitId, toUnitId, value);
    }

    var fromUnit = null, toUnit = null;
    for (var j = 0; j < category.units.length; j++) {
      if (category.units[j].id === fromUnitId) fromUnit = category.units[j];
      if (category.units[j].id === toUnitId) toUnit = category.units[j];
    }
    if (!fromUnit || !toUnit) return null;

    var baseValue = value * fromUnit.toBase;
    var result = baseValue / toUnit.toBase;

    // Clean floating-point errors
    result = parseFloat(result.toPrecision(12));

    var factor = fromUnit.toBase / toUnit.toBase;
    var isExact = fromUnit.exact && toUnit.exact;

    return {
      result: result,
      factor: factor,
      fromSymbol: fromUnit.symbol,
      toSymbol: toUnit.symbol,
      isExact: isExact,
      isTemperature: false
    };
  }

  function convertTemperature(fromId, toId, value) {
    if (fromId === toId) {
      return { result: value, factor: null, fromSymbol: '', toSymbol: '', isExact: true, isTemperature: true };
    }

    var toK = REF.tempConvert.toK[fromId];
    var fromK = REF.tempConvert.fromK[toId];

    if (!toK || !fromK) return null;

    var kValue = toK(value);
    var result = fromK(kValue);

    // Clean floating-point errors
    result = parseFloat(result.toPrecision(12));

    var symbols = { K: 'K', C: '\u00B0C', F: '\u00B0F', R: '\u00B0R' };

    return {
      result: result,
      factor: null,
      fromSymbol: symbols[fromId],
      toSymbol: symbols[toId],
      isExact: true,
      isTemperature: true
    };
  }

  /**
   * Resistor color code → value
   * bands: array of color IDs, bandCount: 4, 5, or 6
   */
  function colorToResistance(bands, bandCount) {
    var colors = REF.resistorColors;

    function findColor(id) {
      for (var i = 0; i < colors.length; i++) {
        if (colors[i].id === id) return colors[i];
      }
      return null;
    }

    if (bandCount === 4) {
      var d1 = findColor(bands[0]);
      var d2 = findColor(bands[1]);
      var mult = findColor(bands[2]);
      var tol = findColor(bands[3]);
      if (!d1 || !d2 || !mult || d1.digit === null || d2.digit === null || mult.multiplier === null) return null;
      var value = (d1.digit * 10 + d2.digit) * mult.multiplier;
      var tolerance = tol ? tol.tolerance : 20;
      return { value: value, tolerance: tolerance, tempCoeff: null };
    }

    if (bandCount === 5) {
      var d1b = findColor(bands[0]);
      var d2b = findColor(bands[1]);
      var d3b = findColor(bands[2]);
      var multb = findColor(bands[3]);
      var tolb = findColor(bands[4]);
      if (!d1b || !d2b || !d3b || !multb || d1b.digit === null || d2b.digit === null || d3b.digit === null || multb.multiplier === null) return null;
      var valueb = (d1b.digit * 100 + d2b.digit * 10 + d3b.digit) * multb.multiplier;
      var toleranceb = tolb ? tolb.tolerance : 20;
      return { value: valueb, tolerance: toleranceb, tempCoeff: null };
    }

    if (bandCount === 6) {
      var d1c = findColor(bands[0]);
      var d2c = findColor(bands[1]);
      var d3c = findColor(bands[2]);
      var multc = findColor(bands[3]);
      var tolc = findColor(bands[4]);
      var tempc = findColor(bands[5]);
      if (!d1c || !d2c || !d3c || !multc || d1c.digit === null || d2c.digit === null || d3c.digit === null || multc.multiplier === null) return null;
      var valuec = (d1c.digit * 100 + d2c.digit * 10 + d3c.digit) * multc.multiplier;
      var tolerancec = tolc ? tolc.tolerance : 20;
      var tempCoeffc = tempc ? tempc.tempCoeff : null;
      return { value: valuec, tolerance: tolerancec, tempCoeff: tempCoeffc };
    }

    return null;
  }

  /**
   * Value → resistor color bands (reverse)
   * Returns array of color IDs
   */
  function resistanceToColors(value, tolerancePercent, bandCount) {
    var colors = REF.resistorColors;

    function findByDigit(d) {
      for (var i = 0; i < colors.length; i++) {
        if (colors[i].digit === d) return colors[i].id;
      }
      return null;
    }

    function findByMultiplier(m) {
      for (var i = 0; i < colors.length; i++) {
        if (colors[i].multiplier !== null && Math.abs(colors[i].multiplier - m) < m * 1e-9) return colors[i].id;
      }
      return null;
    }

    function findByTolerance(t) {
      for (var i = 0; i < colors.length; i++) {
        if (colors[i].tolerance === t) return colors[i].id;
      }
      return 'none';
    }

    if (value <= 0) return null;

    if (bandCount === 4 || bandCount === undefined) {
      // 2 digits + multiplier + tolerance
      // Normalize: value = dd * 10^n
      var exp = Math.floor(Math.log10(value)) - 1;
      var sig = Math.round(value / Math.pow(10, exp));
      if (sig >= 100) { exp++; sig = Math.round(value / Math.pow(10, exp)); }
      var d1 = Math.floor(sig / 10);
      var d2 = sig % 10;
      var mult = Math.pow(10, exp);

      var c1 = findByDigit(d1);
      var c2 = findByDigit(d2);
      var cm = findByMultiplier(mult);
      var ct = findByTolerance(tolerancePercent || 5);

      if (!c1 || !c2 || !cm) return null;
      return [c1, c2, cm, ct];
    }

    if (bandCount === 5 || bandCount === 6) {
      // 3 digits + multiplier + tolerance
      var exp5 = Math.floor(Math.log10(value)) - 2;
      var sig5 = Math.round(value / Math.pow(10, exp5));
      if (sig5 >= 1000) { exp5++; sig5 = Math.round(value / Math.pow(10, exp5)); }
      var dd1 = Math.floor(sig5 / 100);
      var dd2 = Math.floor((sig5 % 100) / 10);
      var dd3 = sig5 % 10;
      var mult5 = Math.pow(10, exp5);

      var cc1 = findByDigit(dd1);
      var cc2 = findByDigit(dd2);
      var cc3 = findByDigit(dd3);
      var ccm = findByMultiplier(mult5);
      var cct = findByTolerance(tolerancePercent || 1);

      if (!cc1 || !cc2 || !cc3 || !ccm) return null;
      var result = [cc1, cc2, cc3, ccm, cct];
      if (bandCount === 6) {
        result.push('brown'); // default temp coeff 100 ppm/K
      }
      return result;
    }

    return null;
  }

  /**
   * SMD code → resistance value
   */
  function smdToResistance(code) {
    code = code.trim();

    // R-code: 4R7 = 4.7 Ω
    var rMatch = code.match(/^(\d+)[Rr](\d+)$/);
    if (rMatch) {
      return { value: parseFloat(rMatch[1] + '.' + rMatch[2]), type: 'R-code' };
    }

    // 3-digit code: 472 = 47 × 10^2 = 4700
    if (/^\d{3}$/.test(code)) {
      var sig3 = parseInt(code.substring(0, 2));
      var exp3 = parseInt(code.charAt(2));
      return { value: sig3 * Math.pow(10, exp3), type: '3-digit' };
    }

    // 4-digit code: 1002 = 100 × 10^2 = 10000
    if (/^\d{4}$/.test(code)) {
      var sig4 = parseInt(code.substring(0, 3));
      var exp4 = parseInt(code.charAt(3));
      return { value: sig4 * Math.pow(10, exp4), type: '4-digit' };
    }

    // EIA-96: 2-digit number + letter
    var eiaMatch = code.match(/^(\d{2})([A-Za-z])$/);
    if (eiaMatch) {
      var eiaCode = eiaMatch[1];
      var eiaLetter = eiaMatch[2].toUpperCase();
      var baseVal = REF.eia96Codes[eiaCode];
      var eiaMult = REF.eia96Multipliers[eiaLetter];
      if (baseVal !== undefined && eiaMult !== undefined) {
        return { value: baseVal * eiaMult, type: 'EIA-96' };
      }
    }

    return null;
  }

  /**
   * Find nearest standard value in an E-series
   */
  function nearestStandard(value, seriesName) {
    var series = REF.eSeries[seriesName];
    if (!series || value <= 0) return null;

    // Determine the decade
    var isE96 = seriesName === 'E96';
    var baseValues = series;

    var bestVal = null;
    var bestDiff = Infinity;

    // Check multiple decades
    for (var decade = -2; decade <= 10; decade++) {
      var mult = Math.pow(10, decade);
      var divisor = isE96 ? 100 : 10; // E96 base values are 100-976, others are 10-91
      for (var i = 0; i < baseValues.length; i++) {
        var candidate = (baseValues[i] / divisor) * mult;
        var diff = Math.abs(candidate - value) / value;
        if (diff < bestDiff) {
          bestDiff = diff;
          bestVal = candidate;
        }
      }
    }

    return { value: bestVal, diff: bestDiff };
  }

  /**
   * Ohm's law calculator: given any 2 of V, I, R → compute all + P
   */
  function ohmsLaw(params) {
    var V = params.V, I = params.I, R = params.R;
    var known = (V !== null && V !== undefined ? 1 : 0) +
                (I !== null && I !== undefined ? 1 : 0) +
                (R !== null && R !== undefined ? 1 : 0);
    if (known < 2) return null;

    if (V != null && I != null) { R = V / I; }
    else if (V != null && R != null) { I = V / R; }
    else if (I != null && R != null) { V = I * R; }

    var P = V * I;
    return { V: V, I: I, R: R, P: P };
  }

  /**
   * Series resistance
   */
  function resistorsSeries(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) sum += values[i];
    return sum;
  }

  /**
   * Parallel resistance
   */
  function resistorsParallel(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
      if (values[i] === 0) return 0;
      sum += 1 / values[i];
    }
    return sum === 0 ? Infinity : 1 / sum;
  }

  /**
   * Voltage divider
   */
  function voltageDivider(Vin, R1, R2) {
    return Vin * R2 / (R1 + R2);
  }

  /**
   * LED resistor
   */
  function ledResistor(Vs, Vf, If) {
    return (Vs - Vf) / If;
  }

  /**
   * RC/RL time constant
   */
  function timeConstantRC(R, C) { return R * C; }
  function timeConstantRL(L, R) { return L / R; }

  /**
   * Cutoff frequency
   */
  function cutoffRC(R, C) { return 1 / (2 * Math.PI * R * C); }
  function cutoffRL(R, L) { return R / (2 * Math.PI * L); }

  /**
   * Resonant frequency
   */
  function resonantFreq(L, C) { return 1 / (2 * Math.PI * Math.sqrt(L * C)); }

  /**
   * Vrms from Vpeak
   */
  function vrms(Vp) { return Vp / Math.sqrt(2); }

  /**
   * Logic gate functions
   */
  var gates = {
    AND: function(a, b) { return a & b; },
    OR: function(a, b) { return a | b; },
    NOT: function(a) { return a ? 0 : 1; },
    NAND: function(a, b) { return (a & b) ? 0 : 1; },
    NOR: function(a, b) { return (a | b) ? 0 : 1; },
    XOR: function(a, b) { return a ^ b; },
    XNOR: function(a, b) { return (a ^ b) ? 0 : 1; },
    BUFFER: function(a) { return a ? 1 : 0; }
  };

  /**
   * Number base conversion
   */
  function convertBase(value, fromBase, toBase) {
    var decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return null;
    return decimal.toString(toBase).toUpperCase();
  }

  /**
   * BJT switch calculator
   */
  function bjtSwitch(Vcc, Iload, beta, Vin) {
    var Vbe = 0.65; // typical silicon
    var VceSat = 0.2; // typical saturation
    var betaForced = 10; // overdrive factor
    var Ic = Iload;
    var Ib = Ic / betaForced;
    var Rb = (Vin - Vbe) / Ib;
    return {
      Ib: Ib,
      Rb: Rb,
      Ic: Ic,
      betaForced: betaForced,
      Vbe: Vbe,
      VceSat: VceSat,
      Pdissipated: VceSat * Ic
    };
  }

  return {
    convertUnits: convertUnits,
    colorToResistance: colorToResistance,
    resistanceToColors: resistanceToColors,
    smdToResistance: smdToResistance,
    nearestStandard: nearestStandard,
    ohmsLaw: ohmsLaw,
    resistorsSeries: resistorsSeries,
    resistorsParallel: resistorsParallel,
    voltageDivider: voltageDivider,
    ledResistor: ledResistor,
    timeConstantRC: timeConstantRC,
    timeConstantRL: timeConstantRL,
    cutoffRC: cutoffRC,
    cutoffRL: cutoffRL,
    resonantFreq: resonantFreq,
    vrms: vrms,
    gates: gates,
    convertBase: convertBase,
    bjtSwitch: bjtSwitch
  };
})();
