<template>
  <div class="write">
    <div class="header">
      <el-input placeholder="请输入标题" v-model="title" clearable />
      <el-button type="primary" round class="release-button" @click="release">发布</el-button>
    </div>
    <div class="modify-mode" v-if="id && article">
      编辑模式，上次更改时间：{{ article.updatedAt }}
    </div>
    <mavon-editor
      ref=md
      class="editor"
      v-model="content"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      @save="$save"
    />
  </div>
</template>

<style lang="scss" scoped>
.write {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;

  .modify-mode {
    text-align: left;
    font-size: 0.8rem;
    margin: 20px;
    margin-top: 0;
  }

  .header {
    padding: 20px;
    padding-top: 0;
    display: flex;

    .release-button {
      margin-left: 30px;
    }
  }

  .editor {
    flex-grow: 1;

    // FIXME why does this not work?
    .op-image {
      .dropdown-item:last-of-type {
        // Disable 'upload image' feature
        display: none !important;
      }
    }
  }
}
</style>
<style>
.op-image .dropdown-item:last-of-type {
  display: none !important;
}
</style>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import { processArticleObject } from '../helpers/helpers';

export default {
  name: 'Write',
  components: {
    mavonEditor,
  },
  props: {
    id: String,
  },
  data() {
    return {
      // fromPath: '',
      title: '',
      content: '',
      article: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // eslint-disable-next-line no-param-reassign
      // vm.fromPath = from.fullPath;
      vm.updatePage();
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$message.error('将会丢失当前的内容，请先发布');
    next(false);
  },

  methods: {
    $imgAdd() {
      this.noSuchFunc();
    },
    $imgDel() {
      this.noSuchFunc();
    },
    $save() {
      this.noSuchFunc();
    },

    release() {
      if (!this.title.trim() || !this.$refs.md.d_value.trim()) return;
      if (this.id) this.releaseEdited();
      else this.releaseNew();
    },

    releaseNew() {
      const title = this.title.trim();
      const content = this.$refs.md.d_render.trim();
      // eslint-disable-next-line camelcase
      const content_markdown = this.$refs.md.d_value.trim();
      this.axios
        .post('/api/article/new', {
          created_at: new Date(),
          updated_at: new Date(),
          author_id: this.$userInfo.id,
          title,
          content,
          content_markdown,
        })
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
          } else {
            this.$message.success(res.data.message || '发布成功');
            this.title = '';
            this.content = '';
            this.article = null;
            this.$router.replace('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    releaseEdited() {
      const title = this.title.trim();
      const content = this.$refs.md.d_render.trim();
      // eslint-disable-next-line camelcase
      const content_markdown = this.$refs.md.d_value.trim();
      this.axios
        .put(`/api/article/${this.id}`, {
          id: this.id,
          updated_at: new Date(),
          author_id: this.$userInfo.id,
          title,
          content,
          content_markdown,
        })
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
          } else {
            this.$message.success(res.data.message || '修改成功');
            // TODO: How can I go back and discard the current page
            // if (this.fromPath === `/article/${this.id}`) this.$router.go(-1);
            this.$router.replace(`/article/${this.id}`);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    updatePage() {
      if (this.article) {
        this.title = '';
        this.content = '';
        this.article = null;
      }
      if (this.id) {
        this.getArticleDetail(+this.id);
      }
    },

    getArticleDetail(id) {
      this.axios.get(`/api/article/${id}`)
        .then((res) => {
          if (res.data.errno === -1) {
            this.$message.error(res.data.message);
            setTimeout(() => {
              this.$router.replace('/');
            }, 1000);
          } else {
            this.article = processArticleObject(res.data.data);
            this.title = this.article.title;
            this.content = this.article.contentMarkdown;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    noSuchFunc() {
      this.$message.info('暂不支持此功能');
    },
  },
};
</script>
