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
            v-if="logined"
            type="text"
            class="login-button"
            @click="logout"
            >注销（当前用户：{{ $userInfo.username }} ）</el-button
          >
          <el-button
            v-else
            type="text"
            class="login-button"
            @click="dialogFormVisible = true"
            >登录</el-button
          >
        </el-menu-item>
      </el-menu>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>

    <keep-alive>
      <router-view />
    </keep-alive>

    <el-backtop />
    <!-- FIXME Not work -->
    <!-- <el-backtop target="body" :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop> -->

  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}

body {
  margin: 0;
  padding-top: 80px;
  height: 100%;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;

  #login-menu-item {
    float: right;
    padding: 0;
    // FIXME Why, after click, would this be activated?
    border-bottom-color: transparent !important;
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
      logined: !!this.$userInfo,
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
      },
      formLabelWidth: '56px',
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },

    login() {
      if (!this.form.username || !this.form.username) return;
      this.axios
        .post('/api/user/login', {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
          } else {
            const userInfo = {
              id: res.data.data.id,
              username: res.data.data.username,
            };
            this.dialogFormVisible = false;
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.logined = true;
            this.$message.success('登录成功');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    logout() {
      window.localStorage.removeItem('userInfo');
      this.logined = false;
      this.$message.success('已退出');
      if (this.$route.name === 'Write') {
        this.$router.replace('/');
      }
    },
  },
};
</script>
