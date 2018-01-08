<template>
  <div>
    <app-header></app-header>
    <main>
      <form class="invite container" @submit.prevent="sendInviteByUsername(username)">
        <input type="text" v-model="username" placeholder="username">
        <button class="inverted input-inline" type="submit">Invite</button>
      </form>
      <h3>Online Users</h3>
      <ul class="users">
        <app-user v-for="user in users" :key="user.userId" :user="user" actionName="Invite" :action="sendInvite"></app-user>
      </ul>  
    </main>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import Header from './Header.vue'
  import User from './User.vue'
  export default {
    data() {
      return {
        username: '',
        interval: null
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
        sendInvite: 'sendInviteByUserId',
        loadOnlineUsers: 'loadOnlineUsers'
      })
    },
    components: {
      appHeader: Header,
      appUser: User
    },
    created() {
      this.interval = setInterval(() => {
        this.loadOnlineUsers(true).then(() => {
          console.log('done')
        })
      }, 60000)
    }
  }
</script>
<style lang="scss" scoped>
  form.invite {
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
  
  main {
    min-height: 100vh;
    background: #cccccc;
    box-sizing: border-box;
  }
  
</style>