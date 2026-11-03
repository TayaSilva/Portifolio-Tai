<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '@/types'
import BaseIcon from './BaseIcon.vue'

defineProps<{ project: Project; index: number }>()

/* se a imagem não carregar, cai no gradiente com o nome */
const broken = ref(false)
</script>

<template>
  <a
    :id="`projeto-${project.slug}`"
    class="card"
    :href="project.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${project.name} · ${project.category} · Abrir projeto (abre em nova aba)`"
  >
    <span class="media">
      <img
        v-if="project.image && !broken"
        class="shot"
        :src="project.image"
        :alt="project.imageAlt ?? ''"
        :style="project.imagePosition ? { objectPosition: project.imagePosition } : undefined"
        loading="lazy"
        decoding="async"
        width="1440"
        height="742"
        @error="broken = true"
      />
      <span v-else class="g placeholder">{{ project.name }}</span>
    </span>
    <span class="body">
      <span class="g num" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="cat">{{ project.category }}</span>
      <span class="g name">{{ project.name }}</span>
      <span class="desc">{{ project.description }}</span>
      <span class="cta metal">Abrir projeto <BaseIcon name="arrow" :size="16" /></span>
    </span>
  </a>
</template>

<style scoped>
.card {
  position: relative;
  flex: 0 0 min(60vw, 900px);
  min-width: 0;
  scroll-snap-align: start;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 24px;
  padding: 22px;
  border-radius: 28px;
  background: var(--glass);
  text-decoration: none;
  color: var(--text);
  border: 1px solid var(--line);
  transition: border-color 0.3s ease-out;
}
.card:hover {
  border-color: var(--accent);
}
/* máscara em paralelogramo que vira retângulo no hover/foco */
.media {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 320px;
  border-radius: 18px;
  overflow: hidden;
  clip-path: polygon(14% 0, 100% 0, 86% 100%, 0 100%);
  transition: clip-path 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.card:hover .media,
.card:focus-visible .media {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.shot,
.placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.shot {
  object-fit: cover;
  object-position: center;
}
.placeholder {
  display: grid;
  place-items: center;
  padding: 0 16%;
  text-align: center;
  color: #38233f;
  font-size: clamp(28px, 3.4vw, 50px);
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), transparent 45%),
    linear-gradient(135deg, #ffd6e8, #d8c4ff 55%, #f4a7ca);
}
.card:hover .shot,
.card:hover .placeholder {
  transform: scale(1.06) translateX(-2%);
}
.body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.num {
  font-size: clamp(48px, 6vw, 88px);
  line-height: 1;
  color: var(--accent);
}
.cat {
  color: var(--accent-text);
  font-weight: 600;
  font-size: 15px;
}
.name {
  font-size: clamp(28px, 2.6vw, 40px);
  line-height: 1.05;
}
.desc {
  color: var(--muted);
}
.cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  font-weight: 600;
}
@media (max-width: 1023px) {
  .card {
    flex-basis: 86vw;
    grid-template-columns: minmax(0, 1fr);
    padding: 16px;
  }
  .media {
    min-height: 200px;
    aspect-ratio: 16 / 10;
  }
}
</style>
