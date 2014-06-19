'use strict';

describeComponent('component/ui/chat_window', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should have an id', function() {
    expect(this.component.$node).toBeDefined();
  });

});
