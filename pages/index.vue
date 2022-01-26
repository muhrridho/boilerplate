<template>
  <div>Test</div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {},
  layout: 'default',
  middleware: ['auth'],
  mounted() {
    // this.$axios.$get('/users').then((res) => {
    //   console.log(res)
    // })
    console.log(this.$cookies.get('user'))
  },
}
</script>
