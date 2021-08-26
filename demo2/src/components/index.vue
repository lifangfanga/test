<template>
  <div class="index">
    <v-header :active.sync="active"></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from '@/components/header'
export default {
  data () {
    return {
      active: 'UserStation'
    }
  },
  components: {
    VHeader
  },
  watch: {
    active (newVal) {
      this.$router.push({
        path: `${this.active}`
      })
    }
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>
