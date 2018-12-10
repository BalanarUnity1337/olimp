"use strict";

$(document).ready(function() {
  var $tables = $('.db-table');

  $tables.find('.db-table__header').click(function() {
    var $header = $(this);
    var $dbTable = $header.parent();


  });

  var $dataTable = $('.db-table__data-table');
  var $headerCells = $tables.find('.db-table__data-table-header-row-cell:not(:first-of-type)');

  $headerCells.each(function(i, d) {
    var $separator = $('<div class="db-table__separator"></div>')
      .css({
        'left': d.offsetLeft + 'px'
      });

    $dataTable.append($separator);
  });
});
