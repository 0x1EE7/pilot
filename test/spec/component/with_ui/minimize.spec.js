'use strict';

describeMixin('component/with_ui/minimize', function() {

  // Initialize the component and attach it to the DOM
  beforeEach(function() {
    setupComponent($(readFixtures('basic_window.html')), {
      minResSelector : '.dc-minimize',
      bodySelector : '.panel-body, .panel-footer',
    });
  });

  it('should be defined', function() {
    expect(this.component).toBeDefined();
  });

  it('triggers uiWindowMinimized on minimize', function() {
    var uiWindowMinimizedEvent = spyOnEvent(document, 'uiWindowMinimized');
    this.component.minimizeWindow();
    expect('uiWindowMinimized').toHaveBeenTriggeredOn(document);
    
  });

});
