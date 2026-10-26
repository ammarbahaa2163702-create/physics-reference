/* js/pages/multimeter.js — Multimeter Guide & Interactive Tool */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.multimeter = (function() {
  'use strict';

  var currentMode = 'vdc';

  var modesInfo = {
    vdc: {
      symbol: 'V⎓',
      name: { ar: 'جهد مستمر (DC Voltage)', en: 'DC Voltage (V⎓)' },
      connection: { ar: 'على التوازي مع العنصر. المسبار الأسود في COM والأحمر في VΩ.', en: 'In parallel across component. Black probe in COM, Red in VΩ.' },
      warning: { ar: 'إذا كان الجهاز يدوي المدى، ابدأ بأعلى مدى لتجنب تلف المقياس.', en: 'If manual range, start at the highest range.' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    },
    vac: {
      symbol: 'V~',
      name: { ar: 'جهد متردد (AC Voltage)', en: 'AC Voltage (V~)' },
      connection: { ar: 'على التوازي. يقيس القيمة الفعالة V_rms لموجة الجهد.', en: 'In parallel. Measures RMS voltage (V_rms).' },
      warning: { ar: 'احذر ملامسة أطراف المسبارين عند قياس جهود الشبكة (>50 V AC).', en: 'Never touch metal probe tips on high voltage (>50 V AC).' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    },
    current_ma: {
      symbol: 'mA⎓/~',
      name: { ar: 'تيار منخفض (mA / µA)', en: 'Low Current (mA / µA)' },
      connection: { ar: 'على التوالي داخل المسار (يجب فتح الدائرة). المسبار الأحمر في مقبس mA.', en: 'In series inside path (circuit must be broken). Red probe in mA jack.' },
      warning: { ar: 'تنبيه خطير: التوصيل على التوازي يؤدي لاحتراق الفيوز الداخلي فوراً!', en: 'DANGER: Connecting in parallel will instantly blow the internal fuse!' },
      leads: { com: 'black', v: 'none', ma: 'red', a10: 'none' }
    },
    current_10a: {
      symbol: '10A',
      name: { ar: 'تيار عالٍ (10A / 20A)', en: 'High Current (10A)' },
      connection: { ar: 'على التوالي. المسبار الأحمر في مقبس 10A غير المحمي أو ذو الفيوز الكبير.', en: 'In series. Red probe in 10A jack.' },
      warning: { ar: 'لا تقِس التيارات العالية لأكثر من 10–15 ثانية لتجنب سخونة المسار الداخلي.', en: 'Do not measure high current for >10-15s to prevent heating.' },
      leads: { com: 'black', v: 'none', ma: 'none', a10: 'red' }
    },
    resistance: {
      symbol: 'Ω',
      name: { ar: 'المقاومة (Resistance)', en: 'Resistance (Ω)' },
      connection: { ar: 'على طرفي العنصر. المسبار الأسود في COM والأحمر في VΩ.', en: 'Across component. Black probe in COM, Red in VΩ.' },
      warning: { ar: 'شرط صارم: الدائرة مفصولة تماماً عن مصدر الكهرباء، والعنصر مفصول على الأقل من طرف واحد.', en: 'STRICT RULE: Circuit power must be OFF, and component disconnected from other paths.' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    },
    continuity: {
      symbol: '•)))',
      name: { ar: 'الاستمرارية (Continuity / Buzzer)', en: 'Continuity (Buzzer)' },
      connection: { ar: 'بين نقطتين لاختبار وجود اتصال كهربي سليم (صفارة عند مقاومة < 30–50 Ω).', en: 'Between two points. Beeper sounds if resistance < 30-50 Ω.' },
      warning: { ar: 'يجب أن تكون الدائرة مفصولة عن الكهرباء لمنع تلف الحساس.', en: 'Power MUST be disconnected before testing.' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    },
    diode: {
      symbol: '▶|',
      name: { ar: 'اختبار الدايود (Diode Test)', en: 'Diode Test' },
      connection: { ar: 'القطب الموجب (الأحمر) على المصعد Anode، والسالب (الأسود) على المهبط Cathode.', en: 'Red on Anode, Black on Cathode.' },
      warning: { ar: 'التوصيل الأمامي يعطي جهد العتبة (~0.5–0.7 V للسيليكون)، والتوصيل العكسي يعطي OL.', en: 'Forward bias gives Vf (~0.5-0.7 V for Si); reverse bias gives OL.' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    },
    capacitance: {
      symbol: '⊣⊢',
      name: { ar: 'السعة (Capacitance)', en: 'Capacitance (F)' },
      connection: { ar: 'على طرفي المكثف بعد تفريغه تماماً من أي شحنة.', en: 'Across capacitor after fully discharging it.' },
      warning: { ar: 'تفريغ المكثف مسبقاً إلزامي لحماية مقياس المالتيميتر.', en: 'Discharging capacitor beforehand is mandatory.' },
      leads: { com: 'black', v: 'red', ma: 'none', a10: 'none' }
    }
  };

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navMultimeter') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'دليل استخدام الأفوميتر الرقمي (DMM): توصيل المسابير، خطوات القياس، السلامة، وحساب الدقة.' : 'Digital Multimeter (DMM) guide: probe connections, measurement procedures, safety, and accuracy calculator.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-mm-parts">' + REF.t('mmParts') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-mm-steps">' + REF.t('mmMeasuring') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-mm-safety">' + REF.t('mmSafety') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-mm-accuracy">' + REF.t('mmAccuracy') + '</button>' +
      '</div>';

    // Interactive Meter & Dial
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h2 id="sec-mm-parts">' + REF.t('mmParts') + '</h2>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">' +
      '<div id="multimeter-svg-container" style="flex: 0 0 220px; text-align: center;"></div>' +
      '<div style="flex: 1 1 300px;">' +
      '<h3>' + (isAr ? 'اختر وضع القياس من المفتاح الدوار:' : 'Select Measurement Mode:') + '</h3>' +
      '<div id="meter-mode-buttons" style="display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0;">';

    var mKeys = Object.keys(modesInfo);
    for (var i = 0; i < mKeys.length; i++) {
      var k = mKeys[i];
      var m = modesInfo[k];
      html += '<button type="button" class="btn btn-mm-mode' + (k === currentMode ? ' active' : '') + '" data-mode="' + k + '">' + m.symbol + ' ' + (m.name[lang] || m.name.en) + '</button>';
    }

    html += '</div>' +
      '<div id="meter-mode-desc" class="result-box" style="display: block; font-size: 0.9rem; line-height: 1.6;"></div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Steps of Measurement
    html += '<h2 id="sec-mm-steps" style="margin-top: 32px;">' + REF.t('mmMeasuring') + '</h2>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">' +
      '<div class="calc-card">' +
      '<h4>1. ' + (isAr ? 'قياس الجهد (Voltage)' : 'Measuring Voltage') + '</h4>' +
      '<p class="text-small">' + (isAr ? '<strong>التوصيل:</strong> على <strong>التوازي</strong> عبر طرفي العنصر. المسبار الأسود في COM والأحمر في VΩ. لا تفتح الدائرة.' : '<strong>Connection:</strong> In <strong>parallel</strong> across component. Black in COM, Red in VΩ.') + '</p>' +
      '</div>' +
      '<div class="calc-card">' +
      '<h4>2. ' + (isAr ? 'قياس التيار (Current)' : 'Measuring Current') + '</h4>' +
      '<p class="text-small">' + (isAr ? '<strong>التوصيل:</strong> على <strong>التوالي</strong> حصراً (افتح الدائرة واجعل المالتيميتر جزءاً من المسار). انقل الأحمر إلى mA أو 10A.' : '<strong>Connection:</strong> Strictly in <strong>series</strong> (break the circuit so current flows through meter). Move red to mA or 10A.') + '</p>' +
      '</div>' +
      '<div class="calc-card">' +
      '<h4>3. ' + (isAr ? 'قياس المقاومة (Resistance)' : 'Measuring Resistance') + '</h4>' +
      '<p class="text-small">' + (isAr ? '<strong>التوصيل:</strong> افصل الدائرة تماماً عن الكهرباء! افصل طرفاً واحداً من المقاومة على الأقل حتى لا تشوش باقي المسارات على القراءة.' : '<strong>Connection:</strong> Circuit power MUST be OFF. Disconnect at least one resistor leg.') + '</p>' +
      '</div>' +
      '<div class="calc-card">' +
      '<h4>4. ' + (isAr ? 'فحص الدايود والاستمرارية' : 'Diode & Continuity') + '</h4>' +
      '<p class="text-small">' + (isAr ? 'الاستمرارية تعطي صفارة عند اتصال تام (R < 50 Ω). اختبار الدايود في الاتجاه الأمامي يعطي جهد العتبة (≈0.6 V للسيليكون) والعكسي يعطي OL.' : 'Continuity beeps on closed circuit (R < 50 Ω). Diode forward bias gives junction voltage (~0.6 V for Si), reverse gives OL.') + '</p>' +
      '</div>' +
      '</div>';

    // Common Mistakes & Safety
    html += '<h2 id="sec-mm-safety" style="margin-top: 32px;">' + REF.t('mmErrors') + ' & ' + REF.t('mmSafety') + '</h2>' +
      '<div class="note-box" style="border-inline-start-color: #c5221f; margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'أخطر الأخطاء الشائعة لتجنب حرق الجهاز:' : 'Critical Errors to Avoid:') + '</h3>' +
      '<ul style="padding-inline-start: 20px; font-size: 0.88rem; line-height: 1.8;">' +
      '<li>' + (isAr ? '<strong>قياس تيار على التوازي:</strong> مقاومة مقبس التيار تقترب من الصفر (شورت)، وتوصيلها على التوازي مع المصدر يسبب تياراً هائلاً يحرق الفيوز الداخلي فوراً!' : '<strong>Measuring current in parallel:</strong> The current input has near-zero resistance. Connecting across a voltage source causes a direct short circuit and blows the fuse instantly!') + '</li>' +
      '<li>' + (isAr ? '<strong>نسيان المسبار في مقبس التيار ثم قياس جهد:</strong> خطأ متكرر يؤدي لقصر الدائرة.' : '<strong>Leaving probe in 10A/mA jack then measuring voltage:</strong> Results in immediate short circuit.') + '</li>' +
      '<li>' + (isAr ? '<strong>قياس مقاومة ودائرة متصلة بالجهد:</strong> يعطي قراءات خاطئة تماماً وقد يتلف مقياس المقاومة.' : '<strong>Measuring resistance on a live circuit:</strong> Gives bogus values and damages internal circuitry.') + '</li>' +
      '<li>' + (isAr ? '<strong>أثر تحميل الجهاز (Loading Effect):</strong> مقاومة دخل الفولتميتر (عادة 10 MΩ) قد تسحب جزءاً ضئيلاً من التيار في الدوائر ذات المقاومة العالية جداً وتخفض الجهد المقاس.' : '<strong>Loading Effect:</strong> Voltmeter internal resistance (~10 MΩ) can load very high impedance circuits.') + '</li>' +
      '</ul>' +
      '</div>';

    // CAT Safety Ratings Table
    html += '<h3>' + (isAr ? 'تصنيفات السلامة الكهربية (Overvoltage Categories - CAT):' : 'Overvoltage Safety Categories (CAT):') + '</h3>' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'التصنيف' : 'Category') + '</th>' +
      '<th>' + (isAr ? 'نطاق الاستخدام الموصى به' : 'Recommended Scope') + '</th>' +
      '<th>' + (isAr ? 'أمثلة' : 'Examples') + '</th>' +
      '</tr></thead><tbody>' +
      '<tr><td><strong>CAT I</strong></td><td>' + (isAr ? 'الأجهزة الإلكترونية المحمية والدوائر منخفضة الجهد' : 'Protected electronic equipment & low-voltage circuits') + '</td><td>' + (isAr ? 'دوائر الإشارة، الأردوينو، الإلكترونيات الدقيقة' : 'Signal circuits, microcontrollers, PC boards') + '</td></tr>' +
      '<tr><td><strong>CAT II</strong></td><td>' + (isAr ? 'الأجهزة المنزلية المتصلة بمقابس الحائط' : 'Single-phase appliances connected to receptacles') + '</td><td>' + (isAr ? 'الأجهزة المنزلية، الأدوات الكهربية، مقابس الغرف' : 'Household appliances, portable tools, outlets') + '</td></tr>' +
      '<tr><td><strong>CAT III</strong></td><td>' + (isAr ? 'لوحات التوزيع الكهربية وتمديدات المباني' : 'Distribution panels, fixed indoor electrical installations') + '</td><td>' + (isAr ? 'القواطع الرئيسية، محركات المصانع، لوحات التوزيع' : 'Circuit breaker panels, switches, industrial feeders') + '</td></tr>' +
      '<tr><td><strong>CAT IV</strong></td><td>' + (isAr ? 'المدخل الرئيسي لخط الكهرباء والمحولات الخارجية' : 'Origin of installation & outdoor utility service') + '</td><td>' + (isAr ? 'عدادات الكهرباء الرئيسية، الكابلات الخارجية، خطوط الإمداد' : 'Electricity meters, overhead lines, transformer inputs') + '</td></tr>' +
      '</tbody></table>';

    // Accuracy Calculator
    html += '<h2 id="sec-mm-accuracy" style="margin-top: 32px;">' + REF.t('mmAccuracy') + '</h2>' +
      '<div class="calc-card">' +
      '<p class="text-small text-muted">' + (isAr ? 'تحدد نشرات المواصفات دقة الجهاز بالمعادلة: ± (% من القراءة + عدد digits). احسب الحد الأدنى والأقصى لقراءتك:' : 'DMM accuracy formula: ± (% of reading + number of digits). Calculate reading tolerance bounds:') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="acc-reading">' + REF.t('value') + ' (Reading)</label><input type="text" id="acc-reading" value="12.05" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="acc-pct">± % Reading</label><input type="text" id="acc-pct" value="0.5" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="acc-digits">Digits (Counts)</label><input type="number" id="acc-digits" value="2" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="acc-res">Resolution (LSD)</label><input type="text" id="acc-res" value="0.01" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="acc-result" class="result-value">---</div></div>' +
      '</div>';

    container.innerHTML = html;

    // Draw SVG Multimeter
    function drawMultimeterSvg(modeKey) {
      var sBox = document.getElementById('multimeter-svg-container');
      sBox.innerHTML = '';
      var info = modesInfo[modeKey];

      var w = 180, h = 260;
      var s = REF.svg.svg(w, h, '0 0 180 260');

      // Outer housing (soft engineering yellow or dark grey)
      var body = REF.svg.rect(10, 10, 160, 240, 'stroke');
      body.setAttribute('rx', '14');
      body.setAttribute('ry', '14');
      body.setAttribute('fill', '#e0c85c');
      body.setAttribute('stroke', '#333');
      body.setAttribute('stroke-width', '2');
      s.appendChild(body);

      // LCD Screen
      var lcd = REF.svg.rect(30, 25, 120, 50, 'stroke');
      lcd.setAttribute('rx', '3');
      lcd.setAttribute('fill', '#c6d1bd');
      lcd.setAttribute('stroke', '#444');
      lcd.setAttribute('stroke-width', '1.5');
      s.appendChild(lcd);

      // LCD Text
      var valText = '12.05';
      if (modeKey === 'resistance') valText = '4.70 k';
      else if (modeKey === 'continuity') valText = '00.2';
      else if (modeKey === 'diode') valText = '0.624';
      else if (modeKey === 'capacitance') valText = '100.0';

      var lcdText = REF.svg.text(90, 50, valText, 'fill');
      lcdText.setAttribute('font-family', 'var(--font-mono)');
      lcdText.setAttribute('font-size', '20');
      lcdText.setAttribute('font-weight', '700');
      lcdText.setAttribute('fill', '#111');
      s.appendChild(lcdText);

      var unitText = REF.svg.text(138, 65, info.symbol, 'fill');
      unitText.setAttribute('font-size', '10');
      unitText.setAttribute('fill', '#333');
      s.appendChild(unitText);

      // Rotary dial outer
      var dialOuter = REF.svg.circle(90, 125, 36, 'stroke');
      dialOuter.setAttribute('fill', '#2b2a28');
      dialOuter.setAttribute('stroke', '#111');
      dialOuter.setAttribute('stroke-width', '2');
      s.appendChild(dialOuter);

      // Dial pointer knob
      var dialInner = REF.svg.circle(90, 125, 26, 'stroke');
      dialInner.setAttribute('fill', '#444');
      s.appendChild(dialInner);

      var pointer = REF.svg.rect(88, 95, 4, 18, 'stroke');
      pointer.setAttribute('fill', '#fff');
      s.appendChild(pointer);

      // Jacks at bottom (10A, mA, COM, VΩ)
      var jackLabels = ['10A', 'mA', 'COM', 'VΩ'];
      var jackXs = [35, 72, 108, 145];
      var leadStates = [info.leads.a10, info.leads.ma, info.leads.com, info.leads.v];

      for (var j = 0; j < 4; j++) {
        var jx = jackXs[j];
        var jCircle = REF.svg.circle(jx, 205, 10, 'stroke');
        jCircle.setAttribute('fill', '#1c1b19');
        s.appendChild(jCircle);

        var jHole = REF.svg.circle(jx, 205, 5, 'stroke');
        var leadColor = leadStates[j];
        if (leadColor === 'red') jHole.setAttribute('fill', '#cc0000');
        else if (leadColor === 'black') jHole.setAttribute('fill', '#111');
        else jHole.setAttribute('fill', '#666');
        s.appendChild(jHole);

        var jLbl = REF.svg.text(jx, 226, jackLabels[j], 'fill');
        jLbl.setAttribute('font-size', '9');
        jLbl.setAttribute('font-weight', '700');
        jLbl.setAttribute('fill', '#222');
        s.appendChild(jLbl);

        // Plug indicator if active
        if (leadColor === 'red' || leadColor === 'black') {
          var probeIndicator = REF.svg.circle(jx, 205, 8, 'stroke');
          probeIndicator.setAttribute('fill', leadColor === 'red' ? '#cc0000' : '#111');
          probeIndicator.setAttribute('stroke', '#fff');
          probeIndicator.setAttribute('stroke-width', '1.5');
          s.appendChild(probeIndicator);
        }
      }

      sBox.appendChild(s);
    }

    function selectMode(key) {
      currentMode = key;
      var info = modesInfo[key];
      drawMultimeterSvg(key);

      var btns = container.querySelectorAll('.btn-mm-mode');
      for (var b = 0; b < btns.length; b++) {
        if (btns[b].getAttribute('data-mode') === key) btns[b].classList.add('active');
        else btns[b].classList.remove('active');
      }

      var descEl = document.getElementById('meter-mode-desc');
      descEl.innerHTML = '<strong>' + (info.name[lang] || info.name.en) + ':</strong><br>' +
        '• ' + (info.connection[lang] || info.connection.en) + '<br>' +
        '<span style="color: #c5221f;">• ' + (info.warning[lang] || info.warning.en) + '</span>';
    }

    var modeBtns = container.querySelectorAll('.btn-mm-mode');
    for (var mb = 0; mb < modeBtns.length; mb++) {
      (function(btn) {
        btn.addEventListener('click', function() {
          selectMode(btn.getAttribute('data-mode'));
        });
      })(modeBtns[mb]);
    }

    selectMode(currentMode);

    // Accuracy Calculator Logic
    var accReadInput = document.getElementById('acc-reading');
    var accPctInput = document.getElementById('acc-pct');
    var accDigitsInput = document.getElementById('acc-digits');
    var accResInput = document.getElementById('acc-res');
    var accResultEl = document.getElementById('acc-result');

    function updateAccuracy() {
      var readVal = parseFloat(accReadInput.value);
      var pct = parseFloat(accPctInput.value);
      var digits = parseInt(accDigitsInput.value, 10);
      var res = parseFloat(accResInput.value);

      if (isNaN(readVal) || isNaN(pct) || isNaN(digits) || isNaN(res)) {
        accResultEl.textContent = '---';
        return;
      }

      var errFromPct = Math.abs(readVal) * (pct / 100);
      var errFromDigits = digits * res;
      var totalErr = errFromPct + errFromDigits;

      var minVal = readVal - totalErr;
      var maxVal = readVal + totalErr;

      accResultEl.innerHTML = '<span class="ltr-inline">' +
        'Error: ±' + totalErr.toFixed(4) + ' (' + minVal.toFixed(4) + ' to ' + maxVal.toFixed(4) + ')' +
        '</span>';
    }

    accReadInput.addEventListener('input', updateAccuracy);
    accPctInput.addEventListener('input', updateAccuracy);
    accDigitsInput.addEventListener('input', updateAccuracy);
    accResInput.addEventListener('input', updateAccuracy);
    updateAccuracy();

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
