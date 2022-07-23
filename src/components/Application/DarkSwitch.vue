<template>
  <template v-if="setting.size === 'small'">
    <el-icon
      :size="24"
      class="cursor-pointer"
      @click="changeDarkOrLight"
    >
      <Sunny v-if="setting.isDark" />
      <Moon v-else />
    </el-icon>
  </template>
  <template v-else>
    <el-switch
      v-model="setting.isDark"
      inline-prompt
      inactive-color="#A8ABB3"
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="() => toggleDark()"
    />
  </template>
</template>

<script lang="ts" setup>
import appStore from '/@/store'
import { Moon, Sunny } from '@element-plus/icons-vue'

const { setting } = storeToRefs(appStore.useGlobalSetting)

const isDark = useDark()
const toggleDark = useToggle(isDark)
const changeDarkOrLight = () => {
  toggleDark()
  setting.value.isDark = isDark.value
}
</script>

<style scoped>

</style>
