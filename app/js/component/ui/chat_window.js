define(function(require) {
  
  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withMinimize = require('component/with_ui/minimize');
  var withDrag = require('component/with_ui/drag');
  var templates = require('js/templates');

  /**
   * Module exports
   */

  return defineComponent(chatWindow, withMinimize,withDrag);

  /**
   * Module function
   */

  
  function chatWindow() {

    this.defaultAttrs({
      activateSelector: '.panel-body , .panel-heading',
      inputSelector: 'input.dc-message',
      historySelector:'div.dc-chat-history',
      //Minimize mixin selectors
      minResSelector : '.dc-minimize',
      bodySelector : '.panel-body, .panel-footer, input',
    }); 
    
    this.makeActive = function() {
       if(!this.attr.minimized)
       {
        this.$node.parent().append(this.$node);
        this.select('inputSelector').focus();
       }
    };
    
    this.renderMessage = function(message) {
      var $hist=this.select('historySelector');
      var renderOpts={};
      renderOpts.message=message.text;
      renderOpts.time=message.time.toLocaleTimeString();
      if (message.sender==='Self'){
        renderOpts.remote=false;
      } else {
        renderOpts.remote=true;
        renderOpts.userImg = this.attr.user.img;
        
      }
      var html=templates.history_item.render(renderOpts);
      $hist.append(html);
    };
    
    this.renderReceivedMessage = function() {
      this.renderMessage($(this.attr.history).get(-1));
    };

    this.handleMessage= function(e,d) {
      if(e.keyCode === 13 ){
        var $text=$(e.target);
        var msg=$text.val();
        if(msg==='')
          return false;
        $text.addClass('disabled');
        this.attr.history.push({sender:'Self',text:msg, time:new Date(e.timeStamp)});
        this.renderMessage($(this.attr.history).get(-1));
        
        var that = this;
        setTimeout(function() {
          var rev=msg.split('').reverse().join('');        
          that.attr.history.push({sender:that.attr.user,text:msg===rev?"I like the way you think! You are Awesome! :-)":rev, time:new Date(Date.now())});
          that.trigger('uiNewMessageReceived');
        },5000);
        $text.val('');
        $text.removeClass('disabled');
        return false;
      }
      
    };
    this.after('initialize', function() {

      //Generate id
      if (!this.$node.attr('id'))
        this.$node.attr('id', Math.random().toString(36).substr(2, 5));
        
      this.on(this.$node.find('input.dc-message'), 'keypress', this.handleMessage);

      this.attr.history=[];
      this.on('click', this.makeActive);
      this.on('uiPositionChanged', this.makeActive);
      this.attr.history.push({sender:this.attr.user,text:"Hi Dice!", time:new Date(Date.now())});
      this.on('uiNewMessageReceived',this.renderReceivedMessage);

      this.renderMessage(this.attr.history[0]);

     
    });
  }


});
