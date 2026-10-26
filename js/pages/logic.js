/* js/pages/logic.js — Logic Gates, Truth Tables, Boolean Algebra, & Base Conversion */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.logic = (function() {
  'use strict';

  var activeGate = 'AND';
  var gateStateA = 0;
  var gateStateB = 0;

  var gateDefinitions = [
    { id: 'AND', name: { ar: 'بوابة AND (الضرب المنطقي)', en: 'AND Gate' }, expr: 'Y = A · B', iecSym: '&', note: { ar: 'الخرج 1 فقط إذا كانت جميع المدخلات 1.', en: 'Output is 1 only when all inputs are 1.' } },
    { id: 'OR', name: { ar: 'بوابة OR (الجمع المنطقي)', en: 'OR Gate' }, expr: 'Y = A + B', iecSym: '≥1', note: { ar: 'الخرج 1 إذا كان أي مدخل 1.', en: 'Output is 1 if any input is 1.' } },
    { id: 'NOT', name: { ar: 'بوابة NOT (العاكس Inverter)', en: 'NOT Gate (Inverter)' }, expr: 'Y = A\'', iecSym: '1', singleInput: true, note: { ar: 'يعكس حالة المدخل (0 يصبح 1، و 1 يصبح 0).', en: 'Inverts input state.' } },
    { id: 'NAND', name: { ar: 'بوابة NAND (نفي الضرب)', en: 'NAND Gate' }, expr: 'Y = (A · B)\'', iecSym: '&', isUniversal: true, note: { ar: 'بوابة شاملة (Universal Gate). الخرج 0 فقط عندما تكون جميع المدخلات 1.', en: 'Universal gate. Output is 0 only when all inputs are 1.' } },
    { id: 'NOR', name: { ar: 'بوابة NOR (نفي الجمع)', en: 'NOR Gate' }, expr: 'Y = (A + B)\'', iecSym: '≥1', isUniversal: true, note: { ar: 'بوابة شاملة (Universal Gate). الخرج 1 فقط عندما تكون جميع المدخلات 0.', en: 'Universal gate. Output is 1 only when all inputs are 0.' } },
    { id: 'XOR', name: { ar: 'بوابة XOR (أو الحصرية)', en: 'XOR Gate' }, expr: 'Y = A ⊕ B', iecSym: '=1', note: { ar: 'الخرج 1 عند اختلاف المدخلين، و 0 عند تساويهما.', en: 'Output is 1 when inputs are different.' } },
    { id: 'XNOR', name: { ar: 'بوابة XNOR (التطابق المنطقي)', en: 'XNOR Gate' }, expr: 'Y = (A ⊕ B)\'', iecSym: '=1', note: { ar: 'الخرج 1 عند تطابق المدخلين (كلاهما 0 أو كلاهما 1).', en: 'Output is 1 when inputs are identical.' } },
    { id: 'BUFFER', name: { ar: 'بوابة Buffer (المؤقت / عازل الإشارة)', en: 'Buffer' }, expr: 'Y = A', iecSym: '1', singleInput: true, note: { ar: 'يمرر الإشارة كما هي لتقوية تيار الحمل وعزل المراحل.', en: 'Passes signal unchanged to amplify current drive.' } }
  ];

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navGates') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'البوابات المنطقية بالمعيارين ANSI و IEC، المحاكي التفاعلي، القوانين البوليانية، ونظام تحويل الأعداد.' : 'Logic gates (ANSI & IEC standards), interactive simulator, Boolean algebra, and number base converter.') + '</p>' +
      '</div>';

    // Sub-nav (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-sim">' + (isAr ? 'المحاكي التفاعلي' : 'Interactive Simulator') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-truth">' + (isAr ? 'جدول الصدق الموحد' : 'Unified Truth Table') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-boolean">' + (isAr ? 'الجبر البولياني ودي مورجان' : 'Boolean Algebra & De Morgan') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-universal">' + (isAr ? 'البوابات الشاملة NAND/NOR' : 'Universal Gates') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-levels">' + (isAr ? 'مستويات الجهد TTL/CMOS' : 'Logic Levels') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-base">' + REF.t('numConversion') + '</button>' +
      '</div>';

    // ==========================================
    // 1. Interactive Simulator
    // ==========================================
    html += '<h2 id="sec-sim">' + (isAr ? 'المحاكي التفاعلي للبوابات' : 'Interactive Logic Gate Simulator') + '</h2>';

    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">';
    for (var i = 0; i < gateDefinitions.length; i++) {
      var gd = gateDefinitions[i];
      html += '<button type="button" class="btn btn-gate-tab' + (gd.id === activeGate ? ' active' : '') + '" data-gate="' + gd.id + '">' + gd.id + '</button>';
    }
    html += '</div>';

    html += '<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">' +
      '<div id="gate-svg-box" style="flex: 0 0 200px; text-align: center;"></div>' +
      '<div style="flex: 1 1 280px;">' +
      '<h3 id="sim-gate-name" style="margin-top: 0;"></h3>' +
      '<div class="formula-block" id="sim-gate-expr" style="margin-bottom: 12px;"></div>' +
      '<div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">' +
      '<span class="text-small text-muted">' + (isAr ? 'اضغط لقلب المدخل:' : 'Click to toggle inputs:') + '</span>' +
      '<button type="button" id="btn-toggle-a" class="btn mono" style="font-size: 1.1rem; padding: 4px 14px; min-width: 50px;">A: 0</button>' +
      '<button type="button" id="btn-toggle-b" class="btn mono" style="font-size: 1.1rem; padding: 4px 14px; min-width: 50px;">B: 0</button>' +
      '</div>' +
      '<div class="result-box" style="padding: 8px 14px;">' +
      '<span class="text-small text-muted">' + (isAr ? 'الخرج Y:' : 'Output Y:') + '</span>' +
      '<span id="sim-out-val" class="result-value mono" style="margin-inline-start: 12px; font-size: 1.4rem;">0</span>' +
      '</div>' +
      '<div id="sim-gate-note" class="text-small text-muted" style="margin-top: 8px;"></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // ==========================================
    // 2. Full Unified Truth Table
    // ==========================================
    html += '<h2 id="sec-truth" style="margin-top: 32px;">' + (isAr ? 'جدول الصدق الأساسي الموحد (2-Input Truth Table)' : 'Unified 2-Input Truth Table') + '</h2>' +
      '<table><thead><tr>' +
      '<th class="col-num">A</th>' +
      '<th class="col-num">B</th>' +
      '<th class="col-num">AND</th>' +
      '<th class="col-num">OR</th>' +
      '<th class="col-num">NAND</th>' +
      '<th class="col-num">NOR</th>' +
      '<th class="col-num">XOR</th>' +
      '<th class="col-num">XNOR</th>' +
      '</tr></thead><tbody>' +
      '<tr><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">1</td></tr>' +
      '<tr><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">0</td></tr>' +
      '<tr><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">1</td><td class="mono col-num">0</td></tr>' +
      '<tr><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">1</td><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">0</td><td class="mono col-num">1</td></tr>' +
      '</tbody></table>';

    // ==========================================
    // 3. Boolean Algebra & De Morgan
    // ==========================================
    html += '<h2 id="sec-boolean" style="margin-top: 32px;">' + (isAr ? 'قوانين الجبر البولياني ونظريتا دي مورجان' : 'Boolean Algebra Laws & De Morgan') + '</h2>' +
      '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">' +
      '<div>' +
      '<h4>' + (isAr ? 'نظريتا دي مورجان (De Morgan\'s Laws):' : 'De Morgan\'s Laws:') + '</h4>' +
      '<div class="formula-block">(A · B)\' = A\' + B\'<br>(A + B)\' = A\' · B\'</div>' +
      '<p class="text-small text-muted">' + (isAr ? 'نفي الضرب المنطقي = جمع المنفيات؛ ونفي الجمع المنطقي = ضرب المنفيات.' : 'NAND equals negative-OR; NOR equals negative-AND.') + '</p>' +
      '</div>' +
      '<div>' +
      '<h4>' + (isAr ? 'قوانين الثوابت والتطابق:' : 'Basic Boolean Identities:') + '</h4>' +
      '<div class="formula-block">A · 1 = A  |  A · 0 = 0<br>A + 0 = A  |  A + 1 = 1<br>A · A = A  |  A + A = A<br>A · A\' = 0  |  A + A\' = 1<br>(A\')\' = A</div>' +
      '</div>' +
      '<div>' +
      '<h4>' + (isAr ? 'التبديل والتجميع والتوزيع:' : 'Commutative, Associative & Distributive:') + '</h4>' +
      '<div class="formula-block">A · B = B · A<br>A + B = B + A<br>A · (B + C) = A·B + A·C<br>A + (B · C) = (A + B) · (A + C)</div>' +
      '</div>' +
      '<div>' +
      '<h4>' + (isAr ? 'قوانين الامتصاص (Absorption):' : 'Absorption Laws:') + '</h4>' +
      '<div class="formula-block">A + (A · B) = A<br>A · (A + B) = A<br>A + (A\' · B) = A + B</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // ==========================================
    // 4. Universal Gates (NAND / NOR)
    // ==========================================
    html += '<h2 id="sec-universal" style="margin-top: 32px;">' + (isAr ? 'البوابات الشاملة (Universal Gates)' : 'Universal Gates (NAND & NOR)') + '</h2>' +
      '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<p class="text-small text-muted">' + (isAr ? 'تسمى NAND و NOR بالبوابات الشاملة لأنه يمكن بناء أي دائرة منطقية (NOT, AND, OR, XOR) باستخدامهما وحدهما دون الحاجة لأي بوابات أخرى:' : 'NAND and NOR can construct every basic logic function:') + '</p>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">' +
      '<div class="note-box">' +
      '<h4>' + (isAr ? 'البناء باستخدام NAND فقط:' : 'Building from NAND only:') + '</h4>' +
      '<ul style="padding-inline-start: 16px; font-size: 0.85rem; line-height: 1.8;">' +
      '<li><strong>NOT(A):</strong> NAND بمدخلين موصلين معاً <span class="mono">(A NAND A)</span>.</li>' +
      '<li><strong>AND(A, B):</strong> NAND متبوعة بـ NOT <span class="mono">((A NAND B) NAND (A NAND B))</span>.</li>' +
      '<li><strong>OR(A, B):</strong> تطبيق دي مورجان: <span class="mono">(A NAND A) NAND (B NAND B)</span>.</li>' +
      '</ul>' +
      '</div>' +
      '<div class="note-box">' +
      '<h4>' + (isAr ? 'البناء باستخدام NOR فقط:' : 'Building from NOR only:') + '</h4>' +
      '<ul style="padding-inline-start: 16px; font-size: 0.85rem; line-height: 1.8;">' +
      '<li><strong>NOT(A):</strong> NOR بمدخلين موصلين معاً <span class="mono">(A NOR A)</span>.</li>' +
      '<li><strong>OR(A, B):</strong> NOR متبوعة بـ NOT <span class="mono">((A NOR B) NOR (A NOR B))</span>.</li>' +
      '<li><strong>AND(A, B):</strong> تطبيق دي مورجان: <span class="mono">(A NOR A) NOR (B NOR B)</span>.</li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>';

    // ==========================================
    // 5. Logic Levels TTL / CMOS
    // ==========================================
    html += '<h2 id="sec-levels" style="margin-top: 32px;">' + (isAr ? 'مستويات الجهد وعائلات المنطق (Logic Levels & Families)' : 'Logic Levels & IC Families') + '</h2>' +
      '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'العائلة المنطقية' : 'Logic Family') + '</th>' +
      '<th>' + (isAr ? 'جهد التغذية V_cc' : 'Supply V_cc') + '</th>' +
      '<th>' + (isAr ? 'حد LOW الدخل (V_IL)' : 'Input LOW (V_IL)') + '</th>' +
      '<th>' + (isAr ? 'حد HIGH الدخل (V_IH)' : 'Input HIGH (V_IH)') + '</th>' +
      '<th>' + (isAr ? 'ملاحظة' : 'Note') + '</th>' +
      '</tr></thead><tbody>' +
      '<tr><td><strong>TTL (74xx / 74LS)</strong></td><td class="mono">5.0 V ±5%</td><td class="mono">≤ 0.8 V</td><td class="mono">≥ 2.0 V</td><td>' + (isAr ? 'أسرع تاريخياً، سحب تيار أكبر' : 'Bipolar, higher power') + '</td></tr>' +
      '<tr><td><strong>CMOS 5V (74HC / 40xx)</strong></td><td class="mono">2.0 – 6.0 V</td><td class="mono">≤ 1.5 V (0.3 V_DD)</td><td class="mono">≥ 3.5 V (0.7 V_DD)</td><td>' + (isAr ? 'استهلاك طاقة يقارب الصفر عند السكون' : 'Near-zero static current') + '</td></tr>' +
      '<tr><td><strong>CMOS 3.3V (74LVC)</strong></td><td class="mono">3.3 V</td><td class="mono">≤ 0.8 V</td><td class="mono">≥ 2.0 V</td><td>' + (isAr ? 'المعيار الحديث للميكروكنترولر' : 'Modern MCU standard') + '</td></tr>' +
      '</tbody></table>' +
      '</div>';

    // ==========================================
    // 6. Number System Conversion
    // ==========================================
    html += '<h2 id="sec-base" style="margin-top: 32px;">' + REF.t('numConversion') + '</h2>' +
      '<div class="calc-card">' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل أي رقم في أي نظام للتحويل الفوري بين الأنظمة الأربعة:' : 'Enter a number in any base for instantaneous live conversion:') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 180px;"><label for="base-dec">' + REF.t('decimal') + ' (Base 10)</label><input type="text" id="base-dec" value="255" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 180px;"><label for="base-bin">' + REF.t('binary') + ' (Base 2)</label><input type="text" id="base-bin" value="11111111" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 180px;"><label for="base-hex">' + REF.t('hexadecimal') + ' (Base 16)</label><input type="text" id="base-hex" value="FF" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 180px;"><label for="base-oct">' + REF.t('octal') + ' (Base 8)</label><input type="text" id="base-oct" value="377" class="mono"></div>' +
      '</div>' +
      '</div>';

    container.innerHTML = html;

    // Simulator Elements & Logic
    var gateTabs = container.querySelectorAll('.btn-gate-tab');
    var svgBox = document.getElementById('gate-svg-box');
    var simName = document.getElementById('sim-gate-name');
    var simExpr = document.getElementById('sim-gate-expr');
    var simNote = document.getElementById('sim-gate-note');
    var btnA = document.getElementById('btn-toggle-a');
    var btnB = document.getElementById('btn-toggle-b');
    var outValEl = document.getElementById('sim-out-val');

    function updateSimulator() {
      var gd = null;
      for (var j = 0; j < gateDefinitions.length; j++) {
        if (gateDefinitions[j].id === activeGate) { gd = gateDefinitions[j]; break; }
      }
      if (!gd) return;

      simName.textContent = gd.name[lang] || gd.name.en;
      simExpr.innerHTML = '<span class="ltr-inline">' + gd.expr + '</span>';
      simNote.textContent = gd.note[lang] || gd.note.en;

      if (gd.singleInput) {
        btnB.style.display = 'none';
      } else {
        btnB.style.display = 'inline-block';
      }

      btnA.textContent = 'A: ' + gateStateA;
      btnB.textContent = 'B: ' + gateStateB;

      // Calculate output
      var G = REF.convert.gates;
      var outVal = 0;
      switch (activeGate) {
        case 'AND': outVal = G.AND(gateStateA, gateStateB); break;
        case 'OR': outVal = G.OR(gateStateA, gateStateB); break;
        case 'NOT': outVal = G.NOT(gateStateA); break;
        case 'NAND': outVal = G.NAND(gateStateA, gateStateB); break;
        case 'NOR': outVal = G.NOR(gateStateA, gateStateB); break;
        case 'XOR': outVal = G.XOR(gateStateA, gateStateB); break;
        case 'XNOR': outVal = G.XNOR(gateStateA, gateStateB); break;
        case 'BUFFER': outVal = G.BUFFER(gateStateA); break;
      }

      outValEl.textContent = outVal;
      outValEl.style.color = outVal === 1 ? 'var(--accent)' : 'var(--text-muted)';

      // Draw SVG
      svgBox.innerHTML = '';
      var gateSvg = REF.svg.drawGate(activeGate, 'ansi');
      svgBox.appendChild(gateSvg);
    }

    for (var gt = 0; gt < gateTabs.length; gt++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          activeGate = btn.getAttribute('data-gate');
          for (var b = 0; b < gateTabs.length; b++) gateTabs[b].classList.remove('active');
          btn.classList.add('active');
          updateSimulator();
        });
      })(gateTabs[gt]);
    }

    btnA.addEventListener('click', function() {
      gateStateA = gateStateA === 0 ? 1 : 0;
      updateSimulator();
    });

    btnB.addEventListener('click', function() {
      gateStateB = gateStateB === 0 ? 1 : 0;
      updateSimulator();
    });

    updateSimulator();

    // Number System Conversion Inputs
    var decInput = document.getElementById('base-dec');
    var binInput = document.getElementById('base-bin');
    var hexInput = document.getElementById('base-hex');
    var octInput = document.getElementById('base-oct');

    function syncBases(sourceInput, fromBase) {
      var val = sourceInput.value.trim();
      if (!val) {
        decInput.value = ''; binInput.value = ''; hexInput.value = ''; octInput.value = '';
        return;
      }
      var num = parseInt(val, fromBase);
      if (isNaN(num)) return;

      if (sourceInput !== decInput) decInput.value = num.toString(10);
      if (sourceInput !== binInput) binInput.value = num.toString(2);
      if (sourceInput !== hexInput) hexInput.value = num.toString(16).toUpperCase();
      if (sourceInput !== octInput) octInput.value = num.toString(8);
    }

    decInput.addEventListener('input', function() { syncBases(decInput, 10); });
    binInput.addEventListener('input', function() { syncBases(binInput, 2); });
    hexInput.addEventListener('input', function() { syncBases(hexInput, 16); });
    octInput.addEventListener('input', function() { syncBases(octInput, 8); });

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
