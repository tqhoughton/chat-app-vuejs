<template>
  <li class="row">
    <img class="profile-pic" src="/static/no-picture.svg" alt="">
    <span :title="user.username">{{user.username}}</span>
    <button :disabled="disabled" class="inverted inline" @click="action(user.userId)">{{actionName}}</button>
  </li>
</template>
<script>
  export default {
    props: ['actionName', 'action', 'user', 'disabled']
  }
</script>
<style lang="scss" scoped>
  .row {
    span {
      margin: .5em 1em;
      flex-grow: 1;
    }
    button {
      margin-left: auto;
    }
  }
  
  .row {
    display: flex;
    padding: .5em 1em;
    margin: 0;
    background: white;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    align-items: center;
    
    &:first-child {
      border-top: 1px solid black;
    }
    
    .profile-pic {
      width: 25%;
    }
  }
  
  .panel {
    box-sizing: border-box;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1em;

    .last-msg {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  @media (min-width: 500px) {
    .row {
      font-size: 1.25em;
    }
  }
</style>