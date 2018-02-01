require('babel-core/register')({
  'presets': [
    'stage-3',
    ["latest-node", { "target": "current" }]
  ]
})
require('./server')
// require('./server/app')
