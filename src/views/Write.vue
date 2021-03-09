<template>
  <div class="write">
    <div class="header">
      <el-input placeholder="请输入标题" v-model="title" clearable />
      <el-button type="primary" round class="release-button" @click="release">发布</el-button>
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

    // TODO why does this not work?
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

export default {
  name: 'Write',
  components: {
    mavonEditor,
  },
  data() {
    return {
      title: '',
      content: '',
    };
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
      const html = this.$refs.md.d_render;
      console.log(html);
    },

    noSuchFunc() {
      this.$message('暂不支持此功能');
    },
  },
};
</script>
