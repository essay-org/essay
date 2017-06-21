import index from '../views/Index.vue'
import category from '../views/Category.vue'
import article from '../views/Article.vue'
import search from '../views/Search.vue'
import archive from '../views/Archive.vue'
export function Index(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store }) {
      return store.dispatch('INDEXDATA')
    },
    render(h) {
      return h(index)
    }
  }
}

export function Category(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store }) {
      return store.dispatch('BYTAGDATA')
    },
    render(h) {
      return h(category)
    }
  }
}

export function Article(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store,route }) {
      return store.dispatch('ARTICLEDATA',route.params.id)
    },
    render(h) {
      return h(article)
    }
  }
}

export function Search(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store }) {
      return store.dispatch('SEARCHDATA')
    },
    render(h) {
      return h(search)
    }
  }
}

export function Archive(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store }) {
      return store.dispatch('ARCHIVEDATA')
    },
    render(h) {
      return h(archive)
    }
  }
}