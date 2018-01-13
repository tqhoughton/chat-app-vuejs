<template>
  <div>
    <app-header :routeName="user.username"></app-header>
    <main>
      <ul class="messages" v-if="formattedMessages.length">
        <li :id="index === 0 ? 'first' : ''" class="message" :class="getMessageClass(message.senderId, message.lastMsg)" v-for="(message, index) in formattedMessages">
          <div class="bubble">
            {{message.body}}
          </div>
        </li>
      </ul> 
      <form class="new-message" @submit.prevent="triggerSendMessage()">
        <input @focus="scrollDown()" type="text" ref="newMessage" placeholder="type message...">
      </form>
    </main>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    props: ['id'],
    computed: {
      formattedMessages() {
        let messages = this.messages.slice(0)
        for (let i = 0; i < messages.length; i++) {
          if (i === messages.length - 1 || messages[i + 1].senderId !== messages[i].senderId) {
            messages[i].lastMsg = true
          }
        }
        return messages
      },
      messages() {
        return this.$store.state.user.messages[this.id]
      },
      user() {
        return this.$store.state.user.chats[this.id].otherUser
      },
      ...mapGetters('user', {
        userId: 'getUserId'
      })
    },
    methods: {
      scrollDown() {
        let html = document.querySelector('html')
        setTimeout(() => {
          html.scrollTop = html.scrollHeight
        }, 500)
      },
      getMessageClass(senderId, lastMsg, first) {
        let classStr
        if (senderId === this.userId) {
          classStr = 'mine'
        } else {
          classStr = 'theirs'
        }
        if (lastMsg) {
          classStr += ' last-msg-type'
        }
        return classStr
      },
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
<style lang="scss" scoped>
  main {
    height: 100%;
    background: #dedede;
    box-sizing: border-box;
  }
  .messages {
    display: flex;
    flex-direction: column-reverse;
    padding: 1em;
    margin-bottom: 2em;
  }
  .new-message {
    position: fixed;
    bottom: 0;
    width: 100%;
    
    input {
      margin-bottom: 0;
    }
  }
  
  .message {
    display: flex;
    margin: 0 0 .2em 0;
    
    &.theirs + .mine .bubble {
      margin-bottom: 1em;
    }
    
    &.mine + .mine .bubble {
      border-bottom-right-radius: 0;
    }
    
    &.mine.last-msg-type .bubble {
      border-top-right-radius: 1em;
    }
    
    &.theirs + .theirs .bubble {
      border-bottom-left-radius: 0;
    }
    
    &.theirs .bubble {
      border-top-left-radius: 0;
    }
    
    &.theirs.last-msg-type .bubble {
      border-top-left-radius: 1em;
    }
    
    &.mine {
      flex-direction: row-reverse;
      
      .bubble {
        color: white;
        background: #4a4a4a;
        border-top-right-radius: 0;
      }
      
      &+ .theirs .bubble {
        margin-bottom: 1em;
      }
    }
    
    .bubble {
      background: white;
      border-radius: 1em;
      padding: .5em .75em;
    }
    
    &:last-child .bubble {
      margin-top: 1em;
    }
  }
</style>