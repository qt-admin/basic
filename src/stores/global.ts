import { defineStore } from "pinia"
import { ref } from 'vue'
import { color } from 'qt-vue-tools'
import DefaultConfig from '@/config.default'
import GlobalConfig from '@/config.global'
import ResizeObserver from 'resize-observer-polyfill'

type FormMode = 'drawer' | 'dialog'
const useGlobalStore = defineStore('global', () => {
  const gc = Object.assign({}, DefaultConfig, GlobalConfig)

  /* ---------- 侧边栏 start ---------- */
  const isSidebarHide = ref(false) // 是否隐藏侧边栏
  const isSidebarCollapsed = ref(false) // 侧边栏是否折叠
  const activeMenu = ref('/home') // 激活的菜单
  // 侧边栏 - 判断是否隐藏
  function judgeSidebarHide(isHide: boolean) {
    isSidebarHide.value = !!isHide
  }
  // 侧边栏 - 设置折叠状态
  function setSidebarCollapse(isCollapse: boolean) {
    isSidebarCollapsed.value = !!isCollapse
    localStorage.setItem('SIDERBAR_COLLAPSED', isSidebarCollapsed.value.toString())
  }
  // 侧边栏 - 获取折叠状态
  function getSidebarCollapse(): boolean {
    return localStorage.getItem('SIDERBAR_COLLAPSED') === 'true'
  }
  function setActiveMenu(path: string) {
    if (!path || path === activeMenu.value) return
    activeMenu.value = path
  }
  /* ---------- 侧边栏 end ---------- */

  /* ---------- 主题色 start ---------- */
  const mode = ref(gc.theme?.mode ?? 'light') // 明亮/暗黑模式 light | dark
  const theme = ref(gc.theme?.color ?? '#2b4acb') // 主题色
  // 主题色 - 设置主题色
  function setThemeColor(hex: string) {
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
  // 主题色 - 获取主题色
  function getThemeColor() {
    return localStorage.getItem('THEME_COLOR') || theme.value
  }
  /* ---------- 主题色 end ---------- */

  /* ---------- 表单 start ---------- */
  const formMode = ref<FormMode>(gc.form?.mode as (FormMode) ?? 'drawer') // 表单打开方式 drawer抽屉 dialog弹窗
  // 表单 - 获取打开方式
  function getFormMode(): FormMode {
    return localStorage.getItem('FORM_MODE') as FormMode || formMode.value
  }
  // 表单 - 设置打开方式
  function setFormMode(mode: FormMode) {
    if (!mode) return
    formMode.value = mode
    localStorage.setItem('FORM_MODE', mode)
  }
  /* ---------- 表单 end ---------- */

  /* ---------- 导航选项卡 start ---------- */
  const isNavTabsShow = ref(!!gc.navTabsShow) // 导航选项卡
  // 导航选项卡 - 设置开启状态
  function setNavTabsStatus(isShow: boolean) {
    isNavTabsShow.value = !!isShow
    localStorage.setItem('NAV_TABS_SHOW', isNavTabsShow.value.toString())
  }
  // 导航选项卡 - 获取开启状态
  function getNavTabsStatus() {
    return localStorage.getItem('NAV_TABS_SHOW') === 'true'
  }
  /* ---------- 导航选项卡 end ---------- */

  // 重置配置
  function resetSetting() {
    setThemeColor(gc.theme?.color ?? '#2b4acb')
    setFormMode(gc.form.mode as (FormMode) ?? 'drawer')
    setNavTabsStatus(!!gc.navTabsShow)
  }
  // 初始化配置
  function initSetting() {
    // 初始化侧边栏
    setSidebarCollapse(getSidebarCollapse())
    const dom = document.getElementsByTagName('body')[0]
    const resizeObserver = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      // 判断侧边栏是否隐藏
      judgeSidebarHide(!!(w < 770))
    })
    resizeObserver.observe(dom)

    // 初始化主题色
    setThemeColor(getThemeColor())

    // 初始化表单
    setFormMode(getFormMode())

    // 初始化导航选项卡
    setNavTabsStatus(getNavTabsStatus())
  }

  return {
    isSidebarHide, isSidebarCollapsed,
    judgeSidebarHide,
    setSidebarCollapse,
    getSidebarCollapse,
    activeMenu,
    setActiveMenu,
    mode, theme,
    setThemeColor,
    getThemeColor,
    formMode,
    setFormMode,
    getFormMode,
    isNavTabsShow,
    setNavTabsStatus,
    getNavTabsStatus,
    resetSetting,
    initSetting
  }
})

export default useGlobalStore