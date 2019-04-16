<template>
  <div>
    <h1>Vuex Json Api</h1>
    <pre>
      {{ state }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    state () {
      return this.$store.state
    }
  }
}
</script>
