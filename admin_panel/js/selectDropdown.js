'use strict';

$(document).ready(function() {
  $('.select, .page-header__user-info').click(function() {
    var $select = $(this);
    var $dropdown = $select.next();
    var selectClass = $select[0].classList[0];

    if (!$select.hasClass(selectClass + '--active')) {
      dropdownShow($select, $dropdown);
    } else {
      dropdownHide($select, $dropdown);
    }

    function dropdownShow(select, dropdown) {
      select.addClass(selectClass + '--active');

      dropdown.slideDown(300, function() {
        dropdown.addClass('dropdown--open').removeAttr('style');
      });

      dropdown.on('click.dropdownSelectItem', function(e) {
        var $this = $(e.target);

        if ($this.hasClass('dropdown__item')) {
          if (select.data('selectableDropdown') === true) {
            select
              .children('.select__value')
              .text($this.text())
              .end()
              .data('reportPeriod', $this.data('reportPeriod'));
            $this
              .addClass('dropdown__item--current')
              .siblings()
              .removeClass('dropdown__item--current');
            dropdownHide(select, dropdown);
          }
        }
      });

      $(document)
        .on('keydown.dropdownClose', function(e) {
          if (window.utils.isDeactivateEvent(e.originalEvent.keyCode)) {
            dropdownHide(select, dropdown);
          }
        })
        .on('click.dropdownClose', function(e) {
          var $this = $(e.target);

          if ($this.hasClass('select') || $this.parent().hasClass('select')) {
            return;
          }

          if (select.parent().has($this).length === 0) {
            dropdownHide(select, dropdown);
          }
        });
    }

    function dropdownHide(select, dropdown) {
      select.removeClass(selectClass + '--active');

      dropdown.slideUp(300, function() {
        dropdown.removeClass('dropdown--open').removeAttr('style');
      });

      dropdown.off('click.dropdownSelectItem');

      $(document)
        .off('keydown.dropdownClose')
        .off('click.dropdownClose');
    }
  });

  // $('.dropdown').click(function(e) {
  //   if ($(e.target).hasClass('dropdown__item')) {

  //   }
  // });
});
