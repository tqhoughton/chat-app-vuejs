import Vue from 'vue'
import Router from 'vue-router'

import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Dashboard from './components/Dashboard.vue'
import Confirm from './components/Confirm.vue'
import Chat from './components/Chat.vue'
import Chats from './components/Chats.vue'
import Users from './components/Users.vue'
import Invites from './components/Invites.vue'
import Settings from './components/Settings.vue'
import ForgotPassword from './components/ForgotPassword.vue'
import About from './components/About.vue'

import { store } from './store/store'

Vue.use(Router);

function loadChats(to, from, next) {
  console.log('in loadChats...')
  store.dispatch('user/loadChats').then(() => {
    console.log('finishing loadChats')
    next()
  })
}

function signOut(to, from, next) {
  store.dispatch('user/end')
  store.dispatch('mqtt/end')
  store.dispatch('cognito/signOut').then(() => {
    next({
      path: '/signin'
    })
  })
}

function loadMessages(to, from, next) {
  let id = to.params.id
  store.dispatch('user/loadMessages', id).then(() => {
    next()
  })
}

function loadUsers(to, from, next) {
  store.dispatch('user/loadOnlineUsers').then(() => {
    next()
  })
}

function loadInvites(to, from, next) {
  console.log('dispatching loadInvites event')
  store.dispatch('user/loadInvites').then(() => {
    next()
  })
}

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
      props: (route) => ({
        username: route.query.username
      })
    },
    {
      path: "/signout",
      name: "SignOut",
      beforeEnter: signOut
    },
    {
      path: "/confirm",
      name: "Confirm",
      component: Confirm,
      props: (route) => ({
        username: route.query.username
      })
    },
    {
      path: "/forgot",
      name: "ForgotPassword",
      component: ForgotPassword
    },
    {
      path: "/chats",
      beforeEnter: loadChats,
      component: Dashboard,
      children: [
        {
          path: "",
          name: "Chats",
          component: Chats,
          meta: {
            loadUser: true
          }
        },
        {
          path: ":id",
          name: "Chat",
          component: Chat,
          beforeEnter: loadMessages,
          props: (route) => ({
            id: route.params.id
          }),
          meta: {
            loadUser: true
          }
        }
      ]
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        loadUser: true
      }
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
      beforeEnter: loadUsers,
      meta: {
        loadUser: true
      }
    },
    {
      path: "/invites",
      name: "Invites",
      component: Invites,
      beforeEnter: loadInvites,
      meta: {
        loadUser: true
      }
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: '*',
      redirect: {
        name: "Chats"
      }
    }
  ]
})