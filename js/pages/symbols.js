/* js/pages/symbols.js — Circuit Symbols Library (ANSI & IEC) */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.symbols = (function() {
  'use strict';

  var currentStyle = 'ansi';
  var currentCategory = 'all';

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navSymbols') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'مكتبة الرموز التخطيطية للدوائر الكهربية والإلكترونية بالمعيارين الأمريكي ANSI والأوروبي IEC.' : 'Schematic circuit symbol library conforming to ANSI (American) and IEC (European) standards.') + '</p>' +
      '</div>';

    // Toolbar (Search, Category Filter, ANSI/IEC Toggle)
    html += '<div class="calc-card" style="margin-bottom: 24px;">' +
      '<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-end;">' +
      '<div class="input-group" style="flex: 1 1 200px;">' +
      '<label for="sym-search">' + REF.t('search') + '</label>' +
      '<input type="text" id="sym-search" placeholder="' + (isAr ? 'ابحث عن رمز...' : 'Search symbol...') + '">' +
      '</div>' +
      '<div class="input-group" style="width: 160px;">' +
      '<label for="sym-category">' + REF.t('category') + '</label>' +
      '<select id="sym-category">' +
      '<option value="all">' + (isAr ? 'جميع الفئات' : 'All Categories') + '</option>' +
      '<option value="passive">' + REF.t('passiveComp') + '</option>' +
      '<option value="sources">' + REF.t('sources') + '</option>' +
      '<option value="grounds">' + REF.t('grounds') + '</option>' +
      '<option value="semiconductors">' + REF.t('semiconductors') + '</option>' +
      '<option value="switches">' + REF.t('switchesProtection') + '</option>' +
      '<option value="loads">' + REF.t('loadsTransducers') + '</option>' +
      '<option value="meters">' + REF.t('measInst') + '</option>' +
      '<option value="misc">' + REF.t('miscSymbols') + '</option>' +
      '</select>' +
      '</div>' +
      '<div class="input-group" style="width: 140px;">' +
      '<label for="sym-style">' + (isAr ? 'نمط المعيار' : 'Standard Style') + '</label>' +
      '<select id="sym-style">' +
      '<option value="ansi"' + (currentStyle === 'ansi' ? ' selected' : '') + '>' + REF.t('ansi') + '</option>' +
      '<option value="iec"' + (currentStyle === 'iec' ? ' selected' : '') + '>' + REF.t('iec') + '</option>' +
      '</select>' +
      '</div>' +
      '</div>' +
      '</div>';

    // Grid container
    html += '<div id="symbols-grid-container"></div>';

    container.innerHTML = html;

    var searchInput = document.getElementById('sym-search');
    var catSelect = document.getElementById('sym-category');
    var styleSelect = document.getElementById('sym-style');
    var gridContainer = document.getElementById('symbols-grid-container');

    var catDisplayNames = {
      passive: REF.t('passiveComp'),
      sources: REF.t('sources'),
      grounds: REF.t('grounds'),
      semiconductors: REF.t('semiconductors'),
      switches: REF.t('switchesProtection'),
      loads: REF.t('loadsTransducers'),
      meters: REF.t('measInst'),
      misc: REF.t('miscSymbols')
    };

    function renderGrid() {
      var query = searchInput.value.toLowerCase().trim();
      var selCat = catSelect.value;
      var style = styleSelect.value;
      currentStyle = style;

      gridContainer.innerHTML = '';
      var allSyms = REF.circuitSymbols;
      var catKeys = Object.keys(allSyms);

      var totalMatches = 0;

      for (var c = 0; c < catKeys.length; c++) {
        var catKey = catKeys[c];
        if (selCat !== 'all' && selCat !== catKey) continue;

        var items = allSyms[catKey];
        var matchedItems = [];

        for (var i = 0; i < items.length; i++) {
          var itm = items[i];
          var nameAr = (itm.name.ar || '').toLowerCase();
          var nameEn = (itm.name.en || '').toLowerCase();
          if (query && nameAr.indexOf(query) === -1 && nameEn.indexOf(query) === -1) {
            continue;
          }
          matchedItems.push(itm);
        }

        if (matchedItems.length === 0) continue;
        totalMatches += matchedItems.length;

        // Render Section Header
        var catHeader = document.createElement('h3');
        catHeader.textContent = catDisplayNames[catKey] || catKey;
        catHeader.style.marginTop = '24px';
        gridContainer.appendChild(catHeader);

        // Render Grid
        var grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
        grid.style.gap = '12px';
        grid.style.margin = '10px 0 20px 0';

        for (var j = 0; j < matchedItems.length; j++) {
          var item = matchedItems[j];
          var card = document.createElement('div');
          card.style.background = 'var(--card-bg, #fff)';
          card.style.border = '1px solid var(--border)';
          card.style.borderRadius = 'var(--radius)';
          card.style.padding = '8px';
          card.style.textAlign = 'center';

          // SVG rendering
          var svgEl = null;
          if (REF.svg.symbols[item.id]) {
            svgEl = REF.svg.symbols[item.id](style);
          } else {
            // Generic placeholder box
            svgEl = REF.svg.svg(120, 60, '0 0 120 60');
            svgEl.appendChild(REF.svg.rect(10, 10, 100, 40, 'stroke'));
            svgEl.appendChild(REF.svg.text(60, 30, item.id, 'fill'));
          }

          svgEl.style.width = '100%';
          svgEl.style.height = '60px';
          svgEl.style.display = 'block';
          svgEl.style.margin = '0 auto 6px auto';

          var nameDiv = document.createElement('div');
          nameDiv.style.fontSize = '0.82rem';
          nameDiv.style.fontWeight = '600';
          nameDiv.style.lineHeight = '1.3';
          nameDiv.textContent = item.name[lang] || item.name.en;

          var enDiv = document.createElement('div');
          enDiv.style.fontSize = '0.72rem';
          enDiv.style.color = 'var(--text-muted)';
          enDiv.textContent = item.name.en;

          card.appendChild(svgEl);
          card.appendChild(nameDiv);
          card.appendChild(enDiv);
          grid.appendChild(card);
        }

        gridContainer.appendChild(grid);
      }

      if (totalMatches === 0) {
        var emptyMsg = document.createElement('p');
        emptyMsg.style.textAlign = 'center';
        emptyMsg.style.padding = '30px';
        emptyMsg.style.color = 'var(--text-muted)';
        emptyMsg.textContent = isAr ? 'لا توجد رموز مطابقة لبحثك.' : 'No matching symbols found.';
        gridContainer.appendChild(emptyMsg);
      }
    }

    searchInput.addEventListener('input', renderGrid);
    catSelect.addEventListener('change', renderGrid);
    styleSelect.addEventListener('change', renderGrid);

    renderGrid();
  }

  return {
    render: render
  };
})();
