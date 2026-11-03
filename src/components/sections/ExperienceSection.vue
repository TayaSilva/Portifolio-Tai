<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { jobs } from '@/data/career'
import { formatDuration, formatRange } from '@/data/dates'
import SectionHeader from '../ui/SectionHeader.vue'

const ARC = 'M 50 0 C 96 160, 96 330, 50 500 S 4 840, 50 1000'
const timeline = ref<HTMLElement | null>(null)
const drawPath = ref<SVGPathElement | null>(null)
let frame = 0

function updateMobileProgress() {
  frame = 0
  if (!window.matchMedia('(max-width: 1023px)').matches || !timeline.value) return

  const rect = timeline.value.getBoundingClientRect()
  const startPoint = window.innerHeight * 0.82
  const trackingDistance = rect.height + window.innerHeight * 0.64
  const rawProgress = (startPoint - rect.top) / trackingDistance
  const progress = Math.min(1, Math.max(0, rawProgress * 6))
  drawPath.value?.style.setProperty('stroke-dasharray', '1 1')
  drawPath.value?.style.setProperty('stroke-dashoffset', String(1 - progress))
}

function onScroll() {
  if (frame) return
  frame = window.requestAnimationFrame(updateMobileProgress)
}

onMounted(() => {
  updateMobileProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('scroll', onScroll, { passive: true, capture: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('scroll', onScroll, true)
  window.removeEventListener('resize', onScroll)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <section id="experiencia" class="sec" aria-labelledby="experiencia-heading">
    <SectionHeader number="04" title="Experiência" heading-id="experiencia-heading" />
    <div ref="timeline" class="timeline">
      <!-- linha em arco que se desenha com a rolagem -->
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        <path :d="ARC" fill="none" stroke="var(--line)" stroke-width="2" vector-effect="non-scaling-stroke" />
        <path
          ref="drawPath"
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
  .draw {
    animation: none;
    stroke-dasharray: 1;
  }
}
</style>
