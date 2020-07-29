'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  included(app) {
    this.app = app;
    this.isProd = app.env === 'production';
  },

  isDevelopingAddon() {
    return true;
  },

  treeForAddon() {
    const tree = this._super.treeForAddon.apply(this, arguments);

    if (this.isProd) {
      return new Funnel(tree, {
        exclude: ['*'],
      });
    }

    return tree;
  },
};
