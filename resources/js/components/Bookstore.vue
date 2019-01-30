<template>
  <div class="row">
    <div class="col-xs-4" v-for="book in books" :key="book.id">
      <div class="box book-teaser" :style="bookTeaserStyle(book.id)">
        <ul>
          <li><strong>{{ book.attributes.title }}</strong></li>
          <li><em>{{ book.relationships.author.get().attributes.name }}</em></li>
          <li><em>{{ book.attributes.price }} &euro;</em></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Bookstore',
    computed: {
      ...mapState('book', {
        books: state => state.list
      }),
      ...mapState('author', {
        authors: state => state.list
      }),
    },
    methods: {
      bookTeaserStyle(id) {
        return `background-image: url('/cover/${id}')`
      }
    }
  }
</script>
