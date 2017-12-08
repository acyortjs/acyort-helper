const I18nFn = require('acyort-i18n')
const path = require('path')
const fs = require('fs')

class I18n extends I18nFn {
  constructor(acyort) {
    const {
      renderer,
      config: {
        theme,
        language,
      },
    } = acyort
    const i18n = {}
    const directory = path.join(process.cwd(), 'themes', theme, 'i18n')

    super({
      locales: [language],
      register: i18n,
      directory,
      extension: '.yml',
      parse: data => renderer.render('yaml', { data }),
    })

    this.i18n = i18n
  }

  resetLocales() {
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
