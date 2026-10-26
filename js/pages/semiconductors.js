/* js/pages/semiconductors.js — Diodes, BJTs, MOSFETs & Design Notes */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.semiconductors = (function() {
  'use strict';

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navDiodeTransistor') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'مرجع أشباه الموصلات: الدايود، ترانزستور BJT، ترانزستور MOSFET، وحاسبة الترانزستور كمفتاح.' : 'Semiconductor reference: Diodes, BJTs, MOSFETs, and BJT Switch saturation calculator.') + '</p>' +
      '</div>';

    // Sub-nav (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-diode">' + REF.t('diode') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-bjt">' + REF.t('bjt') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-mosfet">' + REF.t('mosfet') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-design">' + REF.t('designNotes') + '</button>' +
      '</div>';

    // ==========================================
    // 1. DIODE
    // ==========================================
    html += '<h2 id="sec-diode">' + REF.t('diode') + '</h2>';

    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'معادلة شوكلي للدايود (Shockley Diode Equation)' : 'Shockley Diode Equation') + '</h3>' +
      '<div class="formula-block">I = I_S · [e^(V / (n · V_T)) − 1]</div>' +
      '<p class="text-small text-muted">' + (isAr ? 'حيث I_S تيار الإشباع العكسي، V جهد الوصلة، n معامل المثالية (1–2)، و V_T الجهد الحراري (≈ 25.85 mV عند 300 K).' : 'Where I_S is reverse saturation current, n is ideality factor (1-2), and V_T is thermal voltage (~25.85 mV at 300 K).') + '</p>' +
      '<h4>' + (isAr ? 'جهود العتبة التقريبية (Forward Drop V_f):' : 'Typical Forward Voltages:') + '</h4>' +
      '<table><thead><tr><th>' + (isAr ? 'نوع الدايود' : 'Diode Type') + '</th><th>' + (isAr ? 'جهد العتبة V_f' : 'Threshold V_f') + '</th><th>' + (isAr ? 'الميزات والاستخدام' : 'Features & Usage') + '</th></tr></thead><tbody>' +
      '<tr><td><strong>' + (isAr ? 'سيليكون عادي (Silicon PN)' : 'Silicon PN') + '</strong></td><td class="mono">0.6 – 0.7 V</td><td>' + (isAr ? 'الأكثر شيوعاً (1N4001, 1N4148)' : 'General rectification & switching') + '</td></tr>' +
      '<tr><td><strong>' + (isAr ? 'شوتكي (Schottky)' : 'Schottky') + '</strong></td><td class="mono">0.2 – 0.4 V</td><td>' + (isAr ? 'هبوط جهد منخفض جداً وسرعة تحويل فائقة (1N5819)' : 'Low forward drop, high speed') + '</td></tr>' +
      '<tr><td><strong>' + (isAr ? 'جرمانيوم (Germanium)' : 'Germanium') + '</strong></td><td class="mono">0.25 – 0.3 V</td><td>' + (isAr ? 'كواشف إشارات الراديو والدوائر القديمة' : 'RF detectors, legacy audio') + '</td></tr>' +
      '<tr><td><strong>' + (isAr ? 'دايود ضوئي LED' : 'LED') + '</strong></td><td class="mono">1.8 – 3.6 V</td><td>' + (isAr ? 'يتغير حسب لون الضوء المنبعث (أحمر < أخضر < أزرق)' : 'Varies by emission wavelength') + '</td></tr>' +
      '</tbody></table>' +
      '<h4 style="margin-top: 14px;">' + (isAr ? 'منظم الجهد بدايود زينر (Zener Voltage Regulator):' : 'Zener Voltage Regulator:') + '</h4>' +
      '<div class="formula-block">R_s = (V_in − V_Z) / (I_Z + I_L)</div>' +
      '<p class="text-small text-muted">' + (isAr ? 'يعمل زينر في منطقة الانهيار العكسي لتثبيت الجهد عند V_Z.' : 'Operates in reverse breakdown region to clamp voltage at V_Z.') + '</p>' +
      '</div>';

    // ==========================================
    // 2. BJT
    // ==========================================
    html += '<h2 id="sec-bjt">' + REF.t('bjt') + '</h2>';

    // BJT Switch Calculator
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + REF.t('bjtSwitch') + '</h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'حساب مقاومة القاعدة R_B لتشغيل الترانزستور في الإشباع التام (Saturation كمفتاح ON):' : 'Compute Base resistor R_B to drive BJT into hard saturation as a reliable switch:') + '</p>' +
      '<div class="input-row">' +
      '<div class="input-group" style="flex: 1 1 110px;"><label for="bjt-vcc">V_cc (V)</label><input type="text" id="bjt-vcc" value="12" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 110px;"><label for="bjt-iload">I_load (A / mA)</label><input type="text" id="bjt-iload" value="100m" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 110px;"><label for="bjt-vin">V_in / Control (V)</label><input type="text" id="bjt-vin" value="5" class="mono"></div>' +
      '<div class="input-group" style="flex: 1 1 110px;"><label for="bjt-beta">β (h_FE Datasheet)</label><input type="text" id="bjt-beta" value="150" class="mono"></div>' +
      '</div>' +
      '<div class="result-box"><div id="bjt-calc-res" class="result-value">---</div></div>' +
      '<div class="note-box" style="margin-top: 14px;">' +
      '<strong>' + (isAr ? 'لماذا نستخدم β_forced = 10 بدلاً من β الاسمية؟' : 'Why use β_forced = 10 instead of datasheet β?') + '</strong>' +
      '<p style="font-size: 0.88rem; line-height: 1.6; margin-top: 4px;">' +
      (isAr ?
        'قيمة β (h_FE) المكتوبة في الداتاشيت هي للمنطقة الفعالة وتتغير بشدة مع تيار المجمع ودرجة الحرارة واختلافات التصنيع. لضمان بقاء الترانزستور في <strong>الإشباع القوي (Hard Saturation)</strong> وتحقيق أقل جهد هبوط V_CE(sat) ≈ 0.2V وأقل حرارة مبددة، يفرض المهندسون قاعدة overdrive factor بجعل I_B = I_C / 10.' :
        'Datasheet β is measured in active region and drifts widely with temperature and batch. The industry standard overdrive rule mandates β_forced = 10 to ensure deep saturation, minimum V_CE(sat) (~0.2V), and lowest power dissipation.') +
      '</p>' +
      '</div>' +
      '</div>';

    // BJT Equations & CE Amplifier
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'معادلات BJT الأساسية ومكبر الإميتر المشترك' : 'BJT Core Relations & CE Amplifier') + '</h3>' +
      '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">' +
      '<div class="formula-block">I_E = I_B + I_C<br>I_C = β · I_B  (Active Region)<br>α = I_C / I_E = β / (β + 1)</div>' +
      '<div class="formula-block">V_BE ≈ 0.65 – 0.7 V  (Active/Sat)<br>V_CE(sat) ≈ 0.1 – 0.3 V<br>V_CE(cutoff) = V_cc</div>' +
      '<div class="formula-block">r_e ≈ V_T / I_E ≈ 25 mV / I_E<br>A_v ≈ −R_C / r_e  (CE Gain)<br>R_in(base) ≈ β · r_e</div>' +
      '</div>' +
      '</div>';

    // ==========================================
    // 3. MOSFET
    // ==========================================
    html += '<h2 id="sec-mosfet">' + REF.t('mosfet') + '</h2>';

    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'ترانزستور MOSFET ذو القناة N (Enhancement)' : 'N-Channel MOSFET (Enhancement Mode)') + '</h3>' +
      '<p class="text-small text-muted">' + (isAr ? 'الترانزستور الحاثي هو عنصر تحكم بالجهد (Voltage-controlled) حيث تيار البوابة Gate يقارب الصفر I_G ≈ 0.' : 'MOSFET is voltage-controlled; steady-state gate current I_G is virtually zero.') + '</p>' +
      '<table><thead><tr><th>' + (isAr ? 'منطقة التشغيل' : 'Operating Region') + '</th><th>' + (isAr ? 'الشرط' : 'Condition') + '</th><th>' + (isAr ? 'معادلة التيار I_D' : 'Drain Current Formula') + '</th></tr></thead><tbody>' +
      '<tr><td><strong>' + (isAr ? 'القطع (Cutoff)' : 'Cutoff') + '</strong></td><td class="mono">V_GS < V_th</td><td class="mono">I_D = 0</td></tr>' +
      '<tr><td><strong>' + (isAr ? 'الخطية / ترايود (Triode/Linear)' : 'Triode / Linear') + '</strong></td><td class="mono">V_DS < V_GS − V_th</td><td class="mono">I_D = k_n·(W/L)·[(V_GS−V_th)V_DS − V_DS²/2]</td></tr>' +
      '<tr><td><strong>' + (isAr ? 'التشبع (Saturation)' : 'Saturation') + '</strong></td><td class="mono">V_DS ≥ V_GS − V_th</td><td class="mono">I_D = ½·k_n·(W/L)·(V_GS − V_th)²</td></tr>' +
      '</tbody></table>' +
      '<div style="margin-top: 14px; font-size: 0.88rem; line-height: 1.6;">' +
      '<strong>Logic-Level MOSFETs:</strong> ' + (isAr ? 'معظم موسفيتات القدرة القديمة تحتاج V_GS = 10 V لتفتح بالكامل. في دوائر المتحكمات (3.3V / 5V)، يجب اختيار طراز Logic-Level (مثل IRLZ44N أو AO3400) يفتح بالكامل عند جهد المنطق.' : 'Standard MOSFETs require V_GS = 10V to fully conduct. For 3.3V/5V microcontroller systems, select Logic-Level MOSFETs (e.g. IRLZ44N, AO3400) that achieve minimum R_DS(on) at low gate voltages.') +
      '</div>' +
      '<div class="formula-block" style="margin-top: 10px;">P_dissipated = I_D² · R_DS(on)</div>' +
      '</div>';

    // ==========================================
    // 4. Circuit Design Best Practices
    // ==========================================
    html += '<h2 id="sec-design">' + REF.t('designNotes') + '</h2>';

    html += '<div class="calc-card" style="margin-bottom: 32px;">' +
      '<h3>' + (isAr ? 'قواعد ذهبية لتصميم دوائر الترانزستور والتحكم' : 'Golden Rules for Driver Circuit Design') + '</h3>' +
      '<ul style="padding-inline-start: 20px; font-size: 0.88rem; line-height: 1.8;">' +
      '<li><strong>Pull-up / Pull-down Resistors:</strong> ' + (isAr ? 'بوابات MOSFET عالية المعاوقة جداً وتتصرف كمكثف صغير. إذا تُركت البوابة عائمة (Floating)، تلتقط ضوضاء كهرومغناطيسية وتفتح عشوائياً. ضع دائماً مقاومة 10k بين البوابة والأرضي (Gate-to-Source) لتفريغ الشحنة عند غياب إشارة التحكم.' : 'MOSFET gates act as small capacitors. A floating gate picks up stray noise and switches erratically. Always place a 10kΩ pull-down between Gate and Source to hold it OFF during boot.') + '</li>' +
      '<li><strong>Flyback / Freewheeling Diode:</strong> ' + (isAr ? 'عند التحكم في أحمال حثية (ريليه، موتور، صمام كهربي Solenoid)، فإن فصل التيار فجأة يولد نبضة جهد عكسي هائلة (V = −L·di/dt) تصل لمئات الفولتات وتدمر الترانزستور فوراً. <strong>الحل:</strong> وضع دايود سريع (مثل 1N4007 أو 1N5819) على التوازي مع الحمل الحثي في الاتجاه المعاكس لتفريغ تيار الملف بأمان.' : 'Switching off inductive loads (relays, motors, solenoids) produces huge voltage spikes (V = −L·di/dt) that destroy the driving transistor. Always connect a reverse-biased flyback diode across the inductive coil.') + '</li>' +
      '<li><strong>Base/Gate Resistor:</strong> ' + (isAr ? 'في BJT، مقاومة القاعدة R_B إلزامية للحد من تيار القاعدة. في MOSFET، مقاومة صغيرة (10–100 Ω) على مسار البوابة تمنع رنين الطنين (ringing) وتحد من تيار الشحن اللحظي لمكثف البوابة لحماية أطراف الميكروكنترولر.' : 'In BJTs, R_B limits base current. In MOSFETs, a small series gate resistor (10-100 Ω) dampens parasitic oscillations and limits inrush current from MCU pins.') + '</li>' +
      '</ul>' +
      '</div>';

    container.innerHTML = html;

    // Hook BJT Calculator
    var bjtVcc = document.getElementById('bjt-vcc');
    var bjtIload = document.getElementById('bjt-iload');
    var bjtVin = document.getElementById('bjt-vin');
    var bjtBeta = document.getElementById('bjt-beta');
    var bjtResEl = document.getElementById('bjt-calc-res');

    function updateBjt() {
      var vcc = REF.format.parseInput(bjtVcc.value);
      var iload = REF.format.parseInput(bjtIload.value);
      var vin = REF.format.parseInput(bjtVin.value);
      var beta = REF.format.parseInput(bjtBeta.value);

      if (isNaN(vcc) || isNaN(iload) || isNaN(vin) || isNaN(beta) || iload <= 0 || vin <= 0.7) {
        bjtResEl.textContent = '---';
        return;
      }

      var calc = REF.convert.bjtSwitch(vcc, iload, beta, vin);
      var rbStd = REF.convert.nearestStandard(calc.Rb, 'E24');
      var rbStdStr = rbStd ? ' (E24: ' + REF.format.toEngineering(rbStd.value, 'Ω') + ')' : '';

      bjtResEl.innerHTML = '<span class="ltr-inline">' +
        'R_B = ' + REF.format.toEngineering(calc.Rb, 'Ω') + rbStdStr + ' | I_B = ' + REF.format.toEngineering(calc.Ib, 'A') + ' | P_diss = ' + REF.format.toEngineering(calc.Pdissipated, 'W') +
        '</span>';
    }

    bjtVcc.addEventListener('input', updateBjt);
    bjtIload.addEventListener('input', updateBjt);
    bjtVin.addEventListener('input', updateBjt);
    bjtBeta.addEventListener('input', updateBjt);
    updateBjt();

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
