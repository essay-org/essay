/* eslint valid-jsdoc: "off" */

'use strict';
// const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  // console.log(appInfo.root);

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
    cluster: {
      // https: {
      //   enable: true,
      //   key: appInfo.baseDir + '/demo/ssl/ppx.link.key',
      //   cert: appInfo.baseDir + '/demo/ssl/ppx.link_bundle.crt',
      // },
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
      xframe: {
        enable: true,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
