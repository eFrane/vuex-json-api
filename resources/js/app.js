import Bookstore from './components/Bookstore'
import { createVueInstance } from './init/createVueInstance'

// noinspection JSUnusedGlobalSymbols
createVueInstance({
  Bookstore
}, function () {
  this.$store.api.book.list({ include: 'author,genres' }).then(({ data }) => {
    this.$store.dispatch('book/setList', data.book)
    this.$store.dispatch('author/setList', data.author)
    this.$store.dispatch('genre/setList', data.genre)
  })
}).then((instance) => {
  instance.$mount('#app')
})
