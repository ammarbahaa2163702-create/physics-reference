/* js/pages/constants.js — Physical Constants */
window.REF = window.REF || {};
REF.pages = REF.pages || {};

REF.pages.constants = (function() {
  'use strict';

  function render(container) {
    var lang = REF.currentLang || 'ar';
    var isAr = lang === 'ar';

    var html = '<div class="page-header">' +
      '<h1>' + REF.t('navConstants') + '</h1>' +
      '<p class="text-muted">' + (isAr ? 'قيم الثوابت الفيزيائية الدقيقة بالتعريف والمُقاسة حسب أحدث نشرات CODATA 2022 وإعادة تعريف SI.' : 'Fundamental physical constants: exact SI defining values and measured CODATA 2022 values.') + '</p>' +
      '</div>';

    // Search Box
    html += '<div style="margin-bottom: 16px; max-width: 380px;">' +
      '<label for="const-search">' + REF.t('search') + '</label>' +
      '<input type="text" id="const-search" placeholder="' + (isAr ? 'ابحث بالاسم أو الرمز...' : 'Search by name or symbol...') + '">' +
      '</div>';

    // Table container
    html += '<div id="const-table-container"></div>';

    // Source note
    html += '<div class="source-note">' + REF.t('sourceNote') + '</div>';

    container.innerHTML = html;

    var searchInput = document.getElementById('const-search');
    var tableContainer = document.getElementById('const-table-container');

    function renderTable(filterText) {
      filterText = (filterText || '').toLowerCase().trim();
      var list = REF.constants;

      var tHtml = '<table><thead><tr>' +
        '<th>' + REF.t('name') + '</th>' +
        '<th>' + REF.t('symbol') + '</th>' +
        '<th>' + REF.t('value') + '</th>' +
        '<th>' + REF.t('unit') + '</th>' +
        '<th>' + REF.t('precision') + '</th>' +
        '<th>' + REF.t('note') + '</th>' +
        '<th>' + REF.t('copy') + '</th>' +
        '</tr></thead><tbody>';

      var matchCount = 0;
      for (var i = 0; i < list.length; i++) {
        var c = list[i];
        var nameAr = c.name.ar;
        var nameEn = c.name.en;
        var nameCurr = c.name[lang] || nameEn;
        var sym = c.symbol;

        if (filterText) {
          var match = nameAr.toLowerCase().indexOf(filterText) !== -1 ||
                      nameEn.toLowerCase().indexOf(filterText) !== -1 ||
                      sym.toLowerCase().indexOf(filterText) !== -1;
          if (!match) continue;
        }
        matchCount++;

        var badge = c.exact ?
          '<span class="status-badge status-pass">' + REF.t('exact') + '</span>' :
          '<span class="status-badge" style="background:#fff3e0; color:#b06000;">' + REF.t('measured') + ' ' + (c.uncertainty || '') + '</span>';

        var noteText = c.note ? (c.note[lang] || c.note.en || '') : '—';

        // Format value cleanly
        var valStr = c.value;
        if (valStr.indexOf('e') !== -1) {
          var parts = valStr.split('e');
          valStr = parts[0] + ' \u00D7 10<sup>' + parts[1] + '</sup>';
        }

        tHtml += '<tr>' +
          '<td><strong>' + nameCurr + '</strong><br><span class="text-small text-muted">' + (isAr ? nameEn : nameAr) + '</span></td>' +
          '<td class="mono" style="font-weight: 600;">' + (sym ? sym : '—') + '</td>' +
          '<td class="mono col-num">' + valStr + '</td>' +
          '<td class="mono">' + c.unit + '</td>' +
          '<td>' + badge + '</td>' +
          '<td class="text-small text-muted">' + noteText + '</td>' +
          '<td><button type="button" class="btn btn-copy" data-copy="' + c.value + '">' + REF.t('copy') + '</button></td>' +
          '</tr>';
      }

      if (matchCount === 0) {
        tHtml += '<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-muted);">' +
          (isAr ? 'لا توجد نتائج مطابقة' : 'No matching constants found') + '</td></tr>';
      }

      tHtml += '</tbody></table>';
      tableContainer.innerHTML = tHtml;

      // Attach copy events
      var copyBtns = tableContainer.querySelectorAll('.btn-copy');
      for (var k = 0; k < copyBtns.length; k++) {
        (function(btn) {
          btn.addEventListener('click', function() {
            var valToCopy = btn.getAttribute('data-copy');
            REF.format.copyToClipboard(valToCopy, btn);
          });
        })(copyBtns[k]);
      }
    }

    searchInput.addEventListener('input', function() {
      renderTable(searchInput.value);
    });

    renderTable('');
  }

  return {
    render: render
  };
})();
