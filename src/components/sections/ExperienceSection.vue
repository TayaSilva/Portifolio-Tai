<script setup lang="ts">
import { jobs } from '@/data/career'
import { formatDuration, formatRange } from '@/data/dates'
import SectionHeader from '../ui/SectionHeader.vue'

const ARC = 'M 50 0 C 96 160, 96 330, 50 500 S 4 840, 50 1000'
</script>

<template>
  <section id="experiencia" class="sec" aria-labelledby="experiencia-heading">
    <SectionHeader number="04" title="Experiência" heading-id="experiencia-heading" />
    <div class="timeline">
      <!-- linha em arco que se desenha com a rolagem -->
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        <path :d="ARC" fill="none" stroke="var(--line)" stroke-width="2" vector-effect="non-scaling-stroke" />
        <path
          class="draw"
          pathLength="1"
          :d="ARC"
          fill="none"
          stroke="var(--accent)"
          stroke-width="2"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <ol class="list">
        <li v-for="job in jobs" :key="job.id" class="rv job">
          <h3 class="g company">{{ job.company }}</h3>
          <p class="role">{{ job.role }}</p>
          <p class="meta">
            <time :datetime="job.start">{{ formatRange(job.start, job.end) }}</time>
            · {{ formatDuration(job.start, job.end) }} · {{ job.location }}
          </p>
          <ul class="bullets">
            <li v-for="b in job.bullets" :key="b">{{ b }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 48px;
}
.timeline svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
@supports (animation-timeline: view()) {
  .draw {
    stroke-dasharray: 1;
    animation: drawLine linear both;
    animation-timeline: view();
    animation-range: entry 30% exit 40%;
  }
  @keyframes drawLine {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
}
.list {
  display: grid;
  gap: 110px;
}
.job {
  display: grid;
  gap: 14px;
  max-width: 62ch;
}
.company {
  font-size: clamp(32px, 4vw, 56px);
  line-height: 1;
}
.role {
  font-size: 20px;
  font-weight: 600;
  color: var(--accent-text);
}
.meta {
  font-size: 15px;
  color: var(--muted);
}
.bullets {
  display: grid;
  gap: 6px;
  padding-left: 1.1em;
  list-style: disc;
}
.bullets li::marker {
  color: var(--accent);
}
@media (max-width: 1023px) {
  .timeline {
    grid-template-columns: 40px 1fr;
    gap: 16px;
  }
  .list {
    gap: 64px;
  }
}
</style>
