<template>
  <div class="flex items-center gap-x-1">
    <el-icon
      :size="setting.iconSize"
      class="cursor-pointer"
      @click="toggleFullScreen"
    >
      <i-material-symbols-fullscreen-exit-rounded v-if="isFullScreen" />
      <i-material-symbols-fullscreen-rounded v-else />
    </el-icon>
    <DarkSwitch />
  </div>
</template>

<script lang="ts" setup>
import { useScreenFull } from '/@/hooks/useScreenFull'
import appStore from '/@/store'

const { setting } = storeToRefs(appStore.useGlobalSetting)
const { isFullScreen, toggleFullScreen } = useScreenFull()
</script>

<style scoped>

</style>
