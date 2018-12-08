const path = require('path')
const bunyan = require('bunyan')
const env = process.env.NODE_ENV

const bunyanConfig = {
  name: 'essay-server',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [{
      level: 'info',
      stream: process.stdout
    }, {
      level: 'trace',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stderr
    }, {
      type: 'rotating-file',
      level: 'error',
      path: path.join(path.resolve(__dirname, '../../logs/'), `${env}-error.log`),
      period: '1d',
      count: 7
    }
  ]
}

module.exports = bunyan.createLogger(bunyanConfig)
