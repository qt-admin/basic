import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置进度条
NProgress.configure({
  easing: 'ease', // 动画方式，默认 ease
  speed: 200, // 进度条递增速度， 默认 200
  showSpinner: false, // 是否显示加载icon， 默认 true
  trickleSpeed: 800, // 自动递增间隔， 默认 800
  minimum: 0.08, // 更改启动时使用的最小百分比，默认 0.08
  parent: 'body' // 指定进度条的父容器，默认 body
})

const start = () => {
  NProgress.start()
}
const close = () => {
  NProgress.done()
}
export default {
  start,
  close
}