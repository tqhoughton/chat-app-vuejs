<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container padded">
        <img src="/static/no-picture.svg">
        <button disabled>Change Picture</button>
        <button @click="showPasswordForm = !showPasswordForm">Change Password</button>
        <form v-if="showPasswordForm" @submit.prevent="triggerUpdatePassword()">
          <input type="password" placeholder="old password" v-model="oldPass">
          <input type="password" placeholder="new password" v-model="newPass">
          <button type="submit">Update Password</button>
        </form>
        <span class="message" v-if="response">{{response}}</span>
        <router-link tag="button" :to="{name: 'SignOut'}">Sign Out</router-link>
        <button class="warning" @click="confirmDelete = true">
          Delete Account
        </button>
      </div>
    </main>
    <app-modal v-if="confirmDelete" :action="triggerDeleteAccount" :onCancel="closeModal" actionName="Delete" title="Delete Account" text="Are you sure you want to delete your account? This action cannot be undone."></app-modal>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import Modal from './Modal.vue'
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        showPasswordForm: false,
        confirmDelete: false,
        response: '',
        oldPass: '',
        newPass: ''
      }
    },
    components: {
      appHeader: Header,
      appModal: Modal
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
      triggerDeleteAccount() {
        this.confirmDelete = false
        this.deleteUser().then(() => {
          this.$router.push({name: 'SignOut'})
        })
      },
      closeModal() {
        this.confirmDelete = false
      },
      ...mapActions('cognito', {
        changePassword: 'changePassword',
      }),
      ...mapActions('user', {
        deleteUser: 'deleteUser'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main {
    background-color: #dedede;
    height: 100%;
    box-sizing: border-box;
  }
  
  .container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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