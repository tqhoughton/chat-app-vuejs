<template>
  <main>
    <app-header></app-header>
    <form class="container" @submit.prevent="sendInviteByUsername(username)">
      <input type="text" v-model="username" placeholder="username">
      <button class="inverted input-inline" type="submit">Invite</button>
    </form>
    <h3>Online Users</h3>
    <ul class="users">
      <app-user v-for="user in users" :key="user.userId" :user="user" actionName="Invite" :action="sendInvite"></app-user>
    </ul>
  </main>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Header from './Header.vue'
  import User from './User.vue'
  export default {
    data() {
      return {
        username: ''
      }
    },
    computed: {
      ...mapGetters('user', {
        users: 'getUsers'
      })
    },
    methods: {
      ...mapActions('user', {
        sendInviteByUsername: 'sendInviteByUsername',
        sendInvite: 'sendInviteByUserId'
      })
    },
    components: {
      appHeader: Header,
      appUser: User
    }
  }
</script>
<style lang="scss" scoped>
  form {
    padding-top: 2em;
    display: flex;
    input {
      margin-bottom: 0;
    }
  }
  .users {
    margin: 0;
  }
  
  h3 {
    text-align: center
  }
</style>