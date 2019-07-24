<template>
  <div class="admin-setting">
    <div class="item">

      <h3>个人信息</h3>
      <section>
        <input
          v-model="adminTmp.nickname"
          type="text"
          placeholder="昵称"
        >
        <input
          v-model="adminTmp.description"
          type="text"
          placeholder="简介"
        >

        <input
          v-model="adminTmp.email"
          type="text"
          placeholder="邮箱"
        >
        <button
          class="primary"
          @click="handlePatchAdmin(adminTmp)"
        >确认修改</button>
      </section>
    </div>

    <div class="item">
      <h3>密码重置</h3>
      <section>
        <input
          v-model="passwordTmp.oldPassword"
          type="password"
          placeholder="原始密码"
        >
        <input
          v-model="passwordTmp.newPassword"
          type="password"
          placeholder="新密码"
        >
        <input
          v-model="passwordTmp.verifyPassword"
          type="password"
          placeholder="再次输入新密码"
        >

        <button
          class="primary"
          @click="handlePatchPassword(passwordTmp)"
        >确认修改</button>
      </section>
    </div>

    <div class="item">
      <h3>邮箱服务</h3>
      <section>
        <input
          v-model="emailTmp.host"
          type="text"
          placeholder="host"
        >
        <input
          v-model="emailTmp.user"
          type="text"
          placeholder="user"
        >
        <input
          v-model="emailTmp.pass"
          type="password"
          placeholder="pass"
        >

        <button
          class="primary"
          @click="handlePatchOption({name: 'email', value: emailTmp})"
        >确认修改</button>
      </section>
    </div>

    <div class="item">
      <h3>SEO</h3>
      <section>
        <input
          v-model="seoTmp.title"
          type="text"
          placeholder="title"
        >
        <input
          v-model="seoTmp.keywords"
          type="text"
          placeholder="keywords"
        >
        <textarea
          v-model="seoTmp.description"
          type="text"
          placeholder="description"
          rows="5"
        />

        <button
          class="primary"
          @click="handlePatchOption({name: 'seo', value: seoTmp})">确认修改</button>
      </section>
    </div>
    <div class="item">
      <h3>扩展功能</h3>
      <button @click="handleBackup">数据备份</button>
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
      adminTmp: {
        nickname: '',
        description: '',
        email: '',
      },
      passwordTmp: {
        oldPassword: '',
        newPassword: '',
        verifyPassword: '',
      },
      seoTmp: {
        title: '',
        keywords: '',
        description: '',
      },
      emailTmp: {
        user: '',
        pass: '',
        host: '',
      }
    }
  },
  computed: {
    ...mapState([
      'admin',
      'email',
      'seo',
    ])
  },
  async mounted() {
    await Promise.all([
      this.getOptionEmail(),
      this.getOptionSeo()
    ])
    this.adminTmp = {
      ...this.admin,
    }

    this.emailTmp = {
      ...this.email,
    }

    this.seoTmp = {
      ...this.seo,
    }
  },
  methods: {
    ...mapActions([
      'getOptionEmail',
      'getOptionSeo',
      'patchOption',
      'patchPassword',
      'patchAdmin',
      'logout',
    ]),
    handleBackup() {
      window.open('/api/backup')
    },
    handlePatchAdmin(data) {
      this.patchAdmin(data).then((ret) => {
        alert('信息已修改')
      })
    },
    handlePatchPassword(data) {
      this.patchPassword(data).then(ret => {
        alert('密码已修改')
        this.logout()
      })
    },
    handlePatchOption(data) {
      this.patchOption(data).then(ret => {
        alert('信息已修改')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-setting {
  input,
  textarea {
    margin-bottom: 20px;
    width: 300px;
  }
  h3 {
    margin-bottom: 15px;
  }
  .item {
    margin-bottom: 30px;
  }
}
</style>
