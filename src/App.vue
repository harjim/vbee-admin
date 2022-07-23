<script setup lang="ts">
import AppProvider from '/@/components/Application/AppProvider.vue'
import appStore from '/@/store'
import { useI18n } from 'vue-i18n'

const { lang, setting } = storeToRefs(appStore.useGlobalSetting)
const { getLocaleMessage } = useI18n()
const locale = getLocaleMessage(lang.value.defaultLang)
</script>

<template>
  <el-config-provider
    :locale="locale"
    :size="setting"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </el-config-provider>
</template>

<style scoped>
</style>
