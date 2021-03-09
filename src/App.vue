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
            @click="logout"
            >注销（当前用户：{{userInfo.username}} ）</el-button
          >
          <el-button v-else type="text" class="login-button" @click="dialogFormVisible = true"
            >登录</el-button
          >
        </el-menu-item>
      </el-menu>
    </div>

    <el-dialog :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </el-dialog>

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
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
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
      this.axios.post('/api/users/login', {
        username: this.$data.form.username,
        password: this.$data.form.password,
      })
        .then((res) => {
          if (res.data) {
            const userInfo = {
              id: res.data.id,
              username: res.data.username,
            };
            this.$data.dialogFormVisible = false;
            window.localStorage.userInfo = userInfo;
            this.$data.userInfo = userInfo;
            this.$message('登陆成功');
          } else {
            this.$message('登陆失败');
          }
        })
        .catch((err) => {
          this.$message('登陆失败');
          console.error(err);
        });
    },

    logout() {
      window.localStorage.removeItem('userInfo');
      this.$data.userInfo = null;
      this.$message('已退出');
      if (this.$route.path === '/write') {
        this.$router.replace('/');
      }
    },
  },
};
</script>
