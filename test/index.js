const fs = require('fs')
const path = require('path')
const assert = require('power-assert')
const expect = require('expect')
const Helper = require('../')

let text = `title: AcyOrt
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`
const yml = path.join(__dirname, 'themes/ccc45/i18n', 'default.yml')

fs.writeFileSync(yml, text)

const config = {
  language: 'default',
  timezone: 'UTC',
  root: '/',
  i18n_dir: 'i18n',
  theme: 'ccc45',
  base: __dirname,
}
const data = {
  posts: [{ id: 0, title: 'title0' }, { id: 1, title: 'title1' }],
  pages: [{ id: 2 }, { id: 3 }],
  categories: [{ id: 4 }],
  tags: [{ id: 5 }]
}
const helper = new Helper({ config, data })

const {
  _posts,
  _pages,
  _categories,
  _tags,
  _url,
  _time,
  __,
  _n,
} = helper.methods

describe('helper', () => {
  it('data', () => {
    assert(_posts()[0].id === 0)
    assert(_posts(0).id === 0)
    data.posts.push({ id: 2, title: 'title2' })
    assert(_posts().length === 3)

    assert(_pages()[0].id === 2)
    assert(_pages(3).id === 3)

    assert(_categories()[0].id === 4)
    assert(_tags()[0].id === 5)
    assert(_categories(4).id === 4)
    assert(_tags(5).id === 5)
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

  it('register helper', () => {
    const fn = s => s.split('').join('.') + config.theme
    helper.register('_js', fn)
    assert(helper.methods._js('ab') === 'a.bccc45')

    expect(() => { helper.register('_js', fn) }).toThrow('Error helper function: _js. Duplication or No a function')
    expect(() => { helper.register('_css', 'no a function') }).toThrow('Error helper function: _css. Duplication or No a function')
  })

  it('reset', () => {
    text = `title: Mirror
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`

    fs.writeFileSync(yml, text)
    helper.resetLocale()

    assert(__('title') === 'Mirror')

    helper.resetLocale('zh-cn')
    assert(__('title') === '中文')
    assert(_time('2017-11-15T10:50:55Z', 'MMM DD, YYYY') === '11月 15, 2017')

    expect(() => { helper.resetLocale('zh') }).toThrow('Language file "zh" error')
  })
})
