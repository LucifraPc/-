'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.3.121:8084/crm/"',
  // BASE_API: '"http://crm.lubansoft.com/"',
})
