/* js/pages/prefixes.js — SI Prefixes & Engineering Notation */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.prefixes = (function() {
  'use strict';

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navPrefixes') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'جدول البادئات القياسية بالنظام الدولي SI والبادئات الثنائية، وأداة التحويل للهندسي.' : 'Standard SI prefixes, binary prefixes, and interactive engineering notation tool.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-pref-tool">' + REF.t('prefixTool') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-pref-si">' + (isAr ? 'بادئات SI القياسية' : 'SI Prefixes') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-pref-bin">' + REF.t('binaryPrefixes') + '</button>' +
      '</div>';

    // Interactive Engineering Tool
    html += '<div id="sec-pref-tool" class="calc-card" style="margin-bottom: 24px;">' +
      '<h2>' + REF.t('prefixTool') + '</h2>' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل قيمة مع وحدة (مثل 4700 Ω أو 0.000001 F أو 10u) للتحويل للصيغة الهندسية أو العادية.' : 'Enter a value with unit (e.g. 4700 Ω, 0.000001 F, or 10u) to convert to engineering notation or vice versa.') + '</p>' +
      '<div class="input-row" style="margin-top: 12px;">' +
      '<div class="input-group" style="flex: 1 1 200px;">' +
      '<label for="eng-input">' + REF.t('value') + '</label>' +
      '<input type="text" id="eng-input" value="4700 Ω" class="mono">' +
      '</div>' +
      '</div>' +
      '<div class="result-box">' +
      '<div>' +
      '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">' + (isAr ? 'التمثيل الهندسي' : 'Engineering Notation') + '</div>' +
      '<div id="eng-result" class="result-value">4.7 kΩ</div>' +
      '</div>' +
      '<div style="margin-inline-start: 24px;">' +
      '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 4px;">' + (isAr ? 'القيمة العشرية الصريحة' : 'Explicit Decimal') + '</div>' +
      '<div id="eng-decimal-result" class="result-value" style="font-size: 1rem; color: var(--text-muted);">4700 Ω</div>' +
      '</div>' +
      '<button type="button" id="eng-copy-btn" class="btn btn-copy" style="margin-inline-start: auto;">' + REF.t('copy') + '</button>' +
      '</div>' +
      '</div>';

    // Common Mistakes Box
    html += '<div class="note-box" style="margin-bottom: 24px;">' +
      '<h3 style="margin-top: 0;">' + REF.t('commonMistakes') + '</h3>' +
      '<ul style="padding-inline-start: 20px; font-size: 0.88rem; line-height: 1.8;">' +
      '<li><strong>m</strong> (milli, 10⁻³) ' + (isAr ? 'في مقابل' : 'vs') + ' <strong>M</strong> (mega, 10⁶) — ' + (isAr ? 'الخلط بينهما يسبب خطأ بمعامل مليار (10⁹)!' : 'Confusing these causes an error factor of 10⁹!') + '</li>' +
      '<li><strong>µ</strong> (micro, 10⁻⁶) ' + (isAr ? 'في مقابل' : 'vs') + ' <strong>m</strong> (milli, 10⁻³) — ' + (isAr ? 'كتابة u أو µ هي للميكرو فقط.' : 'Use u or µ only for micro.') + '</li>' +
      '<li><strong>kΩ</strong> ' + (isAr ? 'بحرف k صغير صحيح، بينما KΩ بحرف كبير خطأ لأن K ترمز لدرجة الحرارة المطلقة (كلفن).' : 'with lowercase k is correct; uppercase KΩ is incorrect as K represents kelvin.') + '</li>' +
      '</ul>' +
      '</div>';

    // SI Prefixes Table
    html += '<h2 id="sec-pref-si">' + (isAr ? 'بادئات النظام الدولي SI (الترتيب التنازلي)' : 'SI Prefixes (Descending)') + '</h2>' +
      '<table><thead><tr>' +
      '<th>' + REF.t('name') + '</th>' +
      '<th>' + REF.t('symbol') + '</th>' +
      '<th>' + (isAr ? 'القوة العشرية' : 'Factor (10ⁿ)') + '</th>' +
      '<th>' + (isAr ? 'القيمة الرقمية' : 'Value') + '</th>' +
      '<th>' + (isAr ? 'مثال توضيحي' : 'Example') + '</th>' +
      '</tr></thead><tbody>';

    var si = REF.siPrefixes;
    for (var i = 0; i < si.length; i++) {
      var p = si[i];
      var pName = p.name[lang] || p.name.en;
      var egUnit = p.power >= 0 ? 'm' : 's';
      var egStr = '1 ' + p.symbol + egUnit + ' = 10' + (p.power >= 0 ? '^' + p.power : '^{' + p.power + '}') + ' ' + egUnit;
      html += '<tr>' +
        '<td><strong>' + pName + '</strong> <span class="text-muted text-small">(' + p.name.en + ')</span></td>' +
        '<td class="mono" style="font-size: 1.1rem; font-weight: 700;">' + p.symbol + '</td>' +
        '<td class="mono col-num">10<sup>' + p.power + '</sup></td>' +
        '<td class="mono col-num">' + p.exponent + '</td>' +
        '<td class="mono">' + egStr + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';

    // Binary Prefixes Table
    html += '<h2 id="sec-pref-bin" style="margin-top: 32px;">' + REF.t('binaryPrefixes') + '</h2>' +
      '<p class="text-small text-muted">' + (isAr ? 'تُستخدم في أنظمة الحوسبة والتخزين الرقمي لتفادي الخلط مع البادئات العشرية.' : 'Used in computing and digital storage to avoid confusion with decimal prefixes.') + '</p>' +
      '<table><thead><tr>' +
      '<th>' + REF.t('name') + '</th>' +
      '<th>' + REF.t('symbol') + '</th>' +
      '<th>' + (isAr ? 'القوة الثنائية' : 'Power (2ⁿ)') + '</th>' +
      '<th>' + (isAr ? 'المضاعِف الدقيق' : 'Exact Multiplier') + '</th>' +
      '<th>' + (isAr ? 'المعادل التقريبي العشري' : 'Approx. Decimal') + '</th>' +
      '</tr></thead><tbody>';

    var bin = REF.binaryPrefixes;
    for (var j = 0; j < bin.length; j++) {
      var bp = bin[j];
      var bpName = bp.name[lang] || bp.name.en;
      var approx = '≈ 10<sup>' + (Math.round(bp.power * 0.30103)) + '</sup>';
      html += '<tr>' +
        '<td><strong>' + bpName + '</strong> <span class="text-muted text-small">(' + bp.name.en + ')</span></td>' +
        '<td class="mono" style="font-size: 1.05rem; font-weight: 700;">' + bp.symbol + '</td>' +
        '<td class="mono col-num">2<sup>' + bp.power + '</sup></td>' +
        '<td class="mono col-num">' + bp.multiplier.toLocaleString('en-US') + '</td>' +
        '<td class="mono">' + approx + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';

    container.innerHTML = html;

    // Hook tool events
    var engInput = document.getElementById('eng-input');
    var engResult = document.getElementById('eng-result');
    var engDecResult = document.getElementById('eng-decimal-result');
    var engCopyBtn = document.getElementById('eng-copy-btn');

    function updateEng() {
      var raw = engInput.value.trim();
      var parsed = REF.format.fromEngineering(raw);
      if (isNaN(parsed.value)) {
        engResult.textContent = '---';
        engDecResult.textContent = '---';
        return;
      }
      var engStr = REF.format.toEngineering(parsed.value, parsed.unit);
      engResult.textContent = engStr;
      engDecResult.textContent = parsed.value + ' ' + (parsed.unit || '');
    }

    engInput.addEventListener('input', updateEng);

    engCopyBtn.addEventListener('click', function() {
      REF.format.copyToClipboard(engResult.textContent, engCopyBtn);
    });

    updateEng();

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
