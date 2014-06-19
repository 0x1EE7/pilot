define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(minimizeBar);

  /**
   * Module function
   */

  function minimizeBar() {
    this.defaultAttrs({
      barSelector:'.dc-minimize-bar'
    });

    this.moveWindow = function(e,minimized) {
      var $mWin = $('#'+minimized.windowId);
      this.attr.$restore=$mWin.parent();
      $mWin.addClass('minimized');
      $mWin.hide();
      this.$node.append($mWin);
      $mWin.fadeIn();
      
    };
    
    this.restoreWindow = function(e,minimized) {
      var $mWin=$('#'+minimized.windowId);
      $mWin.removeClass('minimized');
      $mWin.hide();
      this.attr.$restore.append($mWin);
      $mWin.fadeIn();
    };
    
    this.after('initialize', function () {
      
      this.on(document,'uiWindowMinimized', this.moveWindow);
      this.on(document,'uiWindowRestored', this.restoreWindow);

    });
  }

});
