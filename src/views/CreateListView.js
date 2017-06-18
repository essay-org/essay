import index from '../views/Index.vue'
import category from '../views/Category.vue'
import article from '../views/Article.vue'
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
