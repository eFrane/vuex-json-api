<template>
  <div class="row" v-if="book">
    <div class="col">
      <div class="box">
        {{ book.attributes.title }}
        <em>{{ book.relationships.author }}</em>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Bookstore',
    computed: {
      book () {
        if (!this.books || this.books.length < 1) return null
        return this.books[0]
      },

      ...mapState('book', {
        books: state => state.list
      }),
      ...mapState('author', {
        authors: state => state.list
      }),
    }
  }
</script>
