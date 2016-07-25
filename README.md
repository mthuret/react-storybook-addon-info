`# React Storybook Info Addon

A React Storybook addon to show additional information for your stories.

![React Storybook Screenshot](docs/home-screenshot.png)

### Usage

Install the following npm module:

```sh
npm i --save @kadira/react-storybook-addon-info
```

Then set the addon in the place you configure storybook like this:

```js
import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import {InfoAddon} from '@kadira/react-storybook-addon-info';

setAddon(InfoAddon);

configure(function () {
  ...
}, module);
```

Then create your stories with the `.addWithInfo` API.

```js
import React from 'react';
import Button from './Button';
import { storiesOf, action } from '@kadira/storybook';

storiesOf('Button')
  .addWithInfo(
    'simple usage',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (
      <div>
        <Button label="The Button" onClick={action('onClick')}/>
        <br />
        <p>
          Click the "?" mark at top-right to view the info.
        </p>
      </div>
    ),
  );
```

> Have a look at [this example](example/story.js) stories to learn more about the `addWithInfo` API.

#### Add specifications based on tests

If you want you can also use your components tests to display the component specification.
In order to do that you need to add your tests function to the declaration of the story.
**warning**: the first parameter of the describe function **must be the same name** than the story it test.

You'll find below an example that uses enzyme and chai. But you're able to also use expect, as an assertion library.
Any other way to render react component were not tested. (the webpack.config.js for storybook of the example, match enzyme needed configuration)

```js
import React from 'react';
import Button from './Button';
import { storiesOf, action } from '@kadira/storybook';
import { describe, it } from '@kadira/react-storybook-addon-info';
import {shallow} from "enzyme";
import {expect} from "chai";
storiesOf('Button')
  .addWithInfo(
    'simple usage',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (
      <div>
        <Button label="The Button" onClick={action('onClick')}/>
        <br />
        <p>
          Click the "?" mark at top-right to view the info.
        </p>
      </div>
    ),
  ),
  {
  specs: () => describe('simple usage', function() {
        it('Text should be The Button', () => {
          let output = shallow(<Button label="The Button" onClick={action('onClick')}/>);
          expect(output.prop('children')).to.equal('The Button')
        });
      })
  };
```

##### Use your stories with you CI

The idea is to add to your test runner, all the files used for declaring stories.
But because the info addon redefine describe and it functions, you'll need some extra-configuration to make the tests pass within the test runner.
You'll also need to declare add your stories specifications by declaring a variable (see story.stories.js file as an example)

###### Using JEST

You can use the mocking functionality of jest to switch between the real describe and it implementation of jest or 
the info addon ones. 

Inside .storybook, you can add a facade.js file with the following content : 

```js
import {storiesOf as storiesOfReal,
    action as actionReal,
linkTo as linkToReal} from "@kadira/storybook"
import {describe as describeReal, it as itReal} from '@kadira/react-storybook-addon-info';

export const storiesOf = storiesOfReal;
export const action = actionReal;
export const linkTo = linkToReal;
export const describe = describeReal;
export const it = itReal;`
```

Create a __mocks__ directory within .storybook and add also a facade.js file.

```js
export const storiesOf = function storiesOf() {
  var api = {};
  api.add = ()=> { return api; };
  api.addWithInfo = ()=> { return api; };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
```

Create also a jest config file with the following content :

```js
jest.mock('./.storybook/facade');
```

Inside your stories file you'll use the .storybook/facade.js file for imports.
Finally add this to your jest configuration :

```js
"jest":{
    "setupFiles": [
      "./path/to/your/jest/config/file.js"
    ],
    "automock": false,
    }
```

###### Using Mocha

Create the same facade.js file than for the jest configuration but then add the following line to your .storybook/config.js

```js
import {storiesOf, action, linkTo, describe, it} from "./facade";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.describe = describe;
global.it = it;
```

Create wherever you want a new file that will mock the storybook api

```js
export const storiesOf = function storiesOf() {
  var api = {};
  api.add = ()=> { return api; };
  api.addWithInfo = ()=> { return api; };
  return api;
};
export const action = () => {};

export const linkTo = () => {};

export const describe = describe;
export const it = it;
```

Then create or add those line to a mocha config file :

```js
import {storiesOf, action, linkTo, describe, it} from "path/to/your/mock/file";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.describe = describe;
global.it = it;
```

Finally add this to your mocha running script

```
-w test/path/to/your/config/file.js
```
