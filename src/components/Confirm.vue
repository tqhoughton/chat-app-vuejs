<template>
  <div>
    <h1>AWS Chat</h1>
    <div class="container">
      <form @submit.prevent="triggerConfirmRegistration">
        <input type="text" placeholder="username" v-model="usernameC">
        <input type="text" placeholder="enter code" v-model="code">
        <button type="submit">Confirm Code</button>
      </form>
      <button @click="triggerResendConfirmation" class="block">Resend Code</button> 
    </div>
    <nav class="simple">
      <router-link to="/signin">Sign In</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </nav>
  </div>  
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['username'],
  data() {
    return {
      code: '',
      usernameC: ''
    }
  },
  methods: {
    triggerConfirmRegistration() {
      if (!(this.username && this.code)) {
        return alert('Must have both username and code filled out!')
      }
      this.confirmRegistration({username: this.usernameC, code: this.code}).then(() => {
        this.$router.push({path: '/signin', query: {username: this.usernameC}})
      }, () => {
        alert('there was an error')
      })
    },
    triggerResendConfirmation() {
      this.resendConfirmationCode(this.usernameC).then(() => {
      }, () => {
        alert('there was an error')
      })
    },
    ...mapActions('cognito', {
      confirmRegistration: 'confirmRegistration',
      resendConfirmationCode: 'resendConfirmationCode'
    })
  },
  created() {
    this.usernameC = this.username
  }
}
</script>
<style lang="scss">
  nav a {
    display: inline-block;
    
    &:not(:last-child) {
      margin-right: 1em;
    }
  }
</style>