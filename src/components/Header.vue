<template>
  <header :style="color ? 'background-color: ' + color : ''">
    <i class="fa fa-bars"
       aria-hidden="true"
       @click="toggleMenuClass()"></i>
    <h2>{{routeName || $route.name}}</h2>
    <i class="fa fa-bell-o"></i>
  </header>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: ['routeName', 'color'],
    methods: {
      ...mapActions({
        toggleMenuClass: 'toggleMenuClass',
        resetMenuClass: 'restMenuClass'
      })
    }
  }
</script>
<style lang="scss">
  .fa-bars {
    font-size: 3em;
  }
  .fa-bell-o {
    font-size: 2em;
  }
  h2 {
    font-size: 2.5em;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    /*font-family: 'Open Sans', sans-serif;*/
    /*font-weight: 600;*/
  }
  header {
    color: white;
    padding: 1em;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: #9847ff;
    box-shadow: 0px 1px 8px 1px #4a4a4a;
    
    &+ main {
      padding-top: 82px;
    }
  }
</style>