import Vue from 'vue'
import Vuex from 'vuex'
import cognito from './cognito/cognito'
import mqtt  from './mqtt/mqtt'
import user from './user/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    menuClass: '',
    notifications: []
  },
  getters: {
    getMenuClass: (state) => {
      return state.menuClass
    },
    getNotifications: (state) => {
      return state.notifications
    }
  },
  mutations: {
    addNotification: (state, note) => {
      state.notifications.push(note)
    },
    removeNotifications: (state) => {
      state.notifications.splice(0, state.notifications.length)
    },
    removeNotification: (state, i) => {
      state.notifications.splice(i, 1)
    },
    toggleMenuClass: (state) => {
      let cssClass = ''
      switch (state.menuClass) {
        case 'menu-open':
          cssClass = 'menu-closed'
          break;
        case 'menu-closed':
          cssClass = 'menu-open'
          break;
        case '':
          cssClass = 'menu-open'
          break;
      }
      state.menuClass = cssClass
    },
    resetMenuClass: (state) => {
      state.menuClass = ''
    }
  },
  
  actions: {
    toggleMenuClass: ({commit}) => {
      commit('toggleMenuClass')
    },
    addNotification: ({commit}, note) => {
      commit('addNotification', note)
    },
    resetMenuClass: ({commit}) => {
      commit('resetMenuClass')
    },
    removeNotifications: ({commit}) => {
      commit('removeNotifications')
    },
    removeNotification: ({commit}, i) => {
      commit('removeNotification', i)
    }
  },
  modules: {
    cognito,
    mqtt,
    user
  }
})