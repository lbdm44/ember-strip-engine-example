/* eslint-env node */
"use strict";

const EngineAddon = require("ember-engines/lib/engine-addon");
const Funnel = require("broccoli-funnel");

module.exports = EngineAddon.extend({
  name: "foo-bar",

  included(app) {
    this.app = app;
    this.isProd = app.env === 'production';
  },

  lazyLoading: Object.freeze({
    enabled: true,
  }),

  isDevelopingAddon() {
    return true;
  },

  treeForAddon() {
    const tree = this._super.treeForAddon.apply(this, arguments);

    // debugger;

    if (this.isProd) {
      return new Funnel(tree, {
        exclude: ['*'],
      });
    }

    return tree;
  },

  treeForEngine() {
    const tree = this._super.treeForAddon.apply(this, arguments);

    // debugger;

    if (this.isProd) {
      return new Funnel(tree, {
        exclude: ['*'],
      });
    }

    return tree;
  },
});
