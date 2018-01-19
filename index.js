const moment = require('moment')
const momentTz = require('moment-timezone')
const I18n = require('./i18n')
const path = require('path')

class Helper extends I18n {
  constructor({ config, posts }) {
    super(config)

    const {
      language,
      timezone,
      root,
    } = config
    const { __, __n } = this.i18n

    moment.locale(language)

    this.methods = {
      __,
      _n: __n,
      _posts: (id) => {
        if (id === undefined) {
          return posts
        }
        return posts.find(p => p.id === id)
      },
      _url: dir => path.join(root, dir || ''),
      _time: (time, format) => momentTz(moment(time), timezone).format(format),
    }
  }

  addMethod(name, fn) {
    if (typeof fn === 'function' && !this.methods[name]) {
      this.methods[name] = fn
    }
  }
}

module.exports = Helper
