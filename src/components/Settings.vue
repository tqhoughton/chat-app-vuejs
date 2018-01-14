<template>
  <div>
    <app-header></app-header>
    <main>
      <img src="/static/no-picture.svg">
      <button>Change Picture</button>
      <button @click="showPasswordForm = !showPasswordForm">Change Password</button>
      <form v-if="showPasswordForm" @submit.prevent="triggerUpdatePassword()">
        <input type="password" placeholder="old password" v-model="oldPass">
        <input type="password" placeholder="new password" v-model="newPass">
        <button type="submit">Update Password</button>
      </form>
      <span class="message" v-if="response">{{response}}</span>
      <button class="warning">
        Delete Account
      </button>
    </main>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        showPasswordForm: false,
        response: '',
        oldPass: '',
        newPass: ''
      }
    },
    components: {
      appHeader: Header
    },
    methods: {
      triggerUpdatePassword() {
        let oldPass = this.oldPass
        let newPass = this.newPass
        this.changePassword({oldPass, newPass}).then((res) => {
          console.log('successful!')
          this.response = 'password update successful.'
          this.showPasswordForm = false
          this.oldPass = ''
          this.newPass = ''
        }).catch((err) => {
          this.response = err.message
        })
      },
      ...mapActions('cognito', {
        changePassword: 'changePassword'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main {
    background-color: #dedede;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 10%;
    padding-right: 10%;
  }
  
  button {
    margin-bottom: 1em;
    
    &.warning {
      background: black;
      color: white;
      border-color: black;
      margin-top: 2em;
    }
    
    &[type="submit"] {
      background: #4a4a4a;
      color: white;
      border-color: #4a4a4a;
      width: 100%;
    }
  }
  
  img {
    margin-top: 2em;
    margin-bottom: 1em;
    width: 10em;
    margin-left: auto;
    margin-right: auto;
  }
</style>