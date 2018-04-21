<template>
  <transition name="fade">
    <div class="tip" v-if="isOpen">
      <p class="tip-info">{{ tip }}</p>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'top-tip',
  data() {
    return {
      tip: '',
      isOpen: false
    }
  },

  methods: {
    openTip(tip) {
      this.tip = tip
      this.isOpen = true
      let timer = setTimeout(() => {
        this.isOpen = false
        clearTimeout(timer)
      }, 2000)
    }
  }
}

</script>
<style>
.tip {
  display: flex;
  justify-content: center;
}

.tip-info {
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  top: 100px;
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>
