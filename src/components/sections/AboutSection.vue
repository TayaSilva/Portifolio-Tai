<script setup lang="ts">
import { profile } from '@/data/profile'
import SectionHeader from '../ui/SectionHeader.vue'

/** Separa o parágrafo para destacar "Front-End" e "UX" */
const parts = (text: string) =>
  text.split(new RegExp(`(${profile.highlights.join('|')})`, 'g')).map((t) => ({
    text: t,
    hl: profile.highlights.includes(t),
  }))
</script>

<template>
  <section id="sobre" class="sec" aria-labelledby="sobre-heading">
    <SectionHeader number="02" title="Sobre" heading-id="sobre-heading" />
    <div class="text">
      <p v-for="(p, i) in profile.about" :key="i" class="scrub">
        <template v-for="(part, j) in parts(p)" :key="j">
          <strong v-if="part.hl" class="hl">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.text {
  display: flex;
  flex-direction: column;
  gap: 1.4em;
  max-width: min(64ch, 62vw);
  font-size: clamp(18px, 1.7vw, 24px);
}
.hl {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent-text);
}
/* as palavras passam de "apagadas" para a cor do texto com a rolagem */
@supports (animation-timeline: view()) {
  .scrub {
    animation: scrub linear both;
    animation-timeline: view();
    animation-range: entry 40% cover 55%;
  }
  @keyframes scrub {
    from {
      color: var(--muted);
    }
    to {
      color: var(--text);
    }
  }
}
@media (max-width: 1023px) {
  .text {
    max-width: 100%;
  }
}
</style>
