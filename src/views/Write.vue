<template>
  <div class="write">
    <mavon-editor class="editor" v-model="value" />
  </div>
</template>

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
      value: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.write {
  height: calc(100vh - 100px);

  .editor {
    height: 100%;
  }
}
</style>
