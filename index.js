const moment = require('moment')
const momentTz = require('moment-timezone')
const I18n = require('./lib/i18n')
const methods = require('./lib/methods')
const path = require('path')

class Helper extends I18n {
  constructor({ config, data }) {
    super(config)
    const {
      language,
      timezone,
      root,
    } = config
    const { __, __n } = this.i18n

    moment.locale(language)

    this.methods = Object.assign(methods(data), {
      __,
      _n: __n,
      _url: dir => path.join(root, dir || ''),
      _time: (time, format) => momentTz(moment(time), timezone).format(format),
    })
  }

  register(name, fn) {
    if (typeof fn === 'function' && !this.methods[name]) {
      this.methods[name] = fn
    }
  }
}

module.exports = Helper
