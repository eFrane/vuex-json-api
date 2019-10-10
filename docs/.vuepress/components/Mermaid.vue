<script>
let graphIdCounter = 0

export default {
  name: 'Mermaid',
  data() {
    return {
      svg: undefined,
      graph: this.$slots.default[0].text
    }
  },
  render(h) {
    return h('div', { domProps: { innerHTML: this.svg }})
  },
  mounted() {
    import('mermaid').then(mermaid => {
      mermaid.initialize({ startOnLoad: true })

      let renderDiv = document.createElement('div')
      document.body.appendChild(renderDiv)

      mermaid.render(
        'mermaid' + ++graphIdCounter,
        this.graph,
        (svg) => {
          this.svg = svg
          document.body.removeChild(renderDiv)
        },
        renderDiv
      )
    })
  }
}
</script>
