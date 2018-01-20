<template>
  <router-link :to="{name: 'Chat', params: {id: chat.chatId}, hash: '#first'}" tag="li" class="row chat-link">
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
    <i @click.prevent="showDelete = !showDelete" class="fa fa-cog" aria-hidden="true"></i>
    <i @click.prevent="action(chat.chatId)" v-if="showDelete" class="fa fa-trash-o" aria-hidden="true"></i>
  </router-link>
</template>
<script>
  export default {
    props: ['chat', 'index', 'action'],
    data() {
      return {
        showDelete: false
      }
    }
  }
</script>
<style lang="scss" scoped>
  i {
    font-size: 1.5em;
    position: absolute;
    right: .5em;
    
    &.fa-cog {
      top: .5em;
    }
    
    &.fa-trash-o {
      bottom: .5em;
    }
  }
  
  .chat-link {
    display: flex;
    align-items: center;
    background: white;
    padding: .5em;
    margin: 0;
    border-bottom: 1px solid #4a4a4a;
    border-left: 1px solid #4a4a4a;
    border-right: 1px solid #4a4a4a;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    user-select: none;
    
    &:first-child {
      border-top: 1px solid #4a4a4a;
    }
    
    .profile-pic {
      width: 25%;
    }
    
    .panel {
      padding-left: 1em;
      width: 75%;
      box-sizing: border-box;
    }
  }
  
  .last-msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #4a4a4a;
  }
  
  @media (min-width: 500px) {
    .chat-link {
      font-size: 1.25em;
      padding: .75em;
    }
  }
</style>