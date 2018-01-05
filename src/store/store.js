import Vue from 'vue'
import Vuex from 'vuex'
import cognito from './cognito/cognito'
import mqtt  from './mqtt/mqtt'
import user from './user/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    menuClass: ''
  },
  getters: {
    getMenuClass: (state) => {
      return state.menuClass
    }
  },
  mutations: {
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
    resetMenuClass: ({commit}) => {
      commit('resetMenuClass')
    }
  },
  modules: {
    cognito,
    mqtt,
    user
  }
})