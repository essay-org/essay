<template>
  <div class="admin-comments">
    <!-- <div class="comments-input" v-if="isEdit">
      <input type="text" @keyup.enter="edit" v-model="tag.name">
      <button class="black-button" @click="edit">确认修改</button>
    </div> -->
    <ul class="comments-list">
      <li class="list-item" v-for="(comment, index) in comments" :key="index">
        <p class="item-title"><a href="javascript:;">{{comment.content}}</a></p>
        <p class="item-date">{{comment.createdAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delComment(comment)">删除</a></p>
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
      comment:{},
      comments: []
    }
  },
  mounted() {
    this.$store.dispatch('COMMENTS').then((data) => {
      this.comments = data.data
    })
  },
  head() {
    return {
      title: '评论列表 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    delComment(comment) {
       this.$store.dispatch('DELETE_COMMENT', comment.id).then((data) => {
        if(data.success) {
         this.$refs.tip.openTip('评论已删除')
         this.$store.dispatch('COMMENTS').then((data) => {
           this.comments = data.data
         })
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~/assets/css/var.scss';
.admin-comments {
  max-width: 960px;
  margin: 60px auto;
  .comments-input {
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
