'use strict';

$(document).ready(function() {
  // popup с авторизацией
  var modalLogin = $('.modal-login');
  var overlay = {
    JqNodeObject: $('.overlay'),
    callerClassName: ''
  };
  var JqWindow = $(window);

  $('.page-header__login').click(function(e) {
    e.preventDefault();
    overlay.callerClassName = e.target.className;
    overlay.JqNodeObject.addClass('overlay--visible');
    modalLogin.addClass('modal-login--show');
  });

  $('.modal-login__close-button').click(function() {
    modalLoginClosing();
  });

  function modalLoginClosing() {
    modalLogin.animate(
      {
        opacity: 0,
        top: '-220px'
      },
      800,
      function() {
        modalLogin.removeClass('modal-login--show').removeAttr('style');
        overlay.JqNodeObject.removeClass('overlay--visible');
        overlay.callerClassName = '';
      }
    );
  }

  // overlay
  overlay.JqNodeObject.click(function() {
    switch (overlay.callerClassName) {
      case 'page-header__login': {
        modalLoginClosing();

        if (JqWindow.scrollTop() >= 600) {
          scrollTopButton.addClass('scroll-top-button--visible');
        }

        break;
      }
      case 'catalog__sorting-filtering-mobile-control--filtering-menu': {
        closeCatalogFiltering();
        break;
      }
      case 'catalog__sorting-filtering-mobile-control--sorting-menu': {
        closeCatalogSorting();
        break;
      }
    }
  });

  // scroll
  var pageHeaderMain = $('.page-header__main');
  var pageHeader = $('.page-header');
  var pageHeaderTop = pageHeader.find('.page-header__top');

  JqWindow.on('scroll', showPageHeaderScroll);

  function showPageHeaderScroll() {
    if ($(this).scrollTop() >= 100) {
      pageHeaderMain.addClass('page-header__main--scroll');
      pageHeaderTop.addClass('page-header__top--scroll');
    } else {
      pageHeaderMain.removeClass('page-header__main--scroll');
      pageHeaderTop.removeClass('page-header__top--scroll');
    }
  }

  // scrollToTop
  var scrollTopButton = $('.scroll-top-button');
  var body = $('html, body');

  JqWindow.on('scroll', showScrollTopButton);
  scrollTopButton.click(function() {
    JqWindow.off('scroll', showScrollTopButton);
    body.animate(
      {
        scrollTop: 0
      },
      600,
      function() {
        scrollTopButton.removeClass('scroll-top-button--visible');
        JqWindow.on('scroll', showScrollTopButton);
      }
    );
  });

  function showScrollTopButton() {
    var scrollTop = $(this).scrollTop();

    if (
      scrollTop >= 500 &&
      !overlay.JqNodeObject.hasClass('overlay--visible')
    ) {
      scrollTopButton.addClass('scroll-top-button--visible');
    } else if (scrollTopButton.hasClass('scroll-top-button--visible')) {
      scrollTopButton.removeClass('scroll-top-button--visible');
    }
  }

  // Main menu
  var mainMenu = $('.main-menu');
  var mainMenuToggleButton = $('.main-menu__toggle-button');
  var mainMenuDropdown = $('.main-menu__dropdown');
  var pageContent = $('.page-content');

  mainMenuToggleButton.click(function() {
    if (!mainMenuToggleButton.hasClass('main-menu__toggle-button--open')) {
      showMainMenuDropdown();
      $(document).on('click', onClickDocumentCloseMainMenuDropdown);
      $(document).on('keydown', onKeyDownDocumentCloseMainMenuDropdown);
    } else {
      closeMainMenuDropdown();
      $(document).off('click', onClickDocumentCloseMainMenuDropdown);
    }
  });

  function onClickDocumentCloseMainMenuDropdown(e) {
    var target = $(e.target);

    if (mainMenu.find(target).length === 0 && !mainMenu.is(target)) {
      closeMainMenuDropdown();
    }
  }

  function onKeyDownDocumentCloseMainMenuDropdown(e) {
    if (window.utils.isDeactivateEvent(e)) {
      closeMainMenuDropdown();
    }
  }

  function showMainMenuDropdown() {
    mainMenuDropdown.addClass('main-menu__dropdown--open');
    mainMenuToggleButton.addClass('main-menu__toggle-button--open');
  }

  function closeMainMenuDropdown() {
    mainMenuDropdown.removeClass('main-menu__dropdown--open');
    mainMenuToggleButton.removeClass('main-menu__toggle-button--open');
    $(document).off('click', onClickDocumentCloseMainMenuDropdown);
    $(document).off('keydown', onKeyDownDocumentCloseMainMenuDropdown);
  }

  // views-controller
  var catalogViewControlListView = $('.catalog__view-control--list-view');
  var catalogViewControlGridView = $('.catalog__view-control--grid-view');
  var catalogProducts = $('.catalog__products');

  catalogViewControlListView.click(function() {
    catalogViewControlListView
      .removeClass('catalog__view-control--disable')
      .addClass('catalog__view-control--active');
    catalogViewControlGridView
      .removeClass('catalog__view-control--active')
      .addClass('catalog__view-control--disable');
    catalogProducts
      .removeClass('catalog__products--grid-view')
      .addClass('catalog__products--list-view');
    $('.catalog-product .catalog-product__photo').data('hover-image', 'zoom');
  });

  catalogViewControlGridView.click(function() {
    catalogViewControlGridView
      .removeClass('catalog__view-control--disable')
      .addClass('catalog__view-control--active');
    catalogViewControlListView
      .removeClass('catalog__view-control--active')
      .addClass('catalog__view-control--disable');
    catalogProducts
      .removeClass('catalog__products--list-view')
      .addClass('catalog__products--grid-view');
    $('.catalog-product .catalog-product__photo').data('hoverImage', null);
  });

  // open filtering menu ... and close
  var catalogSortingFilteringMobileControlFilteringMenu = $(
    '.catalog__sorting-filtering-mobile-control--filtering-menu'
  );
  var catalogFiltering = $('.catalog__filtering');
  var catalogFilteringCloseButton = $('.catalog__filtering-close-button');

  catalogSortingFilteringMobileControlFilteringMenu.click(function(e) {
    catalogFiltering.addClass('catalog__filtering--show');
    overlay.callerClassName = e.target.classList[1];
    overlay.JqNodeObject.addClass('overlay--visible');
  });

  catalogFilteringCloseButton.click(function() {
    closeCatalogFiltering();
  });

  function closeCatalogFiltering() {
    catalogFiltering.animate(
      {
        right: '-300px'
      },
      800,
      function() {
        catalogFiltering
          .removeClass('catalog__filtering--show')
          .removeAttr('style');
        overlay.JqNodeObject.removeClass('overlay--visible');
        overlay.callerClassName = '';
      }
    );
  }

  // open sorting menu ...and close it
  var catalogSortingFilteringMobileControlSortingMenu = $(
    '.catalog__sorting-filtering-mobile-control--sorting-menu'
  );
  var catalogSorting = $('.catalog__sorting');
  var catalogSortingCloseButton = $('.catalog__sorting-close-button');

  catalogSortingFilteringMobileControlSortingMenu.click(function(e) {
    catalogSorting.addClass('catalog__sorting--show');
    overlay.callerClassName = e.target.classList[1];
    overlay.JqNodeObject.addClass('overlay--visible');
  });

  catalogSortingCloseButton.click(function() {
    closeCatalogSorting();
  });

  function closeCatalogSorting() {
    catalogSorting.animate(
      {
        left: '-300px'
      },
      800,
      function() {
        catalogSorting
          .removeClass('catalog__sorting--show')
          .removeAttr('style');
        overlay.JqNodeObject.removeClass('overlay--visible');
        overlay.callerClassName = '';
      }
    );
  }

  // quantity fields and same *
  (function() {
    var quantityControlsButtonMinus = $('.quantity-controls__button--minus');
    var quantityControlsField = $('.quantity-controls__field');
    var quantityControlsButtonPlus = $('.quantity-controls__button--plus');
    var numericPattern = /[0-9]/;

    quantityControlsButtonMinus.mousedown(function(e) {
      if (e.originalEvent.button == 0) {
        var isDown = true;
        var currentField = $(this).next();
        var currentValue = currentField.val();
        var currentButtonMinus = $(this);

        if (!quantityControlsButtonMinus.data('steppingQuantity')) {
          return;
        }

        if (currentValue > 1) {
          currentField.val(--currentValue);
        }

        if (isDown) {
          var decSetInterval = setInterval(decrement, 200);
        }

        currentButtonMinus.mouseup(function() {
          isDown = false;
          clearInterval(decSetInterval);
          currentButtonMinus.off('mouseup').off('mouseleave');
        });

        currentButtonMinus.mouseleave(function() {
          isDown = false;
          clearInterval(decSetInterval);
          currentButtonMinus.off('mouseleave').off('mouseup');
        });

        function decrement() {
          var step = 1;

          if (currentValue > 99) {
            step = 20;
          } else if (currentValue > 9) {
            step = 5;
          }

          if (currentValue - step >= 1) {
            currentValue -= step;
            currentField.val(currentValue);
          }
        }
      }
    });

    quantityControlsButtonPlus.mousedown(function(e) {
      if (e.originalEvent.button == 0) {
        var isDown = true;
        var currentField = $(this).prev();
        var currentValue = parseInt(currentField.val());
        var currentButtonPlus = $(this);
        var topLimit = parseInt(currentButtonPlus.data('topLimitCount'));

        if (!quantityControlsButtonPlus.data('steppingQuantity')) {
          return;
        }

        if (currentValue < topLimit) {
          currentField.val(++currentValue);
        }

        if (isDown) {
          var incSetInterval = setInterval(increment, 200);
        }

        currentButtonPlus.mouseup(function() {
          isDown = false;
          clearInterval(incSetInterval);
          currentButtonPlus.off('mouseup').off('mouseleave');
        });

        currentButtonPlus.mouseleave(function() {
          isDown = false;
          clearInterval(incSetInterval);
          currentButtonPlus.off('mouseleave').off('mouseup');
        });

        function increment() {
          var step = 1;
          var difference = 0;

          if (currentValue > 99) {
            step = 20;
          } else if (currentValue > 9) {
            step = 5;
          }

          difference = topLimit - currentValue;

          if (difference < 20) {
            step = 5;
          }

          if (currentValue + step > topLimit) {
            step = 1;
          }

          if (currentValue < topLimit) {
            currentValue += step;
            currentField.val(currentValue);
          }
        }
      }
    });

    quantityControlsField.keydown(function(e) {
      if (!numericPattern.test(e.key) && e.key.length === 1) {
        e.preventDefault();
      }
    });

    quantityControlsField.blur(function() {
      var currentField = $(this);
      var topLimit = parseInt(currentField.data('topLimitCount'));

      if (!currentField.val()) {
        currentField.val(1);
        return;
      }

      if (currentField.val() > topLimit) {
        currentField.val(topLimit);
        return;
      }

      if (currentField.val() < 1) {
        currentField.val(1);
        return;
      }
    });
  })();

  // Open sorting select and filtering selects
  (function() {
    var catalogSortingSelect = $('.catalog__current-sort-value');
    var catalogSortingSelect = $('.catalog__sorting .select');
    var currentTarget = null;
    var currentDropdown = null;
    var currentSortingBlockItems = null;
    var scrollTrack = null;
    var scrollTrackBar = null;

    catalogSortingSelect.click(function(e) {
      currentTarget = $(e.target);
      var currentSelect = $(e.currentTarget);
      currentDropdown = currentSelect.find('.dropdown');
      currentSortingBlockItems = currentDropdown.children('.dropdown__items');
      scrollTrack = currentSortingBlockItems.next();
      scrollTrackBar = scrollTrack.children('.scroll-track__bar');

      if (!currentSelect.hasClass('select--active')) {
        currentSelect.addClass('select--active');
        window.dropdown.open(currentDropdown, function() {
          currentSelect.focus();
          currentSelect.removeClass('select--active');
          scrollTrackBar.off('mousedown');
          currentSortingBlockItems.off('scroll');
        });
      } else if (
        currentTarget.hasClass('select') ||
        currentTarget.hasClass('catalog__current-sort-value')
      ) {
        window.dropdown.close(currentDropdown, function() {
          currentSelect.removeClass('select--active');
        });
      }
    });

    catalogSortingSelect.keydown(function(e) {
      currentTarget = $(e.target);
      currentDropdown = currentTarget.find('.dropdown');

      if (window.utils.isActivateEvent(e)) {
        if (!currentTarget.hasClass('select--active')) {
          currentTarget.addClass('select--active');
          window.dropdown.open(currentDropdown, function() {
            currentTarget.focus();
            currentTarget.removeClass('select--active');
            scrollTrackBar.off('mousedown');
            currentSortingBlockItems.off('scroll');
          });
        } else {
          currentTarget.removeClass('select--active');
          window.dropdown.close(currentDropdown);
        }
      }
    });

    catalogSortingSelect.blur(function(e) {
      currentTarget = $(e.target);
      currentDropdown = currentTarget.find('.dropdown');

      if (currentTarget.hasClass('select--active')) {
        window.dropdown.close(currentDropdown, function() {
          currentTarget.removeClass('select--active');
        });
      }
    });
  })();

  window.dropdown = (function() {
    var onDropdownClose = null;
    var currentDropdown = null;

    function openDropdown() {
      currentDropdown.addClass('dropdown--open');
      $(document).on('keydown', eventHandlerKeydownCatalogSortingSelect);
      $(document).on('click', eventHandlerClickDocument);
    }

    function closeDropdown() {
      currentDropdown.removeClass('dropdown--open');
      $(document).off('keydown', eventHandlerKeydownCatalogSortingSelect);
      $(document).off('click', eventHandlerClickDocument);

      if (typeof onDropdownClose === 'function') {
        onDropdownClose();
      }
    }

    function eventHandlerKeydownCatalogSortingSelect(e) {
      if (window.utils.isDeactivateEvent(e)) {
        closeDropdown();
      }
    }

    function eventHandlerClickDocument(e) {
      var currentTarget = $(e.target);

      if (
        $('.select').find(currentTarget).length === 0 &&
        !currentTarget.hasClass('select')
      ) {
        closeDropdown();
      }
    }

    return {
      open: function(dropdown, callback) {
        onDropdownClose = callback;
        currentDropdown = dropdown;
        openDropdown();
      },

      close: function(dropdown, callback) {
        onDropdownClose = callback;
        currentDropdown = dropdown;
        closeDropdown();
      }
    };
  })();

  // Open filtering blocks
  var catalogFilterBlockTitle = $('.catalog__filter-block-title');

  catalogFilterBlockTitle.click(function() {
    var currentFilterBlock = $(this).parent();
    var currentFilterBlockItemsWrapper = currentFilterBlock.find(
      '.catalog__filter-block-items-wrapper'
    );
    var currentFilterBlockItems = currentFilterBlockItemsWrapper.children(
      '.catalog__filter-block-items'
    );
    var scrollTrack = currentFilterBlockItems.next();
    var scrollTrackBar = scrollTrack.children('.scroll-track__bar');

    if (!currentFilterBlock.hasClass('catalog__filter-block--active')) {
      showCatalogFilterBlock(
        currentFilterBlock,
        currentFilterBlockItemsWrapper
      );
      currentFilterBlockItemsWrapper.outerWidth(
        currentFilterBlockItems[0].clientWidth -
          currentFilterBlockItems[0].offsetWidth +
          currentFilterBlockItemsWrapper.outerWidth()
      );
      // window.scrollingElement(currentFilterBlockItems, scrollTrack, scrollTrackBar);
    } else {
      hideCatalogFilterBlock(
        currentFilterBlock,
        currentFilterBlockItemsWrapper
      );
    }
  });

  function showCatalogFilterBlock(filterBlock, filterBlockItemsWrapper) {
    filterBlock.addClass('catalog__filter-block--active');
    filterBlock.animate(
      {
        'padding-bottom': '15px'
      },
      800,
      function() {
        filterBlock.removeAttr('style');
      }
    );

    filterBlockItemsWrapper.animate(
      {
        height: 'toggle',
        'padding-top': 'toggle',
        'padding-bottom': 'toggle'
      },
      800
    );
  }

  function hideCatalogFilterBlock(filterBlock, filterBlockItemsWrapper) {
    filterBlock.removeClass('catalog__filter-block--active');
    filterBlock.animate(
      {
        'padding-bottom': 'toggle'
      },
      800,
      function() {
        filterBlock.removeAttr('style');
      }
    );

    filterBlockItemsWrapper.animate(
      {
        height: 'toggle',
        'padding-top': 'toggle',
        'padding-bottom': 'toggle'
      },
      800,
      function() {
        filterBlockItemsWrapper.removeAttr('style');
      }
    );
  }

  // Open MainMenu-CatalogMenu
  var mainMenuItemLinkCatalogToggle = $(
    '.main-menu__item-link--catalog-toggle'
  );
  var mainMenuCatalogDropdown = $('.main-menu__catalog-dropdown');
  var mainMenuItemSecond = $(
    '.main-menu__item:nth-of-type(2) .main-menu__item-link'
  );

  mainMenuItemLinkCatalogToggle.click(function(e) {
    e.preventDefault();

    if (
      !mainMenuItemLinkCatalogToggle.hasClass(
        'main-menu__item-link--catalog-toggle-open'
      )
    ) {
      mainMenuItemLinkCatalogToggle.addClass(
        'main-menu__item-link--catalog-toggle-open'
      );
      window.menuCatalogDropdown.open(mainMenuCatalogDropdown, function() {
        mainMenuItemLinkCatalogToggle.focus();
        mainMenuItemLinkCatalogToggle.removeClass(
          'main-menu__item-link--catalog-toggle-open'
        );
        mainMenuItemLinkCatalogToggle.off(
          'blur',
          mainMenuCatalogDropdownLostFocus
        );
      });
      mainMenuItemLinkCatalogToggle.on(
        'blur',
        mainMenuCatalogDropdownLostFocus
      );
    } else {
      window.menuCatalogDropdown.close(mainMenuCatalogDropdown, function() {
        mainMenuItemLinkCatalogToggle.removeClass(
          'main-menu__item-link--catalog-toggle-open'
        );
      });
      mainMenuItemLinkCatalogToggle.off(
        'blur',
        mainMenuCatalogDropdownLostFocus
      );
    }
  });

  function mainMenuCatalogDropdownLostFocus(e) {
    $(e.target).off('blur', mainMenuCatalogDropdownLostFocus);

    if (
      mainMenuItemLinkCatalogToggle.hasClass(
        'main-menu__item-link--catalog-toggle-open'
      ) &&
      mainMenuCatalogDropdown.find(e.relatedTarget).length === 0 &&
      e.relatedTarget !== null
    ) {
      window.menuCatalogDropdown.close(mainMenuCatalogDropdown, function() {
        mainMenuItemLinkCatalogToggle.removeClass(
          'main-menu__item-link--catalog-toggle-open'
        );
      });
      return;
    }

    $(e.relatedTarget).on('blur', mainMenuCatalogDropdownLostFocus);
  }

  window.menuCatalogDropdown = (function() {
    var onCatalogDropdownClose = null;
    var catalogDropdown = null;

    function openCatalogDropdown() {
      catalogDropdown.animate(
        {
          height: 'toggle'
        },
        300,
        function() {
          catalogDropdown
            .addClass('main-menu__catalog-dropdown--open')
            .removeAttr('style');
        }
      );
      $(document).on('click', eventHandlerClickDocument);
      $(document).on('keydown', eventHandlerKeydownDocument);
    }

    function closeCatalogDropdown() {
      catalogDropdown.animate(
        {
          height: 'toggle'
        },
        500,
        function() {
          catalogDropdown
            .removeClass('main-menu__catalog-dropdown--open')
            .removeAttr('style');
        }
      );
      $(document).off('click', eventHandlerClickDocument);
      $(document).off('keydown', eventHandlerKeydownDocument);

      if (typeof onCatalogDropdownClose === 'function') {
        onCatalogDropdownClose();
      }
    }

    function eventHandlerKeydownDocument(e) {
      if (window.utils.isDeactivateEvent(e)) {
        closeCatalogDropdown();
      }
    }

    function eventHandlerClickDocument(e) {
      var currentTarget = $(e.target);
      // console.log(currentTarget);

      if (
        $('.main-menu__dropdown').find(currentTarget).length === 0 &&
        !currentTarget.hasClass('main-menu__item-link--catalog-toggle')
      ) {
        closeCatalogDropdown();
      }
    }

    return {
      open: function(dropdown, callback) {
        onCatalogDropdownClose = callback;
        catalogDropdown = dropdown;
        openCatalogDropdown();
      },

      close: function(dropdown, callback) {
        onCatalogDropdownClose = callback;
        catalogDropdown = dropdown;
        closeCatalogDropdown();
      }
    };
  })();

  // Slider
  $('.slider__items').slick({
    accessibility: false,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    dots: true,
    dotsClass: 'slider__pagination',
    focusOnSelect: false,
    speed: 2500,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          vertical: true,
          verticalSwiping: true
        }
      }
    ]
  });

  // Проверим высоту футера и подстроим паддинг контент враппера
  (function() {
    var pageFooter = $('.page-footer');
    var pageWrapper = $('.page-wrapper');
    var pageFooterHeight = pageFooter.height();

    if (JqWindow.outerWidth() > 999 && pageFooterHeight > 194) {
      pageWrapper.css({ 'padding-bottom': pageFooterHeight + 'px' });
    }

    JqWindow.resize(function() {
      if (JqWindow.outerWidth() > 999 && pageFooterHeight > 194) {
        pageWrapper.css({ 'padding-bottom': pageFooterHeight + 'px' });
      } else if (JqWindow.outerWidth() < 1000) {
        pageWrapper.removeAttr('style');
      }
    });
  })();

  window.scrollingElement = (function() {
    var scrollElement = null;
    var scrollTrack = null;
    var scrollTrackBar = null;

    function initScrolling() {
      var scrollTrackHeight = scrollTrack.height();
      scrollTrackBar.height(
        (
          (scrollElement[0].clientHeight * scrollTrackHeight) /
          scrollElement[0].scrollHeight
        ).toFixed(7)
      );

      scrollElement.scroll(function(e) {
        scrollTrackBar.css({
          top:
            (
              (scrollElement[0].scrollTop * scrollTrackHeight) /
              scrollElement[0].scrollHeight
            ).toFixed(7) + 'px'
        });
      });

      scrollTrackBar.mousedown(function(e) {
        var scrollTrackBarCoordY = getCoordY(scrollTrackBar[0]);
        var shiftY = e.pageY - scrollTrackBarCoordY;
        var scrollTrackCoordY = getCoordY(scrollTrack[0]);

        $(document).mousemove(function(e) {
          var newCoordY = e.pageY - shiftY - scrollTrackCoordY;
          var bottomLimit =
            scrollTrack.outerHeight() - scrollTrackBar.outerHeight();

          if (newCoordY < 0) {
            newCoordY = 0;
          } else if (newCoordY > bottomLimit) {
            newCoordY = bottomLimit;
          }

          scrollTrackBar.css({
            top: newCoordY + 'px'
          });

          scrollElement.scrollTop(
            (
              (newCoordY * scrollElement[0].scrollHeight) /
              scrollTrackHeight
            ).toFixed(7)
          );

          return false;
        });

        $(document).mouseup(function() {
          $(document)
            .off('mousemove')
            .off('mouseup');
        });
      });
    }

    function getCoordY(draggingElement) {
      return draggingElement.getBoundingClientRect().top;
    }

    return function(scrollingElement, track, trackBar) {
      scrollElement = scrollingElement;
      scrollTrack = track;
      scrollTrackBar = trackBar;
      initScrolling();
    };
  })();

  // типа форма регистрации
  (function() {
    var registrationForm = $('.registration__form');
    // inputs
    var registrationSurname = {
      field: registrationForm.find('#registration-surname'),
      missingValue: registrationForm.find(
        '.field-error--surname-missing-value'
      ),
      editable: false
    };

    var registrationFirstName = {
      field: registrationForm.find('#registration-first-name'),
      missingValue: registrationForm.find(
        '.field-error--first-name-missing-value'
      ),
      editable: false
    };

    var registrationSecondName = {
      field: registrationForm.find('#registration-second-name'),
      missingValue: registrationForm.find(
        '.field-error--second-name-missing-value'
      ),
      editable: false
    };

    var registrationTown = {
      field: registrationForm.find('#registration-town'),
      missingValue: registrationForm.find('.field-error--town-missing-value'),
      editable: false
    };

    var registrationPhone = {
      field: registrationForm.find('#registration-phone'),
      missingValue: registrationForm.find('.field-error--phone-missing-value'),
      editable: false
    };

    var registrationEmail = {
      field: registrationForm.find('#registration-email'),
      missingValue: registrationForm.find('.field-error--email-missing-value'),
      wrongFormat: registrationForm.find('.field-error--email-wrong-format'),
      editable: false
    };

    var registrationLogin = {
      field: registrationForm.find('#registration-login'),
      missingValue: registrationForm.find('.field-error--login-missing-value'),
      editable: false
    };

    var registrationPassword = {
      field: registrationForm.find('#registration-password'),
      missingValue: registrationForm.find(
        '.field-error--password-missing-value'
      ),
      short: registrationForm.find('.field-error--password-short'),
      editable: false
    };

    var registrationRepeatPassword = {
      field: registrationForm.find('#registration-repeat-password'),
      missingValue: registrationForm.find(
        '.field-error--repeat-password-missing-value'
      ),
      notEqual: registrationForm.find('.field-error--password-not-equal'),
      editable: false
    };

    var passwordSize = registrationForm.find('.password-size');
    var emailPattern = /.+@.+\..+/i;

    registrationPhone.field.mask('+7 (999) 999-9999');

    registrationForm.submit(function(e) {
      if (window.utils.checkEmptyFields(registrationForm) > 0) {
        e.preventDefault();
        validate();
      }
    });

    function validate() {
      if (!registrationSurname.field.val()) {
        registrationSurname.missingValue.addClass('field-error--visible');
      }

      if (!registrationFirstName.field.val()) {
        registrationFirstName.missingValue.addClass('field-error--visible');
      }

      if (!registrationSecondName.field.val()) {
        registrationSecondName.missingValue.addClass('field-error--visible');
      }

      if (!registrationTown.field.val()) {
        registrationTown.missingValue.addClass('field-error--visible');
      }

      if (!registrationPhone.field.val()) {
        registrationPhone.missingValue.addClass('field-error--visible');
      }

      if (!registrationEmail.field.val()) {
        registrationEmail.missingValue.addClass('field-error--visible');
      }

      if (!registrationLogin.field.val()) {
        registrationLogin.missingValue.addClass('field-error--visible');
      }

      if (!registrationPassword.field.val()) {
        registrationPassword.missingValue.addClass('field-error--visible');
      }

      if (!registrationRepeatPassword.field.val()) {
        registrationRepeatPassword.missingValue.addClass(
          'field-error--visible'
        );
      }
    }

    // oninput
    registrationSurname.field.on('input', function() {
      registrationSurname.editable = true;

      if (
        registrationSurname.field.val() &&
        registrationSurname.missingValue.hasClass('field-error--visible')
      ) {
        registrationSurname.missingValue.removeClass('field-error--visible');
        registrationSurname.field.removeClass('input-field--error');
      }
    });

    registrationFirstName.field.on('input', function() {
      registrationFirstName.editable = true;

      if (
        registrationFirstName.field.val() &&
        registrationFirstName.missingValue.hasClass('field-error--visible')
      ) {
        registrationFirstName.missingValue.removeClass('field-error--visible');
        registrationFirstName.field.removeClass('input-field--error');
      }
    });

    registrationSecondName.field.on('input', function() {
      registrationSecondName.editable = true;

      if (
        registrationSecondName.field.val() &&
        registrationSecondName.missingValue.hasClass('field-error--visible')
      ) {
        registrationSecondName.missingValue.removeClass('field-error--visible');
        registrationSecondName.field.removeClass('input-field--error');
      }
    });

    registrationTown.field.on('input', function() {
      registrationTown.editable = true;

      if (
        registrationTown.field.val() &&
        registrationTown.missingValue.hasClass('field-error--visible')
      ) {
        registrationTown.missingValue.removeClass('field-error--visible');
        registrationTown.field.removeClass('input-field--error');
      }
    });

    registrationPhone.field.on('keydown', function() {
      registrationPhone.editable = true;

      if (
        registrationPhone.field.val() &&
        registrationPhone.missingValue.hasClass('field-error--visible')
      ) {
        registrationPhone.missingValue.removeClass('field-error--visible');
        registrationPhone.field.removeClass('input-field--error');
      }
    });

    registrationEmail.field.on('input', function() {
      var length = registrationEmail.field.val().length;

      registrationEmail.editable = true;

      if (
        registrationEmail.field.val() &&
        registrationEmail.missingValue.hasClass('field-error--visible')
      ) {
        registrationEmail.missingValue.removeClass('field-error--visible');
        registrationEmail.field.removeClass('input-field--error');
      } else if (
        registrationEmail.wrongFormat.hasClass('field-error--visible') &&
        emailPattern.test(registrationEmail.field.val())
      ) {
        registrationEmail.wrongFormat.removeClass('field-error--visible');
        registrationEmail.field.removeClass('input-field--error');
      } else if (
        !emailPattern.test(registrationEmail.field.val()) &&
        length !== 0
      ) {
        registrationEmail.wrongFormat.addClass('field-error--visible');
        registrationEmail.field.addClass('input-field--error');
      } else if (length === 0) {
        registrationEmail.wrongFormat.removeClass('field-error--visible');
        registrationEmail.missingValue.addClass('field-error--visible');
        registrationEmail.field.addClass('input-field--error');
      }
    });

    registrationLogin.field.on('input', function() {
      registrationlogin.editable = true;

      if (
        registrationLogin.field.val() &&
        registrationLogin.missingValue.hasClass('field-error--visible')
      ) {
        registrationLogin.missingvalue.removeClass('field-error--visible');
        registrationLogin.field.removeClass('input-field--error');
      }
    });

    registrationPassword.field.on('input', function() {
      var length = registrationPassword.field.val().length;

      registrationPassword.editable = true;

      if (
        registrationPassword.field.val() &&
        registrationPassword.missingValue.hasClass('field-error--visible')
      ) {
        registrationPassword.missingValue.removeClass('field-error--visible');
        registrationPassword.field.removeClass('input-field--error');
      }

      if (length > 0 && length < 8) {
        registrationPassword.short.addClass('field-error--visible');
        registrationPassword.field.addClass('input-field--error');
        passwordSize.text(
          window.utils.getRightEnding(length, ['символ', 'символа', 'символов'])
        );
      } else if (length > 7) {
        registrationPassword.short.removeClass('field-error--visible');
        registrationPassword.field.removeClass('input-field--error');
      } else if (length === 0) {
        registrationPassword.short.removeClass('field-error--visible');
        registrationPassword.missingValue.addClass('field-error--visible');
      }
    });

    registrationRepeatPassword.field.on('input', function() {
      registrationRepeatPassword.editable = true;

      if (
        registrationRepeatPassword.field.val() &&
        registrationRepeatPassword.missingValue.hasClass('field-error--visible')
      ) {
        registrationRepeatPassword.missingValue.removeClass(
          'field-error--visible'
        );
        registrationRepeatPassword.field.removeClass('input-field--error');
      }

      if (
        registrationRepeatPassword.field.val() !==
        registrationPassword.field.val()
      ) {
        registrationRepeatPassword.notEqual.addClass('field-error--visible');
        registrationRepeatPassword.field.addClass('input-field--error');
      } else {
        registrationRepeatPassword.notEqual.removeClass('field-error--visible');
        registrationRepeatPassword.field.removeClass('input-field--error');
      }
    });

    // onblur
    registrationSurname.field.blur(function() {
      if (!registrationSurname.field.val() && registrationSurname.editable) {
        registrationSurname.missingValue.addClass('field-error--visible');
        registrationSurname.field.addClass('input-field--error');
      }
    });

    registrationFirstName.field.blur(function() {
      if (
        !registrationFirstName.field.val() &&
        registrationFirstName.editable
      ) {
        registrationFirstName.missingValue.addClass('field-error--visible');
        registrationFirstName.field.addClass('input-field--error');
      }
    });

    registrationSecondName.field.blur(function() {
      if (
        !registrationSecondName.field.val() &&
        registrationSecondName.editable
      ) {
        registrationSecondName.missingValue.addClass('field-error--visible');
        registrationSecondName.field.addClass('input-field--error');
      }
    });

    registrationTown.field.blur(function() {
      if (!registrationTown.field.val() && registrationTown.editable) {
        registrationTown.missingValue.addClass('field-error--visible');
        registrationTown.field.addClass('input-field--error');
      }
    });

    registrationPhone.field.blur(function() {
      if (!registrationPhone.field.val() && registrationPhone.editable) {
        registrationPhone.missingValue.addClass('field-error--visible');
        registrationPhone.field.addClass('input-field--error');
      }
    });

    registrationEmail.field.blur(function() {
      if (!registrationEmail.field.val() && registrationEmail.editable) {
        registrationEmail.wrongFormat.removeClass('field-error--visible');
        registrationEmail.missingValue.addClass('field-error--visible');
        registrationEmail.field.addClass('input-field--error');
      } else if (
        !emailPattern.test(registrationEmail.field.val()) &&
        registrationEmail.editable
      ) {
        registrationEmail.wrongFormat.addClass('field-error--visible');
        registrationEmail.field.addClass('input-field--error');
      } else if (
        emailPattern.test(registrationEmail.field.val()) &&
        registrationEmail.editable
      ) {
        registrationEmail.wrongFormat.removeClass('field-error--visible');
        registrationEmail.field.removeClass('input-field--error');
      }
    });

    registrationLogin.field.blur(function() {
      if (!registrationLogin.field.val() && registrationLogin.editable) {
        registrationLogin.missingValue.addClass('field-error--visible');
        registrationLogin.field.addClass('input-field--error');
      }
    });

    registrationPassword.field.blur(function() {
      if (!registrationPassword.field.val() && registrationPassword.editable) {
        registrationPassword.missingValue.addClass('field-error--visible');
        registrationPassword.field.addClass('input-field--error');
      }
    });

    registrationRepeatPassword.field.blur(function() {
      if (
        !registrationRepeatPassword.field.val() &&
        registrationRepeatPassword.editable
      ) {
        registrationRepeatPassword.notEqual.removeClass('field-error-visible');
        registrationRepeatPassword.missingValue.addClass(
          'field-error--visible'
        );
        registrationRepeatPassword.field.addClass('input-field--error');
      }
    });

    // посмотреть пароль
    var registrationInputFieldTogglePassword = $(
      '.registration__input-field-toggle-password'
    );

    registrationInputFieldTogglePassword.click(function() {
      if (
        registrationInputFieldTogglePassword.hasClass(
          'registration__input-field-toggle-password--show'
        )
      ) {
        registrationInputFieldTogglePassword
          .removeClass('registration__input-field-toggle-password--show')
          .addClass('registration__input-field-toggle-password--hide')
          .attr('title', 'Скрыть пароль');
        registrationPassword.field.attr('type', 'text');
      } else {
        registrationInputFieldTogglePassword
          .addClass('registration__input-field-toggle-password--show')
          .removeClass('registration__input-field-toggle-password--hide')
          .attr('title', 'Показать пароль');
        registrationPassword.field.attr('type', 'password');
      }
    });
  })();

  // Дропдаун при нажатии на свое имя
  (function() {
    var pageHeaderUserBlock = $('.page-header__user-block');
    var pageHeaderProfile = pageHeaderUserBlock.find('.page-header__profile');
    var pageHeaderProfileDropdown = pageHeaderUserBlock.find('.dropdown');

    pageHeaderProfile.click(function() {
      if (!pageHeaderProfile.hasClass('page-header__profile--active')) {
        dropdownOpen();
      } else {
        dropdownClose();
      }
    });

    function dropdownOpen() {
      pageHeaderProfile.addClass('page-header__profile--active');
      pageHeaderProfileDropdown.addClass('dropdown--open');
      $(document).on('click', eventHandlerClickDocument);
    }

    function dropdownClose() {
      pageHeaderProfile.removeClass('page-header__profile--active');
      pageHeaderProfileDropdown.removeClass('dropdown--open');
      $(document).off('click', eventHandlerClickDocument);
    }

    function eventHandlerClickDocument(e) {
      var target = $(e.target);

      if (
        pageHeaderUserBlock.find(target).length === 0 &&
        !pageHeaderUserBlock.is(target)
      ) {
        dropdownClose();
      }
    }
  })();

  // галерея что ли и слайдеры фоток что ли
  (function() {
    var langRu = {
      CLOSE: 'Закрыть',
      NEXT: 'Следующая фотография',
      PREV: 'Предыдущая фотография',
      ERROR:
        'Запрашиваемый материал не может быть загружен. <br/> Пожалуйста, повторите попытку позже.',
      PLAY_START: 'Начать показ слайдов',
      PLAY_STOP: 'Остановить показ слайдов',
      FULL_SCREEN: 'Полный экран',
      THUMBS: 'Миниатюры'
    };
    var productCardMainPhotosSlider = $('.product-card__main-photos-slider');
    var productCardThumbnailsSlider = $('.product-card__thumbnails-slider');

    // slider on product card main photos
    productCardMainPhotosSlider.slick({
      accessibility: false,
      arrows: true,
      focusOnSelect: false,
      speed: 500,
      appendArrows: '.product-card__main-photos-slider-controls',
      prevArrow:
        '<div class="product-card__main-photos-slider-controls-prev"></div>',
      nextArrow:
        '<div class="product-card__main-photos-slider-controls-next"></div>'
    });

    // slider on product card thumbnails photos
    productCardThumbnailsSlider.slick({
      accessibility: false,
      arrows: true,
      focusOnSelect: false,
      speed: 500,
      appendArrows: '.product-card__thumbnails-slider-controls',
      prevArrow:
        '<div class="product-card__thumbnails-slider-controls-prev"></div>',
      nextArrow:
        '<div class="product-card__thumbnails-slider-controls-next"></div>',
      slidesToScroll: 1,
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4
          }
        }
      ]
    });

    // галерея больших фоток
    $().fancybox({
      selector: '[data-fancybox="main-photos"]:not(.slick-cloned)',
      loop: true,
      toolbar: false,
      transitionEffect: 'slide',
      transitionDuration: 800,
      animationEffect: 'zoom',
      lang: 'ru',
      i18n: {
        ru: langRu
      },
      backFocus: false
    });

    // миниатюрки
    $().fancybox({
      selector: '[data-fancybox="thumbnails"]:not(.slick-cloned)',
      loop: true,
      toolbar: false,
      transitionEffect: 'slide',
      transitionDuration: 800,
      animationEffect: 'zoom',
      lang: 'ru',
      i18n: {
        ru: langRu
      },
      backFocus: false
    });

    $('.product-card__thumbnails-photo').mouseover(function() {
      var currentThumb = $(this);

      productCardMainPhotosSlider.slick('slickSetOption', 'speed', 100);
      productCardMainPhotosSlider.slick(
        'slickGoTo',
        currentThumb.data('slickIndex'),
        false
      );
    });

    $('.product-card__thumbnails-photo').mouseleave(function() {
      productCardMainPhotosSlider.slick('slickSetOption', 'speed', 500);
    });
  })();

  // nav tabs in product card and sections
  (function() {
    var productCardDetailedInfo = $('.product-card__detailed-info');
    var productCardNavTab = $('.product-card__nav-tabs-item');
    var productCardDetailedInfoTitle = $('.product-card__detailed-info-title');
    var activeTab = 'description'; // по умолчанию

    // для таблет + десктоп
    productCardNavTab.click(function() {
      var currentNavTab = $(this);
      var tabType = (activeTab = currentNavTab.data('tabType'));

      if (!currentNavTab.hasClass('product-card__nav-tabs-item--active')) {
        currentNavTab
          .addClass('product-card__nav-tabs-item--active')
          .siblings('.product-card__nav-tabs-item--active')
          .removeClass('product-card__nav-tabs-item--active');

        productCardDetailedInfo
          .find('.product-card__detailed-info-content--visible')
          .removeClass('product-card__detailed-info-content--visible')
          .end()
          .find(
            '.product-card__detailed-' +
              tabType +
              ' .product-card__detailed-info-content'
          )
          .addClass('product-card__detailed-info-content--visible')
          .end()
          .find('.product-card__detailed-info-title--active')
          .removeClass('product-card__detailed-info-title--active')
          .next()
          .removeClass('product-card__detailed-info-content--visible');

        productCardDetailedInfo
          .find(
            '.product-card__detailed-info-title[data-info-title-type="' +
              tabType +
              '"]'
          )
          .addClass('product-card__detailed-info-title--active')
          .next()
          .addClass('product-card__detailed-info-content--visible');
      }
    });

    // для андроидов и айфоней
    productCardDetailedInfoTitle.click(function() {
      var currentInfoTitle = $(this);

      if (
        !currentInfoTitle.hasClass('product-card__detailed-info-title--active')
      ) {
        currentInfoTitle
          .addClass('product-card__detailed-info-title--active')
          .next()
          .slideDown(700, function() {
            $(this)
              .removeAttr('style')
              .addClass('product-card__detailed-info-content--visible');
          });
      } else {
        currentInfoTitle
          .removeClass('product-card__detailed-info-title--active')
          .next()
          .slideUp(700, function() {
            $(this)
              .removeAttr('style')
              .removeClass('product-card__detailed-info-content--visible');
          });
      }
    });

    JqWindow.resize(checkHiddenDetailedInfo);

    function checkHiddenDetailedInfo() {
      if (JqWindow.outerWidth() > 767) {
        productCardDetailedInfo
          .find('.product-card__detailed-info-content--visible')
          .removeClass('product-card__detailed-info-content--visible')
          .end()
          .find(
            '.product-card__detailed-' +
              activeTab +
              ' .product-card__detailed-info-content'
          )
          .addClass('product-card__detailed-info-content--visible');
      }
    }
  })();

  // наведение на миниатюру фотки товара
  (function() {
    $('a[data-hover-image="zoom"]').mouseover(function() {
      if (JqWindow.outerWidth() > 767 && $(this).data('hoverImage') == 'zoom') {
        var currentItem = $(this);
        var img = currentItem.children('img');
        var imgSrc = img.attr('src');
        var naturalWidth = img[0].naturalWidth;
        var naturalHeight = img[0].naturalHeight;
        var widthHeightRatio = (naturalWidth / naturalHeight).toFixed(7);
        var currentWidth = 0;
        var currentHeight = 0;

        if (naturalWidth > 260) {
          currentWidth = 260;
          currentHeight = currentWidth / widthHeightRatio;
        } else if (naturalHeight > 300) {
          currentHeight = 300;
          currentWidth = currentHeight * widthHeightRatio;
        } else {
          currentWidth = naturalWidth;
          currentHeight = naturalHeight;
        }

        currentItem.wrap('<div class="hover-image-wrapper"></div>');
        currentItem.before(
          '<div class="hover-image-wrapper__inner">' +
            '<img src="' +
            imgSrc +
            '" alt="" width="' +
            currentWidth +
            '" height="' +
            currentHeight +
            '">' +
            '</div>'
        );

        var imgWrapperInner = currentItem.prev();

        if (imgWrapperInner[0].getBoundingClientRect().left < 0) {
          imgWrapperInner.addClass('hover-image-wrapper__inner--right');
        }

        imgWrapperInner.css({
          top:
            '-' +
            (imgWrapperInner.outerHeight() - currentItem.height()) / 2 +
            'px'
        });

        currentItem.mouseout(function() {
          var hoverImage = currentItem.prev();
          currentItem.off('mouseout');

          hoverImage.fadeOut(400, function() {
            hoverImage.remove();
            currentItem.unwrap();
          });
        });
      }
    });
  })();

  // orders
  (function() {
    // подстроим высоту открытой части заказа
    $('.order__content').each(function() {
      var currentOrderContent = $(this);
      var orderItemHeight = currentOrderContent.children(
        '.order__content-item:first'
      )[0].clientHeight;

      currentOrderContent.css({
        height: orderItemHeight + 'px'
      });
    });

    $('.order__visibility-toggle').click(function() {
      var currentBtn = $(this);
      var currentOrderContent = currentBtn.siblings('.order__content');
      var orderItemHeight = currentOrderContent.children(
        '.order__content-item:first'
      )[0].clientHeight;

      if (currentBtn.data('toggleVisibility') == 'show') {
        currentBtn.text('Скрыть');
        currentBtn.data('toggleVisibility', 'hide');
        currentOrderContent.animate(
          {
            height: currentOrderContent[0].scrollHeight + 'px'
          },
          500,
          function() {
            currentOrderContent.addClass('order__content--show');
          }
        );
      } else {
        currentBtn.text(
          'Показать остальные товары (' +
            currentBtn.data('orderHiddenItemCount') +
            ')'
        );
        currentBtn.data('toggleVisibility', 'show');
        currentOrderContent.animate(
          {
            height: orderItemHeight + 'px'
          },
          500,
          function() {
            currentOrderContent.removeClass('order__content--show');
          }
        );
      }
    });
  })();

  // ordering
  (function() {
    $('.ordering__order-content-title').click(function() {
      var orderingOrderContentToggle = $(this);

      if (
        !orderingOrderContentToggle.hasClass(
          'ordering__order-content-title--active'
        )
      ) {
        orderingOrderContentToggle
          .addClass('ordering__order-content-title--active')
          .next()
          .slideDown(500);
      } else {
        orderingOrderContentToggle
          .removeClass('ordering__order-content-title--active')
          .next()
          .slideUp(500);
      }
    });
  })();

  // Модальное окно входа
  (function() {
    var modalLoginForm = $('.modal-login__login-form');
    // inputы
    var loginIdentifier = {
      field: modalLoginForm.find('#login-identifier'),
      missingValue: modalLoginForm.find(
        '.field-error--login-identifier-missing-value'
      )
    };

    var loginPassword = {
      field: modalLoginForm.find('#login-password'),
      missingValue: modalLoginForm.find(
        '.field-error--login-password-missing-value'
      )
    };

    modalLoginForm.submit(function(e) {
      if (window.utils.checkEmptyFields(modalLoginForm) > 0) {
        e.preventDefault();
        validate();

        if (modalLoginForm.height() % 2 === 1) {
          modalLoginForm.height(modalLoginForm.height() + 1);
        }
      }
    });

    function validate() {
      if (!loginIdentifier.field.val()) {
        loginIdentifier.missingValue.addClass('field-error--visible');
      }

      if (!loginPassword.field.val()) {
        loginPassword.missingValue.addClass('field-error--visible');
      }
    }

    loginIdentifier.field.on('input', function() {
      if (
        loginIdentifier.field.val() &&
        loginIdentifier.missingValue.hasClass('field-error--visible')
      ) {
        loginIdentifier.missingValue.removeClass('field-error--visible');
        loginIdentifier.field.removeClass('input-field--error');
      }
    });

    loginPassword.field.on('input', function() {
      if (
        loginPassword.field.val() &&
        loginPassword.missingValue.hasClass('field-error--visible')
      ) {
        loginPassword.missingValue.removeClass('field-error--visible');
        loginPassword.field.removeClass('input-field--error');
      }
    });
  })();

  // Отдельная страница входа
  (function() {
    var loginForm = $('.login__form');
    // инпутс
    var loginIdentifier = {
      field: loginForm.find('#login-identifier'),
      missingValue: loginForm.find(
        '.field-error--login-identifier-missing-value'
      )
    };

    var loginPassword = {
      field: loginForm.find('#login-password'),
      missingValue: loginForm.find('.field-error--login-password-missing-value')
    };

    loginForm.submit(function(e) {
      if (window.utils.checkEmptyFields(loginForm) > 0) {
        e.preventDefault();
        validate();
      }
    });

    function validate() {
      if (!loginIdentifier.field.val()) {
        loginIdentifier.missingValue.addClass('field-error--visible');
      }

      if (!loginPassword.field.val()) {
        loginPassword.missingValue.addClass('field-error--visible');
      }
    }

    loginIdentifier.field.on('input', function() {
      if (
        loginIdentifier.field.val() &&
        loginIdentifier.missingValue.hasClass('field-error--visible')
      ) {
        loginIdentifier.missingValue.removeClass('field-error--visible');
        loginIdentifier.field.removeClass('input-field--error');
      }
    });

    loginPassword.field.on('input', function() {
      if (
        loginPassword.field.val() &&
        loginPassword.missingValue.hasClass('field-error--visible')
      ) {
        loginPassword.missingValue.removeClass('field-error--visible');
        loginPassword.field.removeClass('input-field--error');
      }
    });
  })();

  // Pagination

  // back
  $('.dropdown__item--logout a').click(function(e) {
    e.preventDefault();
    $.ajax({
      url: '/logout.php',
      success: function(data) {
        window.location.href = data;
      }
    });
  });

  $('.modal-login__login-form').submit(function(e) {
    var form = $(this);

    e.preventDefault();
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize()
    }).done(function(data) {
      window.location.href = data;
    });
  });

  $('.footer-navigation__show-more-button').click(function() {});

  // Добавление товара в корзину
  $('.catalog-product__buy').click(function() {
    var currentButton = $(this);
    var count = currentButton
      .parent()
      .find('.quantity-controls__field')
      .val();

    if (
      currentButton.data('catalogBtn') != 'in-cart' &&
      currentButton.data('catalogBtn') != 'not-available'
    ) {
      $.ajax({
        type: 'post',
        url: currentButton.data('url'),
        data: {
          uid: currentButton.data('uid'),
          count: count
        }
      }).done(function(data) {
        if (data > 0) {
          $('.page-header__user-item--cart')
            .addClass('page-header__user-item--cart-not-empty')
            .children('.page-header__user-item-cart-text')
            .text(data);
          currentButton
            .addClass('catalog-product__buy--in-cart')
            .data('catalogBtn', 'in-cart')
            .data('url', '/cart.php')
            .text('В корзине');
          console.log(data);
        }
      });
    }
  });

  // Переход в корзину по нажатию кнопки "В корзине"
  $('.catalog-product__buy').click(function() {
    if ($(this).data('catalogBtn') == 'in-cart') {
      window.location.href = $(this).data('url');
    }
  });

  // Удаление товара из корзины
  $('.cart-product__remove-button').click(function() {
    var currentButton = $(this);

    if (currentButton.data('btnAvailable') != 'false') {
      currentButton.data('btnAvailable', 'false');

      $.ajax({
        type: 'post',
        url: currentButton.data('url'),
        data: {
          uid: currentButton.data('uid')
        }
      }).done(function(data) {
        data = $.parseJSON(data);

        if (data.sumCount > 0) {
          $('.page-header__user-item--cart')
            .addClass('page-header__user-item--cart-not-empty')
            .children('.page-header__user-item-cart-text')
            .text(data.sumCount);
        } else {
          $('.page-header__user-item--cart')
            .removeClass('page-header__user-item--cart-not-empty')
            .children('.page-header__user-item-cart-text')
            .text('Корзина');
        }

        var currentTotalPrice = $('.cart__summary-info-total-price');

        currentTotalPrice.html(
          parseInt(currentTotalPrice.text()) -
            data.price * data.count +
            ' <span class="currency-ruble">₽</span>'
        );

        $('.cart-product')
          .filter(function() {
            return $(this).has(currentButton).length > 0;
          })
          .fadeOut(500, function() {
            $(this).remove();

            if (data.sumCount == 0) {
              $('.cart__products').remove();
              $('.cart__order-block').remove();
              $('.cart__inner').append(
                '<div class="cart__empty"><h3 class="cart__empty-title">Ваша корзина пуста</h3><p  class="cart__empty-description">Перейдите в <a class="cart__empty-link" href="/catalog.php?category=1&season=summer">каталог</a>, чтобы начать покупки.</p></div>'
              );
            }
          });
      });
    }
  });

  // quantity controls в корзине
  $('.cart-product__quantity-control-plus').click(function() {
    var currentField = $(this).prev();
    var currentValue = parseInt(currentField.val());
    var currentButtonPlus = $(this);
    var topLimit = parseInt(currentButtonPlus.data('topLimitCount'));

    if (currentButtonPlus.data('btnAvailable') && currentValue < topLimit) {
      currentField.val(++currentValue);
      currentButtonPlus.data('btnAvailable', 'false');

      $.ajax({
        type: 'post',
        url: 'cart/change_quantity_product.php',
        data: {
          uid: currentButtonPlus.data('uid'),
          count: currentValue
        }
      }).done(function(data) {
        data = $.parseJSON(data);
        console.log(data);
        currentButtonPlus.data('btnAvailable', 'true');

        $('.page-header__user-item--cart')
          .children('.page-header__user-item-cart-text')
          .text(data.sumCount);

        var currentTotalPrice = $('.cart__summary-info-total-price');

        currentTotalPrice.html(
          parseInt(currentTotalPrice.text()) +
            data.price * data.differenceCount +
            ' <span class="currency-ruble">₽</span>'
        );
      });
    }
  });

  $('.cart-product__quantity-control-minus').click(function() {
    var currentField = $(this).next();
    var currentValue = parseInt(currentField.val());
    var currentButtonMinus = $(this);

    if (currentButtonMinus.data('btnAvailable') && currentValue > 1) {
      currentField.val(--currentValue);
      currentButtonMinus.data('btnAvailable', 'false');

      $.ajax({
        type: 'post',
        url: 'cart/change_quantity_product.php',
        data: {
          uid: currentButtonMinus.data('uid'),
          count: currentValue
        }
      }).done(function(data) {
        data = $.parseJSON(data);
        console.log(data);
        currentButtonMinus.data('btnAvailable', 'true');

        $('.page-header__user-item--cart')
          .children('.page-header__user-item-cart-text')
          .text(data.sumCount);

        var currentTotalPrice = $('.cart__summary-info-total-price');

        currentTotalPrice.html(
          parseInt(currentTotalPrice.text()) +
            data.price * data.differenceCount +
            ' <span class="currency-ruble">₽</span>'
        );
      });
    }
  });

  $('.cart-product__quantity-control-field').change(function() {
    var currentField = $(this);
    var currentValue = parseInt(currentField.val());
    console.log(currentField);

    if (currentField.data('fieldAvailable')) {
      if (currentValue < 1) {
        currentValue = 1;
      }

      currentField.data('fieldAvailable', 'false');

      $.ajax({
        type: 'post',
        url: 'cart/change_quantity_product.php',
        data: {
          uid: currentField.data('uid'),
          count: currentValue
        }
      }).done(function(data) {
        data = $.parseJSON(data);
        console.log(data);
        currentField.data('fieldAvailable', 'true');

        $('.page-header__user-item--cart')
          .children('.page-header__user-item-cart-text')
          .text(data.sumCount);

        var currentTotalPrice = $('.cart__summary-info-total-price');

        currentTotalPrice.html(
          parseInt(currentTotalPrice.text()) +
            data.price * data.differenceCount +
            ' <span class="currency-ruble">₽</span>'
        );
      });
    }
  });

  // Нажимаем на кнопку оформить заказ
  $('.cart__to-order-button').click(function() {
    window.location.href = $(this).data('url');
  });

  $('.ordering__next').click(function() {
    var totalPrice = $('.ordering__total-price-value').text();
    $.ajax({
      type: 'post',
      url: '/ordering.php',
      data: {
        step: 'next',
        totalPrice: totalPrice
      }
    }).done(function(data) {
      window.location.href = '';
      console.log(data);
    });
  });

  $('.ordering__back').click(function() {
    $.ajax({
      type: 'post',
      url: '/ordering.php',
      data: {
        step: 'back'
      }
    }).done(function(data) {
      window.location.href = '';
      console.log(data);
    });
  });

  // Сортировка
  $('.dropdown__item-label--sort').click(function() {
    var currentSortItem = $(this);
    var getQueries = window.location.search.slice(1).split('&');
    var page = 1;

    getQueries.forEach(function(query, i) {
      getQueries[i] = query.split('=');
    });

    getQueries.forEach(function(item) {
      if (item[0] == 'page') {
        page = item[1];
      }
    });

    console.log(getQueries);
    $.ajax({
      type: 'get',
      url: '/includes/sorting_control.php',
      data: {
        category: getQueries[0][1],
        season: getQueries[1][1],
        page: page,
        sortType: currentSortItem.data('sort')
      }
    }).done(function(data) {
      data = $.parseJSON(data);
      $('.catalog__current-sort-value')
        .next()
        .removeClass('dropdown--open')
        .parent()
        .removeClass('select--active');
      if (currentSortItem.data('sort') == 'name-asc') {
        $('.catalog__current-sort-value').text('по наименованию');
      } else if (currentSortItem.data('sort') == 'price-asc') {
        $('.catalog__current-sort-value').text('по возрастанию цены');
      } else if (currentSortItem.data('sort') == 'price-desc') {
        $('.catalog__current-sort-value').text('по убыванию цены');
      }

      $('.catalog-product').remove();

      $.each(data, function(index, data) {
        $('.catalog__products-inner').append(
          '<div class="catalog-product"><div class="catalog-product__left-content"><a class="catalog-product__photo" href="product.php?uid=' +
            data.uid +
            '" data-hover-image="zoom"><img src="' +
            data.paths +
            '" alt="" width="90" height="90"></a><div class="catalog-product__info"><h2 class="catalog-product__title"><a href="product.php?uid=' +
            data.uid +
            '">' +
            data.name +
            '</a></h2><p class="catalog-product__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae risus pharetra, placerat dui quis, consectetur lacus. Pellentesque euismod nunc eu nulla volutpat, nec imperdiet ex volutpat. Morbi dictum ullamcorper vestibulum. Pellentesque sit amet nibh sed est efficitur fermentum.</p></div><span class="catalog-product__price">' +
            data.price +
            ' <span class="currency-ruble">₽</span></span></div><div class="catalog-product__right-content"><span class="catalog-product__exist-block">В наличии: <span class="catalog-product__in-stock">' +
            data.stock +
            '</span> шт.</span><div class="quantity-controls  catalog-product__quantity-controls"><button class="quantity-controls__button  quantity-controls__button--minus  catalog-product__quantity-control-minus" title="Уменьшить" data-stepping-quantity="true">Уменьшить</button><input class="quantity-controls__field  catalog-product__quantity-control-field" type="text" value="1" data-top-limit-count="' +
            data.stock +
            '"><button class="quantity-controls__button  quantity-controls__button--plus  catalog-product__quantity-control-plus" title="Увеличить" data-top-limit-count="' +
            data.stock +
            '" data-stepping-quantity="true">Увеличить</button></div><button class="button  catalog-product__buy" type="button" data-url="cart/add_product.php" data-uid="' +
            data.uid +
            '">Купить</button></div></div>'
        );
      });
      console.log(data);
    });
  });

  // поиск
  $('.page-header__search').submit(function(e) {
    var searchField = $('.page-header__search-field');
    var data = 'search' + searchField.val();

    if (searchField.val()) {
      $.ajax({
        type: 'post',
        url: 'includes/search.php',
        data: data
      }).done(function(data) {
        console.log(data);
      });
    } else {
      e.preventDefault();
    }
  });

  ////////////////////////////
  window.utils = (function() {
    var ENTER_KEY_CODE = 13;
    var ESCAPE_KEY_CODE = 27;

    return {
      isActivateEvent: function(e) {
        return e.keyCode === ENTER_KEY_CODE;
      },

      isDeactivateEvent: function(e) {
        return e.keyCode === ESCAPE_KEY_CODE;
      },

      getRightEnding: function(number, arrayEndings) {
        var result = '';

        if (number > 10 && number < 15) {
          return number + ' ' + arrayEndings[2];
        }

        switch (number % 10) {
          case 1: {
            result = number + ' ' + arrayEndings[0];
            break;
          }

          case 2:
          case 3:
          case 4: {
            result = number + ' ' + arrayEndings[1];
            break;
          }

          default: {
            result = number + ' ' + arrayEndings[2];
            break;
          }
        }

        return result;
      },

      checkEmptyFields: function(form) {
        return form
          .find('.input-field')
          .filter(function() {
            return !this.value;
          })
          .addClass('input-field--error').length;
      }
    };
  })();
});

// Карта
function initMap() {
  var latlng = {
    lat: 56.0782808,
    lng: 92.9313757
  };

  var myOptions = {
    zoom: 17,
    center: latlng,
    gestureHandling: 'greedy',
    disableDoubleClickZoom: true
  };

  var map = new google.maps.Map(
    document.querySelector('.contacts__map'),
    myOptions
  );
  map.scrollwheel = false;
  var marker = new google.maps.Marker({
    position: {
      lat: 56.07823,
      lng: 92.9313
    },
    map: map,
    title: 'Siberia Motors',
    icon: {
      url: 'img/map-pin-with-border.png',
      scaledSize: new google.maps.Size(56, 80)
    }
  });
}
