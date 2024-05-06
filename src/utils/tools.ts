// 切换暗黑/明亮模式
function toggleTheme(e: MouseEvent) {
  const x = e.clientX
  const y = e.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  let isDark: boolean
  type NewDocument =  Document & { startViewTransition: Function }
  const transition = (document as NewDocument).startViewTransition(() => {
    const root = document.documentElement
    isDark = root.classList.contains('dark')
    root.classList.remove(isDark ? 'dark' : 'light')
    root.classList.add(isDark ? 'light' : 'dark')
  })

  return transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]
    document.documentElement.animate(
      {
        clipPath: isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)"
      }
    )
  })
}

export {
  toggleTheme
}