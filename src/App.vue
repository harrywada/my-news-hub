<template>
  <el-container id="app">
    <transition>
      <router-view />
    </transition>
    <el-footer>
      developed by harry wada &lt;harrywada@gmail.com&gt;
    </el-footer>
  </el-container>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
