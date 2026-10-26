/* js/pages/electricity.js — Electricity: Laws & Calculators */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.electricity = (function() {
  'use strict';

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navElectricity') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'القوانين الكهربية الأساسية، الحاسبات التفاعلية، دوائر التيار المستمر والمتردد والمغناطيسية.' : 'Fundamental electrical laws, interactive calculators, DC/AC circuits, and electromagnetism.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-dc">' + REF.t('dcCircuits') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-cap-time">' + REF.t('capIndTime') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-ac">' + REF.t('acCircuits') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-em">' + REF.t('emBasic') + '</button>' +
      '</div>';

    // ==========================================
    // 1. DC Circuits
    // ==========================================
    html += '<h2 id="sec-dc">' + REF.t('dcCircuits') + '</h2>';

    // Ohm's Law Calculator & SVG Triangle
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('ohmsLaw') + ' <span class="mono ltr-inline">V = I · R</span></h3>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">' +
      '<div id="ohm-triangle-container" style="flex: 0 0 130px; text-align: center;"></div>' +
      '<div style="flex: 1 1 280px;">' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل أي قيمتين لحساب الكميات الأخرى فوراً مع القدرة P:' : 'Enter any two values to compute the remaining ones and power P:') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 90px;"><label for="ohm-v">V (Volt)</label><input type="text" id="ohm-v" value="12" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 90px;"><label for="ohm-i">I (Ampere)</label><input type="text" id="ohm-i" placeholder="e.g. 25m" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 90px;"><label for="ohm-r">R (Ohm)</label><input type="text" id="ohm-r" value="470" class="mono"></div>' +
      '</div>' +
      '<div class="result-box" style="margin-top: 10px;">' +
      '<div id="ohm-result" class="result-value" style="font-size: 1rem;">---</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Series/Parallel Resistors Calculator
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('resCombo') + '</h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'أدخل قيم المقاومات (يقبل 100, 2.2k, 1M):' : 'Enter resistor values (supports 100, 2.2k, 1M):') + '</p>' +
      '<div id="res-list-inputs" style="display: flex; flex-direction: column; gap: 8px; margin: 12px 0;">' +
      '<div class="input-row" style="margin:0;"><input type="text" class="mono res-val" value="100" style="max-width:180px;"><button type="button" class="btn btn-remove-r">&times;</button></div>' +
      '<div class="input-row" style="margin:0;"><input type="text" class="mono res-val" value="220" style="max-width:180px;"><button type="button" class="btn btn-remove-r">&times;</button></div>' +
      '</div>' +
      '<button type="button" id="btn-add-resistor" class="btn" style="margin-bottom: 12px;">+ ' + REF.t('addResistor') + '</button>' +
      '<div class="result-box">' +
      '<div><span class="text-small text-muted">' + REF.t('series') + ' (R_eq):</span> <span id="res-series-res" class="result-value mono" style="font-size:1.05rem;">320 Ω</span></div>' +
      '<div style="margin-inline-start: 24px;"><span class="text-small text-muted">' + REF.t('parallel') + ' (R_eq):</span> <span id="res-parallel-res" class="result-value mono" style="font-size:1.05rem;">68.75 Ω</span></div>' +
      '</div>' +
      '</div>';

    // Voltage Divider Calculator
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('voltageDivider') + ' <span class="mono ltr-inline">V_out = V_in · R₂ / (R₁ + R₂)</span></h3>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="vdiv-vin">V_in (V)</label><input type="text" id="vdiv-vin" value="9" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="vdiv-r1">R₁</label><input type="text" id="vdiv-r1" value="10k" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="vdiv-r2">R₂</label><input type="text" id="vdiv-r2" value="5.1k" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="vdiv-result" class="result-value">---</div></div>' +
      '</div>';

    // LED Resistor Calculator & Forward Voltages
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('ledResistor') + ' <span class="mono ltr-inline">R = (V_s − V_f) / I_f</span></h3>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="led-vs">V_supply (V)</label><input type="text" id="led-vs" value="5" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="led-vf">V_forward (V)</label><input type="text" id="led-vf" value="2" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 100px;"><label for="led-if">I_forward</label><input type="text" id="led-if" value="20mA" class="mono"></div>' +
      '</div>' +
      '<div class="result-box">' +
      '<div><span class="text-small text-muted">' + REF.t('resistance') + ':</span> <span id="led-res-val" class="result-value">---</span></div>' +
      '<div style="margin-inline-start:24px;"><span class="text-small text-muted">' + REF.t('power') + ':</span> <span id="led-p-val" class="result-value" style="font-size:1rem; color:var(--text-muted);">---</span></div>' +
      '</div>' +
      '<h4 style="margin-top: 14px;">' + (isAr ? 'جهود LED الأمامية التقريبية حسب اللون' : 'Typical LED Forward Voltages') + '</h4>' +
      '<table><thead><tr><th>' + (isAr ? 'اللون' : 'Color') + '</th><th>' + (isAr ? 'جهد العتبة V_f التقريبي' : 'Approx. V_f') + '</th></tr></thead><tbody>';
    var leds = REF.ledVoltages;
    for (var l = 0; l < leds.length; l++) {
      html += '<tr><td>' + (leds[l].color[lang] || leds[l].color.en) + '</td><td class="mono">' + leds[l].vf + '</td></tr>';
    }
    html += '</tbody></table>' +
      '</div>';

    // Conductor Resistance & Resistivity Table
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('conductorR') + ' <span class="mono ltr-inline">R = ρ · L / A</span></h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'جدول المقاومية الكهربية للمواد عند 20 °C:' : 'Electrical resistivity of materials at 20 °C:') + '</p>' +
      '<table><thead><tr><th>' + (isAr ? 'المادة' : 'Material') + '</th><th>' + (isAr ? 'المقاومية ρ (Ω·m)' : 'Resistivity ρ (Ω·m)') + '</th></tr></thead><tbody>';
    var resMat = REF.resistivity;
    for (var m = 0; m < resMat.length; m++) {
      html += '<tr><td>' + (resMat[m].material[lang] || resMat[m].material.en) + '</td><td class="mono col-num">' + resMat[m].rho.toExponential() + '</td></tr>';
    }
    html += '</tbody></table>' +
      '<div class="formula-block">R = R₀ [1 + α(T − T₀)]  (' + (isAr ? 'تأثير درجة الحرارة على المقاومة' : 'Temperature effect on resistance') + ')</div>' +
      '</div>';

    // Delta-Wye & Other DC Formulas Cards
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('deltaWye') + '</h3>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">' +
      '<div>' +
      '<h4>Δ → Y (Delta to Wye)</h4>' +
      '<div class="formula-block">' + REF.deltaWye.deltaToWye.R1 + '<br>' + REF.deltaWye.deltaToWye.R2 + '<br>' + REF.deltaWye.deltaToWye.R3 + '</div>' +
      '</div>' +
      '<div>' +
      '<h4>Y → Δ (Wye to Delta)</h4>' +
      '<div class="formula-block">' + REF.deltaWye.wyeToDelta.R1 + '<br>' + REF.deltaWye.wyeToDelta.R2 + '<br>' + REF.deltaWye.wyeToDelta.R3 + '</div>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Thevenin & Kirchhoff Reference
    html += '<div class="calc-card" style="margin-bottom: 32px;">' +
      '<h3>' + REF.t('thevenin') + ' & ' + REF.t('kirchhoff') + '</h3>' +
      '<ul style="padding-inline-start: 20px; font-size: 0.9rem; line-height: 1.8;">' +
      '<li><strong>KCL:</strong> ' + (isAr ? 'مجموع التيارات الداخلة إلى عقدة = مجموع التيارات الخارجة منها (Σ I_in = Σ I_out).' : 'Sum of currents entering a node = sum of currents leaving (Σ I_in = Σ I_out).') + '</li>' +
      '<li><strong>KVL:</strong> ' + (isAr ? 'المجموع الجبري للجهود حول أي مسار مغلق = 0 (Σ V = 0).' : 'Algebraic sum of voltages around any closed loop = 0 (Σ V = 0).') + '</li>' +
      '<li><strong>Thevenin:</strong> ' + (isAr ? 'أي دائرة خطية تكافئ مصدر جهد V_th على التوالي مع مقاومة R_th.' : 'Any linear circuit is equivalent to voltage source V_th in series with R_th.') + '</li>' +
      '<li><strong>Norton:</strong> ' + (isAr ? 'تكافئ مصدر تيار I_N = V_th / R_th على التوازي مع نفس المقاومة R_th.' : 'Equivalent to current source I_N = V_th / R_th in parallel with R_th.') + '</li>' +
      '<li><strong>Maximum Power Transfer:</strong> ' + (isAr ? 'تنتقل أقصى قدرة للحمل عندما R_L = R_th وتكون قيمتها P_max = V_th² / (4 R_th).' : 'Max power is transferred when R_L = R_th, with P_max = V_th² / (4 R_th).') + '</li>' +
      '<li><strong>Wheatstone Bridge:</strong> <span class="mono">R₁ / R₂ = R₃ / R_x</span> ' + (isAr ? 'عند الاتزان (تيار الجلفانوميتر = 0).' : 'at balance.') + '</li>' +
      '</ul>' +
      '</div>';

    // ==========================================
    // 2. Capacitor, Inductor & Time
    // ==========================================
    html += '<h2 id="sec-cap-time">' + REF.t('capIndTime') + '</h2>';

    // Time constant calculator & Live SVG Curve
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('rcTime') + ' <span class="mono ltr-inline">τ = R · C</span> & ' + REF.t('rlTime') + ' <span class="mono ltr-inline">τ = L / R</span></h3>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="tc-r">R (Ω)</label><input type="text" id="tc-r" value="10k" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="tc-c">C (F)</label><input type="text" id="tc-c" value="100u" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="tc-result" class="result-value">---</div></div>' +
      '<h4 style="margin-top: 16px;">' + (isAr ? 'منحنى شحن وتفريغ المكثف الحي' : 'Live Capacitor Charging & Discharging Curve') + '</h4>' +
      '<div id="tc-svg-curve" style="margin: 12px 0;"></div>' +
      '<h4>' + (isAr ? 'جدول نسب الشحن والتفريغ مع الزمن' : 'Charge / Discharge Table') + '</h4>' +
      '<table><thead><tr><th>' + (isAr ? 'الزمن' : 'Time') + '</th><th>' + (isAr ? 'شحن المكثف %' : 'Charging %') + '</th><th>' + (isAr ? 'تفريغ المكثف %' : 'Discharging %') + '</th></tr></thead><tbody>';
    var tt = REF.tauTable;
    for (var k = 0; k < tt.length; k++) {
      html += '<tr><td class="mono">' + tt[k].tau + '</td><td class="mono col-num">' + tt[k].chargePercent + '%</td><td class="mono col-num">' + tt[k].dischargePercent + '%</td></tr>';
    }
    html += '</tbody></table>' +
      '<div class="formula-block">' +
      'v(t) = V_s (1 − e^(−t/τ))  [' + (isAr ? 'شحن' : 'Charging') + ']<br>' +
      'v(t) = V₀ · e^(−t/τ)  [' + (isAr ? 'تفريغ' : 'Discharging') + ']<br>' +
      'E_cap = ½ C V²  |  E_ind = ½ L I²' +
      '</div>' +
      '</div>';

    // ==========================================
    // 3. AC Circuits
    // ==========================================
    html += '<h2 id="sec-ac">' + REF.t('acCircuits') + '</h2>';

    // Resonance & Filters Calculator
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('resonance') + ' <span class="mono ltr-inline">f₀ = 1 / (2π√(LC))</span></h3>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="res-l">L (H)</label><input type="text" id="res-l" value="10m" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="res-c">C (F)</label><input type="text" id="res-c" value="100n" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="res-result" class="result-value">---</div></div>' +
      '</div>';

    // Cutoff frequency calculator
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('filters') + ' <span class="mono ltr-inline">f_c = 1 / (2πRC)</span></h3>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="fc-r">R (Ω)</label><input type="text" id="fc-r" value="1k" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 120px;"><label for="fc-c">C (F)</label><input type="text" id="fc-c" value="159n" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="fc-result" class="result-value">---</div></div>' +
      '</div>';

    // AC Formulas List
    html += '<div class="calc-card" style="margin-bottom: 32px;">' +
      '<h3>' + (isAr ? 'علاقات وقوانين التيار المتردد الأساسية' : 'AC Circuit Equations') + '</h3>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">' +
      '<div class="formula-block">V_rms = V_p / √2 ≈ 0.707 V_p<br>V_pp = 2 V_p<br>V_avg = 2 V_p / π ≈ 0.637 V_p</div>' +
      '<div class="formula-block">X_C = 1 / (2π f C)<br>X_L = 2π f L<br>Z = √(R² + (X_L − X_C)²)</div>' +
      '<div class="formula-block">P = V · I · cosφ  [W]<br>Q = V · I · sinφ  [var]<br>S = V · I  [VA]<br>cosφ = P / S</div>' +
      '<div class="formula-block">V_L = √3 · V_ph  (Star)<br>I_L = √3 · I_ph  (Delta)<br>P_3ph = √3 · V_L · I_L · cosφ</div>' +
      '<div class="formula-block">V₁ / V₂ = N₁ / N₂ = I₂ / I₁  (Transformer)<br>dB = 20 log₁₀(V_out / V_in)<br>dB = 10 log₁₀(P_out / P_in)</div>' +
      '</div>' +
      '</div>';

    // ==========================================
    // 4. Basic Electromagnetism
    // ==========================================
    html += '<h2 id="sec-em">' + REF.t('emBasic') + '</h2>';
    html += '<div class="calc-card" style="margin-bottom: 32px;">' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">' +
      '<div class="formula-block">F = k · q₁ q₂ / r²  (Coulomb)<br>E = F / q = k · q / r²<br>V = k · q / r</div>' +
      '<div class="formula-block">C = ε₀ ε_r A / d  (Plate Capacitor)<br>F = B · I · L · sinθ  (Conductor)<br>F = q · v · B · sinθ  (Charge)</div>' +
      '<div class="formula-block">ε = −N · dΦ / dt  (Faraday)<br>L = µ₀ µ_r N² A / ℓ  (Solenoid)</div>' +
      '</div>' +
      '</div>';

    container.innerHTML = html;

    // Draw Ohm triangle
    var triContainer = document.getElementById('ohm-triangle-container');
    triContainer.appendChild(REF.svg.drawOhmTriangle());

    // Hook Ohm Calculator
    var ohmV = document.getElementById('ohm-v');
    var ohmI = document.getElementById('ohm-i');
    var ohmR = document.getElementById('ohm-r');
    var ohmRes = document.getElementById('ohm-result');

    function updateOhm() {
      var v = ohmV.value.trim() ? REF.format.parseInput(ohmV.value) : null;
      var i = ohmI.value.trim() ? REF.format.parseInput(ohmI.value) : null;
      var r = ohmR.value.trim() ? REF.format.parseInput(ohmR.value) : null;

      var res = REF.convert.ohmsLaw({ V: v, I: i, R: r });
      if (!res) {
        ohmRes.textContent = isAr ? 'أدخل قيمتين على الأقل' : 'Enter at least two values';
        return;
      }

      var iStr = REF.format.toEngineering(res.I, 'A');
      var vStr = REF.format.toEngineering(res.V, 'V');
      var rStr = REF.format.toEngineering(res.R, 'Ω');
      var pStr = REF.format.toEngineering(res.P, 'W');

      ohmRes.innerHTML = '<span class="ltr-inline">V = ' + vStr + ' | I = ' + iStr + ' | R = ' + rStr + ' | P = ' + pStr + '</span>';
    }

    ohmV.addEventListener('input', updateOhm);
    ohmI.addEventListener('input', updateOhm);
    ohmR.addEventListener('input', updateOhm);
    updateOhm();

    // Hook Series/Parallel Calculator
    var resListEl = document.getElementById('res-list-inputs');
    var btnAddR = document.getElementById('btn-add-resistor');
    var resSeriesRes = document.getElementById('res-series-res');
    var resParallelRes = document.getElementById('res-parallel-res');

    function updateResCombo() {
      var inputs = resListEl.querySelectorAll('.res-val');
      var values = [];
      for (var idx = 0; idx < inputs.length; idx++) {
        var val = REF.format.parseInput(inputs[idx].value);
        if (!isNaN(val) && val > 0) values.push(val);
      }
      if (values.length === 0) {
        resSeriesRes.textContent = '---';
        resParallelRes.textContent = '---';
        return;
      }
      var s = REF.convert.resistorsSeries(values);
      var p = REF.convert.resistorsParallel(values);
      resSeriesRes.textContent = REF.format.toEngineering(s, 'Ω');
      resParallelRes.textContent = REF.format.toEngineering(p, 'Ω');
    }

    resListEl.addEventListener('input', updateResCombo);

    resListEl.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('btn-remove-r')) {
        var row = e.target.closest('.input-row');
        if (resListEl.querySelectorAll('.input-row').length > 1) {
          row.remove();
          updateResCombo();
        }
      }
    });

    btnAddR.addEventListener('click', function() {
      var row = document.createElement('div');
      row.className = 'input-row';
      row.style.margin = '0';
      row.innerHTML = '<input type="text" class="mono res-val" value="1k" style="max-width:180px;"><button type="button" class="btn btn-remove-r">&times;</button>';
      resListEl.appendChild(row);
      updateResCombo();
    });

    updateResCombo();

    // Hook Voltage Divider
    var vdivVin = document.getElementById('vdiv-vin');
    var vdivR1 = document.getElementById('vdiv-r1');
    var vdivR2 = document.getElementById('vdiv-r2');
    var vdivRes = document.getElementById('vdiv-result');

    function updateVdiv() {
      var vin = REF.format.parseInput(vdivVin.value);
      var r1 = REF.format.parseInput(vdivR1.value);
      var r2 = REF.format.parseInput(vdivR2.value);
      if (isNaN(vin) || isNaN(r1) || isNaN(r2) || (r1 + r2) === 0) {
        vdivRes.textContent = '---';
        return;
      }
      var vout = REF.convert.voltageDivider(vin, r1, r2);
      vdivRes.innerHTML = '<span class="ltr-inline">V_out = ' + vout.toFixed(3) + ' V</span>';
    }

    vdivVin.addEventListener('input', updateVdiv);
    vdivR1.addEventListener('input', updateVdiv);
    vdivR2.addEventListener('input', updateVdiv);
    updateVdiv();

    // Hook LED Resistor
    var ledVs = document.getElementById('led-vs');
    var ledVf = document.getElementById('led-vf');
    var ledIf = document.getElementById('led-if');
    var ledResVal = document.getElementById('led-res-val');
    var ledPVal = document.getElementById('led-p-val');

    function updateLed() {
      var vs = REF.format.parseInput(ledVs.value);
      var vf = REF.format.parseInput(ledVf.value);
      var ifCurrent = REF.format.parseInput(ledIf.value);
      if (isNaN(vs) || isNaN(vf) || isNaN(ifCurrent) || ifCurrent <= 0) {
        ledResVal.textContent = '---';
        ledPVal.textContent = '---';
        return;
      }
      var r = REF.convert.ledResistor(vs, vf, ifCurrent);
      var p = (vs - vf) * ifCurrent;
      ledResVal.textContent = REF.format.toEngineering(r, 'Ω');
      ledPVal.textContent = REF.format.toEngineering(p, 'W');
    }

    ledVs.addEventListener('input', updateLed);
    ledVf.addEventListener('input', updateLed);
    ledIf.addEventListener('input', updateLed);
    updateLed();

    // Hook Time Constant & Live SVG Graph
    var tcR = document.getElementById('tc-r');
    var tcC = document.getElementById('tc-c');
    var tcRes = document.getElementById('tc-result');
    var tcSvgBox = document.getElementById('tc-svg-curve');

    function drawRcCurve(tau) {
      tcSvgBox.innerHTML = '';
      var w = 400, h = 160;
      var s = REF.svg.svg(w, h, '0 0 400 160');

      // Axes
      s.appendChild(REF.svg.line(40, 10, 40, 130, 'stroke'));
      s.appendChild(REF.svg.line(40, 130, 380, 130, 'stroke'));

      // Labels
      s.appendChild(REF.svg.text(20, 20, '100%', 'fill'));
      s.appendChild(REF.svg.text(20, 75, '50%', 'fill'));
      s.appendChild(REF.svg.text(25, 130, '0%', 'fill'));

      // Tau ticks 1τ to 5τ
      for (var t = 1; t <= 5; t++) {
        var x = 40 + t * 64;
        s.appendChild(REF.svg.line(x, 127, x, 133, 'stroke'));
        s.appendChild(REF.svg.text(x, 145, t + 'τ', 'fill'));
      }

      // 63.2% dashed line
      var y63 = 130 - 120 * 0.632;
      var dLine = REF.svg.line(40, y63, 380, y63, 'stroke');
      dLine.setAttribute('stroke-dasharray', '3,3');
      dLine.setAttribute('stroke-opacity', '0.4');
      s.appendChild(dLine);
      s.appendChild(REF.svg.text(360, y63 - 6, '63.2%', 'fill'));

      // Charging curve path (greenish/dark)
      var dCharge = 'M 40 130';
      for (var px = 0; px <= 320; px += 4) {
        var tNorm = (px / 320) * 5; // 0 to 5 tau
        var vNorm = 1 - Math.exp(-tNorm);
        var py = 130 - vNorm * 120;
        dCharge += ' L ' + (40 + px) + ' ' + py;
      }
      var pathCharge = REF.svg.path(dCharge, 'stroke');
      pathCharge.setAttribute('stroke-width', '2');
      s.appendChild(pathCharge);

      // Discharging curve path (dashed)
      var dDischarge = 'M 40 10';
      for (var dx = 0; dx <= 320; dx += 4) {
        var tNormD = (dx / 320) * 5;
        var vNormD = Math.exp(-tNormD);
        var pyD = 130 - vNormD * 120;
        dDischarge += ' L ' + (40 + dx) + ' ' + pyD;
      }
      var pathDischarge = REF.svg.path(dDischarge, 'stroke');
      pathDischarge.setAttribute('stroke-dasharray', '4,3');
      pathDischarge.setAttribute('stroke-opacity', '0.7');
      s.appendChild(pathDischarge);

      tcSvgBox.appendChild(s);
    }

    function updateTc() {
      var r = REF.format.parseInput(tcR.value);
      var c = REF.format.parseInput(tcC.value);
      if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) {
        tcRes.textContent = '---';
        return;
      }
      var tau = REF.convert.timeConstantRC(r, c);
      tcRes.innerHTML = '<span class="ltr-inline">τ = ' + REF.format.toEngineering(tau, 's') + '</span>';
      drawRcCurve(tau);
    }

    tcR.addEventListener('input', updateTc);
    tcC.addEventListener('input', updateTc);
    updateTc();

    // Hook Resonance
    var resL = document.getElementById('res-l');
    var resC = document.getElementById('res-c');
    var resRes = document.getElementById('res-result');

    function updateResonance() {
      var l = REF.format.parseInput(resL.value);
      var c = REF.format.parseInput(resC.value);
      if (isNaN(l) || isNaN(c) || l <= 0 || c <= 0) {
        resRes.textContent = '---';
        return;
      }
      var f0 = REF.convert.resonantFreq(l, c);
      resRes.innerHTML = '<span class="ltr-inline">f₀ = ' + REF.format.toEngineering(f0, 'Hz') + '</span>';
    }

    resL.addEventListener('input', updateResonance);
    resC.addEventListener('input', updateResonance);
    updateResonance();

    // Hook Cutoff frequency
    var fcR = document.getElementById('fc-r');
    var fcC = document.getElementById('fc-c');
    var fcRes = document.getElementById('fc-result');

    function updateFc() {
      var r = REF.format.parseInput(fcR.value);
      var c = REF.format.parseInput(fcC.value);
      if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) {
        fcRes.textContent = '---';
        return;
      }
      var fc = REF.convert.cutoffRC(r, c);
      fcRes.innerHTML = '<span class="ltr-inline">f_c = ' + REF.format.toEngineering(fc, 'Hz') + '</span>';
    }

    fcR.addEventListener('input', updateFc);
    fcC.addEventListener('input', updateFc);
    updateFc();

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
