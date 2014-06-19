define(function(require) {
  'use strict';

  /**
   * Module exports
   */

  return withUiMinimize;

  /**
   * Module function
   */

  function withUiMinimize() {
    this.defaultAttrs({
      minimized : false

    });

    this.handleMinimize = function() {

      var $minBtn = this.select('minResSelector');
      var $icon = $minBtn.find('span');

      if (!this.attr.minimized) {
        $icon.removeClass('glyphicon-minus');
        $icon.addClass('glyphicon-plus');
        this.minimizeWindow();

      } else {
        $icon.removeClass('glyphicon-plus');
        $icon.addClass('glyphicon-minus');
        this.restoreWindow();
      }

    };

  
    this.minimizeWindow = function() {
      this.attr.style = this.$node.css(['top', 'left', 'width', 'height']);
      var $wBody = this.select('bodySelector');
      $wBody.addClass('hide');

      this.attr.minimized = true;
      this.$node.css({'top':'auto','left':'auto','width':'auto','height':'auto','min-height':0,'margin-bottom':0});

      this.trigger('uiWindowMinimized', {
        windowId : this.$node.attr('id')
      });

    }; 

    this.restoreWindow = function() {
      var $wBody = this.select('bodySelector');
      $wBody.removeClass('hide');
      
      this.attr.minimized = false;
      var style = this.attr.style;
      if (style) {
        this.$node.css(style);
        this.$node.css('min-height','');
      }
      
      this.trigger('uiWindowRestored', {
        windowId : this.$node.attr('id')
      });

    };

    this.after('initialize', function() {
      this.on('click', {
        minResSelector : this.handleMinimize
      });

    });
  }

});
