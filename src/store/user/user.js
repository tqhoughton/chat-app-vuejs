import UserService from '../../services/UserService.vue'
const state = {
  user: null,
  chats: null,
  messages: {},
  users: null,
  invites: [],
  updateUserActivity: null
}

const getters = {
  getUser: (state) => {
    return state.user
  },
  getUserId: (state) => {
    return state.user.userId
  },
  getChats: (state) => {
    return state.chats
  },
  getUsers: (state) => {
    return state.users
  },
  getInvites: (state) => {
    return state.invites
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setChats: (state, chats) => {
    state.chats = chats
  },
  addChat: (state, chat) => {
    state.chats = { ...state.chats, [chat.chatId]: chat}
    if (!state.user.chats) state.user.chats = []
    state.user.chats.push(chat.chatId)
  },
  setMessages: (state, {chatId, messages}) => {
    state.messages = {...state.messages, [chatId]: messages}
  },
  addMessage: (state, message) => {
    const chatId = message.chatId
    if (state.messages[chatId]) {
      state.messages[chatId].unshift(message)
    }
    state.chats[chatId] = {...state.chats[chatId], lastMessage: message }
  },
  addInvite: (state, invite) => {
    state.invites.push(invite)
    if (!state.user.invites) state.user.invites = []
    state.user.invites.push(invite.userId)
  },
  setUsers: (state, users) => {
    state.users = users
  },
  setInvites: (state, users) => {
    state.invites = users
  },
  setUpdateUserActivity: (state, interval) => {
    state.updateUserActivity = interval
  }
}

const actions = {
  updateUserActivity: ({commit, dispatch, state}) => {
    console.log('updating user activity...')
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.updateUserActivity(token).then((res) => {
          console.log('got result')
          resolve()
        }).catch((err) => {
          console.log('there was an error')
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  },
  loadUser: ({commit, dispatch, state, rootState}) => {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        console.log('getting token...')
        dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
          console.log('got token')
          dispatch('updateUserActivity')
          commit('setUpdateUserActivity', setInterval(() => {dispatch('updateUserActivity')}, 60000))
          UserService.methods.getUser(token).then((res) => {
            commit('setUser', res)
            resolve()
          }).catch((err) => {
            console.log('error')
            reject()
          })
        }).catch((err) => {
          console.log(err)
          reject()
        })
      } else {
        console.log('user is logged in')
        resolve()
      }
    })
  },
  loadChats: ({commit, dispatch, state}) => {
    return new Promise((resolve, reject) => {
      if (!state.user.chats) {
        return resolve()
      }
      let chatIds = [...state.user.chats]
      if (chatIds.length && !state.chats) {
        dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
          UserService.methods.getChats(token).then((res) => {
            if (res) {
              commit('setChats', res)
            }
            resolve()
          })
        })
      } else {
        resolve()
      }
    })
  },
  addChat: ({commit, dispatch, state}, chat) => {
    commit('addChat', chat)
  },
  loadMessages: ({commit, dispatch, state}, chatId) => {
    return new Promise((resolve, reject) => {
      if (!state.messages[chatId]) {
        dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
          UserService.methods.getMessages(chatId, token).then((res) => {
            commit('setMessages', {chatId, messages: res})
            resolve()
          })
        })
      } else {
        resolve()
      }
    })
  },
  addMessage: ({commit, dispatch, state}, message) => {
    commit('addMessage', message)
  },
  addInvite: ({commit, dispatch, state}, invite) => {
    commit('addInvite', invite)
  },
  sendMessage: ({commit, dispatch, state}, {body, chatId}) => {
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.sendMessage(body, chatId, token).then((message) => {
          commit('addMessage', message)
          resolve()
        })
      })
    })
  },
  sendInviteByUsername: ({commit, dispatch, state}, username) => {
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.sendInvite(username, token, 'username').then((res) => {
          resolve()
        })
      })
    })
  },
  sendInviteByUserId: ({commit, dispatch, state}, userId) => {
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.sendInvite(userId, token).then((res) => {
          resolve()
        })
      })
    })
  },
  acceptInvite: ({commit, dispatch, state}, userId) => {
    return new Promise((resolve, reject) => {
      dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
        UserService.methods.acceptInvite(userId, token).then((res) => {
          commit('addChat', res)
          resolve()
        })
      })
    })
  },
  loadOnlineUsers: ({commit, dispatch, state}, force) => {
    return new Promise((resolve, reject) => {
      if (!state.users || force) {
        dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
          UserService.methods.getUsers(token).then((res) => {
            console.log('users are: ', res)
            commit('setUsers', res)
            resolve()
          })
        })
      } else {
        resolve()
      }
    })
  },
  loadInvites: ({commit, dispatch, state}) => {
    return new Promise((resolve, reject) => {
      if (state.user.invitesRecieved) {
        console.log('loading invites')
        dispatch('cognito/getIdToken', null, {root: true}).then((token) => {
          UserService.methods.getInvites(token).then((res) => {
            commit('setInvites', res)
            resolve()
          })
        })
      } else {
        resolve()
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}