<template>
  <div class="main-wrapper">
    <el-container direction="vertical">
      <Header />
      <router-view />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '/@/Layouts/components/Header.vue'</script>

<style scoped>

</style>
