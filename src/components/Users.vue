<template>
  <div>
    <app-header></app-header>
    <main class="container">
      <form class="invite padded" @submit.prevent="sendInviteByUsername(username)">
        <input type="text" v-model="username" placeholder="username">
        <button class="inverted input-inline" type="submit">Invite</button>
      </form>
      <h3>Online Users</h3>
      <ul v-if="Object.keys(users).length" class="users">
        <app-user v-for="user in users" :key="user.userId" :user="user" actionName="Invite" :action="sendInvite" :disabled="invitesSent.includes(user.userId) || chatIds.includes(user.userId) || invitesReceived.includes(user.userId)"></app-user>
      </ul>
      <p v-else class="error">
        Looks like there are no users online right now. Check again later!
      </p>  
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
        users: 'getUsers',
        invitesSent: 'getInvitesSent',
        chatIds: 'getChatIds',
        invitesReceived: 'getInviteIds'
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
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.interval = setInterval(() => {
          vm.loadOnlineUsers(true).then(() => {
            console.log('done')
          })
        }, 60000)

        console.log('invites sent: ', vm.invitesSent)
        })
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval)
      next()
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
  
  p.error {
    text-align: center;
    padding-left: 10%;
    padding-right: 10%;
  }
  
</style>