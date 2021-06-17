<template>
  <v-app>
    <v-main class="login">
      <v-container>
        <v-row class="login-container">
          <v-col cols="6" align-self="center">
            <v-form class="ma-10">
              <h5 class="text-h5 mb-6">用户登录</h5>
              <v-text-field outlined dense label="用户名" v-model="username"></v-text-field>
              <v-text-field outlined dense type="password" label="密码" v-model="password"></v-text-field>
              <v-btn block color="primary" class="mb-6" @click="login">登录</v-btn>
              <p class="body-2 red--text text--darken-1" v-if="error">用户名或密码错误</p>
              <p class="body-2" v-else>请使用新采编帐号进行登录</p>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    error: false
  }),
  created () {
    localStorage.removeItem('current_user')
  },
  methods: {
    login () {
      var axios = require('axios')
      var data = JSON.stringify({
        username: 'mayanbin',
        password: '19900215Myb'
      })

      var config = {
        method: 'post',
        url: 'https://notes.xinhua-news.cn/webclipper/api/user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then(response => {
          localStorage.setItem('current_user', JSON.stringify(response.data.data))
          this.$router.push('/')
        })
        .catch(() => {
          this.error = true
          localStorage.removeItem('current_user')
        })
    }
  }
}
</script>

<style scoped>
.login {
  background-position: bottom right;
  background-size: contain;
  background-image: url(https://notes.xinhua-news.cn/photos/images/background.svg);
}
.login-container {
  height: 100vh;
}
</style>
