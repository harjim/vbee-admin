<template>
  <slot />
</template>

<script lang="ts" setup>
import appStore from '/@/store'
import { screenEnum, sizeEnum } from '/@/utils/enums/windowsPoints'

const { setting } = storeToRefs(appStore.useGlobalSetting)
const screenWidth = document.body.clientWidth

const width2point = (num: number) => {
  if (num < screenEnum.XS) {
    setting.value.point = sizeEnum.XS
    setting.value.size = 'small'
    setting.value.iconSize = 20
  } else if (num < screenEnum.SM) {
    setting.value.point = sizeEnum.SM
    setting.value.size = 'small'
    setting.value.iconSize = 20
  } else if (num < screenEnum.MD) {
    setting.value.point = sizeEnum.MD
    setting.value.size = 'default'
    setting.value.iconSize = 24
  } else if (num < screenEnum.LG) {
    setting.value.point = sizeEnum.LG
    setting.value.size = 'default'
    setting.value.iconSize = 24
  } else if (num < screenEnum.XL) {
    setting.value.point = sizeEnum.XL
    setting.value.size = 'large'
    setting.value.iconSize = 28
  } else {
    setting.value.point = sizeEnum.XXL
    setting.value.size = 'large'
    setting.value.iconSize = 28
  }
}

width2point(screenWidth)

onMounted(() => {
  window.onresize = () => {
    const screenWidth = document.body.clientWidth
    width2point(screenWidth)
  }
})

onBeforeUnmount(() => {
  window.onresize = null
})
</script>
