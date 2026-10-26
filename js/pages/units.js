/* js/pages/units.js — Unit Converter Page */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.units = (function() {
  'use strict';

  var currentCat = 'length';
  var currentFrom = 'in';
  var currentTo = 'mm';
  var currentVal = 1;
  var currentSigFigs = 10;

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var categories = REF.unitCategories;

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navUnits') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'تحويل الوحدات الفيزيائية بدقة عالية مع توضيح معاملات التحويل الدقيقة والتقريبية.' : 'High-precision physical unit converter showing exact and approximate conversion factors.') + '</p>' +
      '</div>';

    // Controls container
    html += '<div class="calc-card">';
    html += '<div class="input-row">';

    // Category select
    html += '<div class="input-group" style="flex: 1 1 200px;">' +
      '<label for="unit-cat">' + REF.t('category') + '</label>' +
      '<select id="unit-cat">';
    for (var i = 0; i < categories.length; i++) {
      var cat = categories[i];
      var catName = cat.name[lang] || cat.name.en;
      html += '<option value="' + cat.id + '"' + (cat.id === currentCat ? ' selected' : '') + '>' + catName + '</option>';
    }
    html += '</select></div>';

    // Precision select
    html += '<div class="input-group" style="width: 140px;">' +
      '<label for="unit-sigfigs">' + REF.t('precision') + '</label>' +
      '<select id="unit-sigfigs">';
    for (var sf = 3; sf <= 15; sf++) {
      html += '<option value="' + sf + '"' + (sf === currentSigFigs ? ' selected' : '') + '>' + sf + ' ' + REF.t('sigFigs') + '</option>';
    }
    html += '</select></div>';

    html += '</div>'; // /input-row

    // Conversion Row
    html += '<div class="input-row" style="align-items: flex-end; margin-top: 15px;">';

    // Value input
    html += '<div class="input-group" style="flex: 1 1 140px;">' +
      '<label for="unit-val">' + REF.t('value') + '</label>' +
      '<input type="text" id="unit-val" value="' + currentVal + '" placeholder="e.g. 1, 4.7k, 1e-6" class="mono">' +
      '</div>';

    // From select
    html += '<div class="input-group" style="flex: 1 1 160px;">' +
      '<label for="unit-from">' + REF.t('from') + '</label>' +
      '<select id="unit-from"></select>' +
      '</div>';

    // Swap button
    html += '<div class="input-group" style="width: auto;">' +
      '<button type="button" id="unit-swap" class="btn btn-swap" title="' + REF.t('swap') + '">&#8644;</button>' +
      '</div>';

    // To select
    html += '<div class="input-group" style="flex: 1 1 160px;">' +
      '<label for="unit-to">' + REF.t('to') + '</label>' +
      '<select id="unit-to"></select>' +
      '</div>';

    html += '</div>'; // /input-row

    // Result Box
    html += '<div class="result-box" style="margin-top: 20px;">' +
      '<div>' +
      '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">' + REF.t('result') + '</div>' +
      '<div id="unit-result" class="result-value">---</div>' +
      '</div>' +
      '<button type="button" id="unit-copy-btn" class="btn btn-copy" style="margin-inline-start: auto;">' + REF.t('copy') + '</button>' +
      '</div>';

    // Conversion factor explanation
    html += '<div id="unit-factor-info" class="text-small text-muted" style="margin-top: 8px;"></div>';

    // Category-specific notes
    html += '<div id="unit-cat-note" class="note-box" style="display: none; margin-top: 16px;"></div>';

    html += '</div>'; // /calc-card

    // All units in category table
    html += '<div style="margin-top: 32px;">' +
      '<h2>' + (isAr ? 'جميع وحدات الفئة المحددة' : 'All Units in Category') + '</h2>' +
      '<div id="unit-table-container"></div>' +
      '</div>';

    container.innerHTML = html;

    // Hook events
    var catSelect = document.getElementById('unit-cat');
    var fromSelect = document.getElementById('unit-from');
    var toSelect = document.getElementById('unit-to');
    var valInput = document.getElementById('unit-val');
    var sigfigsSelect = document.getElementById('unit-sigfigs');
    var swapBtn = document.getElementById('unit-swap');
    var copyBtn = document.getElementById('unit-copy-btn');

    function populateUnits() {
      var cat = null;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === currentCat) { cat = categories[i]; break; }
      }
      if (!cat) return;

      fromSelect.innerHTML = '';
      toSelect.innerHTML = '';

      var hasFrom = false, hasTo = false;
      for (var j = 0; j < cat.units.length; j++) {
        var u = cat.units[j];
        var uName = (u.name[lang] || u.name.en) + ' (' + u.symbol + ')';
        var opt1 = document.createElement('option');
        opt1.value = u.id;
        opt1.textContent = uName;
        var opt2 = document.createElement('option');
        opt2.value = u.id;
        opt2.textContent = uName;
        if (u.id === currentFrom) hasFrom = true;
        if (u.id === currentTo) hasTo = true;
        fromSelect.appendChild(opt1);
        toSelect.appendChild(opt2);
      }

      if (!hasFrom) currentFrom = cat.units[0].id;
      if (!hasTo) currentTo = (cat.units[1] ? cat.units[1].id : cat.units[0].id);

      fromSelect.value = currentFrom;
      toSelect.value = currentTo;

      renderCatNote(cat);
      renderUnitsTable(cat);
      updateConversion();
    }

    function renderCatNote(cat) {
      var noteBox = document.getElementById('unit-cat-note');
      if (!noteBox) return;
      if (cat.isTemperature) {
        noteBox.style.display = 'block';
        noteBox.textContent = REF.t('tempNote');
      } else if (cat.id === 'time') {
        noteBox.style.display = 'block';
        noteBox.textContent = REF.t('yearNote');
      } else if (cat.id === 'datastorage') {
        noteBox.style.display = 'block';
        noteBox.textContent = REF.t('binaryNote');
      } else {
        noteBox.style.display = 'none';
      }
    }

    function renderUnitsTable(cat) {
      var tableContainer = document.getElementById('unit-table-container');
      var tHtml = '<table><thead><tr>' +
        '<th>' + REF.t('name') + '</th>' +
        '<th>' + REF.t('symbol') + '</th>' +
        '<th>' + (isAr ? 'النسبة للوحدة الأساسية (' + cat.base + ')' : 'Ratio to base (' + cat.base + ')') + '</th>' +
        '<th>' + (isAr ? 'النوع' : 'Type') + '</th>' +
        '</tr></thead><tbody>';

      for (var i = 0; i < cat.units.length; i++) {
        var u = cat.units[i];
        var uName = u.name[lang] || u.name.en;
        var ratio = cat.isTemperature ? '—' : u.toBase;
        var typeBadge = cat.isTemperature ? '—' : (u.exact ? '<span class="status-badge status-pass">' + REF.t('exact') + '</span>' : '<span class="status-badge" style="background:#fff3e0; color:#b06000;">' + REF.t('approx') + '</span>');
        tHtml += '<tr>' +
          '<td>' + uName + '</td>' +
          '<td class="mono">' + u.symbol + '</td>' +
          '<td class="mono col-num">' + ratio + '</td>' +
          '<td>' + typeBadge + '</td>' +
          '</tr>';
      }
      tHtml += '</tbody></table>';
      tableContainer.innerHTML = tHtml;
    }

    function updateConversion() {
      var parsedVal = REF.format.parseInput(valInput.value);
      var resEl = document.getElementById('unit-result');
      var factorEl = document.getElementById('unit-factor-info');

      if (isNaN(parsedVal)) {
        resEl.textContent = '---';
        factorEl.innerHTML = '';
        return;
      }

      currentVal = parsedVal;
      var conv = REF.convert.convertUnits(currentCat, currentFrom, currentTo, parsedVal);
      if (!conv) {
        resEl.textContent = '---';
        factorEl.innerHTML = '';
        return;
      }

      var formatted = REF.format.formatNumber(conv.result, currentSigFigs);
      resEl.innerHTML = '<span class="ltr-inline">' + formatted + ' ' + conv.toSymbol + '</span>';

      // Factor info line
      if (conv.isTemperature) {
        factorEl.innerHTML = isAr ? 'تحويل درجات الحرارة يخضع لمعادلات خطية محددة.' : 'Temperature conversion uses defined linear formulas.';
      } else {
        var fFormatted = REF.format.formatNumber(conv.factor, 8);
        var tag = conv.isExact ?
          '<span class="status-badge status-pass" style="margin-inline-start: 6px;">' + REF.t('exact') + '</span>' :
          '<span class="status-badge" style="background:#fff3e0; color:#b06000; margin-inline-start: 6px;">' + REF.t('approx') + '</span>';

        factorEl.innerHTML = '<span class="mono ltr-inline">1 ' + conv.fromSymbol + ' = ' + fFormatted + ' ' + conv.toSymbol + '</span>' + tag;
      }
    }

    catSelect.addEventListener('change', function() {
      currentCat = catSelect.value;
      populateUnits();
    });

    fromSelect.addEventListener('change', function() {
      currentFrom = fromSelect.value;
      updateConversion();
    });

    toSelect.addEventListener('change', function() {
      currentTo = toSelect.value;
      updateConversion();
    });

    valInput.addEventListener('input', function() {
      updateConversion();
    });

    sigfigsSelect.addEventListener('change', function() {
      currentSigFigs = parseInt(sigfigsSelect.value, 10);
      updateConversion();
    });

    swapBtn.addEventListener('click', function() {
      var tmp = currentFrom;
      currentFrom = currentTo;
      currentTo = tmp;
      fromSelect.value = currentFrom;
      toSelect.value = currentTo;
      updateConversion();
    });

    copyBtn.addEventListener('click', function() {
      var parsedVal = REF.format.parseInput(valInput.value);
      if (!isNaN(parsedVal)) {
        var conv = REF.convert.convertUnits(currentCat, currentFrom, currentTo, parsedVal);
        if (conv) {
          REF.format.copyToClipboard(REF.format.formatForCopy(conv.result), copyBtn);
        }
      }
    });

    populateUnits();
  }

  return {
    render: render
  };
})();
