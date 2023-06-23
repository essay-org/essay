/* eslint valid-jsdoc: "off" */

'use strict';
// const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1686121321422_3232';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    view: {
      mapping: {
        '.ejs': 'ejs',
      },
    },
    orm: {
      client: '@journeyapps/sqlcipher',
      dialect: 'sqlite',
      database: `${appInfo.baseDir}/database/data.db`,
      connectionLimit: 10,
    },
    security: {
      csrf: {
        enable: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
