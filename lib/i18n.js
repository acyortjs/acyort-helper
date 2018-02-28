const path = require('path')
const fs = require('fs')
const moment = require('moment')
const I18nFn = require('acyort-i18n')
const yaml = require('yamljs')

class I18n extends I18nFn {
  constructor(config) {
    const {
      theme,
      language,
      base,
      i18n_dir,
    } = config
    const i18n = {}
    const directory = path.join(base, 'themes', theme, i18n_dir)

    super({
      locales: [language],
      registered: i18n,
      directory,
      extension: '.yml',
      parse: data => yaml.parse(data.toString()),
    })

    this.moment = moment
    this.i18n = i18n
  }

  resetLocale(language) {
    const {
      directory,
      locale,
      extension,
      parse,
    } = this
    const current = language || locale
    const yml = path.join(directory, current + extension)

    this.moment.locale(current)

    if (fs.existsSync(yml)) {
      this.locales = { [locale]: parse(fs.readFileSync(yml)) }
    } else {
      throw new Error(`Language file "${current}" error`)
    }
  }
}

module.exports = I18n
