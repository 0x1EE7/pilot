define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  // var MyComponent = require('component/my_component');
  var UIContactList = require('component/ui/contact_list');
  var UIMinimizeBar = require('component/ui/minimize_bar');
  var DataWindowController = require('component/data/window_controller');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    // MyComponent.attachTo(document);
    DataWindowController.attachTo(document);
    UIContactList.attachTo('div.contacts',{top:'auto',left:'auto',draggable:false});
    UIMinimizeBar.attachTo('div.dc-minimize-bar');
    
    
  }

});
