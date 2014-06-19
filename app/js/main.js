'use strict';

requirejs.config({
  baseUrl: '',
  paths: {
    'component': 'js/component',
    'page': 'js/page',
    'data': 'js/data',
    'flight':'bower_components/flight',
    'hogan' : 'js/lib/hogan-3.0.0.amd'
  }
});

require(
  [
    'flight/lib/compose',
    'flight/lib/registry',
    'flight/lib/advice',
    'flight/lib/logger',
    'flight/lib/debug'
  ],

  function(compose, registry, advice, withLogging, debug) {
    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice]);

    require(['page/default'], function(initializeDefault) {
      initializeDefault();
    });
  }
);
