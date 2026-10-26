/* js/pages/si-units.js — SI Base Units, Derived Units & Dimensional Analysis */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages['si-units'] = (function() {
  'use strict';

  var baseUnits = [
    { name: { ar: 'المتر', en: 'Metre' }, symbol: 'm', quantity: { ar: 'الطول', en: 'Length' }, dim: '[L]', def: { ar: 'المسافة التي يقطعها الضوء في الفراغ خلال فاصل زمني مقداره 1/299 792 458 من الثانية.', en: 'The length of the path travelled by light in vacuum during a time interval of 1/299 792 458 of a second.' } },
    { name: { ar: 'الكيلوغرام', en: 'Kilogram' }, symbol: 'kg', quantity: { ar: 'الكتلة', en: 'Mass' }, dim: '[M]', def: { ar: 'مُعرَّف بتثبيت القيمة العددية لثابت بلانك h عند 6.626 070 15 × 10⁻³⁴ J·s بدقة مطلقة.', en: 'Defined by taking the fixed numerical value of the Planck constant h to be 6.626 070 15 × 10⁻³⁴ J·s.' } },
    { name: { ar: 'الثانية', en: 'Second' }, symbol: 's', quantity: { ar: 'الزمن', en: 'Time' }, dim: '[T]', def: { ar: 'تساوي مدة 9 192 631 770 دورة من الإشعاع الصادر عن الانتقال بين مستويي البنية الفائقة لذرة السيزيوم 133.', en: 'The duration of 9 192 631 770 periods of the radiation corresponding to the transition between two hyperfine levels of caesium-133.' } },
    { name: { ar: 'الأمبير', en: 'Ampere' }, symbol: 'A', quantity: { ar: 'التيار الكهربي', en: 'Electric Current' }, dim: '[I]', def: { ar: 'مُعرَّف بتثبيت القيمة العددية للشحنة الأولية e عند 1.602 176 634 × 10⁻¹⁹ C حيث 1 A = 1 C/s.', en: 'Defined by fixing the elementary charge e to be 1.602 176 634 × 10⁻¹⁹ C, where 1 A = 1 C/s.' } },
    { name: { ar: 'الكلفن', en: 'Kelvin' }, symbol: 'K', quantity: { ar: 'درجة الحرارة الديناميكية الحرارية', en: 'Thermodynamic Temperature' }, dim: '[Θ]', def: { ar: 'مُعرَّف بتثبيت القيمة العددية لثابت بولتزمان k_B عند 1.380 649 × 10⁻²³ J/K.', en: 'Defined by taking the fixed numerical value of the Boltzmann constant k_B to be 1.380 649 × 10⁻²³ J/K.' } },
    { name: { ar: 'المول', en: 'Mole' }, symbol: 'mol', quantity: { ar: 'كمية المادة', en: 'Amount of Substance' }, dim: '[N]', def: { ar: 'يحتوي على 6.022 140 76 × 10²³ كيان أولي (عدد أفوجادرو N_A بدقة).', en: 'Contains exactly 6.022 140 76 × 10²³ elementary entities (Avogadro number N_A).' } },
    { name: { ar: 'القنديلة (شمعة)', en: 'Candela' }, symbol: 'cd', quantity: { ar: 'شدة الإضاءة', en: 'Luminous Intensity' }, dim: '[J]', def: { ar: 'شدة الإضاءة في اتجاه معين لمصدر يبعث إشعاعاً أحادي اللون تردده 540 × 10¹² Hz بفاعلية إشعاعية 683 lm/W.', en: 'Luminous intensity of a source emitting monochromatic radiation of frequency 540 × 10¹² Hz with efficacy 683 lm/W.' } }
  ];

  var derivedUnits = [
    { name: { ar: 'نيوتن', en: 'Newton' }, symbol: 'N', quantity: { ar: 'القوة', en: 'Force' }, other: 'kg·m/s²', baseExp: 'kg·m·s⁻²', dim: '[M L T⁻²]' },
    { name: { ar: 'باسكال', en: 'Pascal' }, symbol: 'Pa', quantity: { ar: 'الضغط، الإجهاد', en: 'Pressure, Stress' }, other: 'N/m²', baseExp: 'kg·m⁻¹·s⁻²', dim: '[M L⁻¹ T⁻²]' },
    { name: { ar: 'جول', en: 'Joule' }, symbol: 'J', quantity: { ar: 'الطاقة، الشغل، الحرارة', en: 'Energy, Work' }, other: 'N·m', baseExp: 'kg·m²·s⁻²', dim: '[M L² T⁻²]' },
    { name: { ar: 'واط', en: 'Watt' }, symbol: 'W', quantity: { ar: 'القدرة', en: 'Power' }, other: 'J/s', baseExp: 'kg·m²·s⁻³', dim: '[M L² T⁻³]' },
    { name: { ar: 'كولوم', en: 'Coulomb' }, symbol: 'C', quantity: { ar: 'الشحنة الكهربية', en: 'Electric Charge' }, other: 'A·s', baseExp: 's·A', dim: '[T I]' },
    { name: { ar: 'فولت', en: 'Volt' }, symbol: 'V', quantity: { ar: 'فرق الجهد الكهربي', en: 'Voltage' }, other: 'W/A', baseExp: 'kg·m²·s⁻³·A⁻¹', dim: '[M L² T⁻³ I⁻¹]' },
    { name: { ar: 'أوم', en: 'Ohm' }, symbol: 'Ω', quantity: { ar: 'المقاومة، المعاوقة', en: 'Resistance' }, other: 'V/A', baseExp: 'kg·m²·s⁻³·A⁻²', dim: '[M L² T⁻³ I⁻²]' },
    { name: { ar: 'سيمنز', en: 'Siemens' }, symbol: 'S', quantity: { ar: 'التوصيلية الكهربية', en: 'Conductance' }, other: '1/Ω = A/V', baseExp: 'kg⁻¹·m⁻²·s³·A²', dim: '[M⁻¹ L⁻² T³ I²]' },
    { name: { ar: 'فاراد', en: 'Farad' }, symbol: 'F', quantity: { ar: 'السعة الكهربية', en: 'Capacitance' }, other: 'C/V', baseExp: 'kg⁻¹·m⁻²·s⁴·A²', dim: '[M⁻¹ L⁻² T⁴ I²]' },
    { name: { ar: 'هنري', en: 'Henry' }, symbol: 'H', quantity: { ar: 'الحث الكهرومغناطيسي', en: 'Inductance' }, other: 'Wb/A', baseExp: 'kg·m²·s⁻²·A⁻²', dim: '[M L² T⁻² I⁻²]' },
    { name: { ar: 'ويبر', en: 'Weber' }, symbol: 'Wb', quantity: { ar: 'الفيض المغناطيسي', en: 'Magnetic Flux' }, other: 'V·s', baseExp: 'kg·m²·s⁻²·A⁻¹', dim: '[M L² T⁻² I⁻¹]' },
    { name: { ar: 'تسلا', en: 'Tesla' }, symbol: 'T', quantity: { ar: 'كثافة الفيض المغناطيسي', en: 'Magnetic Field' }, other: 'Wb/m²', baseExp: 'kg·s⁻²·A⁻¹', dim: '[M T⁻² I⁻¹]' },
    { name: { ar: 'هرتز', en: 'Hertz' }, symbol: 'Hz', quantity: { ar: 'التردد', en: 'Frequency' }, other: '1/s', baseExp: 's⁻¹', dim: '[T⁻¹]' }
  ];

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navSIUnits') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'وحدات النظام الدولي SI السبع الأساسية حسب إعادة تعريف 2019، الوحدات المشتقة، ومبادئ التحليل البُعدي.' : 'The seven SI base units (2019 redefinition), special derived units, and dimensional analysis.') + '</p>' +
      '</div>';

    // Sub-navigation buttons (smooth scroll without changing hash)
    html += '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:24px;">' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-si-base">' + REF.t('baseSIUnits') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-si-derived">' + REF.t('derivedUnits') + '</button>' +
      '<button type="button" class="btn btn-scroll" data-scroll-to="sec-si-dim">' + REF.t('dimAnalysis') + '</button>' +
      '</div>';

    // 1. Base Units Table
    html += '<h2 id="sec-si-base">' + REF.t('baseSIUnits') + '</h2>' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'الوحدة' : 'Unit') + '</th>' +
      '<th>' + REF.t('symbol') + '</th>' +
      '<th>' + (isAr ? 'الكمية الفيزيائية' : 'Quantity') + '</th>' +
      '<th>' + (isAr ? 'البُعد' : 'Dimension') + '</th>' +
      '<th>' + (isAr ? 'التعريف الرسمي (منذ 2019)' : 'Official Definition (2019)') + '</th>' +
      '</tr></thead><tbody>';

    for (var i = 0; i < baseUnits.length; i++) {
      var bu = baseUnits[i];
      html += '<tr>' +
        '<td><strong>' + (bu.name[lang] || bu.name.en) + '</strong></td>' +
        '<td class="mono" style="font-weight:700; font-size:1.05rem;">' + bu.symbol + '</td>' +
        '<td>' + (bu.quantity[lang] || bu.quantity.en) + '</td>' +
        '<td class="mono">' + bu.dim + '</td>' +
        '<td class="text-small text-muted">' + (bu.def[lang] || bu.def.en) + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';

    // 2. Derived Units Table
    html += '<h2 id="sec-si-derived" style="margin-top: 32px;">' + REF.t('derivedUnits') + '</h2>' +
      '<p class="text-small text-muted">' + (isAr ? 'الوحدات المشتقة ذات الأسماء والرموز الخاصة المعترف بها دولياً مع تمثيلها بالوحدات الأساسية:' : 'SI derived units with special names and symbols expressed in base units:') + '</p>' +
      '<table><thead><tr>' +
      '<th>' + (isAr ? 'الوحدة' : 'Unit') + '</th>' +
      '<th>' + REF.t('symbol') + '</th>' +
      '<th>' + (isAr ? 'الكمية' : 'Quantity') + '</th>' +
      '<th>' + (isAr ? 'بدلالة وحدات أخرى' : 'Other SI Units') + '</th>' +
      '<th>' + (isAr ? 'بدلالة الوحدات الأساسية SI' : 'In SI Base Units') + '</th>' +
      '<th>' + (isAr ? 'صيغة الأبعاد' : 'Dimensions') + '</th>' +
      '</tr></thead><tbody>';

    for (var j = 0; j < derivedUnits.length; j++) {
      var du = derivedUnits[j];
      html += '<tr>' +
        '<td><strong>' + (du.name[lang] || du.name.en) + '</strong></td>' +
        '<td class="mono" style="font-weight:700;">' + du.symbol + '</td>' +
        '<td>' + (du.quantity[lang] || du.quantity.en) + '</td>' +
        '<td class="mono">' + du.other + '</td>' +
        '<td class="mono">' + du.baseExp + '</td>' +
        '<td class="mono">' + du.dim + '</td>' +
        '</tr>';
    }
    html += '</tbody></table>';

    // 3. Dimensional Analysis Explanation
    html += '<h2 id="sec-si-dim" style="margin-top: 32px;">' + REF.t('dimAnalysis') + '</h2>' +
      '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<h3>' + (isAr ? 'ما هو التحليل البُعدي؟' : 'What is Dimensional Analysis?') + '</h3>' +
      '<p style="font-size: 0.9rem; line-height: 1.7;">' +
      (isAr ?
        'التحليل البُعدي هو أسلوب علمي للتحقق من صحة القوانين الفيزيائية واشتقاق العلاقات بين الكميات. الأبعاد الأساسية السبعة هي: الكتلة [M]، الطول [L]، الزمن [T]، التيار [I]، درجة الحرارة [Θ]، كمية المادة [N]، وشدة الإضاءة [J].' :
        'Dimensional analysis is a fundamental method to verify equations and derive relationships. The base dimensions are: Mass [M], Length [L], Time [T], Current [I], Temperature [Θ], Amount [N], and Intensity [J].') +
      '</p>' +
      '<div class="note-box" style="margin: 14px 0;">' +
      '<strong>' + (isAr ? 'مبدأ التجانس البُعدي (Principle of Dimensional Homogeneity):' : 'Principle of Dimensional Homogeneity:') + '</strong><br>' +
      (isAr ?
        'لكي تكون أي معادلة فيزيائية صحيحة، يجب أن تتطابق أبعاد الطرف الأيمن مع الطرف الأيسر تماماً، ولا يمكن جمع أو طرح إلا كميات لها نفس الأبعاد بالضبط.' :
        'In any physically valid equation, both sides must have identical dimensions, and only quantities with identical dimensions can be added or subtracted.') +
      '</div>' +
      '<h4>' + (isAr ? 'مثال تطبيقي: الزمن الدوري للبندول البسيط T = 2π √(L/g)' : 'Worked Example: Period of Simple Pendulum T = 2π √(L/g)') + '</h4>' +
      '<div class="formula-block">' +
      '[الطرف الأيسر T] = [T]<br>' +
      '[L] = [L]<br>' +
      '[g] = [L T⁻²]<br>' +
      '[√(L/g)] = √([L] / [L T⁻²]) = √([T²]) = [T]<br>' +
      (isAr ? 'الأبعاد متطابقة تماماً [T] = [T]، إذن المعادلة صحيحة بُعدياً.' : 'Both sides match [T] = [T]; the equation is dimensionally consistent.') +
      '</div>' +
      '</div>';

    container.innerHTML = html;

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
