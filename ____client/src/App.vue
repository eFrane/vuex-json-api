<template>
  <div>
    <h1>Vuex Json Api</h1>
    <em>Interacting with <a href="http://jsonapiplayground.reyesoft.com/">http://jsonapiplayground.reyesoft.com/</a></em>
    <table>
      <thead>
        <tr>
          <th>Author Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author.id">
          <td>{{ author.data.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('authors', {
      authors: state => state.items
    })
  }
}
</script>
