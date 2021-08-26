<template>
  <div class="login">
    <div class="abm">
      <div flex="main:justify box:mean">
        <div v-for="(item,i) in list"
             :key="i"
             @click="routeChange('meter',item)">
          <div v-for="(child,i) in meterDate"
               :key="i">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.log {
  width: 100px;
  height: 100px;
  background-color: #fff;
}
.abm {
  width: 100px;
  height: 100px;
  background-color: gray;
}
</style>
