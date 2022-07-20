import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalSetting = defineStore('globalSetting', () => {
  const setting = reactive({
    theme: 'dark'
  })

  return { setting }
})
