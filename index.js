const moment = require('moment')
const momentTz = require('moment-timezone')
const I18n = require('./i18n')
const path = require('path')

class Helper extends I18n {
  constructor(acyort) {
    super(acyort)

    const { config } = acyort
    const {
      language,
      timezone,
      root,
    } = config
    const { __, __n } = this.i18n

    moment.locale(language)

    this.data = []
    this.helpers = {
      config,
      __,
      _n: __n,
      _posts: () => this.data.map(p => p.id),
      _post: id => this.data.find(p => p.id === id),
      _url: dir => path.join(root, dir || ''),
      _time: (time, format) => momentTz(moment(time), timezone).format(format),
    }
  }

  set posts(data) {
    this.data = data
  }

  add(name, fn) {
    if (typeof fn === 'function' && !this.helpers[name]) {
      this.helpers[name] = fn
    }
  }
}

module.exports = Helper
