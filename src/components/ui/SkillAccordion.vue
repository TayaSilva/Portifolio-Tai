<script setup lang="ts">
import { ref, useId } from 'vue'
import type { SkillGroup } from '@/types'
import BaseIcon from './BaseIcon.vue'

/** Dropdowns de competências: um aberto por vez, tags entram em cascata */
const props = defineProps<{ groups: SkillGroup[] }>()
const openId = ref<string | null>(props.groups[0]?.id ?? null)
const uid = useId()

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="acc">
    <div v-for="(g, i) in groups" :key="g.id" class="item" :class="{ open: openId === g.id }">
      <h4>
        <button
          :id="`${uid}-${g.id}-btn`"
          type="button"
          class="btn"
          :aria-expanded="openId === g.id"
          :aria-controls="`${uid}-${g.id}`"
          @click="toggle(g.id)"
        >
          <span class="g num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="g name">{{ g.name }}</span>
          <span class="chev" aria-hidden="true"><BaseIcon name="chevron" :size="16" /></span>
        </button>
      </h4>
      <div :id="`${uid}-${g.id}`" class="panel" role="region" :aria-labelledby="`${uid}-${g.id}-btn`">
        <div class="inner">
          <ul class="tags">
            <li v-for="s in g.items" :key="s">{{ s }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.acc {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.item {
  border: 1px solid var(--line);
  border-radius: 20px;
  background: color-mix(in oklab, var(--rose) 12%, transparent);
  transition:
    border-color 0.3s ease-out,
    background-color 0.3s ease-out;
}
.item:hover {
  border-color: color-mix(in oklab, var(--accent) 35%, transparent);
}
.item.open {
  border-color: color-mix(in oklab, var(--accent) 50%, transparent);
  background: color-mix(in oklab, var(--rose) 26%, transparent);
}
html.dark .item {
  background: color-mix(in oklab, var(--accent) 6%, transparent);
}
html.dark .item.open {
  background: color-mix(in oklab, var(--accent) 12%, transparent);
}
.btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 64px;
  padding: 0 22px;
  border: 0;
  border-radius: 20px;
  background: transparent;
  color: var(--text);
  text-align: left;
  cursor: pointer;
}
.num {
  font-size: 15px;
  color: var(--accent);
}
.name {
  flex: 1;
  font-size: clamp(20px, 2vw, 26px);
}
.chev {
  flex: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  transition:
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.3s ease-out;
}
.open .chev {
  transform: rotate(180deg);
  background: color-mix(in oklab, var(--lilac) 45%, transparent);
}
/* painel abre deslizando (grid-template-rows 0fr → 1fr) */
.panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0.65s;
}
.open .panel {
  grid-template-rows: 1fr;
  visibility: visible;
  transition:
    grid-template-rows 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s;
}
.inner {
  overflow: hidden;
  min-height: 0;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 22px 24px 66px;
}
.tags li {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--rose) 35%, var(--surface));
  font-size: 15px;
  opacity: 0;
  transform: translateY(18px) scale(0.94);
  transition:
    opacity 0.4s ease-out,
    transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-color 0.2s ease-out;
}
html.dark .tags li {
  background: color-mix(in oklab, var(--accent) 14%, var(--surface));
}
.open .tags li {
  opacity: 1;
  transform: none;
}
.open .tags li:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
  transition-delay: 0s;
}
.open .tags li:nth-child(1) { transition-delay: 0.12s; }
.open .tags li:nth-child(2) { transition-delay: 0.17s; }
.open .tags li:nth-child(3) { transition-delay: 0.22s; }
.open .tags li:nth-child(4) { transition-delay: 0.27s; }
.open .tags li:nth-child(5) { transition-delay: 0.32s; }
.open .tags li:nth-child(6) { transition-delay: 0.37s; }
.open .tags li:nth-child(7) { transition-delay: 0.42s; }
.open .tags li:nth-child(8) { transition-delay: 0.47s; }
.open .tags li:nth-child(n + 9) { transition-delay: 0.52s; }
@media (max-width: 767px) {
  .btn {
    padding: 0 16px;
    gap: 12px;
  }
  .tags {
    padding: 4px 16px 20px;
  }
}
</style>
