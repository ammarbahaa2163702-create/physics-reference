/* js/app.js — Core Application Engine: Routing, i18n, Global Search */
window.REF = window.REF || {};

(function() {
  'use strict';

  // 1. Language State
  var savedLang = 'ar';
  try {
    savedLang = localStorage.getItem('ref_lang') || 'ar';
  } catch(e) {}
  if (savedLang !== 'ar' && savedLang !== 'en') savedLang = 'ar';
  REF.currentLang = savedLang;

  // Helper translation functions
  REF.t = function(key) {
    var lang = REF.currentLang || 'ar';
    if (!REF.i18n || !REF.i18n[key]) return key;
    return REF.i18n[key][lang] || REF.i18n[key].en || key;
  };

  REF.getText = function(obj) {
    if (!obj) return '';
    var lang = REF.currentLang || 'ar';
    return obj[lang] || obj.en || '';
  };

  // Nav item mapping: route -> i18n key
  var navRoutes = [
    { route: 'units', i18nKey: 'navUnits' },
    { route: 'prefixes', i18nKey: 'navPrefixes' },
    { route: 'constants', i18nKey: 'navConstants' },
    { route: 'electricity', i18nKey: 'navElectricity' },
    { route: 'resistors', i18nKey: 'navResistors' },
    { route: 'multimeter', i18nKey: 'navMultimeter' },
    { route: 'semiconductors', i18nKey: 'navDiodeTransistor' },
    { route: 'logic', i18nKey: 'navGates' },
    { route: 'symbols', i18nKey: 'navSymbols' },
    { route: 'physics', i18nKey: 'navPhysics' },
    { route: 'si-units', i18nKey: 'navSIUnits' }
  ];

  var currentRoute = 'units';

  // DOM elements
  var mainEl, langBtn, searchInput, searchResultsEl, sidebarEl, overlayEl, menuToggle;

  function init() {
    mainEl = document.getElementById('main-content');
    langBtn = document.getElementById('btn-lang-toggle');
    searchInput = document.getElementById('global-search');
    searchResultsEl = document.getElementById('search-dropdown');
    sidebarEl = document.getElementById('app-sidebar');
    overlayEl = document.getElementById('sidebar-overlay');
    menuToggle = document.getElementById('menu-toggle');

    applyLanguage(REF.currentLang, false);

    // Event listeners
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    if (menuToggle && sidebarEl && overlayEl) {
      menuToggle.addEventListener('click', function() {
        sidebarEl.classList.toggle('open');
        overlayEl.classList.toggle('open');
      });
      overlayEl.addEventListener('click', function() {
        sidebarEl.classList.remove('open');
        overlayEl.classList.remove('open');
      });
    }

    // Search events
    if (searchInput && searchResultsEl) {
      searchInput.addEventListener('input', handleSearch);
      searchInput.addEventListener('focus', function() {
        if (searchInput.value.trim().length > 0) searchResultsEl.classList.add('open');
      });
      document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResultsEl.contains(e.target)) {
          searchResultsEl.classList.remove('open');
        }
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') searchResultsEl.classList.remove('open');
      });
    }

    // Delegated smooth scroll handler for in-page buttons/links without changing hash
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-scroll-to], [data-target]');
      if (btn) {
        e.preventDefault();
        var tid = btn.getAttribute('data-scroll-to') || btn.getAttribute('data-target');
        REF.scrollToSection(tid);
      }
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  // Smooth scroll helper without modifying window.location.hash
  REF.scrollToSection = function(targetId) {
    if (!targetId) return;
    var targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn('[Scroll] Target element not found with ID:', targetId);
    }
  };

  function applyLanguage(lang, reRender) {
    REF.currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    try {
      localStorage.setItem('ref_lang', lang);
    } catch(e) {}

    // Update Header button text
    if (langBtn) {
      langBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
      langBtn.title = lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية';
    }

    // Update App title in header
    var titleEl = document.getElementById('app-header-title');
    if (titleEl) {
      titleEl.textContent = REF.t('appTitle');
    }

    // Update Search placeholder
    if (searchInput) {
      searchInput.placeholder = REF.t('search');
    }

    // Update Sidebar Navigation
    renderSidebarNav();

    // Re-render active page if requested
    if (reRender !== false && REF.pages && REF.pages[currentRoute]) {
      REF.pages[currentRoute].render(mainEl);
    }
  }

  function toggleLanguage() {
    var nextLang = REF.currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang, true);
  }

  function renderSidebarNav() {
    if (!sidebarEl) return;
    var html = '';
    for (var i = 0; i < navRoutes.length; i++) {
      var item = navRoutes[i];
      var isActive = item.route === currentRoute;
      html += '<a href="#/' + item.route + '" class="' + (isActive ? 'active' : '') + '" data-route="' + item.route + '">' +
        REF.t(item.i18nKey) +
        '</a>';
    }
    sidebarEl.innerHTML = html;
  }

  function handleRoute() {
    var rawHash = window.location.hash || '#/units';
    var hashParts = rawHash.replace(/^#\/?/, '').split('#');
    var route = hashParts[0] || 'units';

    // Support sub-anchors like #/electricity#sec-dc
    var subAnchor = hashParts[1] || null;

    if (!REF.pages[route]) {
      console.warn('[Router] Unregistered or unknown route hash:', rawHash);
      // Check if this hash corresponds to an element ID in the current page
      var inPageEl = document.getElementById(route) || (subAnchor ? document.getElementById(subAnchor) : null);
      if (inPageEl) {
        inPageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      // If we are already on a valid page, don't reset to units
      if (REF.pages[currentRoute]) {
        return;
      }
      route = 'units';
    }

    currentRoute = route;

    // Update active class in sidebar
    if (sidebarEl) {
      var links = sidebarEl.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        var r = links[i].getAttribute('data-route');
        if (r === route) links[i].classList.add('active');
        else links[i].classList.remove('active');
      }
      sidebarEl.classList.remove('open');
      if (overlayEl) overlayEl.classList.remove('open');
    }

    // Render page
    if (REF.pages[route] && mainEl) {
      REF.pages[route].render(mainEl);
      if (subAnchor) {
        var targetEl = document.getElementById(subAnchor);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo(0, 0);
    }
  }

  // Global Search Engine
  var searchIndex = null;

  function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    var idx = [];

    // 1. Units
    if (REF.unitCategories) {
      for (var i = 0; i < REF.unitCategories.length; i++) {
        var cat = REF.unitCategories[i];
        idx.push({
          titleAr: cat.name.ar,
          titleEn: cat.name.en,
          category: { ar: 'فئة وحدات', en: 'Unit Category' },
          route: '#/units'
        });
        for (var j = 0; j < cat.units.length; j++) {
          var u = cat.units[j];
          idx.push({
            titleAr: u.name.ar + ' (' + u.symbol + ')',
            titleEn: u.name.en + ' (' + u.symbol + ')',
            category: { ar: 'وحدة: ' + cat.name.ar, en: 'Unit: ' + cat.name.en },
            route: '#/units'
          });
        }
      }
    }

    // 2. Constants
    if (REF.constants) {
      for (var k = 0; k < REF.constants.length; k++) {
        var c = REF.constants[k];
        idx.push({
          titleAr: c.name.ar + ' (' + c.symbol + ')',
          titleEn: c.name.en + ' (' + c.symbol + ')',
          category: { ar: 'ثابت فيزيائي', en: 'Physical Constant' },
          route: '#/constants'
        });
      }
    }

    // 3. Circuit Symbols
    if (REF.circuitSymbols) {
      var symCats = Object.keys(REF.circuitSymbols);
      for (var sc = 0; sc < symCats.length; sc++) {
        var sList = REF.circuitSymbols[symCats[sc]];
        for (var s = 0; s < sList.length; s++) {
          var sym = sList[s];
          idx.push({
            titleAr: sym.name.ar,
            titleEn: sym.name.en,
            category: { ar: 'رمز دائرة', en: 'Circuit Symbol' },
            route: '#/symbols'
          });
        }
      }
    }

    // 4. Electrical Formulas
    if (REF.formulas) {
      var fCats = Object.keys(REF.formulas);
      for (var fc = 0; fc < fCats.length; fc++) {
        var fList = REF.formulas[fCats[fc]];
        if (!Array.isArray(fList)) continue;
        for (var f = 0; f < fList.length; f++) {
          var form = fList[f];
          idx.push({
            titleAr: form.name.ar + ' — ' + form.formula,
            titleEn: form.name.en + ' — ' + form.formula,
            category: { ar: 'قانون كهربي', en: 'Electrical Law' },
            route: '#/electricity'
          });
        }
      }
    }

    // 5. Logic Gates
    var gateNames = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];
    for (var g = 0; g < gateNames.length; g++) {
      idx.push({
        titleAr: 'بوابة ' + gateNames[g],
        titleEn: gateNames[g] + ' Gate',
        category: { ar: 'بوابة منطقية', en: 'Logic Gate' },
        route: '#/logic'
      });
    }

    searchIndex = idx;
    return searchIndex;
  }

  function handleSearch() {
    var query = searchInput.value.toLowerCase().trim();
    if (!query) {
      searchResultsEl.innerHTML = '';
      searchResultsEl.classList.remove('open');
      return;
    }

    var idx = buildSearchIndex();
    var results = [];
    var lang = REF.currentLang || 'ar';

    for (var i = 0; i < idx.length; i++) {
      var item = idx[i];
      var matchAr = item.titleAr.toLowerCase().indexOf(query) !== -1;
      var matchEn = item.titleEn.toLowerCase().indexOf(query) !== -1;
      if (matchAr || matchEn) {
        results.push(item);
        if (results.length >= 8) break;
      }
    }

    if (results.length === 0) {
      searchResultsEl.innerHTML = '<div style="padding: 10px; font-size: 0.85rem; color: var(--text-muted);">' +
        (lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No results found') + '</div>';
      searchResultsEl.classList.add('open');
      return;
    }

    var html = '';
    for (var j = 0; j < results.length; j++) {
      var res = results[j];
      var title = lang === 'ar' ? res.titleAr : res.titleEn;
      var cat = lang === 'ar' ? res.category.ar : res.category.en;
      html += '<a href="' + res.route + '" class="search-item">' +
        '<div>' + title + '</div>' +
        '<div class="sr-cat">' + cat + '</div>' +
        '</a>';
    }

    searchResultsEl.innerHTML = html;
    searchResultsEl.classList.add('open');

    // Attach click handler on links
    var links = searchResultsEl.querySelectorAll('.search-item');
    for (var k = 0; k < links.length; k++) {
      links[k].addEventListener('click', function() {
        searchResultsEl.classList.remove('open');
        searchInput.value = '';
      });
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
