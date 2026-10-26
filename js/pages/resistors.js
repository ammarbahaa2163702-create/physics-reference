/* js/pages/resistors.js — Resistor Color Codes, SMD, E-Series, & Practical Info */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.resistors = (function() {
  'use strict';

  var bandCount = 4;
  var currentBands = ['yellow', 'violet', 'red', 'gold'];

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navResistors') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'قارئ ألوان المقاومات التفاعلي (4، 5، 6 أشرطة)، أكواد SMD، وسلاسل القيم المعيارية E-series.' : 'Interactive resistor color band reader, SMD codes, and standard E-series values.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-color">' + REF.t('colorCode') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-smd">' + REF.t('smdCode') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-eseries">' + REF.t('eSeries') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-info">' + REF.t('resistorInfo') + '</button>' +
      '</div>';

    // ==========================================
    // (A) Interactive Color Code Reader
    // ==========================================
    html += '<h2 id="sec-color">' + REF.t('colorCode') + '</h2>';

    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">' +
      '<div class="input-group" style="width: 150px;">' +
      '<label for="res-band-count">' + (isAr ? 'عدد الأشرطة' : 'Number of bands') + '</label>' +
      '<select id="res-band-count">' +
      '<option value="4"' + (bandCount === 4 ? ' selected' : '') + '>4 ' + REF.t('bands') + '</option>' +
      '<option value="5"' + (bandCount === 5 ? ' selected' : '') + '>5 ' + REF.t('bands') + '</option>' +
      '<option value="6"' + (bandCount === 6 ? ' selected' : '') + '>6 ' + REF.t('bands') + '</option>' +
      '</select>' +
      '</div>' +
      '<div class="note-box" style="margin: 0; padding: 6px 12px; font-size: 0.8rem;">' + REF.t('readDirection') + '</div>' +
      '</div>';

    // Realistic SVG Resistor Display
    html += '<div id="resistor-svg-container" style="text-align: center; margin: 16px 0; overflow-x: auto;"></div>';

    // Band selectors
    html += '<div id="band-selectors-row" class="input-row" style="margin-bottom: 16px;"></div>';

    // Result Display
    html += '<div class="result-box">' +
      '<div>' +
      '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">' + REF.t('resistanceValue') + '</div>' +
      '<div id="res-calc-value" class="result-value">---</div>' +
      '</div>' +
      '<div id="res-e-warning" style="margin-inline-start: auto; font-size: 0.82rem;"></div>' +
      '<button type="button" id="res-copy-btn" class="btn btn-copy" style="margin-inline-start: 12px;">' + REF.t('copy') + '</button>' +
      '</div>';

    // Reverse Mode (Value -> Colors)
    html += '<div style="margin-top: 20px; border-top: 1px solid var(--border-light); padding-top: 16px;">' +
      '<h4>' + REF.t('reverseMode') + '</h4>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 140px;">' +
      '<label for="rev-val">' + REF.t('value') + '</label>' +
      '<input type="text" id="rev-val" value="4.7k" placeholder="e.g. 2.2k, 100, 470k" class="mono">' +
      '</div>' +
      '<div class="input-group" style="width: 110px;">' +
      '<label for="rev-tol">' + REF.t('tolerance') + '</label>' +
      '<select id="rev-tol">' +
      '<option value="5" selected>±5% (Gold)</option>' +
      '<option value="1">±1% (Brown)</option>' +
      '<option value="2">±2% (Red)</option>' +
      '<option value="10">±10% (Silver)</option>' +
      '</select>' +
      '</div>' +
      '<div class="input-group" style="width: auto;">' +
      '<button type="button" id="btn-calc-reverse" class="btn" style="height: 33px;">' + REF.t('calculate') + '</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Color Code Standard Table (IEC 60062)
    html += '<h3 style="margin-top: 24px;">' + (isAr ? 'جدول ألوان المقاومات القياسي (IEC 60062)' : 'Resistor Color Code Reference (IEC 60062)') + '</h3>' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'اللون' : 'Color') + '</th>' +
      '<th>' + (isAr ? 'الرقم' : 'Digit') + '</th>' +
      '<th>' + (isAr ? 'المضاعف' : 'Multiplier') + '</th>' +
      '<th>' + (isAr ? 'التسامح' : 'Tolerance') + '</th>' +
      '<th>' + (isAr ? 'معامل الحرارة (ppm/K)' : 'Temp. Coeff.') + '</th>' +
      '</tr></thead><tbody>';

    var cList = REF.resistorColors;
    for (var i = 0; i < cList.length; i++) {
      var c = cList[i];
      var swatch = c.color ? '<span style="display:inline-block; width:12px; height:12px; vertical-align:middle; margin-inline-end:6px; background:' + c.color + '; border:1px solid #999;"></span>' : '';
      var digitStr = c.digit !== null ? c.digit : '—';
      var multStr = c.multiplier !== null ? '×10' + (Math.round(Math.log10(c.multiplier)) === 0 ? '⁰' : '^' + Math.round(Math.log10(c.multiplier))) : '—';
      if (c.id === 'gold') multStr = '×10⁻¹';
      if (c.id === 'silver') multStr = '×10⁻²';
      var tolStr = c.tolerance !== null ? '±' + c.tolerance + '%' : '—';
      var tcStr = c.tempCoeff !== null ? c.tempCoeff : '—';

      html += '<tr>' +
        '<td>' + swatch + (c.name[lang] || c.name.en) + ' <span class="text-muted text-small">(' + c.name.en + ')</span></td>' +
        '<td class="mono col-num">' + digitStr + '</td>' +
        '<td class="mono col-num">' + multStr + '</td>' +
        '<td class="mono col-num">' + tolStr + '</td>' +
        '<td class="mono col-num">' + tcStr + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';

    // ==========================================
    // (B) SMD Codes
    // ==========================================
    html += '<h2 id="sec-smd" style="margin-top: 32px;">' + REF.t('smdCode') + '</h2>' +
      '<div class="calc-card">' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل كود المقاومة السطحية SMD (مثل 472 أو 1002 أو 4R7 أو 01A):' : 'Enter SMD resistor code (e.g. 472, 1002, 4R7, or 01A):') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="width: 180px;">' +
      '<label for="smd-input">' + (isAr ? 'كود SMD' : 'SMD Code') + '</label>' +
      '<input type="text" id="smd-input" value="472" class="mono">' +
      '</div>' +
      '<div class="input-group" style="flex: 1 1 200px;">' +
      '<label>' + REF.t('result') + '</label>' +
      '<div class="result-box" style="margin: 0; padding: 4px 10px; height: 33px; align-items: center;">' +
      '<span id="smd-result" class="result-value mono" style="font-size:1.05rem;">4.7 kΩ</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div style="margin-top: 12px; font-size: 0.85rem; line-height: 1.6;">' +
      '<strong>' + (isAr ? 'أنظمة أكواد SMD الشائعة:' : 'Common SMD Code Systems:') + '</strong>' +
      '<ul style="padding-inline-start: 20px;">' +
      '<li><strong>3-digit (±5%):</strong> <span class="mono">472</span> = 47 × 10² = 4.7 kΩ؛ <span class="mono">103</span> = 10 × 10³ = 10 kΩ</li>' +
      '<li><strong>4-digit (±1%):</strong> <span class="mono">1002</span> = 100 × 10² = 10 kΩ؛ <span class="mono">4701</span> = 4.7 kΩ</li>' +
      '<li><strong>R-code:</strong> حرف R يمثل الفاصلة العشرية: <span class="mono">4R7</span> = 4.7 Ω؛ <span class="mono">0R22</span> = 0.22 Ω</li>' +
      '<li><strong>EIA-96 (±1%):</strong> رقمان يحددان القيمة من جدول E96 + حرف للمضاعف: <span class="mono">01A</span> = 100 × 1 = 100 Ω</li>' +
      '</ul>' +
      '</div>' +
      '</div>';

    // ==========================================
    // (C) Standard Value Series (IEC 60063)
    // ==========================================
    html += '<h2 id="sec-eseries" style="margin-top: 32px;">' + REF.t('eSeries') + ' (IEC 60063)</h2>' +
      '<div class="calc-card">' +
      '<h3>' + REF.t('nearestStd') + '</h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل قيمة محسوبة لإيجاد أقرب قيمة معيارية متوفرة في الأسواق:' : 'Find the nearest commercially available standard resistor value:') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 140px;">' +
      '<label for="std-calc-input">' + REF.t('value') + '</label>' +
      '<input type="text" id="std-calc-input" value="4.5k" class="mono">' +
      '</div>' +
      '<div class="input-group" style="width: 120px;">' +
      '<label for="std-calc-series">' + (isAr ? 'السلسلة' : 'Series') + '</label>' +
      '<select id="std-calc-series">' +
      '<option value="E24" selected>E24 (±5%)</option>' +
      '<option value="E12">E12 (±10%)</option>' +
      '<option value="E6">E6 (±20%)</option>' +
      '<option value="E96">E96 (±1%)</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '<div class="result-box"><div id="std-calc-res" class="result-value">---</div></div>' +
      '</div>';

    // Tables of E6, E12, E24
    html += '<h3 style="margin-top: 20px;">' + (isAr ? 'قيم سلاسل E6 و E12 و E24 الأساسية' : 'Base Values of E6, E12, and E24') + '</h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'كل القيم أدناه تتكرر بمضاعفات × 10ⁿ (تسامح E6 ±20%، E12 ±10%، E24 ±5%):' : 'All base values multiply by 10ⁿ:') + '</p>' +
      '<table><thead><tr><th>' + (isAr ? 'السلسلة' : 'Series') + '</th><th>' + (isAr ? 'العدد' : 'Count') + '</th><th>' + (isAr ? 'القيم الأساسية' : 'Base Values') + '</th></tr></thead><tbody>' +
      '<tr><td><strong>E6</strong> (±20%)</td><td class="mono col-num">6</td><td class="mono">' + REF.eSeries.E6.join('  ') + '</td></tr>' +
      '<tr><td><strong>E12</strong> (±10%)</td><td class="mono col-num">12</td><td class="mono">' + REF.eSeries.E12.join('  ') + '</td></tr>' +
      '<tr><td><strong>E24</strong> (±5%)</td><td class="mono col-num">24</td><td class="mono" style="font-size:0.85rem;">' + REF.eSeries.E24.join('  ') + '</td></tr>' +
      '</tbody></table>';

    // ==========================================
    // (D) Practical Information
    // ==========================================
    html += '<h2 id="sec-info" style="margin-top: 32px;">' + REF.t('resistorInfo') + '</h2>' +
      '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'مقارنة أنواع المقاومات الشائعة' : 'Comparison of Resistor Types') + '</h3>' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'النوع' : 'Type') + '</th>' +
      '<th>' + REF.t('tolerance') + '</th>' +
      '<th>' + REF.t('tempCoeff') + '</th>' +
      '<th>' + (isAr ? 'الاستخدام النموذجي' : 'Typical Usage') + '</th>' +
      '</tr></thead><tbody>';

    var rTypes = REF.resistorTypes;
    for (var rt = 0; rt < rTypes.length; rt++) {
      html += '<tr>' +
        '<td><strong>' + (rTypes[rt].type[lang] || rTypes[rt].type.en) + '</strong></td>' +
        '<td class="mono">' + rTypes[rt].tolerance + '</td>' +
        '<td>' + (rTypes[rt].tempCoeff[lang] || rTypes[rt].tempCoeff.en) + '</td>' +
        '<td>' + (rTypes[rt].use[lang] || rTypes[rt].use.en) + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>' +
      '<div class="note-box" style="margin-top: 16px;">' +
      '<h4>' + (isAr ? 'قاعدة اختيار قدرة المقاومة (Power Rating Rule):' : 'Power Rating Selection Rule:') + '</h4>' +
      '<p style="font-size: 0.88rem; line-height: 1.6;">' +
      (isAr ?
        'القدرات المعتادة: 1/8 W (0.125 W)، 1/4 W (0.25 W)، 1/2 W (0.5 W)، 1 W، 2 W... <strong>القاعدة الهندسية:</strong> اختر مقاومة بقدرة تساوي على الأقل ضعف (2×) القدرة المحسوبة الفعلية (P = I²R) لتجنب السخونة وارتفاع نسبة الفشل وتغير قيمة المقاومة مع الحرارة.' :
        'Standard power ratings: 1/8 W (0.125 W), 1/4 W (0.25 W), 1/2 W (0.5 W), 1 W, 2 W... <strong>Engineering Rule:</strong> Choose a resistor rated for at least twice (2×) the calculated dissipated power (P = I²R) to prevent overheating and drift.') +
      '</p>' +
      '</div>' +
      '</div>';

    container.innerHTML = html;

    // Hook events for color code reader
    var bandCountSelect = document.getElementById('res-band-count');
    var selectorsRow = document.getElementById('band-selectors-row');
    var svgContainer = document.getElementById('resistor-svg-container');
    var calcValueEl = document.getElementById('res-calc-value');
    var eWarnEl = document.getElementById('res-e-warning');
    var copyBtn = document.getElementById('res-copy-btn');

    function renderBandSelectors() {
      selectorsRow.innerHTML = '';
      var digitColors = REF.resistorColors.filter(function(c) { return c.digit !== null; });
      var multColors = REF.resistorColors.filter(function(c) { return c.multiplier !== null; });
      var tolColors = REF.resistorColors.filter(function(c) { return c.tolerance !== null; });
      var tcColors = REF.resistorColors.filter(function(c) { return c.tempCoeff !== null; });

      var count = bandCount;
      // Adjust currentBands array length
      if (count === 4 && currentBands.length !== 4) {
        currentBands = [currentBands[0] || 'yellow', currentBands[1] || 'violet', currentBands[2] || 'red', currentBands[3] || 'gold'];
      } else if (count === 5 && currentBands.length !== 5) {
        currentBands = [currentBands[0] || 'yellow', currentBands[1] || 'violet', 'black', currentBands[2] || 'red', currentBands[3] || 'brown'];
      } else if (count === 6 && currentBands.length !== 6) {
        currentBands = [currentBands[0] || 'yellow', currentBands[1] || 'violet', 'black', currentBands[2] || 'red', currentBands[3] || 'brown', 'brown'];
      }

      function createSelect(labelStr, items, selValue, bandIdx) {
        var grp = document.createElement('div');
        grp.className = 'input-group';
        grp.style.flex = '1 1 110px';
        var lbl = document.createElement('label');
        lbl.textContent = labelStr;
        var sel = document.createElement('select');
        sel.className = 'band-sel';
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var opt = document.createElement('option');
          opt.value = item.id;
          opt.textContent = item.name[lang] || item.name.en;
          if (item.id === selValue) opt.selected = true;
          sel.appendChild(opt);
        }
        sel.addEventListener('change', function() {
          currentBands[bandIdx] = sel.value;
          updateColorReader();
        });
        grp.appendChild(lbl);
        grp.appendChild(sel);
        return grp;
      }

      if (count === 4) {
        selectorsRow.appendChild(createSelect(REF.t('band1'), digitColors, currentBands[0], 0));
        selectorsRow.appendChild(createSelect(REF.t('band2'), digitColors, currentBands[1], 1));
        selectorsRow.appendChild(createSelect(REF.t('multiplier'), multColors, currentBands[2], 2));
        selectorsRow.appendChild(createSelect(REF.t('toleranceBand'), tolColors, currentBands[3], 3));
      } else if (count === 5) {
        selectorsRow.appendChild(createSelect(REF.t('band1'), digitColors, currentBands[0], 0));
        selectorsRow.appendChild(createSelect(REF.t('band2'), digitColors, currentBands[1], 1));
        selectorsRow.appendChild(createSelect(REF.t('band3'), digitColors, currentBands[2], 2));
        selectorsRow.appendChild(createSelect(REF.t('multiplier'), multColors, currentBands[3], 3));
        selectorsRow.appendChild(createSelect(REF.t('toleranceBand'), tolColors, currentBands[4], 4));
      } else if (count === 6) {
        selectorsRow.appendChild(createSelect(REF.t('band1'), digitColors, currentBands[0], 0));
        selectorsRow.appendChild(createSelect(REF.t('band2'), digitColors, currentBands[1], 1));
        selectorsRow.appendChild(createSelect(REF.t('band3'), digitColors, currentBands[2], 2));
        selectorsRow.appendChild(createSelect(REF.t('multiplier'), multColors, currentBands[3], 3));
        selectorsRow.appendChild(createSelect(REF.t('toleranceBand'), tolColors, currentBands[4], 4));
        selectorsRow.appendChild(createSelect(REF.t('tempCoeff'), tcColors, currentBands[5], 5));
      }
    }

    function updateColorReader() {
      svgContainer.innerHTML = '';
      svgContainer.appendChild(REF.svg.drawResistor(currentBands, bandCount));

      var res = REF.convert.colorToResistance(currentBands, bandCount);
      if (!res) {
        calcValueEl.textContent = '---';
        eWarnEl.innerHTML = '';
        return;
      }

      var engVal = REF.format.toEngineering(res.value, 'Ω');
      var outStr = engVal + ' ±' + res.tolerance + '%';
      if (res.tempCoeff) outStr += ' (' + res.tempCoeff + ' ppm/K)';
      calcValueEl.innerHTML = '<span class="ltr-inline">' + outStr + '</span>';

      // Check standard value
      var nearest = REF.convert.nearestStandard(res.value, 'E24');
      if (nearest && nearest.diff > 0.02) {
        eWarnEl.innerHTML = '<span class="status-badge" style="background:#fff3e0; color:#b06000;">' +
          (isAr ? 'قيمة غير قياسية في E24 (الأقرب: ' + REF.format.toEngineering(nearest.value, 'Ω') + ')' : 'Non-standard E24 (nearest: ' + REF.format.toEngineering(nearest.value, 'Ω') + ')') + '</span>';
      } else {
        eWarnEl.innerHTML = '<span class="status-badge status-pass">' + (isAr ? 'قيمة قياسية E24' : 'Standard E24 value') + '</span>';
      }
    }

    bandCountSelect.addEventListener('change', function() {
      bandCount = parseInt(bandCountSelect.value, 10);
      renderBandSelectors();
      updateColorReader();
    });

    copyBtn.addEventListener('click', function() {
      var res = REF.convert.colorToResistance(currentBands, bandCount);
      if (res) {
        REF.format.copyToClipboard(REF.format.toEngineering(res.value, 'Ω'), copyBtn);
      }
    });

    // Reverse calculation
    var revValInput = document.getElementById('rev-val');
    var revTolSelect = document.getElementById('rev-tol');
    var revBtn = document.getElementById('btn-calc-reverse');

    function doReverse() {
      var val = REF.format.parseInput(revValInput.value);
      var tol = parseFloat(revTolSelect.value);
      if (isNaN(val) || val <= 0) return;

      var colors = REF.convert.resistanceToColors(val, tol, bandCount);
      if (colors) {
        currentBands = colors;
        renderBandSelectors();
        updateColorReader();
      }
    }

    revBtn.addEventListener('click', doReverse);
    revValInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') doReverse(); });

    renderBandSelectors();
    updateColorReader();

    // Hook SMD
    var smdInput = document.getElementById('smd-input');
    var smdResult = document.getElementById('smd-result');

    function updateSmd() {
      var code = smdInput.value.trim();
      var res = REF.convert.smdToResistance(code);
      if (!res) {
        smdResult.textContent = isAr ? 'كود غير معروف' : 'Unknown code';
        return;
      }
      smdResult.textContent = REF.format.toEngineering(res.value, 'Ω') + ' (' + res.type + ')';
    }

    smdInput.addEventListener('input', updateSmd);
    updateSmd();

    // Hook Nearest Standard Finder
    var stdInput = document.getElementById('std-calc-input');
    var stdSeriesSelect = document.getElementById('std-calc-series');
    var stdResEl = document.getElementById('std-calc-res');

    function updateStdFinder() {
      var val = REF.format.parseInput(stdInput.value);
      var sName = stdSeriesSelect.value;
      if (isNaN(val) || val <= 0) {
        stdResEl.textContent = '---';
        return;
      }
      var res = REF.convert.nearestStandard(val, sName);
      if (!res) {
        stdResEl.textContent = '---';
        return;
      }
      var pctDiff = (res.diff * 100).toFixed(2);
      stdResEl.innerHTML = '<span class="ltr-inline">' + REF.format.toEngineering(res.value, 'Ω') + ' (' + (res.diff === 0 ? (isAr ? 'تطابق تام' : 'exact') : (res.value > val ? '+' : '-') + pctDiff + '%') + ')</span>';
    }

    stdInput.addEventListener('input', updateStdFinder);
    stdSeriesSelect.addEventListener('change', updateStdFinder);
    updateStdFinder();

    // Attach smooth scroll listeners to in-page section buttons
    var scrollBtns = container.querySelectorAll('.btn-scroll');
    for (var sb = 0; sb < scrollBtns.length; sb++) {
      scrollBtns[sb].addEventListener('click', function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-scroll-to');
        REF.scrollToSection(targetId);
      });
    }
  }

  return {
    render: render
  };
})();
