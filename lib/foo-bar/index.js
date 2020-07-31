/* eslint-env node */
"use strict";

const EngineAddon = require("ember-engines/lib/engine-addon");

const eng = EngineAddon.extend({
  name: "foo-bar",

  lazyLoading: Object.freeze({
    enabled: true,
  }),

  isDevelopingAddon() {
    return true;
  },
});

module.exports = eng;
