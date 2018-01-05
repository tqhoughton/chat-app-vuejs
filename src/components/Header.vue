<template>
  <header>
    <i class="fa fa-bars"
       aria-hidden="true"
       @click="toggleMenuClass()"></i>
    <h2>{{routeName || $route.name}}</h2>
    <!--<i class="fa fa-bell-o" aria-hidden="true"></i>-->
    <nav id="side-menu">
      <h2>AWS Chat</h2>
      <ul>
        <router-link @click="restMenuClass()" tag="li" :to="{name: 'Chats'}">My Chats</router-link>
        <router-link tag="li" :to="{name: 'Users'}">Users</router-link>
        <router-link tag="li" :to="{name: 'Invites'}">Invites</router-link>
        <router-link tag="li" to="/signout">Sign Out</router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    props: ['routeName'],
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
  }
  header {
    padding: 1em;
    display: flex;
    align-items: center;
  }
  #side-menu {
    position: absolute;
    left: -75%;
    width: 75%;
    background-color: #4a4a4a;
    margin: 0;
    top: 0;
    height: 100vh;
    padding: 1em;
    box-sizing: border-box;
    font-size: 1.5em;
    color: #cccccc;
    
    h2 {
      color: white;
      text-align: center;
      font-size: 1.5em;
    }
    
    ul {
      margin-left: .25em;
    }
    li {
      display: block;
      margin-bottom: .25em;
      
      &.router-link-active {
        color: white;
      }
    }
  }
</style>