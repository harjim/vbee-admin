import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGlobalSetting = defineStore('globalSetting', () => {
  const setting = reactive({
    isDark: false,
    point: '',
    size: 'default',
    iconSize: 28
  })
  const lang = reactive({
    // 默认语言，可选值<zh-cn|en>
    defaultLang: 'zh-cn',
    fallbackLang: 'zh-cn',
    // 支持的语言列表
    langArray: [
      { name: 'zh-cn', value: '中文简体' },
      { name: 'en', value: 'English' }
    ]
  })

  function setLang (val: string) {
    lang.defaultLang = val
  }

  return { setting, lang, setLang }
})
