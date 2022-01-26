<template>
  <div>
    Login
    <b-button @click="login">Login</b-button>
    <b-button @click="logout">Logout</b-button>
  </div>
</template>

<script>
import BButton from '../components/base/BButton.vue'
export default {
  name: 'IndexPage',
  components: { BButton },
  layout: 'default',
  mounted() {
    console.log(this.$cookies.get('user'))
  },
  methods: {
    login() {
      this.$store.dispatch('user/login', {
        username: 'user',
        password: 'pass',
        remember: true,
      })
    },
    logout() {
      this.$store.dispatch('user/logout')
    },
  },
}
</script>
