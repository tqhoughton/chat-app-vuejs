<template>
  <router-view></router-view>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('user', {
        user: 'getUser'
      })
    }
  }
</script>
<style lang="scss">
  p {
    text-align: center;
  }
  
  h3 {
    font-family: 'Open Sans', cursive
  }
  .chats {
    margin: 0;
  }
</style>