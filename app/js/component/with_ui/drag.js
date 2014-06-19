define(function(require) {'use strict';

  /**
   * Module exports
   */

  return withUiDrag;

  /**
   * Module function
   */

  function withUiDrag() {
    this.defaultAttrs({
      top : 0,
      left : 0,
      draggable:true
    });

    this.handleDragstart = function(e) {
      e.originalEvent.dataTransfer.effectAllowed = "move";
      this.attr.pointer = {
        top : e.originalEvent.pageY,
        left : e.originalEvent.pageX
      };
      this.attr.id = e.target.id;
    };

    this.handleDrop = function(e) {
      var newPointer = {
        top : e.originalEvent.pageY,
        left : e.originalEvent.pageX
      };

      if (this.attr.id === this.$node.attr('id') && newPointer !== this.attr.pointer) {
        var pos = this.$node.position();
        var that = this;
        this.$node.css({
          'top' : function(i, val) {
            console.log('Top  : ', that.attr.id, val, newPointer.top, that.attr.pointer.top);

            return (parseInt(val, 10) || 0) + newPointer.top - that.attr.pointer.top;
          },
          'left' : function(i, val) {
            console.log('Left: ', that.attr.id, val, newPointer.left, that.attr.pointer.left);

            return (parseInt(val, 10) || 0) + newPointer.left - that.attr.pointer.left;
          }
        });
        
        this.trigger('uiPositionChanged');
        this.attr.id=undefined;
      }
      this.cancelEvent(e);

    };

    this.cancelEvent = function(e) {
      e.preventDefault();
    };

    this.after('initialize', function() {
      this.$node.attr('draggable', this.attr.draggable);

      this.$node.css({
        top : this.attr.top,
        left : this.attr.left
      });

      // this.$node.css(JSON.toString(this.pointer));
      // $.each(this.pointer, function(i, val) {
      // this[i]=val+10;
      //
      // });
      this.on('dragstart', this.handleDragstart);
      this.on(document, 'dragenter', this.cancelEvent);
      this.on(document, 'dragover', this.cancelEvent);

      this.on(document, 'drop', this.handleDrop);

    });
  }

});
