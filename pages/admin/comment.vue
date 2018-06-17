<template>
  <div class="admin-comments">
    <div class="mask" v-if="isShow"><span class="close" @click="isShow = false">&times;</span></div>
    <div class="comments-box" v-show="isShow">
      <p>{{ comment.content }}</p>
    </div>
    <ul class="comments-list">
      <li class="list-item" v-for="(comment, index) in comments" :key="index">
        <p class="item-title"><a @click="isShow = true">{{comment.content}}</a></p>
        <p class="item-date">{{comment.createdAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delBtn(comment)">删除</a></p>
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
      comments: [],
      isShow: false,
      replyContent: ''
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
    delBtn(comment) {
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
  .comments-box {
    width: 500px;
    position: absolute;
    left: 50%;
    margin-left: -250px;
    background-color: #fff;
    border-radius: 3px;
    z-index: 1000;
    padding: 15px 10px;
    textarea {
      width: 100%;
      border-color: #ddd;
      border-radius: 3px;
      margin: 8px 0;
    }
    button {
      float: right;
    }
  }
}
</style>
