<template>
  <div id="app">
    <div class="nav">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/write">写文章</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <el-menu-item id="login-menu-item">
          <el-button
            v-if="userInfo"
            type="text"
            class="login-button"
            v-on:click="logout"
            >注销</el-button
          >
          <el-button v-else type="text" class="login-button" v-on:click="login"
            >登录</el-button
          >
        </el-menu-item>
      </el-menu>
    </div>

    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  margin-top: 80px;
}

a {
  text-decoration: none;
}

.nav {
  position: fixed;
  top: 0;
  width: 100%;

  #login-menu-item {
    float: right;
    padding: 0;
  }

  .login-button {
    color: white;
    height: 100%;
    padding: 0 20px;
  }
}
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      userInfo: window.localStorage.getItem('userInfo'),
    };
  },
  methods: {
    handleSelect() {
    // handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },

    login() {
      this.axios.post('/api/users/login', {
        userName: 'YZJ',
        password: '123',
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logout() {
      // TODO call logout
    },
  },
};
</script>
