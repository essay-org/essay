<template>
  <div class="admin-category">
    <div
      v-if="isAdd || tmp.id"
      class="item"
    >
      <input
        v-model="tmp.title"
        type="text"
        placeholder="名称"
        autofocus
      >
      <input
        v-model="tmp.keywords"
        type="text"
        placeholder="关键字"
      >
      <textarea
        v-model="tmp.description"
        rows="5"
        placeholder="描述"
      />
      <input
        v-model="tmp.sort"
        type="number"
        placeholder="排序">
      <div class="state">
        <input
          id="publish"
          v-model="tmp.isShow"
          :value="true"
          name="state"
          type="radio">
        <label for="publish">公开</label>
        <input
          id="pravite"
          v-model="tmp.isShow"
          :value="false"
          name="state"
          type="radio">
        <label for="pravite">私有</label>
      </div>
      <button @click="handle(false)">取消</button>
      <button
        class="primary"
        @click="handlePost">确定</button>
    </div>

    <button
      class="primary"
      @click="handle(true)">添加分类</button>

    <div
      v-for="item in categoryFilter"
      :key="item.id"
      class="category"
    >
      <p class="title"> <span v-if="!item.isShow">[私]</span>{{ item.title }} ({{ item.total }})</p>
      <div class="btns">
        <button
          class="small"
          @click="handleDelete(item)">删除</button>
        <button
          class="small"
          @click="handlePatch(item)">编辑</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      tmp: {},
      categoryId: '',
      isAdd: false,
    }
  },
  computed: {
    ...mapState(['categories']),
    categoryFilter() {
      return this.categories.filter(i => i.title !== '默认分类')
    },
  },
  mounted() {
    this.setDefault()
    this.getCategories()
  },
  methods: {
    ...mapActions([
      'getCategories',
      'postCategory',
      'patchCategory',
      'deleteCategory',
    ]),
    async handleDelete(item) {
      const val = confirm(`确定删除 ${item.title} 分类吗`)
      if (val) {
        await this.deleteCategory(item.id)
        this.getCategories()
      }
    },
    handle(isAdd) {
      this.setDefault()
      this.isAdd = isAdd
    },
    handlePatch(item) {
      this.tmp = {
        ...item,
      }
    },
    async handlePost() {
      if (this.tmp.id) {
        await this.patchCategory(this.tmp)
        this.getCategories()
        this.setDefault()
        this.isAdd = false
      } else {
        await this.postCategory(this.tmp)
        this.getCategories()
        this.setDefault()
        this.isAdd = false
      }
    },
    setDefault() {
      this.tmp = {
        id: '',
        title: '',
        keywords: '',
        description: '',
        isShow: true,
        sort: 0,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-category {
  .item {
    border-radius: 3px;
    margin: 20px 0;
    width: 300px;
    input,
    textarea {
      margin-bottom: 10px;
    }
  }
  .primary {
    margin-bottom: 20px;
  }
  .category {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}
</style>
