<template>
  <div>
    <app-header></app-header>
    <main class="container">
      <h3>Chats</h3>
      <ul v-if="sortedChats.length">
        <app-chat-link v-for="(chat, i) in sortedChats" :key="chat.chatId" :chat="chat" :index="i" :action="updateModal"></app-chat-link>
      </ul>
      <p v-else>Looks like you don't have any chats.<br>Find some users <router-link :to="{name: 'Users'}">here!</router-link></p>
      <app-modal v-if="showDeleteModal" :action="triggerDeleteChat" :onCancel="closeModal" actionName="Delete" title="Delete Chat" :text="'Are you sure you want to delete your chat with ' + chats[currentId].otherUser.username + '? This action cannot be undone.'
      "></app-modal>
    </main>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import ChatLink from './ChatLink.vue'
  import Modal from './Modal.vue'
  
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        showDeleteModal: false,
        currentId: null
      }
    },
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
    methods: {
      closeModal() {
        this.showDeleteModal = false
      },
      triggerDeleteChat() {
        console.log(this.currentId)
        this.showDeleteModal = false
        this.deleteChat(this.currentId).then((res) => {
          console.log('deleted')
        })
      },
      updateModal(id) {
        this.showDeleteModal = true
        this.currentId = id
      },
      ...mapActions('user', {
        deleteChat: 'deleteChat'
      })
    },
    components: {
      appHeader: Header,
      appChatLink: ChatLink,
      appModal: Modal
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
  
  main h3 {
    display: none;
  }
  
  @media (min-width: 500px) {
    main h3 {
      display: block;
      text-align: center;
    }
  }
  
</style>