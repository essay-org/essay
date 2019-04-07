let config
if (process.env.NODE_ENV === 'development') {
    config = require('./development') // eslint-disable-line global-require
} else if (process.env.NODE_ENV === 'production') {
    config = require('./production') // eslint-disable-line global-require
} else {
    config = require('./test') // eslint-disable-line global-require
}

module.exports = config
