const fs = require('fs')
const path = require('path')
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

console.log(helper.postsData)

helper.posts = posts

console.log(helper.postsData)
console.log(_posts())
console.log(_posts(0))
console.log(_url())
console.log(_url('path'))
console.log(_time('2017-11-15T10:50:55Z', 'MMMM DD, YYYY'))
console.log(__('title'))
console.log(__('powered', 'GitHub', 'AcyOrt'))
console.log(_n('posts', 0))
console.log(_n('posts', 1))
console.log(_n('posts', 100))

const fn = s => s.split('').join('.')

helper.add('_js', fn)
console.log(helper.methods._js('ab'))

text = `title: Mirror
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`

fs.writeFileSync(yml, text)
helper.resetLocales()

console.log(__('title'))
