'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  orm: {
    enable: true,
    package: 'egg-orm',
  },
};
