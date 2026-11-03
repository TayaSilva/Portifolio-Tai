import { ref } from 'vue'

const isDark = ref(typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))

type StartViewTransition = (cb: () => void) => { ready: Promise<void> }

/** Tema claro/escuro salvo no localStorage, com troca em círculo (View Transitions API) */
export function useTheme() {
  const apply = (dark: boolean) => {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('ts-theme', dark ? 'dark' : 'light')
    } catch {
      /* modo privado: tudo bem, só não salva */
    }
  }

  const toggle = (event?: MouseEvent) => {
    const next = !isDark.value
    const start = (document as unknown as { startViewTransition?: StartViewTransition }).startViewTransition
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!start || reduce) {
      apply(next)
      return
    }
    const target = event?.currentTarget as HTMLElement | undefined
    const rect = target?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40
    const y = rect ? rect.top + rect.height / 2 : 36
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = start.call(document, () => apply(next))
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {})
  }

  return { isDark, toggle }
}
