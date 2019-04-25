<template>
  <div>
    <h1>Vuex Json Api</h1>
    <em>Interacting with <a href="http://jsonapiplayground.reyesoft.com/">http://jsonapiplayground.reyesoft.com/</a></em>

    <h2>Authors</h2>

    <table v-if="!authorsLoading">
      <thead>
        <tr>
          <th>ID</th>
          <th>Author Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author.id">
          <td>{{ author.id }}</td>
          <td>{{ author.attributes.name }}</td>
          <td style="text-align: right"><button type="button" @click="showBooks(author.id)">Show Berks</button></td>
        </tr>
      </tbody>
    </table>
    <div v-else>Authors are currently loading</div>

    <h2>Author Books</h2>

    <code>
      <pre>{{ authorBooks }}</pre>
    </code>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      authorBooks: {}
    }
  },
  computed: {
    ...mapState('authors', {
      authors: state => state.items,
      authorsLoading: state => state.loading
    }),
    ...mapState('books', {
      books: state => state.items
    })
  },
  methods: {
    showBooks (authorId) {
      this.authorBooks = this.authors[authorId].relationships.books
      // this.$store.dispatch('books/reset')
      //   .then(this.authors[authorId].relationships.books.get(1))
    }
  },
  mounted () {
    this.$store.dispatch('authors/list')
  }
}
</script>
