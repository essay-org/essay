import article from '../views/Article.vue'
import list from '../views/List.vue'
import admin from '../views/admin/Admin.vue'
export function Article (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store, route }) {
      return store.dispatch('DETAILPAGE', route.params.id)
    },
    render (h) {
      return h(article)
    }
  }
}

export function List (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store }) {
      return store.dispatch('LISTPAGE')
    },
    render (h) {
      return h(list, { props: { type } })
    }
  }
}

export function Admin (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store }) {
      return store.dispatch('ARTICLES')
    },
    render (h) {
      return h(admin, { props: { type } })
    }
  }
}
