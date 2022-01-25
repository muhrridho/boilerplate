<template>
  <div>Test</div>
</template>

<script>
export default {
  layout: 'default',
  name: 'IndexPage',
  components: {},
  mounted() {
    this.$axios.$get('/users').then((res) => {
      console.log(res)
    })
  },
}
</script>
