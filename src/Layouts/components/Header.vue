<template>
  <el-header>
    <el-switch
      v-model="setting.isDark"
      inline-prompt
      inactive-color="#A8ABB3"
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="() => toggleDark()"
    />
  </el-header>
</template>

<script lang="ts" setup>
import appStore from '/@/store'
import { Moon, Sunny } from '@element-plus/icons-vue'

const { setting } = storeToRefs(appStore.useGlobalSetting)

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style scoped>

</style>
