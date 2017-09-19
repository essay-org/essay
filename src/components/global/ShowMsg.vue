<template>
	<div class="show-msg" ref="showMsg">
    <p class="msg" ref="msg"></p>
  </div>
</template>
<script>
export default {
  methods: {
    showMsg (info) {
      this.$refs.showMsg.style.display = 'block'
      this.$refs.msg.innerHTML = info
      setTimeout(function () {
        this.$refs.showMsg.style.display = 'none'
      }.bind(this), 1000)
    }
  }
}
</script>
<style>
.show-msg {
  display: none;
  position: fixed;
  top: 0;
  right:0;
  z-index: 9999;
}
.msg {
  font-size: 18px;
  color: #fff;
  background-color: rgba(0, 0, 0, .6);
  padding: 10px 15px;
  border-radius: 4px;
}
</style>