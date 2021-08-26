<template>
  <div class=""
       flex="dir:left">
    <div flex-box="0"
         class="left-city">
      <div v-for="(item,i) in cities"
           :key="i"
           :class="['city']"
           @click="citySelect">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main',
  data () {
    return {
      cities: []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.left-city {
  width: 10%;
  // 绝对定位
  position: absolute;
  top: 50%;
  left: 0;
  .city {
    height: 30px;
    width: 90%;
    background-color: red;
    background: url("/assets/city.png") no-repeat;
  }
}
</style>
