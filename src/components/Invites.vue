<template>
  <div>
    <app-header></app-header>
    <main class="container">
      <h3>Invites</h3>
      <ul class="invites" v-if="invites.length">
        <app-user v-for="invite in invites" :key="invite.userId" :user="invite" :action="acceptInvite" actionName="Accept"></app-user>
      </ul>
      <p class="center" v-else>Looks like you don't have any invites.</p>  
    </main>
  </div>
</template>
<script>
  import User from './User.vue'
  import Header from './Header.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      appHeader: Header,
      appUser: User
    },
    computed: {
      ...mapGetters('user', {
        invites: 'getInvites'
      })
    },
    methods: {
      ...mapActions('user', {
        acceptInvite: 'acceptInvite'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main h3 {
    display: none;
  }
  p.center {
    padding-top: 2em;
    text-align: center;
  }
  
  @media (min-width: 500px) {
    main h3 {
      display: block;
      text-align: center;
    }
  }
</style>