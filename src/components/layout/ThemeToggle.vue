<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

/** Planeta que ganha o anel no tema claro e perde no escuro */
const { isDark, toggle } = useTheme()
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
      <circle cx="16" cy="16" r="7" fill="currentColor" />
      <ellipse
        class="ring"
        cx="16"
        cy="16"
        rx="13"
        ry="4.2"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        transform="rotate(-20 16 16)"
      />
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
