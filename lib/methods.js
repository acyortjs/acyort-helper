function methods(data) {
  const {
    posts,
    pages,
    categories,
    tags,
  } = data

  return {
    _pages(id) {
      if (id === undefined) {
        return pages
      }
      return pages.find(p => p.id === id)
    },
    _posts(id) {
      if (id === undefined) {
        return posts
      }
      return posts.find(p => p.id === id)
    },
    _categories(id) {
      if (id === undefined) {
        return categories
      }
      return categories.find(c => c.id === id)
    },
    _tags(id) {
      if (id === undefined) {
        return tags
      }
      return tags.find(t => t.id === id)
    },
  }
}

module.exports = methods
