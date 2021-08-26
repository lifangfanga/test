<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">header</router-link> |
      <router-link to="/userstation">userstation</router-link>
      <router-link to="/changename">changename</router-link>
      <router-link to="/login">login</router-link>
      <router-link to="/main">main</router-link>
      <router-link to="/uploadBtn">upload</router-link>
      <router-link to="/beijing">beijing</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
// import { header } from "@/components/header";
// export default {
//   components: {
//     header
//   }
// }
</script>
<style>
html,
body {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
</style>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  box-sizing: border-box;
}
#app {
  height: 100%;
  height: inherit;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
