import React from 'react';
import Button from './Button';
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
  );

const BUTTON_SPECS = describe('simple usage (inline info)', function() {
  it('Text should be The Button', () => {
    let output = shallow(<Button label="The Button" onClick={action('onClick')}/>);
    expect(output.prop('children')).to.equal('The Button')
  });
  it('Blablabla', () => {
    let output = shallow(<Button label="The Button" onClick={action('onClick')}/>);
    expect(output.prop('children')).to.equal('The Buttton')
  });
});

storiesOf('Button')
  .addWithInfo(
    'simple usage (inline info)',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (<Button label="The Button" onClick={action('onClick')}/>),
    { inline: true, specs: () =>  BUTTON_SPECS},
  );

storiesOf('Button')
  .addWithInfo(
    'simple usage (disable source)',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (<Button label="The Button" onClick={action('onClick')}/>),
    { source: false, inline: true },
  );

storiesOf('Button')
  .addWithInfo(
    'simple usage (no header)',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (<Button label="The Button" onClick={action('onClick')}/>),
    { header: false, inline: true },
  );

storiesOf('Button')
  .addWithInfo(
    'simple usage (no prop tables)',
    `
      This is the basic usage with the button with providing a label to show the text.
    `,
    () => (<Button label="The Button" onClick={action('onClick')}/>),
    { propTables: false, inline: true },
  );

storiesOf('Button')
  .addWithInfo(
    'simple usage (custom propTables)',
    `
      This is the basic usage with the button with providing a label to show the text.

      Since, the story source code is wrapped inside a div, info addon can't figure out propTypes on it's own.
      So, we need to give relevant React component classes manually using \`propTypes\` option as shown below:

      ~~~js
      storiesOf('Button')
        .addWithInfo(
          'simple usage (custom propTables)',
          <info>,
          <storyFn>,
          { inline: true, propTables: [Button]}
        );
      ~~~
    `,
    () => (
      <div>
        <Button label="The Button" onClick={action('onClick')}/>
        <br />
      </div>
    ),
    { inline: true, propTables: [Button]}
  );
