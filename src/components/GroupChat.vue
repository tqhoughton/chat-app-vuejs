<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="view">
        <ul class="group-chat">
          <li v-for="item in messages">
            <span>{{item.username}}: </span>{{item.message}}
          </li>
        </ul>
      </div>
      <form class="new-message" @submit.prevent="triggerSendMessage()">
        <input @focus="scrollDown()" type="text" ref="newMessage" placeholder="type message..."><button type="submit">Send</button>
      </form>
    </main>
  </div>
</template>
<script>
  import Header from './Header.vue'
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters('mqtt', {
        messages: 'getGroupChat'
      })
    },
    components: {
      appHeader: Header
    },
    methods: {
      scrollDown() {
        let html = document.querySelector('html')
        setTimeout(() => {
          html.scrollTop = html.scrollHeight
        }, 500)
      },
      triggerSendMessage() {
        let message = this.$refs.newMessage.value
        this.sendGroupMessage({message})
        this.$refs.newMessage.value = ''
      },
      ...mapActions('mqtt', {
        sendGroupMessage: 'sendGroupMessage'
      })
    }
  }
</script>
<style lang="scss" scoped>
  main {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 2em;
  }
  
  ul.group-chat {
    display: flex;
    flex-direction: column-reverse;
    li {
      margin: 0;
      padding: .5em;
      display: block;
      background: white;
      border-top: 1px solid #4a4a4a;
      border-left: 1px solid #4a4a4a;
      border-right: 1px solid #4a4a4a;
      
      &:first-child {
        border-bottom: 1px solid #4a4a4a;
      }
      span {
        font-weight: bold
      }
    }
  }
  
  .new-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    
    input {
      margin-bottom: 0;
    }
    
    button {
      color: white;
      background: black;
      border: none;
    }
  }
  
  @media (min-width: 500px) {
    .view {
      height: 70vh;
      overflow-y: scroll;
      
      &::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */
      }
    }
    
    ul.group-chat {
      margin-top: 2em;
      max-width: 425px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .new-message {
      margin-top: 2em;
      position: static;
      max-width: 425px;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>