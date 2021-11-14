<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue';
// 暂只支持 export default 语法
// <script setup> 语法尚不支持
export default {
  setup() {
    const count = ref(0)

    const plus = () => {
      count.value ++
    }
    return {
      count,
      plus
    }
  }
}
</script>

<template>
  <div class="container">
    <img class="logo" alt="Vue logo" src="/src/assets/logo.png" />
    <span>{{count}}</span>
    <button @click="plus">plus</button>
  </div>

</template>

<!-- style 暂时不能解析，所以示例 style 放在 index.html 中暂时测试 -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
