<script>
  import Vue from 'vue'
  import { API_GATEWAY_ENDPOINT } from '../globals/resources'
  const url = API_GATEWAY_ENDPOINT
  console.log('url is: ', url)
  
  export default {
    methods: {
      updateUserActivity(token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.put(`${url}/user/last-activity`).then((response) => {
          console.log(response)
          return response
        })
      },
      getUser(token) {
        console.log('token is: ', token)
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/user`).then((res) => {
          console.log('res is: ', res.body)
          return res.body
        })
      },
      getChats(token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/user/chats`).then((res) => {
          return res.body
        })
      },
      getMessages(chatId, token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/user/chats/${chatId}/messages`).then((res) => {
          console.log('response: ', res.body)
          return res.body
        })
      },
      sendMessage(body, chatId, token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.post(`${url}/user/chats/${chatId}/messages`, { messageBody: body}).then((res) => {
          console.log('response is: ', res.body)
          return res.body
        })
      },
      sendInvite(user, token, type) {
        let body
        if (type === 'username') {
          body = { username: user }
        } else {
          body = { userId: user }
        }
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.post(`${url}/invites/send`, body).then((res) => {
          console.log('res is: ', res.body)
          return res.body
        })
      },
      acceptInvite(userId, token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.post(`${url}/invites/accept`, { userId }).then((res) => {
          console.log('res is : ', res.body)
          return res.body
        })
      },
      getUsers(token) {
        console.log('getting users...')
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/users/online`).then((res) => {
          console.log('response is: ', res.body)
          return res.body
        })
      },
      getInvites(token) {
        Vue.http.headers.common['Authorization'] = token
        console.log('getting invites...')
        return Vue.http.get(`${url}/user/invites`).then((res) => {
          console.log('invites are: ', res.body)
          return res.body
        }).catch((err) => {
          console.error(err)
        })
      }
    }
  }
</script>