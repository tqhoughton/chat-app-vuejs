<template>
  <div>
    <app-header></app-header>
    <ul class="chats" v-if="sortedChats.length">
      <router-link :to="{name: 'Chat', params: {id: chat.chatId}}" :key="chat.chatId" tag="li" class="row chat" v-for="chat in sortedChats">
        <img class="profile-pic" src="/static/no-picture.svg" alt="">
        <div class="panel">
          <span class="username">
            {{chat.otherUser.username}}
          </span>
          <div class="last-msg" v-if="chat.lastMessage">
            {{chat.lastMessage.body}}
          </div>
          <div v-else>
            Click to send a message
          </div>
        </div>
      </router-link>
    </ul>
    <p v-else>Looks like you don't have any chats.<br>Find some users <router-link :to="{name: 'Users'}">here!</router-link></p>
  </div>
</template>
<script>
  import Header from './Header.vue'
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
      appHeader: Header
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