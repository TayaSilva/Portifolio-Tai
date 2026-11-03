import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Descobre em qual seção a pessoa está enquanto rola a página */
export function useScrollSpy(ids: string[]) {
  const active = ref(0)
  let raf = 0

  const update = () => {
    raf = 0
    const line = window.innerHeight * 0.45
    let idx = 0
    ids.forEach((id, i) => {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) idx = i
    })
    const doc = document.documentElement
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 4) idx = ids.length - 1
    active.value = idx
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
  })

  return { active }
}
