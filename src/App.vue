<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
// import { autoSize } from "@/utils/autoSize";
export default {
  name: 'App',
  mounted () {
    // 初始化时调用一次
    this.setRem()
    // 监听窗口大小变化时重新计算
    window.addEventListener('resize', this.setRem)
  },
  methods: {
    setRem () {
      console.log(111111)
      let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
      const rem = htmlWidth / 10
      document.documentElement.style.fontSize = rem + 'px'
    }
  }
}
</script>

<style>
body{
   margin: 0 16px 16px 16px;
}
#app {

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
