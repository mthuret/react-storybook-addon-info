import React from "react";
import {configure, setAddon, addDecorator} from "@kadira/storybook";
import {InfoAddon} from "../src/";

addDecorator((story) => (
  <div style={{padding: 20}}>
    {story()}
  </div>
));

setAddon(InfoAddon);


//uncoment those line to make mocha-ci script works
/*import {storiesOf, action, linkTo, describe, it} from "./facade";
global.storiesOf = storiesOf;
global.action = action;
global.linkTo = linkTo;
global.describe = describe;
global.it = it;*/

configure(function () {
  require('../example/story.stories');
/*
  require('../example/story.specs'); //same example but using mocha for ci
*/

}, module);
