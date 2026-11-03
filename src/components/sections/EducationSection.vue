<script setup lang="ts">
import { education, skillGroups } from '@/data/career'
import { formatRange, isInProgress } from '@/data/dates'
import SectionHeader from '../ui/SectionHeader.vue'
import SkillAccordion from '../ui/SkillAccordion.vue'
import StarIcon from '../ui/StarIcon.vue'

/* estrelinhas e planetas que flutuam no fundo (bem sutis) */
const stars = [
  { l: 6, t: 10, s: 10 },
  { l: 22, t: 34, s: 7 },
  { l: 41, t: 6, s: 12 },
  { l: 63, t: 22, s: 8 },
  { l: 86, t: 12, s: 11 },
  { l: 94, t: 46, s: 7 },
  { l: 52, t: 52, s: 9 },
  { l: 3, t: 68, s: 9 },
  { l: 31, t: 88, s: 11 },
  { l: 74, t: 76, s: 8 },
  { l: 90, t: 92, s: 10 },
]
</script>

<template>
  <section id="formacao" class="sec education" aria-labelledby="formacao-heading">
    <div class="sky" aria-hidden="true">
      <span
        v-for="(s, i) in stars"
        :key="i"
        class="sky-star"
        :style="{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.s}px`, height: `${s.s}px` }"
      >
        <StarIcon />
      </span>
      <span class="sky-planet p1" />
      <span class="sky-planet p2" />
      <span class="sky-planet p3" />
    </div>

    <SectionHeader number="05" title="Formação e competências" heading-id="formacao-heading" />

    <div class="grid">
      <article v-for="item in education" :key="item.id" class="bento" :class="{ big: item.featured }">
        <StarIcon v-if="item.featured" :size="52" class="mark" />
        <p class="kick">{{ item.institution }}</p>
        <h3 class="g" :class="item.featured ? 'title-big' : 'title'">{{ item.course }}</h3>
        <p class="dates">{{ formatRange(item.start, item.end) }}</p>
        <p v-if="item.featured && isInProgress(item.end)" class="badge">Em andamento</p>
      </article>

      <article class="bento full">
        <h3 class="g mb-1 text-xl">Competências</h3>
        <SkillAccordion :groups="skillGroups" />
      </article>
    </div>
  </section>
</template>

<style scoped>
/* fim da seção escurece para emendar com o céu noturno do Contato */
.education::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -25px;
  height: 420px;
  z-index: -2;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(21, 11, 30, 0) 0%,
    rgba(42, 18, 64, 0.35) 45%,
    rgba(21, 11, 30, 0.85) 80%,
    #150b1e 100%
  );
}
.sky {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.sky-star {
  position: absolute;
  color: var(--accent);
  opacity: 0.35;
  animation:
    twinkle 4s ease-in-out infinite alternate,
    drift 26s ease-in-out infinite alternate;
}
.sky-star:nth-child(2n) {
  color: var(--pink);
  animation-duration: 5.5s, 32s;
}
.sky-star:nth-child(3n) {
  color: var(--lilac);
  animation-duration: 3.2s, 22s;
  animation-delay: -1.2s, -6s;
}
@keyframes twinkle {
  from {
    opacity: 0.15;
    scale: 0.8;
  }
  to {
    opacity: 0.55;
    scale: 1.1;
  }
}
@keyframes drift {
  to {
    translate: 24px -18px;
    rotate: 45deg;
  }
}
.sky-planet {
  position: absolute;
  border-radius: 50%;
  opacity: 0.45;
  background: radial-gradient(circle at 35% 30%, #fff, #ffd6e8 50%, #f4a7ca);
}
.sky-planet::after {
  content: '';
  position: absolute;
  inset: 36% -45%;
  border-radius: 50%;
  border: 2px solid #d8c4ff;
  transform: rotate(-20deg);
}
.p1 {
  width: 26px;
  height: 26px;
  top: 14%;
  left: -60px;
  animation: flyR 48s linear infinite;
}
.p2 {
  width: 22px;
  height: 22px;
  top: 58%;
  left: -40px;
  background: radial-gradient(circle at 35% 30%, #fff, #d8c4ff 50%, #a855f7);
  animation: flyR 64s linear -22s infinite;
}
.p2::after {
  display: none;
}
.p3 {
  width: 20px;
  height: 20px;
  top: 82%;
  right: -50px;
  animation: flyL 56s linear -10s infinite;
}
@keyframes flyR {
  50% {
    transform: translate(55vw, -40px) rotate(140deg);
  }
  to {
    transform: translate(110vw, 10px) rotate(300deg);
  }
}
@keyframes flyL {
  50% {
    transform: translate(-55vw, 30px) rotate(-120deg);
  }
  to {
    transform: translate(-110vw, -20px) rotate(-260deg);
  }
}

/* grade bento */
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
}
.bento {
  position: relative;
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 28px;
  border-radius: 28px;
  background: var(--surface);
  border: 1px solid var(--line);
  overflow: hidden;
  transition:
    border-color 0.3s ease-out,
    box-shadow 0.4s ease-out;
}
.bento:hover {
  border-color: color-mix(in oklab, var(--accent) 45%, transparent);
  box-shadow: 0 18px 44px rgba(168, 85, 247, 0.16);
}
.bento.big {
  grid-column: span 6;
  grid-row: span 2;
  justify-content: flex-end;
  min-height: 340px;
  background:
    radial-gradient(circle at 85% 15%, rgba(216, 196, 255, 0.7), transparent 55%),
    radial-gradient(circle at 10% 90%, rgba(255, 214, 232, 0.8), transparent 55%),
    var(--surface);
}
html.dark .bento.big {
  background: radial-gradient(circle at 85% 15%, rgba(192, 132, 252, 0.3), transparent 55%), var(--surface);
}
.bento.full {
  grid-column: 1 / -1;
}
/* planetinha que aparece no canto ao passar o mouse */
.bento:not(.full)::before {
  content: '';
  position: absolute;
  right: -12px;
  top: -12px;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: radial-gradient(circle at 34% 30%, #fff 0%, #ffe6f1 30%, #f4c3dd 62%, #c9b0f5 100%);
  box-shadow:
    inset -8px -10px 18px rgba(168, 85, 247, 0.25),
    0 6px 22px rgba(244, 167, 202, 0.45);
  opacity: 0;
  transform: translate(30px, -30px) scale(0.4) rotate(-40deg);
  transition:
    opacity 0.35s ease-out,
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}
.bento:not(.full)::after {
  content: '';
  position: absolute;
  right: -38px;
  top: 13px;
  width: 126px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(216, 196, 255, 0.95);
  border-top-color: rgba(244, 167, 202, 0.6);
  opacity: 0;
  transform: translate(30px, -30px) rotate(-18deg) scale(0.4);
  transition:
    opacity 0.35s ease-out 0.05s,
    transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s;
  pointer-events: none;
}
.bento:not(.full):hover::before {
  opacity: 1;
  transform: none;
}
.bento:not(.full):hover::after {
  opacity: 1;
  transform: rotate(-18deg);
}
.bento.big::before {
  top: auto;
  bottom: 34px;
  right: 40px;
  width: 110px;
  height: 110px;
}
.bento.big::after {
  top: auto;
  bottom: 76px;
  right: 2px;
  width: 186px;
  height: 34px;
}
@supports (animation-timeline: view()) {
  .bento {
    animation: bentoIn linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 25%;
  }
  @keyframes bentoIn {
    from {
      clip-path: inset(0 0 100% 0 round 28px);
      transform: translateY(24px);
    }
    to {
      clip-path: inset(0 0 0 0 round 28px);
      transform: none;
    }
  }
}
.mark {
  position: absolute;
  top: 28px;
  right: 28px;
  color: var(--accent);
}
.kick {
  color: var(--accent-text);
  font-weight: 600;
  font-size: 15px;
}
.title {
  font-size: 22px;
  line-height: 1.15;
}
.title-big {
  font-size: clamp(28px, 3vw, 44px);
  line-height: 1.1;
  max-width: 18ch;
}
.dates {
  color: var(--muted);
  font-size: 15px;
}
.badge {
  width: fit-content;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  color: var(--accent-text);
  font-weight: 600;
  font-size: 14px;
}
@media (max-width: 1023px) {
  .bento,
  .bento.big {
    grid-column: span 6;
    grid-row: auto;
  }
  .bento.big {
    grid-column: 1 / -1;
  }
}
@media (max-width: 639px) {
  .bento {
    grid-column: 1 / -1;
    padding: 22px;
  }
  .bento.big {
    min-height: 260px;
  }
  .kick {
    font-size: 14px;
    font-weight: 500;
  }
  .title,
  .title-big {
    font-size: 20px;
    font-weight: 500;
    line-height: 1.15;
  }
  .title-big {
    max-width: 20ch;
  }
  .dates {
    font-size: 14px;
  }
  .badge {
    font-size: 13px;
    font-weight: 500;
  }
}
</style>
