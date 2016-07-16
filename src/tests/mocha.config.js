require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

import {storiesOf, action, linkTo, describe, it} from "../../.storybook/__mocks__/facade-mocha";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.describe = describe;
global.it = it;


