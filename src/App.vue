<template>
  <router-view id="view" :class="menuClass"></router-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  
export default {
  name: 'app',
  computed: {
    ...mapGetters({
      menuClass: 'getMenuClass'
    })
  }
}
</script>

<style lang="scss">
  #view {
    position: relative;
    
    &.menu-open {
      position: relative;
      left: 75%;
      animation: scrollLeft .25s ease-in-out;
    }
    &.menu-closed {
      position: relative;
      animation: scrollRight .25s ease-in-out;
      left: 0%;
    }
  }
  @keyframes scrollRight {
    from { left: 75%; }
    to { left: 0%; }
  }
  @keyframes scrollLeft {
    from { left: 0%; }
    to { left: 75%; }
  }
  
  html {
    overflow-y:hidden;
  }
  body {
    background-color: #FFD147;
    min-height: 100vh;
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
    margin: 0;
  }

  h1, h2 {
    font-weight: normal;
    font-family: 'Patua One', cursive;
  }

  h1 {
    font-size: 3em;
    text-align: center;
    padding: 40px 0;
    margin: 0
  }

  .container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  
  nav.simple {
    text-align: center;
    margin-top: 2em;
  }
  
  a {
    color: black;
  }

  input {
    width: 100%;
    background: white;
    font-size: 18px;
    border: none;
    padding: .35em .5em;
    margin-bottom: 1em;
    box-sizing: border-box;
  }
  
  button {
    padding: .35em .5em;
    font-size: 18px;
    font-weight: 600;
    background: white;
    border: 1px solid black;
    
    &.block {
      width: 80%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1em;
      display: block;
    }
    
    &.inverted {
      color: white;
      background: black;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
