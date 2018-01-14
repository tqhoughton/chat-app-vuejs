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
  </router-link>
</template>
<script>
  export default {
    props: ['chat']
  }
</script>
<style lang="scss">
  .chat-link {
    display: flex;
    align-items: center;
    background: white;
    padding: .5em;
    margin: 0;
    border-bottom: 1px solid #4a4a4a;
    box-sizing: border-box;
    cursor: pointer;
    
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
</style>