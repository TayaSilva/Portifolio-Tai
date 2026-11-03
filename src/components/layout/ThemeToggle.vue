<script setup lang="ts">
import { useId } from 'vue'
import { useTheme } from '@/composables/useTheme'

/** Planeta que ganha o anel no tema claro e perde no escuro */
const { isDark, toggle } = useTheme()
const uid = useId()
const id = (name: string) => `${uid}-${name}`
</script>

<template>
  <button
    type="button"
    class="ibtn toggle"
    :class="{ dark: isDark }"
    :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    @click="toggle"
  >
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <clipPath :id="id('back')"><rect x="0" y="0" width="32" height="16" /></clipPath>
        <clipPath :id="id('front')"><rect x="0" y="16" width="32" height="16" /></clipPath>
      </defs>
      <g class="ring" :clip-path="`url(#${id('back')})`">
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.2"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          transform="rotate(-20 16 16)"
        />
      </g>
      <circle cx="16" cy="16" r="7" fill="currentColor" />
      <g class="ring" :clip-path="`url(#${id('front')})`">
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.2"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          transform="rotate(-20 16 16)"
        />
      </g>
    </svg>
  </button>
</template>

<style scoped>
.ring {
  transform-box: fill-box;
  transform-origin: center;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease-out;
}
.toggle.dark .ring {
  transform: scale(0.2);
  opacity: 0;
}
</style>
