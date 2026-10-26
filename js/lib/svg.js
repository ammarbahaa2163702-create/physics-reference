/* js/lib/svg.js — SVG drawing helpers for circuit symbols and resistor display */
window.REF = window.REF || {};

REF.svg = (function() {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, children) {
    var e = document.createElementNS(NS, tag);
    if (attrs) {
      for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      }
    }
    if (children) {
      if (typeof children === 'string') { e.textContent = children; }
      else if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          if (children[i]) e.appendChild(children[i]);
        }
      }
    }
    return e;
  }

  function svg(w, h, viewBox, children) {
    return el('svg', {
      width: w, height: h,
      viewBox: viewBox || ('0 0 ' + w + ' ' + h),
      'class': 'circuit-svg',
      'xmlns': NS
    }, children);
  }

  function line(x1, y1, x2, y2, cls) {
    return el('line', { x1:x1, y1:y1, x2:x2, y2:y2, 'class': cls || 'stroke' });
  }

  function rect(x, y, w, h, cls) {
    return el('rect', { x:x, y:y, width:w, height:h, 'class': cls || 'stroke' });
  }

  function circle(cx, cy, r, cls) {
    return el('circle', { cx:cx, cy:cy, r:r, 'class': cls || 'stroke' });
  }

  function path(d, cls) {
    return el('path', { d: d, 'class': cls || 'stroke' });
  }

  function text(x, y, str, cls, anchor) {
    var t = el('text', { x:x, y:y, 'class': cls || '', 'text-anchor': anchor || 'middle', 'dominant-baseline': 'middle' }, str);
    return t;
  }

  /**
   * Draw a resistor body with colored bands
   * Returns an SVG element
   */
  function drawResistor(bands, bandCount) {
    var w = 300, h = 80;
    var s = svg(w, h, '0 0 300 80');

    // Lead wires
    s.appendChild(line(0, 40, 60, 40, 'stroke'));
    s.appendChild(line(240, 40, 300, 40, 'stroke'));

    // Body
    var body = el('rect', {
      x: 60, y: 15, width: 180, height: 50, rx: 8, ry: 8,
      fill: '#d4c9a8', stroke: 'var(--text)', 'stroke-width': '1.5'
    });
    s.appendChild(body);

    if (!bands || !bands.length) return s;

    // Band positions
    var positions4 = [85, 115, 145, 200];
    var positions5 = [78, 100, 122, 148, 200];
    var positions6 = [78, 98, 118, 142, 198, 220];

    var positions;
    if (bandCount === 6) positions = positions6;
    else if (bandCount === 5) positions = positions5;
    else positions = positions4;

    var colors = REF.resistorColors;

    for (var i = 0; i < bands.length && i < positions.length; i++) {
      var colorId = bands[i];
      if (colorId === 'none') continue;

      var colorObj = null;
      for (var j = 0; j < colors.length; j++) {
        if (colors[j].id === colorId) { colorObj = colors[j]; break; }
      }
      if (!colorObj || !colorObj.color) continue;

      var bandWidth = 12;
      var bandRect = el('rect', {
        x: positions[i] - bandWidth/2, y: 16, width: bandWidth, height: 48, rx: 1,
        fill: colorObj.color,
        stroke: colorObj.id === 'white' ? '#999' : 'none',
        'stroke-width': colorObj.id === 'white' ? '0.5' : '0'
      });
      s.appendChild(bandRect);
    }

    return s;
  }

  /**
   * Draw Ohm's triangle (V, I, R)
   */
  function drawOhmTriangle() {
    var s = svg(120, 100, '0 0 120 100');
    // Triangle
    s.appendChild(path('M 60 5 L 110 90 L 10 90 Z', 'stroke'));
    // Horizontal divider
    s.appendChild(line(28, 55, 92, 55, 'stroke'));
    // V on top
    s.appendChild(text(60, 35, 'V', 'fill'));
    // I bottom left, R bottom right
    s.appendChild(text(40, 75, 'I', 'fill'));
    s.appendChild(text(80, 75, 'R', 'fill'));
    // Multiply sign between I and R
    s.appendChild(text(60, 75, '\u00D7', 'fill'));
    return s;
  }

  /**
   * Circuit symbol renderers — returns SVG element for each symbol
   * Each renders in a 120x60 viewBox for consistency
   */
  var symbolRenderers = {
    // --- PASSIVE ---
    resistor: function(style) {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      if (style === 'iec') {
        // IEC: rectangle
        s.appendChild(rect(30, 18, 60, 24, 'stroke'));
      } else {
        // ANSI: zigzag
        s.appendChild(path('M 30 30 L 37.5 15 L 52.5 45 L 67.5 15 L 82.5 45 L 90 30', 'stroke'));
      }
      return s;
    },
    resistor_var: function(style) {
      var s = symbolRenderers.resistor(style);
      // Arrow through
      s.appendChild(path('M 40 50 L 80 10', 'stroke'));
      s.appendChild(path('M 74 10 L 80 10 L 80 16', 'stroke'));
      return s;
    },
    potentiometer: function(style) {
      var s = symbolRenderers.resistor(style);
      // Arrow (wiper) from top
      s.appendChild(line(60, 0, 60, 18, 'stroke'));
      s.appendChild(path('M 55 14 L 60 20 L 65 14', 'stroke'));
      return s;
    },
    capacitor: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 50, 30, 'stroke'));
      s.appendChild(line(70, 30, 120, 30, 'stroke'));
      s.appendChild(line(50, 10, 50, 50, 'stroke'));
      s.appendChild(line(70, 10, 70, 50, 'stroke'));
      return s;
    },
    capacitor_pol: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 50, 30, 'stroke'));
      s.appendChild(line(70, 30, 120, 30, 'stroke'));
      s.appendChild(line(50, 10, 50, 50, 'stroke'));
      // Curved plate for polarized
      s.appendChild(path('M 70 10 Q 62 30 70 50', 'stroke'));
      // + sign
      s.appendChild(text(38, 14, '+', 'fill'));
      return s;
    },
    capacitor_var: function() {
      var s = symbolRenderers.capacitor();
      s.appendChild(path('M 40 50 L 80 10', 'stroke'));
      s.appendChild(path('M 74 10 L 80 10 L 80 16', 'stroke'));
      return s;
    },
    inductor: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 25, 30, 'stroke'));
      s.appendChild(line(95, 30, 120, 30, 'stroke'));
      // Humps
      var d = 'M 25 30';
      for (var i = 0; i < 4; i++) {
        var cx = 30 + i * 17.5;
        d += ' A 8.75 8.75 0 0 1 ' + (cx + 17.5) + ' 30';
      }
      s.appendChild(path(d, 'stroke'));
      return s;
    },
    inductor_core: function() {
      var s = symbolRenderers.inductor();
      // Two parallel lines for core
      s.appendChild(line(30, 46, 90, 46, 'stroke'));
      s.appendChild(line(30, 50, 90, 50, 'stroke'));
      return s;
    },
    transformer: function() {
      var s = svg(120, 80, '0 0 120 80');
      // Primary
      var d1 = 'M 20 10';
      for (var i = 0; i < 4; i++) d1 += ' A 7 7 0 0 1 20 ' + (10 + (i+1)*15);
      s.appendChild(path(d1, 'stroke'));
      // Core lines
      s.appendChild(line(55, 5, 55, 75, 'stroke'));
      s.appendChild(line(62, 5, 62, 75, 'stroke'));
      // Secondary
      var d2 = 'M 97 10';
      for (var j = 0; j < 4; j++) d2 += ' A 7 7 0 0 0 97 ' + (10 + (j+1)*15);
      s.appendChild(path(d2, 'stroke'));
      // Terminals
      s.appendChild(line(0, 10, 20, 10, 'stroke'));
      s.appendChild(line(0, 70, 20, 70, 'stroke'));
      s.appendChild(line(97, 10, 120, 10, 'stroke'));
      s.appendChild(line(97, 70, 120, 70, 'stroke'));
      return s;
    },

    // --- SOURCES ---
    cell: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 50, 30, 'stroke'));
      s.appendChild(line(70, 30, 120, 30, 'stroke'));
      s.appendChild(line(50, 12, 50, 48, 'stroke'));
      s.appendChild(line(70, 20, 70, 40, 'stroke'));
      s.appendChild(text(44, 8, '+', 'fill'));
      return s;
    },
    battery: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 35, 30, 'stroke'));
      s.appendChild(line(85, 30, 120, 30, 'stroke'));
      // 3 cells
      var xs = [35, 50, 65];
      for (var i = 0; i < 3; i++) {
        s.appendChild(line(xs[i], 12, xs[i], 48, 'stroke'));
        s.appendChild(line(xs[i]+10, 20, xs[i]+10, 40, 'stroke'));
      }
      s.appendChild(text(29, 8, '+', 'fill'));
      return s;
    },
    dc_source: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      s.appendChild(circle(60, 30, 25, 'stroke'));
      s.appendChild(text(50, 25, '+', 'fill'));
      s.appendChild(text(70, 35, '\u2212', 'fill'));
      return s;
    },
    ac_source: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      s.appendChild(circle(60, 30, 25, 'stroke'));
      s.appendChild(path('M 47 30 Q 53 18 60 30 Q 67 42 73 30', 'stroke'));
      return s;
    },
    current_source: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      s.appendChild(circle(60, 30, 25, 'stroke'));
      s.appendChild(line(48, 30, 72, 30, 'stroke'));
      s.appendChild(path('M 66 25 L 72 30 L 66 35', 'stroke'));
      return s;
    },
    controlled_source: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      // Diamond shape
      s.appendChild(path('M 60 5 L 90 30 L 60 55 L 30 30 Z', 'stroke'));
      return s;
    },

    // --- GROUNDS ---
    earth: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(30, 0, 30, 25, 'stroke'));
      s.appendChild(line(10, 25, 50, 25, 'stroke'));
      s.appendChild(line(16, 33, 44, 33, 'stroke'));
      s.appendChild(line(22, 41, 38, 41, 'stroke'));
      return s;
    },
    chassis: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(30, 0, 30, 25, 'stroke'));
      s.appendChild(line(10, 25, 50, 25, 'stroke'));
      s.appendChild(line(10, 25, 20, 40, 'stroke'));
      s.appendChild(line(30, 25, 30, 40, 'stroke'));
      s.appendChild(line(50, 25, 40, 40, 'stroke'));
      return s;
    },
    signal_gnd: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(30, 0, 30, 20, 'stroke'));
      s.appendChild(path('M 10 20 L 30 45 L 50 20 Z', 'stroke'));
      return s;
    },

    // --- SEMICONDUCTORS ---
    diode: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 45, 30, 'stroke'));
      s.appendChild(line(75, 30, 120, 30, 'stroke'));
      // Triangle
      s.appendChild(path('M 45 15 L 45 45 L 75 30 Z', 'stroke fill'));
      // Cathode bar
      s.appendChild(line(75, 15, 75, 45, 'stroke'));
      return s;
    },
    led: function() {
      var s = symbolRenderers.diode();
      // Arrows for light emission
      s.appendChild(path('M 62 10 L 72 3', 'stroke'));
      s.appendChild(path('M 67 5 L 72 3 L 68 8', 'stroke'));
      s.appendChild(path('M 55 13 L 65 6', 'stroke'));
      s.appendChild(path('M 60 8 L 65 6 L 61 11', 'stroke'));
      return s;
    },
    zener: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 45, 30, 'stroke'));
      s.appendChild(line(75, 30, 120, 30, 'stroke'));
      s.appendChild(path('M 45 15 L 45 45 L 75 30 Z', 'stroke fill'));
      // Zener cathode (bent ends)
      s.appendChild(path('M 70 15 L 75 15 L 75 45 L 80 45', 'stroke'));
      return s;
    },
    schottky: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 45, 30, 'stroke'));
      s.appendChild(line(75, 30, 120, 30, 'stroke'));
      s.appendChild(path('M 45 15 L 45 45 L 75 30 Z', 'stroke fill'));
      // Schottky cathode (S-shaped)
      s.appendChild(path('M 70 15 L 75 15 L 75 45 L 80 45', 'stroke'));
      s.appendChild(path('M 70 15 L 70 20', 'stroke'));
      s.appendChild(path('M 80 45 L 80 40', 'stroke'));
      return s;
    },
    photodiode: function() {
      var s = symbolRenderers.diode();
      // Arrows pointing in (light received)
      s.appendChild(path('M 50 5 L 58 15', 'stroke'));
      s.appendChild(path('M 50 5 L 56 6 L 53 10', 'stroke'));
      s.appendChild(path('M 44 10 L 52 20', 'stroke'));
      s.appendChild(path('M 44 10 L 50 11 L 47 15', 'stroke'));
      return s;
    },
    npn: function() {
      var s = svg(100, 80, '0 0 100 80');
      // Base line
      s.appendChild(line(0, 40, 35, 40, 'stroke'));
      s.appendChild(line(35, 15, 35, 65, 'stroke'));
      // Collector
      s.appendChild(line(35, 25, 70, 5, 'stroke'));
      s.appendChild(line(70, 5, 70, 0, 'stroke'));
      // Emitter with arrow
      s.appendChild(line(35, 55, 70, 75, 'stroke'));
      s.appendChild(line(70, 75, 70, 80, 'stroke'));
      // Arrow on emitter (pointing away)
      s.appendChild(path('M 58 68 L 70 75 L 62 63', 'stroke fill'));
      // Labels
      s.appendChild(text(80, 5, 'C', 'fill', 'start'));
      s.appendChild(text(80, 78, 'E', 'fill', 'start'));
      s.appendChild(text(5, 55, 'B', 'fill', 'start'));
      return s;
    },
    pnp: function() {
      var s = svg(100, 80, '0 0 100 80');
      s.appendChild(line(0, 40, 35, 40, 'stroke'));
      s.appendChild(line(35, 15, 35, 65, 'stroke'));
      s.appendChild(line(35, 25, 70, 5, 'stroke'));
      s.appendChild(line(70, 5, 70, 0, 'stroke'));
      s.appendChild(line(35, 55, 70, 75, 'stroke'));
      s.appendChild(line(70, 75, 70, 80, 'stroke'));
      // Arrow on emitter (pointing toward base)
      s.appendChild(path('M 42 52 L 35 55 L 45 60', 'stroke fill'));
      s.appendChild(text(80, 5, 'C', 'fill', 'start'));
      s.appendChild(text(80, 78, 'E', 'fill', 'start'));
      s.appendChild(text(5, 55, 'B', 'fill', 'start'));
      return s;
    },
    nmos: function() {
      var s = svg(100, 80, '0 0 100 80');
      // Gate
      s.appendChild(line(0, 40, 25, 40, 'stroke'));
      s.appendChild(line(25, 15, 25, 65, 'stroke'));
      // Channel line
      s.appendChild(line(32, 15, 32, 65, 'stroke'));
      // Source, Drain, Body connections
      s.appendChild(line(32, 20, 60, 20, 'stroke'));
      s.appendChild(line(60, 20, 60, 0, 'stroke'));
      s.appendChild(line(32, 60, 60, 60, 'stroke'));
      s.appendChild(line(60, 60, 60, 80, 'stroke'));
      s.appendChild(line(32, 40, 60, 40, 'stroke'));
      s.appendChild(line(60, 40, 60, 60, 'stroke'));
      // Arrow on source
      s.appendChild(path('M 45 45 L 40 40 L 45 35', 'stroke fill'));
      s.appendChild(text(72, 5, 'D', 'fill', 'start'));
      s.appendChild(text(72, 78, 'S', 'fill', 'start'));
      s.appendChild(text(5, 55, 'G', 'fill', 'start'));
      return s;
    },
    pmos: function() {
      var s = svg(100, 80, '0 0 100 80');
      s.appendChild(line(0, 40, 25, 40, 'stroke'));
      s.appendChild(line(25, 15, 25, 65, 'stroke'));
      s.appendChild(line(32, 15, 32, 65, 'stroke'));
      s.appendChild(line(32, 20, 60, 20, 'stroke'));
      s.appendChild(line(60, 20, 60, 0, 'stroke'));
      s.appendChild(line(32, 60, 60, 60, 'stroke'));
      s.appendChild(line(60, 60, 60, 80, 'stroke'));
      s.appendChild(line(32, 40, 60, 40, 'stroke'));
      s.appendChild(line(60, 40, 60, 20, 'stroke'));
      // Arrow pointing OUT from channel (P-type)
      s.appendChild(path('M 53 35 L 58 40 L 53 45', 'stroke fill'));
      // Bubble on gate
      s.appendChild(circle(28, 40, 3, 'stroke'));
      s.appendChild(text(72, 5, 'S', 'fill', 'start'));
      s.appendChild(text(72, 78, 'D', 'fill', 'start'));
      s.appendChild(text(5, 55, 'G', 'fill', 'start'));
      return s;
    },
    jfet: function() {
      var s = svg(100, 80, '0 0 100 80');
      s.appendChild(line(0, 40, 35, 40, 'stroke'));
      s.appendChild(line(35, 10, 35, 70, 'stroke'));
      s.appendChild(line(35, 10, 60, 10, 'stroke'));
      s.appendChild(line(60, 10, 60, 0, 'stroke'));
      s.appendChild(line(35, 70, 60, 70, 'stroke'));
      s.appendChild(line(60, 70, 60, 80, 'stroke'));
      // Arrow on gate
      s.appendChild(path('M 25 40 L 35 40', 'stroke'));
      s.appendChild(path('M 30 35 L 35 40 L 30 45', 'stroke fill'));
      return s;
    },
    scr: function() {
      var s = svg(120, 80, '0 0 120 80');
      s.appendChild(line(0, 40, 40, 40, 'stroke'));
      s.appendChild(line(80, 40, 120, 40, 'stroke'));
      s.appendChild(path('M 40 20 L 40 60 L 80 40 Z', 'stroke fill'));
      s.appendChild(line(80, 20, 80, 60, 'stroke'));
      // Gate
      s.appendChild(line(60, 50, 60, 75, 'stroke'));
      s.appendChild(text(65, 75, 'G', 'fill', 'start'));
      return s;
    },
    triac: function() {
      var s = svg(120, 80, '0 0 120 80');
      s.appendChild(line(0, 40, 35, 40, 'stroke'));
      s.appendChild(line(85, 40, 120, 40, 'stroke'));
      // Two triangles facing each other
      s.appendChild(path('M 35 20 L 35 60 L 60 40 Z', 'stroke'));
      s.appendChild(path('M 85 20 L 85 60 L 60 40 Z', 'stroke'));
      // Gate
      s.appendChild(line(75, 55, 75, 75, 'stroke'));
      return s;
    },

    // --- SWITCHES ---
    spst: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 40, 40, 40, 'stroke'));
      s.appendChild(line(80, 40, 120, 40, 'stroke'));
      s.appendChild(circle(40, 40, 3, 'stroke fill'));
      s.appendChild(circle(80, 40, 3, 'stroke fill'));
      s.appendChild(line(40, 40, 75, 22, 'stroke'));
      return s;
    },
    spdt: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 35, 40, 35, 'stroke'));
      s.appendChild(circle(40, 35, 3, 'stroke fill'));
      s.appendChild(circle(80, 18, 3, 'stroke fill'));
      s.appendChild(circle(80, 52, 3, 'stroke fill'));
      s.appendChild(line(80, 18, 120, 18, 'stroke'));
      s.appendChild(line(80, 52, 120, 52, 'stroke'));
      s.appendChild(line(40, 35, 77, 18, 'stroke'));
      return s;
    },
    pushbutton_no: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 40, 40, 40, 'stroke'));
      s.appendChild(line(80, 40, 120, 40, 'stroke'));
      s.appendChild(circle(40, 40, 3, 'stroke fill'));
      s.appendChild(circle(80, 40, 3, 'stroke fill'));
      s.appendChild(line(35, 25, 85, 25, 'stroke'));
      s.appendChild(line(60, 25, 60, 15, 'stroke'));
      return s;
    },
    pushbutton_nc: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 40, 40, 40, 'stroke'));
      s.appendChild(line(80, 40, 120, 40, 'stroke'));
      s.appendChild(circle(40, 40, 3, 'stroke fill'));
      s.appendChild(circle(80, 40, 3, 'stroke fill'));
      s.appendChild(line(40, 40, 80, 40, 'stroke'));
      s.appendChild(line(35, 25, 85, 25, 'stroke'));
      s.appendChild(line(60, 25, 60, 15, 'stroke'));
      return s;
    },
    relay: function() {
      var s = svg(120, 80, '0 0 120 80');
      // Coil
      s.appendChild(rect(10, 40, 40, 30, 'stroke'));
      s.appendChild(text(30, 55, 'K', 'fill'));
      // Switch contacts
      s.appendChild(line(70, 60, 110, 60, 'stroke'));
      s.appendChild(circle(70, 60, 3, 'stroke fill'));
      s.appendChild(circle(110, 60, 3, 'stroke fill'));
      s.appendChild(line(70, 60, 105, 42, 'stroke'));
      // Connection lines
      s.appendChild(line(10, 70, 10, 80, 'stroke'));
      s.appendChild(line(50, 70, 50, 80, 'stroke'));
      return s;
    },
    fuse: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 30, 30, 'stroke'));
      s.appendChild(line(90, 30, 120, 30, 'stroke'));
      s.appendChild(rect(30, 20, 60, 20, 'stroke'));
      s.appendChild(path('M 35 30 Q 60 20 85 30', 'stroke'));
      return s;
    },
    breaker: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 40, 40, 40, 'stroke'));
      s.appendChild(line(80, 40, 120, 40, 'stroke'));
      s.appendChild(circle(40, 40, 3, 'stroke fill'));
      s.appendChild(circle(80, 40, 3, 'stroke fill'));
      s.appendChild(line(40, 40, 75, 15, 'stroke'));
      // X mark
      s.appendChild(line(55, 20, 65, 30, 'stroke'));
      s.appendChild(line(65, 20, 55, 30, 'stroke'));
      return s;
    },

    // --- LOADS ---
    lamp: function() {
      var s = svg(80, 60, '0 0 80 60');
      s.appendChild(line(0, 30, 20, 30, 'stroke'));
      s.appendChild(line(60, 30, 80, 30, 'stroke'));
      s.appendChild(circle(40, 30, 18, 'stroke'));
      // X inside
      s.appendChild(line(28, 18, 52, 42, 'stroke'));
      s.appendChild(line(52, 18, 28, 42, 'stroke'));
      return s;
    },
    motor: function() {
      var s = svg(80, 60, '0 0 80 60');
      s.appendChild(line(0, 30, 20, 30, 'stroke'));
      s.appendChild(line(60, 30, 80, 30, 'stroke'));
      s.appendChild(circle(40, 30, 18, 'stroke'));
      s.appendChild(text(40, 30, 'M', 'fill'));
      return s;
    },
    generator: function() {
      var s = svg(80, 60, '0 0 80 60');
      s.appendChild(line(0, 30, 20, 30, 'stroke'));
      s.appendChild(line(60, 30, 80, 30, 'stroke'));
      s.appendChild(circle(40, 30, 18, 'stroke'));
      s.appendChild(text(40, 30, 'G', 'fill'));
      return s;
    },
    speaker: function() {
      var s = svg(100, 60, '0 0 100 60');
      s.appendChild(line(0, 25, 20, 25, 'stroke'));
      s.appendChild(line(0, 35, 20, 35, 'stroke'));
      s.appendChild(rect(20, 18, 20, 24, 'stroke'));
      s.appendChild(path('M 40 18 L 70 5 L 70 55 L 40 42 Z', 'stroke'));
      return s;
    },
    buzzer: function() {
      var s = svg(80, 60, '0 0 80 60');
      s.appendChild(line(0, 30, 20, 30, 'stroke'));
      s.appendChild(line(60, 30, 80, 30, 'stroke'));
      s.appendChild(circle(40, 30, 18, 'stroke'));
      s.appendChild(text(40, 25, '\u266A', 'fill'));
      return s;
    },
    crystal: function() {
      var s = svg(120, 60, '0 0 120 60');
      s.appendChild(line(0, 30, 40, 30, 'stroke'));
      s.appendChild(line(80, 30, 120, 30, 'stroke'));
      s.appendChild(line(40, 12, 40, 48, 'stroke'));
      s.appendChild(line(80, 12, 80, 48, 'stroke'));
      s.appendChild(rect(50, 15, 20, 30, 'stroke'));
      return s;
    },
    thermistor: function(style) {
      var s = symbolRenderers.resistor(style);
      // T with line
      s.appendChild(text(60, 56, 'T', 'fill'));
      return s;
    },
    ldr: function(style) {
      var s = symbolRenderers.resistor(style);
      // Arrows (light)
      s.appendChild(path('M 38 8 L 48 16', 'stroke'));
      s.appendChild(path('M 43 7 L 48 5 L 46 11', 'stroke'));
      s.appendChild(path('M 30 14 L 40 22', 'stroke'));
      s.appendChild(path('M 35 13 L 40 11 L 38 17', 'stroke'));
      return s;
    },

    // --- MEASUREMENT ---
    ammeter: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(circle(30, 30, 22, 'stroke'));
      s.appendChild(text(30, 30, 'A', 'fill'));
      return s;
    },
    voltmeter: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(circle(30, 30, 22, 'stroke'));
      s.appendChild(text(30, 30, 'V', 'fill'));
      return s;
    },
    ohmmeter: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(circle(30, 30, 22, 'stroke'));
      s.appendChild(text(30, 30, '\u03A9', 'fill'));
      return s;
    },

    // --- MISC ---
    opamp: function() {
      var s = svg(120, 80, '0 0 120 80');
      s.appendChild(path('M 20 5 L 20 75 L 100 40 Z', 'stroke'));
      // Inputs
      s.appendChild(line(0, 25, 20, 25, 'stroke'));
      s.appendChild(line(0, 55, 20, 55, 'stroke'));
      // Output
      s.appendChild(line(100, 40, 120, 40, 'stroke'));
      // + and - labels
      s.appendChild(text(28, 55, '+', 'fill', 'start'));
      s.appendChild(text(28, 25, '\u2212', 'fill', 'start'));
      return s;
    },
    wire_connected: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(0, 30, 60, 30, 'stroke'));
      s.appendChild(line(30, 0, 30, 60, 'stroke'));
      var dot = circle(30, 30, 4, 'fill');
      s.appendChild(dot);
      return s;
    },
    wire_notconnected: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(0, 30, 25, 30, 'stroke'));
      s.appendChild(line(35, 30, 60, 30, 'stroke'));
      s.appendChild(path('M 30 0 L 30 25 Q 30 30 35 30', 'stroke'));
      s.appendChild(line(30, 35, 30, 60, 'stroke'));
      return s;
    },
    antenna: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(30, 60, 30, 25, 'stroke'));
      s.appendChild(line(10, 5, 30, 25, 'stroke'));
      s.appendChild(line(50, 5, 30, 25, 'stroke'));
      return s;
    },
    connector: function() {
      var s = svg(60, 60, '0 0 60 60');
      s.appendChild(line(0, 30, 20, 30, 'stroke'));
      s.appendChild(circle(30, 30, 8, 'stroke'));
      s.appendChild(circle(30, 30, 3, 'fill'));
      return s;
    }
  };

  /**
   * Draw a logic gate (ANSI style)
   */
  function drawGate(gateType, aVal, bVal) {
    var s = svg(140, 80, '0 0 140 80');
    var outVal;

    switch (gateType) {
      case 'NOT':
        s.appendChild(line(0, 40, 30, 40, 'stroke'));
        s.appendChild(path('M 30 15 L 30 65 L 90 40 Z', 'stroke'));
        s.appendChild(circle(95, 40, 5, 'stroke'));
        s.appendChild(line(100, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.NOT(aVal);
        break;
      case 'BUFFER':
        s.appendChild(line(0, 40, 30, 40, 'stroke'));
        s.appendChild(path('M 30 15 L 30 65 L 90 40 Z', 'stroke'));
        s.appendChild(line(90, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.BUFFER(aVal);
        break;
      case 'AND':
        s.appendChild(line(0, 25, 30, 25, 'stroke'));
        s.appendChild(line(0, 55, 30, 55, 'stroke'));
        s.appendChild(path('M 30 10 L 30 70 L 60 70 A 30 30 0 0 0 60 10 Z', 'stroke'));
        s.appendChild(line(90, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.AND(aVal, bVal);
        break;
      case 'OR':
        s.appendChild(line(0, 25, 38, 25, 'stroke'));
        s.appendChild(line(0, 55, 38, 55, 'stroke'));
        s.appendChild(path('M 25 10 Q 50 40 25 70 Q 60 70 90 40 Q 60 10 25 10 Z', 'stroke'));
        s.appendChild(line(90, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.OR(aVal, bVal);
        break;
      case 'NAND':
        s.appendChild(line(0, 25, 30, 25, 'stroke'));
        s.appendChild(line(0, 55, 30, 55, 'stroke'));
        s.appendChild(path('M 30 10 L 30 70 L 60 70 A 30 30 0 0 0 60 10 Z', 'stroke'));
        s.appendChild(circle(93, 40, 5, 'stroke'));
        s.appendChild(line(98, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.NAND(aVal, bVal);
        break;
      case 'NOR':
        s.appendChild(line(0, 25, 38, 25, 'stroke'));
        s.appendChild(line(0, 55, 38, 55, 'stroke'));
        s.appendChild(path('M 25 10 Q 50 40 25 70 Q 60 70 90 40 Q 60 10 25 10 Z', 'stroke'));
        s.appendChild(circle(93, 40, 5, 'stroke'));
        s.appendChild(line(98, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.NOR(aVal, bVal);
        break;
      case 'XOR':
        s.appendChild(line(0, 25, 38, 25, 'stroke'));
        s.appendChild(line(0, 55, 38, 55, 'stroke'));
        s.appendChild(path('M 20 10 Q 45 40 20 70', 'stroke'));
        s.appendChild(path('M 25 10 Q 50 40 25 70 Q 60 70 90 40 Q 60 10 25 10 Z', 'stroke'));
        s.appendChild(line(90, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.XOR(aVal, bVal);
        break;
      case 'XNOR':
        s.appendChild(line(0, 25, 38, 25, 'stroke'));
        s.appendChild(line(0, 55, 38, 55, 'stroke'));
        s.appendChild(path('M 20 10 Q 45 40 20 70', 'stroke'));
        s.appendChild(path('M 25 10 Q 50 40 25 70 Q 60 70 90 40 Q 60 10 25 10 Z', 'stroke'));
        s.appendChild(circle(93, 40, 5, 'stroke'));
        s.appendChild(line(98, 40, 140, 40, 'stroke'));
        outVal = REF.convert.gates.XNOR(aVal, bVal);
        break;
    }

    return { svg: s, output: outVal };
  }

  return {
    el: el,
    svg: svg,
    line: line,
    rect: rect,
    circle: circle,
    path: path,
    text: text,
    drawResistor: drawResistor,
    drawOhmTriangle: drawOhmTriangle,
    drawGate: drawGate,
    symbols: symbolRenderers
  };
})();
