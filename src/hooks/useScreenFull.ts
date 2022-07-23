import screenfull from 'screenfull'

export const useScreenFull = (el?: Element | undefined) => {
  const isFullScreen = ref(false)

  const toggleFullScreen = async () => {
    if (!screenfull.isEnabled) return
    await screenfull.toggle(el ?? document.body)
    isFullScreen.value = screenfull.isFullscreen
  }

  return { isFullScreen, toggleFullScreen }
}
