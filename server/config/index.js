let config
if (process.env.NODE_ENV === 'development') {
  config = require('./development') 
}else{
  config = require('./production')
}

module.exports = config
