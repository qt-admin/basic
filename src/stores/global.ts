import { defineStore } from "pinia"
import { ref } from 'vue'
import { color } from 'qt-vue-tools'
import DefaultConfig from '@/config.default'
import GlobalConfig from '@/config.global'

type FormMode = 'drawer' | 'dialog'
const useGlobalStore = defineStore('global', () => {
  const gc = Object.assign({}, DefaultConfig, GlobalConfig)
  const mode = ref(gc.theme.mode) // 明亮/暗黑模式 light | dark
  const theme = ref(gc.theme.color) // 主题色
  const isSidebarHide = ref(false) // 是否隐藏侧边栏
  const isSidebarCollapsed = ref(false) // 侧边栏是否折叠
  const formMode = ref<FormMode>(gc.form.mode as (FormMode)) // 表单打开方式 drawer抽屉 dialog弹窗

  // 判断侧边栏是否隐藏
  function judgeSidebarHide(isHide: boolean) {
    isSidebarHide.value = !!isHide
  }
  // 改变侧边栏折叠状态
  function setSidebarCollapse(isCollapse: boolean) {
    isSidebarCollapsed.value = !!isCollapse
    localStorage.setItem('SIDERBAR_COLLAPSED', isSidebarCollapsed.value.toString())
  }
  // 获取侧边栏折叠状态
  function getSidebarCollapse(): boolean {
    return localStorage.getItem('SIDERBAR_COLLAPSED') === 'true'
  }

  // 改变主题色
  function changeThemeColor(hex: string) {
    if (!hex) return

    color.setElementTheme(
      hex,
      'primary',
      [3, 5, 7, 8, 9],
      [2, 7]
    )
    theme.value = hex
    localStorage.setItem('THEME_COLOR', hex)
  }
  // 获取主题色
  function getThemeColor() {
    return localStorage.getItem('THEME_COLOR') || theme.value
  }

  // 获取表单打开方式
  function getFormMode(): FormMode {
    return localStorage.getItem('FORM_MODE') as FormMode || formMode.value
  }
  // 修改表单打开方式
  function changeFormMode(mode: FormMode) {
    if (!mode) return
    formMode.value = mode
    localStorage.setItem('FORM_MODE', mode)
  }

  // 重置配置
  function resetSetting() {
    changeThemeColor(gc.theme.color)
    changeFormMode(gc.form.mode as (FormMode))
  }

  return {
    mode, theme, isSidebarHide, isSidebarCollapsed, formMode,
    judgeSidebarHide,
    setSidebarCollapse,
    getSidebarCollapse,
    changeThemeColor,
    getThemeColor,
    changeFormMode,
    getFormMode,
    resetSetting
  }
})

export default useGlobalStore