<template>
  <div>
    <h1>AWS Chat</h1>
    <form class="container" @submit.prevent="triggerSignIn">
      <input type="text" placeholder="username" v-model="usernameC">
      <input type="password" placeholder="password" v-model="pass">
      <button type="submit" class="block">Sign In</button>
    </form>
    <nav class="simple">
      <span>Not registered?</span>
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
        usernameC: '',
        pass: ''
      }
    },
    methods: {
      triggerSignIn() {
        this.signIn({username: this.usernameC, pass: this.pass}).then(() => {
          console.log('going to chats now')
          this.$router.push({name: 'Chats'})
        }, () => {
          console.log('there was an error')
          alert('there was an error')
        })
      },
      
      ...mapActions('cognito', {
        signIn: 'signIn'
      })
    },
    created() {
      this.usernameC = this.username
    }
  }
</script>