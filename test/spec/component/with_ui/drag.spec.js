'use strict';

describeMixin('component/with_ui/drag', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should be draggable', function(){
    expect(this.component.$node).toHaveAttr('draggable','true');
  });

});
