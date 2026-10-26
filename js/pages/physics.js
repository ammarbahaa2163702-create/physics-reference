/* js/pages/physics.js — General Physics Reference */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.physics = (function() {
  'use strict';

  var physicsSections = [
    {
      id: 'mechanics',
      title: { ar: 'الميكانيكا الكلاسيكية (Mechanics)', en: 'Classical Mechanics' },
      laws: [
        { name: { ar: 'معادلة الحركة 1', en: 'Kinematic Eq. 1' }, formula: 'v = v₀ + a·t', symbols: 'v [m/s], v₀ [m/s], a [m/s²], t [s]', example: 'v₀=0, a=9.8 m/s², t=2s → v = 19.6 m/s' },
        { name: { ar: 'معادلة الحركة 2', en: 'Kinematic Eq. 2' }, formula: 's = v₀·t + ½·a·t²', symbols: 's [m], v₀ [m/s], t [s], a [m/s²]', example: 'v₀=0, a=9.8, t=3s → s = 44.1 m' },
        { name: { ar: 'معادلة الحركة 3', en: 'Kinematic Eq. 3' }, formula: 'v² = v₀² + 2·a·s', symbols: 'v, v₀ [m/s], a [m/s²], s [m]', example: 'v₀=10, a=2, s=20 → v = √(100+80) = 13.42 m/s' },
        { name: { ar: 'قانون نيوتن الثاني', en: 'Newton\'s Second Law' }, formula: 'F = m · a', symbols: 'F [N], m [kg], a [m/s²]', example: 'm=5 kg, a=3 m/s² → F = 15 N' },
        { name: { ar: 'الوزن', en: 'Weight' }, formula: 'W = m · g', symbols: 'W [N], m [kg], g=9.80665 m/s²', example: 'm=70 kg → W ≈ 686.5 N' },
        { name: { ar: 'الشغل الميكانيكي', en: 'Work' }, formula: 'W = F · d · cosθ', symbols: 'W [J], F [N], d [m], θ [rad/°]', example: 'F=50 N, d=4 m, θ=0° → W = 200 J' },
        { name: { ar: 'طاقة الحركة', en: 'Kinetic Energy' }, formula: 'E_k = ½ · m · v²', symbols: 'E_k [J], m [kg], v [m/s]', example: 'm=1000 kg, v=20 m/s (72 km/h) → E_k = 200 kJ' },
        { name: { ar: 'طاقة الوضع التثاقلية', en: 'Gravitational Potential' }, formula: 'E_p = m · g · h', symbols: 'E_p [J], m [kg], h [m]', example: 'm=2 kg, h=10 m → E_p ≈ 196.1 J' },
        { name: { ar: 'كمية الحركة (الزخم)', en: 'Linear Momentum' }, formula: 'p = m · v', symbols: 'p [kg·m/s], m [kg], v [m/s]', example: 'm=0.15 kg, v=40 m/s → p = 6 kg·m/s' },
        { name: { ar: 'الدفع', en: 'Impulse' }, formula: 'J = F · Δt = Δp', symbols: 'J [N·s], F [N], Δt [s]', example: 'F=100 N, Δt=0.05 s → J = 5 N·s' },
        { name: { ar: 'قوة الاحتكاك', en: 'Friction Force' }, formula: 'f = µ · N', symbols: 'f [N], µ [معامل بدون وحدة], N [N]', example: 'µ=0.3, N=100 N → f = 30 N' },
        { name: { ar: 'التسارع المركزي', en: 'Centripetal Accel.' }, formula: 'a_c = v² / r = ω² · r', symbols: 'a_c [m/s²], v [m/s], r [m]', example: 'v=10 m/s, r=5 m → a_c = 20 m/s²' },
        { name: { ar: 'قانون الجذب العام', en: 'Universal Gravitation' }, formula: 'F = G · m₁·m₂ / r²', symbols: 'G ≈ 6.674e-11, m [kg], r [m]', example: 'm₁=m₂=1 kg, r=1 m → F ≈ 6.674e-11 N' },
        { name: { ar: 'عزم القوة', en: 'Torque' }, formula: 'τ = r · F · sinθ', symbols: 'τ [N·m], r [m], F [N]', example: 'r=0.25 m, F=40 N, θ=90° → τ = 10 N·m' },
        { name: { ar: 'قانون هوك للمرونة', en: 'Hooke\'s Law' }, formula: 'F = −k · x', symbols: 'F [N], k [N/m], x [m]', example: 'k=200 N/m, x=0.05 m → |F| = 10 N' }
      ]
    },
    {
      id: 'fluids',
      title: { ar: 'المواد والموائع (Materials & Fluids)', en: 'Materials & Fluids' },
      laws: [
        { name: { ar: 'الكثافة', en: 'Density' }, formula: 'ρ = m / V', symbols: 'ρ [kg/m³], m [kg], V [m³]', example: 'm=1000 kg, V=1 m³ (Water) → ρ = 1000 kg/m³' },
        { name: { ar: 'الضغط', en: 'Pressure' }, formula: 'P = F / A', symbols: 'P [Pa], F [N], A [m²]', example: 'F=500 N, A=0.01 m² → P = 50 000 Pa (50 kPa)' },
        { name: { ar: 'ضغط عمود السائل', en: 'Hydrostatic Pressure' }, formula: 'P = ρ · g · h', symbols: 'ρ [kg/m³], g [m/s²], h [m]', example: 'Water h=10 m → P ≈ 1000×9.8×10 ≈ 98 kPa' },
        { name: { ar: 'قاعدة أرخميدس (قوة الطفو)', en: 'Archimedes\' Principle' }, formula: 'F_b = ρ_fluid · V_disp · g', symbols: 'F_b [N], V_disp [m³]', example: 'V_disp=0.05 m³ in water → F_b ≈ 490.3 N' },
        { name: { ar: 'معادلة الاستمرارية', en: 'Continuity Equation' }, formula: 'A₁ · v₁ = A₂ · v₂', symbols: 'A [m²], v [m/s]', example: 'A₁=4 cm², v₁=1 m/s, A₂=1 cm² → v₂ = 4 m/s' },
        { name: { ar: 'معادلة برنولي', en: 'Bernoulli Equation' }, formula: 'P + ½·ρ·v² + ρ·g·h = const', symbols: 'P [Pa], ρ [kg/m³], v [m/s], h [m]', example: 'الضغط يقل مع زيادة سرعة المائع' }
      ]
    },
    {
      id: 'heat',
      title: { ar: 'الحرارة والديناميكا الحرارية (Heat & Thermodynamics)', en: 'Thermal Physics' },
      laws: [
        { name: { ar: 'كمية الحرارة', en: 'Heat Capacity' }, formula: 'Q = m · c · ΔT', symbols: 'Q [J], m [kg], c [J/(kg·K)], ΔT [K/°C]', example: 'Water m=1 kg, c=4184, ΔT=10°C → Q = 41.84 kJ' },
        { name: { ar: 'الحرارة الكامنة', en: 'Latent Heat' }, formula: 'Q = m · L', symbols: 'Q [J], m [kg], L [J/kg]', example: 'Ice fusion m=1 kg, L=334 kJ/kg → Q = 334 kJ' },
        { name: { ar: 'قانون الغاز المثالي', en: 'Ideal Gas Law' }, formula: 'P · V = n · R · T', symbols: 'P [Pa], V [m³], n [mol], R=8.314, T [K]', example: '1 mol at STP (T=273.15 K, P=101.3 kPa) → V ≈ 22.4 L' },
        { name: { ar: 'انتقال الحرارة بالتوصيل', en: 'Thermal Conduction' }, formula: 'Q/t = k · A · ΔT / d', symbols: 'k [W/(m·K)], A [m²], d [m]', example: 'معدل سريان الطاقة الحرارية' },
        { name: { ar: 'كفاءة كارنو القصوى', en: 'Carnot Efficiency' }, formula: 'η = 1 − (T_c / T_h)', symbols: 'T_c, T_h [Kelvin K strictly]', example: 'T_h=600 K, T_c=300 K → η = 50%' }
      ]
    },
    {
      id: 'waves',
      title: { ar: 'الموجات والصوت (Waves & Sound)', en: 'Waves & Sound' },
      laws: [
        { name: { ar: 'سرعة الموجة', en: 'Wave Speed' }, formula: 'v = f · λ', symbols: 'v [m/s], f [Hz], λ [m]', example: 'f=440 Hz (Note A4), v=343 m/s → λ ≈ 0.78 m' },
        { name: { ar: 'الزمن الدوري والتردد', en: 'Period & Frequency' }, formula: 'T = 1 / f', symbols: 'T [s], f [Hz]', example: 'f=50 Hz → T = 0.02 s (20 ms)' },
        { name: { ar: 'سرعة الصوت في الهواء', en: 'Speed of Sound in Air' }, formula: 'v ≈ 331.3 + 0.606 · T(°C)', symbols: 'v [m/s], T [°C]', example: 'T=20 °C → v ≈ 331.3 + 12.1 = 343.4 m/s' },
        { name: { ar: 'مستوى شدة الصوت بالديسيبل', en: 'Sound Level (dB)' }, formula: 'β = 10 · log₁₀(I / I₀)', symbols: 'I₀ = 10⁻¹² W/m² (عتبة السمع)', example: 'I = 10⁻⁶ W/m² → β = 10×6 = 60 dB' }
      ]
    },
    {
      id: 'optics',
      title: { ar: 'الضوء والبصريات (Optics & Light)', en: 'Optics & Photons' },
      laws: [
        { name: { ar: 'قانون سنيل للانكسار', en: 'Snell\'s Law' }, formula: 'n₁ · sinθ₁ = n₂ · sinθ₂', symbols: 'n [معامل الانكسار], θ [درجة/راديان]', example: 'Air n₁=1, θ₁=30°, Glass n₂=1.5 → sinθ₂=0.333 → θ₂≈19.5°' },
        { name: { ar: 'معادلة العدسات والمرايا', en: 'Thin Lens Equation' }, formula: '1/f = 1/d_o + 1/d_i', symbols: 'f [البعد البؤري], d_o [بعد الجسم], d_i [بعد الصورة]', example: 'f=10 cm, d_o=30 cm → d_i = 15 cm' },
        { name: { ar: 'التكبير الخطي', en: 'Magnification' }, formula: 'm = −d_i / d_o = h_i / h_o', symbols: 'm [نسبة التكبير بدون وحدة]', example: 'd_i=15 cm, d_o=30 cm → m = −0.5 (مقلوبة ومصغرة)' },
        { name: { ar: 'طاقة الفوتون', en: 'Photon Energy' }, formula: 'E = h · f = h · c / λ', symbols: 'h ≈ 6.626e-34 J·s, c ≈ 3e8 m/s', example: 'Green light λ=500 nm → E ≈ 3.97e-19 J (2.48 eV)' }
      ]
    }
  ];

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navPhysics') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'مرجع القوانين الفيزيائية الأساسية: الصيغ، وحدات SI، وأمثلة عددية محلولة.' : 'Core physical laws: formulas, SI symbols and units, with worked numerical examples.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">';
    for (var ps = 0; ps < physicsSections.length; ps++) {
      var psec = physicsSections[ps];
      html += '<button type="button" class="btn btn-scroll" data-scroll-to="sec-phys-' + psec.id + '">' + (psec.title[lang] || psec.title.en) + '</button>';
    }
    html += '</div>';

    // Search filter
    html += '<div style="margin-bottom: 20px; max-width: 360px;">' +
      '<label for="phys-search">' + REF.t('search') + '</label>' +
      '<input type="text" id="phys-search" placeholder="' + (isAr ? 'ابحث في القوانين أو الصيغ...' : 'Search physics laws...') + '">' +
      '</div>';

    html += '<div id="physics-tables-container"></div>';

    container.innerHTML = html;

    var searchInput = document.getElementById('phys-search');
    var tablesBox = document.getElementById('physics-tables-container');

    function renderTables(filter) {
      filter = (filter || '').toLowerCase().trim();
      var totalMatches = 0;
      var outHtml = '';

      for (var s = 0; s < physicsSections.length; s++) {
        var sec = physicsSections[s];
        var matchedLaws = [];

        for (var l = 0; l < sec.laws.length; l++) {
          var law = sec.laws[l];
          var nameAr = law.name.ar.toLowerCase();
          var nameEn = law.name.en.toLowerCase();
          var form = law.formula.toLowerCase();

          if (filter && nameAr.indexOf(filter) === -1 && nameEn.indexOf(filter) === -1 && form.indexOf(filter) === -1) {
            continue;
          }
          matchedLaws.push(law);
        }

        if (matchedLaws.length === 0) continue;
        totalMatches += matchedLaws.length;

        var secTitle = sec.title[lang] || sec.title.en;
        outHtml += '<div><h2 id="sec-phys-' + sec.id + '" style="margin-top: 24px;">' + secTitle + '</h2>' +
          '<table><thead><tr>' +
          '<th style="width: 22%;">' + REF.t('name') + '</th>' +
          '<th style="width: 28%;">' + REF.t('formula') + '</th>' +
          '<th style="width: 25%;">' + (isAr ? 'الرموز ووحدات SI' : 'Symbols & Units') + '</th>' +
          '<th style="width: 25%;">' + (isAr ? 'مثال عددي محلول' : 'Worked Example') + '</th>' +
          '</tr></thead><tbody>';

        for (var m = 0; m < matchedLaws.length; m++) {
          var ml = matchedLaws[m];
          outHtml += '<tr>' +
            '<td><strong>' + (ml.name[lang] || ml.name.en) + '</strong></td>' +
            '<td><div class="formula mono ltr-inline">' + ml.formula + '</div></td>' +
            '<td class="text-small mono text-muted">' + ml.symbols + '</td>' +
            '<td class="text-small mono" style="color: var(--accent);">' + ml.example + '</td>' +
            '</tr>';
        }
        outHtml += '</tbody></table></div>';
      }

      if (totalMatches === 0) {
        tablesBox.innerHTML = '<p style="text-align:center; padding: 30px; color:var(--text-muted);">' +
          (isAr ? 'لا توجد قوانين مطابقة لبحثك.' : 'No matching laws found.') + '</p>';
      } else {
        tablesBox.innerHTML = outHtml;
      }
    }

    searchInput.addEventListener('input', function() {
      renderTables(searchInput.value);
    });

    renderTables('');

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
