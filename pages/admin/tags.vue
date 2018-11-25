<template>
  <div class="admin-tags">

    <ul class="tags-list">
      <li class="list-item" v-for="(tag, index) in tags" :key="index">
        <p class="item-title">
          <nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link>
        </p>
        <p class="item-date">{{tag.updatedAt | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delTag(tag)">删除</a></p>
        <p class="item-edit"><a @click="editTag(tag)">编辑</a></p>
      </li>
    </ul>

    <wmui-dialog v-model="isEdit">
      <div class="tag-input">
        <input type="text" @keyup.enter="edit" v-model="tag.name">
      </div>
      <div class="tag-btn">
        <wmui-button className="wmui-btn-primary" @click.native="edit">确认修改</wmui-button>
      </div>
    </wmui-dialog>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      tag: {
        isShow: true
      },
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
      let _self = this
      this.$Modal.confirm({
        title: '确定删除该标签吗？',
        text: '仅删除标签，不会影响到标签下的文章',
        onConfirm(instance) {
          _self.$store.dispatch('DELETE_TAG', tag.id).then((data) => {
            if (data.success) {
              _self.$Toast({ text: '标签已删除' })
              _self.$store.dispatch('TAGS').then((data) => {
                _self.tags = data.data
              })
            }
          })
          instance.open = false
        },
        onCancel(instance) {
          instance.open = false
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
        if (data.success) {
          this.$Toast({ text: '标签已更新' })
          this.$store.dispatch('TAGS').then((data) => {
            this.tags = data.data
          })
        }
      })
    }
  }
}

</script>
