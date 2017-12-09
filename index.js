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

    this.postsData = []
    this.methods = {
      __,
      _n: __n,
      _posts: id => {
        if (id === undefined) {
          return this.postsData
        }
        return this.postsData.find(p => p.id === id)
      },
      _url: dir => path.join(root, dir || ''),
      _time: (time, format) => momentTz(moment(time), timezone).format(format),
    }
  }

  set posts(data) {
    this.postsData = data
  }

  add(name, fn) {
    if (typeof fn === 'function' && !this.methods[name]) {
      this.methods[name] = fn
    }
  }
}

module.exports = Helper
