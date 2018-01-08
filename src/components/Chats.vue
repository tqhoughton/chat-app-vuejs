<template>
  <div>
    <app-header></app-header>
    <main>
      <ul v-if="sortedChats.length">
        <app-chat-link v-for="chat in sortedChats" :key="chat.chatId" :chat="chat"></app-chat-link>
      </ul>
      <p v-else>Looks like you don't have any chats.<br>Find some users <router-link :to="{name: 'Users'}">here!</router-link></p>
    </main>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import ChatLink from './ChatLink.vue'
  
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      sortedChats() {
        console.log(this.chats)
        let arr = []
        if (this.chats) {
          Object.keys(this.chats)
          .sort((a, b) => {
            if (!a.lastMessage) return -1
            if (!b.lastMessage) return 1
            return a.lastMessage.sent - b.lastMessage.sent
          })
          .forEach((key) => {
            this.chats[key].chatId = key
            arr.unshift(this.chats[key])
          })
        }
        return arr
      },
      ...mapGetters('user', {
        chats: 'getChats',
      })
    },
    components: {
      appHeader: Header,
      appChatLink: ChatLink
    }
  }
</script>
<style>
  .username {
    font-weight: bold
  }
  .invite {
    margin-bottom: 2em;
  }
  
</style>