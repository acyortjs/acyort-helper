# acyort-helper

Helper functions for [AcyOrt](https://github.com/acyortjs/acyort)

## Install

```bash
$ npm i acyort-helper -S
```

## Usage

```js
// npm i acyort-render -S

const fs = require('fs')
const path = require('path')
const Renderer = require('acyort-render')
const Helper = require('acyort-helper')

// language file
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

helper.posts = posts

console.log(_posts())           // [ { id: 0, title: 'title0' }, { id: 1, title: 'title1' } ]
console.log(_posts(0))          // { id: 0, title: 'title0' }
console.log(_url())             // /
console.log(_url('path'))       // /path
console.log(_time('2017-11-15T10:50:55Z', 'MMMM DD, YYYY'))   // November 15, 2017
console.log(__('title'))        // AcyOrt
console.log(__('powered', 'GitHub', 'AcyOrt'))  // Powered by AcyOrt | GitHub
console.log(_n('posts', 0))     // No posts.
console.log(_n('posts', 1))     // 1 post.
console.log(_n('posts', 100))   // 100 posts in total.

const fn = s => s.split('').join('.')

// add custom helper function
helper.add('_js', fn)
console.log(helper.methods._js('ab'))   // a.b

text = `title: Mirror
powered: Powered by %2$s | %1$s
posts:
  zero: No posts.
  one: 1 post.
  other: %d posts in total.`

// reload the language file
fs.writeFileSync(yml, text)
helper.resetLocales()

console.log(__('title'))    // Mirror
```
