<template>
  <div
    v-if="comments.length"
    class="admin-comment"
  >
    <div
      v-for="item in comments"
      :key="item.id"
      class="item"
    >

      <p class="title">
        <nuxt-link :to="`/posts/${item.article.id}`">{{ item.article.title }}
        </nuxt-link>
      </p>
      <div class="content">
        <div class="comment">

          <p><a target="_blank">@{{ item.nickname }}：</a>{{ item.content }}</p>
          <div class="btns">
            <button
              class="small"
              @click="handleDelete(item.id)"
            >删除</button>
            <button
              class="small"
              @click="current = item.id"
            >回复</button>
          </div>
        </div>

        <div class="reply">
          <p v-if="item.reply">博主：{{ item.reply }}</p>
        </div>
      </div>

      <template v-if="current === item.id">
        <textarea
          v-model="reply"
          rows="5"
        />
        <button
          class="primary"
          @click="handleReply(item)">回复</button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      current: '',
      reply: '',
    }
  },
  computed: {
    ...mapState([
      'comments',
      'admin',
    ]),
  },
  mounted() {
    this.getComments()
  },
  methods: {
    ...mapActions([
      'deleteComment',
      'getComments',
      'postCommentReply',
      'postEmail',
    ]),
    async handleReply(item) {
      this.reply && await this.postCommentReply({ id: this.current, reply: this.reply })
      this.getComments()
      this.postEmail({
        fromUser: this.admin.nickname,
        toUser: item.nickname,
        toUserEmail: item.email,
        content: this.reply,
        id: item.article.id,
      })
      // reset
      this.reply = ''
      this.current = ''
    },
    async handleDelete(id) {
      const val = confirm('确定要删除吗')
      if (val) {
        await this.deleteComment(id)
        this.getComments()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-comment {
  .item {
    margin-bottom: 20px;
    .content {
      .comment {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
