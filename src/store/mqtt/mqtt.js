import AWS from 'aws-sdk/global'
import AWSMqtt from 'aws-mqtt'
import { AWS_REGION, IOT_ENDPOINT, IOT_CHANNEL, IDENTITY_POOL_ID } from '../../globals/resources'
// Initialize the Amazon Cognito credentials provider
AWS.config.region = AWS_REGION

console.log('identity pool is: ', IDENTITY_POOL_ID)
console.log('iot endpoint is: ', IOT_ENDPOINT)
console.log('iot channel is: ', IOT_CHANNEL)

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID
})

const state = {
  client: null
}

const getters = {
}

const mutations = {
  startClient: (state, { userId, chatIds }) => {
    
  },
  endClient: (state) => {
    state.client.end()
  }
}

const actions = {
  startClient({commit, dispatch, state, rootState}) {
    let userId = rootState.user.user.userId
    console.log('userId is: ', userId)
    let chatIds = rootState.user.user.chats || []
    console.log(rootState.user.user)
    //commit('startClient', { userId, chatIds })
    
    if (state.client) return;
    console.log('chatIds are : ', chatIds)
    let params = {
      WebSocket: window.WebSocket,
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: IOT_ENDPOINT,
      clientId: userId
    }
    console.log(params)
    state.client = AWSMqtt.connect(params)
    
    //let messageHandler = new MessageHandler(state, IOT_CHANNEL)
    
    state.client.on('connect', () => {
      state.client.subscribe(`${IOT_CHANNEL}/user/${userId}`)
    })
    state.client.on('message', (topic, jsonMessage) => {
      const message = JSON.parse(jsonMessage)
      console.log(jsonMessage)
      const payload = message.payload
      const type = message.type
      if (type === 'invite') {
        dispatch('user/addInvite', payload, { root: true })
      } else if (type === 'chat') {
        dispatch('user/addChat', payload, { root: true })
      } else if (type === 'message') {
        console.log('new message!')
        dispatch('user/addMessage', payload, { root: true })
      }
    })
    state.client.on('close', (err) => {
      console.log('Closed  :-(')
    })
    state.client.on('offline', () => {
      console.log('Went offline  :-(')
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