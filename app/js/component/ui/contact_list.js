define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var withMinimize = require('component/with_ui/minimize');
  var users=require('data/users');
  var templates = require('js/templates');
  
  

  /**
   * Module exports
   */

  return defineComponent(contactList,withMinimize);

  /**
   * Module function
   */

  function contactList() {
    this.defaultAttrs({
      clSelector:'ul.list-group',
      chatButtonSelector:'.dc-btn-start-chat',
      //Minimize mixin selectors
      minResSelector : '.dc-minimize',
      bodySelector : '.panel-body, .panel-footer',
    });
    
    this.renderContacts = function(contacts, isOnline) {
      var that=this;
      $.each(contacts, function(i, u) {   
        var html = templates.cl_item.render({
          userImg: u.img,
          userName: u.firstName+' '+u.lastName,
          email: u.email,
          online: isOnline
        });
        that.select('clSelector').append(html);
      });
      
    };
    
    this.handleChatButton = function(e,d) {
      var user=users.getOnline($(d.el).data('email')).user;
      console.log(user);
      this.trigger('dataChatWindowRequested',user);
      $(d.el).addClass('disabled');
    };
    
    this.addBadge = function() {
      $('<span class="badge">'+users.online.length+'</span>').insertBefore(this.select('minResSelector'));
    };
    this.removeBadge = function() {
      this.$node.find('span.badge').remove();
    };
    
    this.updateList = function() {
      this.select('clSelector').html('');
      this.renderContacts(users.online,true);
      this.renderContacts(users.offline,false);
    };
    this.after('initialize', function () {
      //
      this.renderContacts(users.online,true);
      this.renderContacts(users.offline,false);
      this.on(document,'uiContactsNeedsUpdate', this.updateList);
      
      this.on('click',{
        chatButtonSelector: this.handleChatButton
      });
      
      this.on('uiWindowMinimized',this.addBadge);
      this.on('uiWindowRestored',this.removeBadge);
      
      
    });
  }

});
