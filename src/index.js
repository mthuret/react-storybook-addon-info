import React from "react";
import _Story from "./components/Story";
import _ from "lodash";
export const Story = _Story;

const defaultOptions = {
  inline: false,
  header: true,
  source: true
};

let currentStory = "";
const results = {};

export const InfoAddon = {
  addWithInfo(storyName, info, storyFn, _options) {
    const options = {
      ...defaultOptions,
      ..._options
    };
    this.add(storyName, (context) => {
      if (!_.isUndefined(_options) && !_.isUndefined(_options.specs)) {
        options.specs();
      }
      const props = {
        info,
        context,
        showInline: Boolean(options.inline),
        showHeader: Boolean(options.header),
        showSource: Boolean(options.source),
        propTables: options.propTables,
        specs: results[storyName]
      };

      return (
        <Story {...props}>
          {storyFn(context)}
        </Story>
      );
    });
  }
};

export const describe = (desc, func) => {
  currentStory = desc;
  results[currentStory] = {
    goodResults: [],
    wrongResults: []
  };
  func();
};

export const it = function (desc, func) {
  try {
    func();
    results[currentStory].goodResults.push(desc);
  } catch (e) {
    results[currentStory].wrongResults.push({spec: desc, e: e});
  }
};
