import { reactive } from 'vue'
import { sections } from '@/data/profile'
import type { SectionId } from '@/types'

/** Estado da transição em tela cheia (planetas + estrelas) entre seções */
export const warp = reactive({ active: false, leaving: false, num: '', label: '' })

let t1: number | undefined
let t2: number | undefined

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function jump(id: SectionId, smooth: boolean) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  // leva o foco junto (bom para teclado e leitor de tela)
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function useNavigation() {
  /** Vai até a seção. Com `withWarp`, passa pela transição cósmica antes. */
  const navigate = (id: SectionId, withWarp = true) => {
    if (!withWarp || prefersReduced() || warp.active) {
      jump(id, !prefersReduced())
      return
    }
    const index = sections.findIndex((s) => s.id === id)
    window.clearTimeout(t1)
    window.clearTimeout(t2)
    warp.active = true
    warp.leaving = false
    warp.num = String(index + 1).padStart(2, '0')
    warp.label = sections[index]?.label ?? ''
    t1 = window.setTimeout(() => {
      jump(id, false)
      warp.leaving = true
    }, 1050)
    t2 = window.setTimeout(() => {
      warp.active = false
      warp.leaving = false
    }, 1950)
  }

  return { navigate, warp }
}
