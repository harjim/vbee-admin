<script setup lang="ts">
import appStore from '/@/store'
import { useI18n } from 'vue-i18n'

const { lang } = storeToRefs(appStore.useGlobalSetting)
const { getLocaleMessage } = useI18n()
const locale = getLocaleMessage(lang.value.defaultLang)
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
