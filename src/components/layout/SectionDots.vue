<script setup lang="ts">
import { computed } from 'vue'
import { useNavigation } from '@/composables/useNavigation'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { sections } from '@/data/profile'

const { navigate } = useNavigation()
const { active } = useScrollSpy(sections.map((s) => s.id))
const pad = (n: number) => String(n).padStart(2, '0')
/* cada ponto ocupa 32px + 6px de espaço */
const indicator = computed(() => ({ transform: `translateY(${active.value * 38}px)` }))
</script>

<template>
  <nav class="dots" aria-label="Estações da página">
    <div class="list">
      <span class="indicator" :style="indicator" aria-hidden="true" />
      <a
        v-for="(s, i) in sections"
        :key="s.id"
        :href="`#${s.id}`"
        :class="{ on: active === i }"
        :aria-current="active === i ? 'true' : undefined"
        :aria-label="`${pad(i + 1)} · ${s.label}`"
        @click.prevent="navigate(s.id)"
      >
        <span class="d" />
      </a>
    </div>
    <p class="g counter" aria-hidden="true">
      <span class="text-ink">{{ pad(active + 1) }}</span> _ {{ pad(sections.length) }}
    </p>
  </nav>
</template>

<style scoped>
.dots {
  position: fixed;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.list a {
  width: 44px;
  height: 32px;
  display: grid;
  place-items: center;
}
.d {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid var(--muted);
  transition: transform 0.2s ease-out;
}
.list a:hover .d {
  transform: scale(1.4);
}
.list a.on .d {
  border-color: var(--accent);
  transform: scale(1.3);
}
.indicator {
  position: absolute;
  left: 50%;
  top: 0;
  width: 12px;
  height: 12px;
  margin: 10px 0 0 -6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff8fc, #f4a7ca 45%, var(--accent));
  box-shadow:
    0 0 0 4px color-mix(in oklab, var(--accent) 18%, transparent),
    0 0 14px rgba(168, 85, 247, 0.55);
  pointer-events: none;
  transition: transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.counter {
  writing-mode: vertical-rl;
  margin-top: 10px;
  font-size: 13px;
  letter-spacing: 0.1em;
  color: var(--muted);
}
@media (max-width: 767px) {
  .dots {
    display: none;
  }
}
</style>
