"use strict";

window.utils = (function() {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  return {
    'isActivateEvent': function(keycode) {
      return keycode === ENTER_KEY_CODE;
    },

    'isDeactivateEvent': function(keycode) {
      return keycode === ESCAPE_KEY_CODE;
    }
  }
})();
