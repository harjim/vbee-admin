<script setup lang="ts">
import HelloWorld from '/@/components/HelloWorld.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale">
    <div>
      <a
        href="https://vitejs.dev"
        target="_blank"
      >
        <img
          src="/vite.svg"
          class="logo"
          alt="Vite logo"
        >
      </a>
      <a
        href="https://vuejs.org/"
        target="_blank"
      >
        <img
          src="./assets/vue.svg"
          class="logo vue"
          alt="Vue logo"
        >
      </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
