<template>
  <div>
    <app-header :routeName="user.username"></app-header>
    <div class="messages">
      <div v-for="message in messages">
        {{message.body}}
      </div>
    </div> 
    <form @submit.prevent="triggerSendMessage()">
      <input type="text" ref="newMessage">
    </form>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import {mapActions} from 'vuex'
  export default {
    props: ['id'],
    computed: {
      messages() {
        return this.$store.state.user.messages[this.id]
      },
      user() {
        return this.$store.state.user.chats[this.id].otherUser
      }
    },
    methods: {
      triggerSendMessage() {
        let body = this.$refs.newMessage.value
        this.sendMessage({body, chatId: this.id})
        this.$refs.newMessage.value = ''
      },
      ...mapActions('user', {
        sendMessage: 'sendMessage'
      })
    },
    components: {
      appHeader: Header
    }
  }
</script>
<style lang="scss">
  .messages {
    display: flex;
    flex-direction: column-reverse;
  }
</style>