import article from '../views/Article.vue'
import list from '../views/List.vue'

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


export function List(type) {
  return {
    name: `${type}-stories-view`,
    asyncData({ store }) {
      return store.dispatch('LISTDATA')
    },
    render(h) {
      return h(list,{ props: { type }})
    }
  }
}