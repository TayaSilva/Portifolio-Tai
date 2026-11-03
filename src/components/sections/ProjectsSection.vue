<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { projects } from '@/data/projects'
import ProjectCard from '../ui/ProjectCard.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const row = ref<HTMLElement | null>(null)
const current = ref(1)
const pad = (n: number) => String(n).padStart(2, '0')

function scrollToProject(index: number) {
  const el = row.value
  const card = el?.querySelector<HTMLElement>(`[data-index="${index}"]`)
  if (!el || !card) return

  el.scrollTo({
    left: card.offsetLeft,
    behavior: 'smooth',
  })
}

function previousProject() {
  scrollToProject(Math.max(0, current.value - 2))
}

function nextProject() {
  scrollToProject(Math.min(projects.length - 1, current.value))
}

/* contador "01 / 05" acompanha o card visível na fileira */
onMounted(() => {
  const el = row.value
  if (!el || !('IntersectionObserver' in window)) return
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) current.value = Number((e.target as HTMLElement).dataset.index) + 1
      })
    },
    { root: el, threshold: 0.6 },
  )
  el.querySelectorAll<HTMLElement>('[data-index]').forEach((c) => io.observe(c))
})
</script>

<template>
  <section id="projetos" class="sec" aria-labelledby="projetos-heading">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <SectionHeader number="03" title="Projetos" heading-id="projetos-heading">
        <p class="text-lg text-muted">Sites que construí, do conceito ao ar.</p>
      </SectionHeader>
      <p class="g project-counter text-2xl text-muted" aria-hidden="true">
        <span class="text-accent">{{ pad(current) }}</span> / {{ pad(projects.length) }}
      </p>
    </div>

    <div class="carousel-shell">
      <div class="carousel-controls" aria-label="Navegação dos projetos">
        <button
          type="button"
          class="carousel-button previous"
          :disabled="current === 1"
          aria-label="Projeto anterior"
          @click="previousProject"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          class="carousel-button next"
          :disabled="current === projects.length"
          aria-label="Próximo projeto"
          @click="nextProject"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div ref="row" class="row" tabindex="0" aria-label="Lista de projetos (role para o lado)">
        <div v-for="(p, i) in projects" :key="p.slug" :data-index="i" class="contents-wrap">
          <ProjectCard :project="p" :index="i" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.row {
  display: flex;
  gap: 4vw;
  overflow-x: auto;
  padding: 8px var(--gutter) 40px;
  margin: 0 calc(var(--gutter) * -1);
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--gutter);
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}
.row::-webkit-scrollbar {
  display: none;
}
.row:focus-visible {
  outline-offset: -4px;
}
.contents-wrap {
  display: flex;
  flex: none;
  scroll-snap-align: start;
}
.project-counter {
  margin: 0 0 44px;
}
.carousel-controls {
  display: contents;
}
.carousel-button {
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: var(--glass);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}
.carousel-shell {
  position: relative;
}
.carousel-button.previous {
  left: 14px;
}
.carousel-button.next {
  right: 14px;
}
.carousel-button:hover:not(:disabled),
.carousel-button:focus-visible {
  color: var(--accent-text);
  border-color: var(--accent);
  background: color-mix(in oklab, var(--rose) 35%, var(--glass));
  transform: translateY(calc(-50% - 2px));
}
.carousel-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
@media (max-width: 1023px) {
  .project-counter {
    margin-bottom: 18px;
  }
  .carousel-controls {
    display: none;
  }
}
</style>
