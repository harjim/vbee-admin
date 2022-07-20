import { useGlobalSetting } from '/@/store/globalSetting'

export interface AppStore {
  useGlobalSetting: ReturnType<typeof useGlobalSetting>
}

const appStore: AppStore = {} as AppStore

/**
 * 注册 APP 状态库
 */
export const registerStore = () => {
  appStore.useGlobalSetting = useGlobalSetting()
}

export default appStore
