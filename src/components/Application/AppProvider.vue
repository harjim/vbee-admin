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
  } else if (num < screenEnum.SM) {
    setting.value.point = sizeEnum.SM
  } else if (num < screenEnum.MD) {
    setting.value.point = sizeEnum.MD
  } else if (num < screenEnum.LG) {
    setting.value.point = sizeEnum.LG
  } else if (num < screenEnum.XL) {
    setting.value.point = sizeEnum.XL
  } else {
    setting.value.point = sizeEnum.XXL
  }
}

width2point(screenWidth)

onMounted(() => {
  window.onresize = () => {
    const screenWidth = document.body.clientWidth
    width2point(screenWidth)
  }
})
</script>
