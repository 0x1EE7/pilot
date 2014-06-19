define(function(require) {
  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var templates = require('js/templates');
  var UIChatWindow = require('component/ui/chat_window');
  var users = require('data/users');

  /**
   * Module exports
   */

  return defineComponent(windowController);

  /**
   * Module function
   */

  function windowController() {
    this.defaultAttrs({
      debug : true,
      chatContSelector : 'div.dc-chat',
      debugAddSelector : '#dc-debug-add'

    });

    this.openWindow = function(e, user) {
      var $chats = this.select('chatContSelector');
      var $html = $(templates.chat_window.render({
        username : user.firstName
      }));
      $chats.append($html);
      UIChatWindow.attachTo('.dc-window', {
        user : user,
        top : 60,
        left : 10
      });
      console.log('window opened for', user);
    };

    this.dbg_showModal = function(e) {
      $('#myModal').modal('show');
    };

    this.dbg_handleNewUser = function(e, d) {
      var data = $(e.target).parent().serializeArray();

      var user = {
        'img' : data[3].value,
        'firstName' : data[1].value,
        'lastName' : data[2].value,
        'email' : data[0].value
      };
      if (data[4]) {
        //online
        users.online.push(user);
      } else {
        users.offline.push(user);
      }

      this.trigger('uiContactsNeedsUpdate');
    };
    
    this.dbg_fetchUsers = function(e,d) {
      var $list=$(e.target).next();
      if(!$list.children().length){
        //fetch users
        var allusers= $.merge(users.offline,users.online);
        for (var i = allusers.length - 1; i >= 0; i--){
          $list.append(templates.dbg_cl_item.render({userName:allusers[i].firstName,
            email:allusers[i].email}));
        };
        this.on($('a.dc-dbg-status-change'),'click',this.dbg_changeUsersStatus);

      }
    };
    
    this.dbg_changeUsersStatus=function(e) {
      var email=$(e.target).data('email');
      console.log(email);
      var u=users.getOnline(email);
      if(u){
        users.signOut(email);
      }else{
        users.signIn(email);
      }
      
      //clean up list
      $('a.dc-dbg-user-stats').next().html('');
      this.off($('a.dc-dbg-status-change'),'click',this.dbg_changeUsersStatus);
      this.trigger('uiContactsNeedsUpdate');
      
    };
    this.after('initialize', function() {
      this.on('dataChatWindowRequested', this.openWindow);

      if (this.attr.debug) {
        $('body').append(templates.dbg_main.render());
        this.on($(this.attr.debugAddSelector), 'click', this.dbg_showModal);
        this.on($('#dc-save-user'), 'click', this.dbg_handleNewUser);
        this.on($('a.dc-dbg-user-stats'), 'click', this.dbg_fetchUsers);
      }

    });
  }

});
