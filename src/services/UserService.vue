<script>
  import Vue from 'vue'
  import { API_GATEWAY_ENDPOINT } from '../globals/resources'
  const url = API_GATEWAY_ENDPOINT
  console.log('url is: ', url)
  
  export default {
    methods: {
//      updateUserActivity(jwt, username) {
//        Vue.http.headers.common['Authorization'] = jwt
//        return Vue.http.put(url, null, {params: {username}}, ).then((response) => {
//          console.log(response)
//        })
//      },
//      getActiveUsers(jwt) {
//        Vue.http.headers.common['Authorization'] = jwt
//        return Vue.http.get(url).then((response) => {
//          console.log('response in service is: ', response)
//          return response.body.Items
//        })
//      },
      getUser(token) {
        console.log('token is: ', token)
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/user`).then((res) => {
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
        console.log(token)
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/users/online`).then((res) => {
          console.log('response is: ', res.body)
          return res.body
        })
      },
      getInvites(token) {
        Vue.http.headers.common['Authorization'] = token
        return Vue.http.get(`${url}/user/invites`).then((res) => {
          console.log('invites are: ', res.body)
          return res.body
        })
      }
    }
  }
</script>