/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;

var defaults = {
  assetPath: 'bower_components/spectrum',
};

module.exports = {
  name: 'ember-spectrum-color-picker',

  treeForVendor(defaultTree) {

    var spectrumTree = new Funnel(
      path.join(this.project.root, 'bower_components', 'spectrum'),
      { files: ['spectrum.js'] }
    );

    spectrumTree = map(
      spectrumTree,
      content => `if (typeof FastBoot === 'undefined') { ${content} }`
    );

    return defaultTree ? new MergeTrees([defaultTree, spectrumTree]) : spectrumTree;
  },

  included: function(app) {
    this._super.included(app);

    var options = (app && app.project.config(app.env)['emberSpectrumColorPicker']) || {};

    var assetPath = options.assetPath || defaults.assetPath;

    app.import('vendor/spectrum.js');
    app.import(path.join(assetPath, 'spectrum.css'));
  },

};
