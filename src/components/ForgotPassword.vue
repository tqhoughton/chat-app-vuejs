<template>
  <main>
    <h1>AWS Chat</h1>
    <form v-if="step === 1" class="container" @submit.prevent="triggerResetPassword()">
      <input type="text" placeholder="username" v-model="username">
      <button class="inverse" type="submit">Reset Password</button>
      <p v-if="response">
        {{response}}
      </p>
    </form>
    <form v-if="step === 2" class="container" @submit.prevent="triggerConfirmPassword()">
      <input type="text" placeholder="code" v-model="code">
      <input type="password" placeholder="new password" v-model="newPass">
      <button class="inverse" type="submit">
        Update Password
      </button>
      <p v-if="response">
        {{response}}
      </p>
    </form>
    <div class="container" v-if="step === 1">
      <button @click="step = 2">Enter Code</button>
    </div>
    <div class="container" v-else>
      <button @click="step = 1">Enter Username</button>
    </div>
    <nav class="simple">
      <div>
        <router-link :to="{name: 'SignIn'}">Sign In</router-link>
      </div>
      <div>
        <router-link :to="{name: 'SignUp'}">Sign Up</router-link>
      </div>
    </nav>
  </main>
</template>
<script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        username: '',
        response: '',
        step: 1,
        code: '',
        newPass: ''
      }
    },
    methods: {
      triggerConfirmPassword() {
        this.confirmPassword({ code: this.code, pass: this.newPass, username: this.username }).then(() => {
          this.$router.push({name: 'SignIn', query: {username: this.username}})
        }).catch((err) => {
          this.response = err.message
        })
      },
      triggerResetPassword() {
        this.resetPassword(this.username).then((data) => {
          this.response = `Email sent to ${data.CodeDeliveryDetails.Destination}`
          this.step = 2
        }).catch((err) => {
          this.response = err.message
        })
      },
      ...mapActions('cognito', {
        resetPassword: 'forgotPassword',
        confirmPassword: 'confirmPassword'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main {
    background: #9847ff;
  }
  button {
    width: 100%;
    margin-bottom: 1em;
    
    &.inverse {
      color: white;
      background: black;
      border-color: black;
    }
  }
  nav.simple {
    margin-top: 0;
    
    div {
      margin-bottom: .5em;
    }
  }
  
  p {
    color: white;
  }
</style>