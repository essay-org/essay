<template>
  <div class="admin-tags">
    <div class="tags-input" v-if="isEdit">
      <input type="text" @keyup.enter="edit" v-model="tag.name">
      <button class="black-button" @click="edit">确认修改</button>
    </div>
    <ul class="tags-list">
      <li class="list-item" v-for="(tag, index) in tags" :key="index">
        <p class="item-title"><nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link></p>
        <p class="item-date">{{tag.updatedAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delTag(tag)">删除</a></p>
        <p class="item-edit"><a @click="editTag(tag)">编辑</a></p>
      </li>
    </ul>
    <top-tip ref="tip"/>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      tag:{},
      tags: [],
      isEdit: false
    }
  },
  mounted() {
    this.$store.dispatch('TAGS').then((data) => {
      this.tags = data.data
    })
  },
  head() {
    return {
      title: '修改标签 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    delTag(tag) {
       this.$store.dispatch('DELETE_TAG', tag.id).then((data) => {
        // console.log(data)
        if(data.success) {
         this.$refs.tip.openTip('标签删除完成')
         this.$store.dispatch('TAGS').then((data) => {
           this.tags = data.data
         })
        }
      })
    },
    editTag(tag) {
      this.isEdit = true
      this.tag = tag
    },
    edit() {
      this.isEdit = false
      this.$store.dispatch('UPDATE_TAG', this.tag).then((data) => {
        if(data.success) {
          this.$refs.tip.openTip('标签更新完成')
          this.$store.dispatch('TAGS').then((data) => {
           this.tags = data.data
         })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.admin-tags {
  max-width: 960px;
  margin: 60px auto;
  .tags-input {
    text-align: center;
    input {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    button {
      line-height: 40px;
      border: transparent;
      display: inline-block;
      vertical-align: top;
      padding: 0 15px;
      background-color: $font-color;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      color: #fff;
    }
  }
  .list-item {
    display: flex;
    line-height: 45px;
    border-top: 1px solid #eee;
    .item-date {
      flex:1;
      text-align: center;
    }
    .item-edit,
    .item-del {
      width: 60px;
      text-align: right;
    }
    .item-title {
      flex: 1;
    }
    &:nth-child(1) {
      border-top: none;
    }
  }
}
</style>
