<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { projects } from '@/data/projects'
import ProjectCard from '../ui/ProjectCard.vue'
import SectionHeader from '../ui/SectionHeader.vue'

const row = ref<HTMLElement | null>(null)
const current = ref(1)
const pad = (n: number) => String(n).padStart(2, '0')

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
      <p class="g mb-11 text-2xl text-muted" aria-hidden="true">
        <span class="text-accent">{{ pad(current) }}</span> / {{ pad(projects.length) }}
      </p>
    </div>

    <div ref="row" class="row" tabindex="0" aria-label="Lista de projetos (role para o lado)">
      <div v-for="(p, i) in projects" :key="p.slug" :data-index="i" class="contents-wrap">
        <ProjectCard :project="p" :index="i" />
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
</style>
