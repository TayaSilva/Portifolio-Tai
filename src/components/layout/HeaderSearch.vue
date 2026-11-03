<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useNavigation } from '@/composables/useNavigation'
import { findBest } from '@/data/search'
import BaseIcon from '../ui/BaseIcon.vue'

/**
 * Busca do header: a lupa se estica em direção ao logo, vira uma barra,
 * mostra o melhor resultado e, depois do Enter, se recolhe devagar.
 */
const open = defineModel<boolean>('open', { default: false })

const { navigate } = useNavigation()
const closing = ref(false)
const query = ref('')
const input = ref<HTMLInputElement | null>(null)
let timer: number | undefined

const best = computed(() => findBest(query.value))
const hint = computed(() => {
  if (query.value.trim().length < 2) return ''
  return best.value ? `↵ ${best.value.label}` : 'Nada nessa órbita'
})
const isOpen = computed(() => open.value && !closing.value)

function openBar() {
  window.clearTimeout(timer)
  closing.value = false
  open.value = true
  nextTick(() => window.setTimeout(() => input.value?.focus(), 380))
}

function closeBar() {
  if (!open.value || closing.value) return
  input.value?.blur()
  closing.value = true
  window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    open.value = false
    closing.value = false
    query.value = ''
  }, 1400)
}

function goBest() {
  if (!best.value) return false
  navigate(best.value.target, false)
  closeBar()
  return true
}

function onButton() {
  if (!open.value) return openBar()
  if (!goBest()) closeBar()
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    closeBar()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (!goBest() && query.value.trim().length < 2) closeBar()
  }
}
</script>

<template>
  <div class="slot">
    <div class="bar" :class="{ open: open && !closing, closing }" role="search">
      <label for="site-search" class="sr-only">Buscar no site</label>
      <input
        id="site-search"
        ref="input"
        v-model="query"
        class="field"
        type="search"
        autocomplete="off"
        enterkeyhint="go"
        placeholder="Busque projetos, tecnologias, empresas…"
        :tabindex="isOpen ? 0 : -1"
        @keydown="onKey"
      />
      <span class="hint" aria-live="polite">{{ hint }}</span>
      <button
        type="button"
        class="btn"
        :aria-label="isOpen ? (best ? `Ir para ${best.label}` : 'Fechar busca') : 'Buscar no site'"
        :aria-expanded="isOpen"
        aria-controls="site-search"
        @click="onButton"
      >
        <BaseIcon name="search" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.slot {
  position: relative;
  width: 44px;
  height: 44px;
  flex: none;
}
.bar {
  position: absolute;
  right: 0;
  top: 0;
  height: 44px;
  width: 44px;
  padding-right: 42px;
  display: flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: transparent;
  overflow: hidden;
  transition:
    width 1.4s cubic-bezier(0.65, 0, 0.35, 1),
    background-color 1s ease,
    border-color 1s ease,
    box-shadow 1s ease;
}
.bar.open {
  width: min(620px, calc(100vw - 460px));
  background: var(--surface);
  border-color: color-mix(in oklab, var(--accent) 55%, transparent);
  box-shadow:
    0 10px 30px rgba(168, 85, 247, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition:
    width 1.1s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.6s ease,
    border-color 0.6s ease,
    box-shadow 0.6s ease;
}
.field {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 4px 0 20px;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 16px; /* 16px evita o zoom automático do iPhone */
  opacity: 0;
  transform: translateX(16px);
  transition:
    opacity 0.3s ease-out,
    transform 0.4s ease-out;
}
.field::-webkit-search-cancel-button {
  display: none;
}
.field::placeholder {
  color: var(--muted);
}
.open .field {
  opacity: 1;
  transform: none;
  transition:
    opacity 0.6s ease-out 0.45s,
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
}
.hint {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 200px;
  padding-right: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-text);
  opacity: 0;
  transition: opacity 0.3s ease-out;
}
.open .hint {
  opacity: 1;
}
.btn {
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 1;
  margin-top: -21px;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition:
    transform 0.2s ease-out,
    background-color 0.4s ease;
}
.btn:active {
  transform: scale(0.92);
}
.open .btn {
  background: color-mix(in oklab, var(--rose) 60%, transparent);
}

/* No celular a barra cobre o header inteiro (menos o botão) */
@media (max-width: 1023px) {
  .bar.open {
    width: calc(100vw - 150px);
  }
  .hint {
    display: none;
  }
}
</style>
