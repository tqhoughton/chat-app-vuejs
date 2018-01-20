<template>
  <main>
    <h1>AWS Chat</h1>
    <form class="container padded" @submit.prevent="triggerSignUp">
      <input type="text" placeholder="username" v-model="username">
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="pass">
      <button type="submit" class="block">Sign Up</button>
    </form>
    <nav class="simple">
      <span>Have an account?</span>
      <router-link to="/signin">Sign In</router-link>
      <br><router-link to="/confirm">Confirm</router-link>
    </nav>
  </main>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        username: '',
        email: '',
        pass: '',
      }
    },
    methods: {
      triggerSignUp() {
        this.signUp({username: this.username, email: this.email, pass: this.pass}).then(() => {
          console.log('successfully signed up!')
          this.$router.push({path: '/confirm', query: {username: this.username}})
        }, () => {
          alert('there was an error')
        })
      },
      ...mapActions('cognito', {
        signUp: 'signUp'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main {
    background: #9847ff;
  }
</style>