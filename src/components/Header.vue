<template>
  <header>
    <i class="fa fa-bars"
       aria-hidden="true"
       @click="toggleMenuClass()"></i>
    <h2>{{routeName || $route.name}}</h2>
    <div class="notifications">
      <i class="fa" @click="toggleNotifications()" :class="notifications.length ? 'fa-bell' : 'fa-bell-o'"></i>
      <div class="amount" v-if="notifications.length">{{notifications.length}}</div>
      <ul v-if="showNotifications && notifications.length">
        <li v-for="(note, i) in notifications" :key="i">
         <div class="message" @click="notificationClick(i)">
           {{note.message}}
         </div>
         <div class="close-btn" @click="deleteNotification(i)">
           <i class="fa fa-close"></i>
         </div>
        </li>
      </ul>
    </div>
  </header>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    props: ['routeName', 'color'],
    data() {
      return {
        showNotifications: false,
      }
    },
    computed: {
      ...mapGetters({
        notifications: 'getNotifications'
      })
    },
    watch: {
      notifications: function(newVal) {
        console.log('change!')
        if (newVal.length) {
          document.title = `(${newVal.length}) AWS Chat`
        } else {
          document.title = `AWS Chat`
        }
      }
    },
    methods: {
      notificationClick(i) {
        let to = this.notifications[i].to
        this.deleteNotification(i)
        this.$router.push(to)
      },
      toggleNotifications() {
        if (!this.notifications.length) return;
        this.showNotifications = !this.showNotifications
      },
      ...mapActions({
        toggleMenuClass: 'toggleMenuClass',
        resetMenuClass: 'restMenuClass',
        deleteNotifications: 'removeNotifications',
        deleteNotification: 'removeNotification'
      })
    },
    created() {
      let notifications = ''
      if (this.notifications.length) notifications = `(${notifications.length}) `
      document.title = `${notifications} AWS Chat`
    }
  }
</script>
<style lang="scss">
  .notifications {
    position: relative;
    
    ul {
      position: fixed;
      top: 83px;
      left: 50%;
      right: 0%;
      font-size: 1em;
      box-shadow: -1px 2px 6px 1px #4a4a4a;
      
      li {
        margin: 0;
        background: white;
        color: #4a4a4a;
        display: flex;
        
        &:not(:first-child) {
          border-top: 1px solid #cccccc
        }
        
        div.message {
          padding: .5em;
          cursor: pointer;
        }
        
        div.close-btn {
          padding: .5em;
          display: flex;
          align-items: center;
          margin-left: auto;
        }
        .fa-close {
          font-size: 1.5em;
        }
      }
    }
    
    .amount {
      position: absolute;
      top: -.5em;
      right: -.5em;
      background-color: red;
      color: white;
      width: 1em;
      height: 1em;
      padding: .25em;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .fa-bars {
    font-size: 3em;
  }
  .fa-bell-o, .fa-bell {
    font-size: 2em;
  }
  .fa-bell {
    cursor: pointer;
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