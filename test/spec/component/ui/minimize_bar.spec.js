'use strict';

describeComponent('component/ui/minimize_bar', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent($('<div><div id="test"></div><div class="dc-minimize-bar"></div></div>'));
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should move div on uiWindowMinimized event', function() {
    this.component.trigger('uiWindowMinimized',{windowId:'test'});
    expect(this.component.$node.find("div.dc-minimize-bar > div")[0]).toHaveId('test');

  });

});
