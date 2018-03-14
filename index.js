const momentTz = require('moment-timezone')
const I18n = require('./lib/i18n')
const methods = require('./lib/methods')
const path = require('path')

class Helper extends I18n {
  constructor({ config, data }) {
    super(config)

    this.config = config
    this.data = data
    this.methods = this.getMethods()
    this.moment.locale(config.language)
  }

  getMethods() {
    const {
      data,
      config: { root, timezone },
      i18n: { __, __n },
    } = this

    return Object.assign(methods(data), {
      __,
      _n: __n,
      _url: dir => path.join(root, dir || ''),
      _time: (time, format) => momentTz(this.moment(time), timezone).format(format),
    })
  }

  register(name, fn) {
    if (typeof fn === 'function' && !this.methods[name]) {
      this.methods[name] = fn
    } else {
      throw new Error(`Error helper function: ${name}. Duplication or No a function`)
    }
  }

  reset() {
    this.methods = this.getMethods()
  }
}

module.exports = Helper
