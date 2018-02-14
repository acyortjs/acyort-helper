const path = require('path')
const fs = require('fs')
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

    this.i18n = i18n
  }

  resetLocale() {
    const {
      directory,
      locale,
      extension,
      parse,
    } = this
    const yml = path.join(directory, locale + extension)
    this.locales = { [locale]: parse(fs.readFileSync(yml)) }
  }
}

module.exports = I18n
