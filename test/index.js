const fs = require('fs')
const path = require('path')
const assert = require('power-assert')
const expect = require('expect')
const Renderer = require('acyort-render')
const Helper = require('../')

let text = `title: AcyOrt
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`
const yml = path.join(__dirname, 'themes/ccc45/i18n', 'default.yml')

fs.writeFileSync(yml, text)

const renderer = new Renderer()
const config = {
  language: 'default',
  timezone: 'UTC',
  root: '/',
  theme: 'ccc45',
  base: __dirname,
}
const posts = [{ id: 0, title: 'title0' }, { id: 1, title: 'title1' }]
const helper = new Helper({ config, renderer })
const {
  _posts,
  _url,
  _time,
  __,
  _n,
} = helper.methods

describe('helper', () => {
  it('posts data', () => {
    assert(helper.postsData.length === 0)
    helper.posts = posts
    assert(helper.postsData.length === 2)
    assert(_posts()[0].id === 0)
    assert(_posts(0).id === 0)
  })

  it('url', () => {
    assert(_url() === '/')
    assert(_url('path') === '/path')
  })

  it('time', () => {
    assert(_time('2017-11-15T10:50:55Z', 'MMMM DD, YYYY') === 'November 15, 2017')
  })

  it('i18n', () => {
    assert(__('title') === 'AcyOrt')
    assert(__('powered', 'GitHub', 'AcyOrt') === 'Powered by AcyOrt | GitHub')
    assert(_n('posts', 0) === 'No posts.')
    assert(_n('posts', 1) === '1 post.')
    assert(_n('posts', 100) === '100 posts in total.')
  })

  it('add helper', () => {
    const fn = s => s.split('').join('.') + config.theme
    helper.add('_js', fn)
    assert(helper.methods._js('ab') === 'a.bccc45')
    helper.add('_css', 'no a function')
    assert(helper.methods._css === undefined)
  })

  it('reset', () => {
    text = `title: Mirror
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`

    fs.writeFileSync(yml, text)
    helper.resetLocales()

    assert(__('title') === 'Mirror')
  })

  it('language error', () => {
    const _config = JSON.parse(JSON.stringify(config))
    _config.language = 'en'

    function ex() {
      return new Helper({ config: _config, renderer })
    }

    expect(ex).toThrow(`Error: ENOENT: no such file or directory, open '${__dirname}/themes/ccc45/i18n/en.yml`)
  })
})
