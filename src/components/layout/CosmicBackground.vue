<script setup lang="ts">
import StarIcon from '../ui/StarIcon.vue'

/** Fundo: duas auroras desfocadas que derivam devagar + estrelas discretas */
const stars = [
  { l: 12, t: 18, s: 10 },
  { l: 46, t: 9, s: 7 },
  { l: 88, t: 14, s: 12 },
  { l: 30, t: 33, s: 8 },
  { l: 72, t: 41, s: 9 },
  { l: 8, t: 58, s: 11 },
  { l: 92, t: 66, s: 8 },
  { l: 55, t: 79, s: 10 },
  { l: 20, t: 90, s: 7 },
]
</script>

<template>
  <div class="cosmos" aria-hidden="true">
    <div class="aurora a" />
    <div class="aurora b" />
    <span
      v-for="(s, i) in stars"
      :key="i"
      class="star"
      :style="{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.s}px`, height: `${s.s}px` }"
    >
      <StarIcon />
    </span>
  </div>
</template>

<style scoped>
.cosmos {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.aurora {
  position: absolute;
  width: 70vmax;
  height: 70vmax;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
}
html.dark .aurora {
  opacity: 0.22;
}
.a {
  left: -20vmax;
  top: -20vmax;
  background: radial-gradient(circle, var(--rose), transparent 65%);
  animation: driftA 40s ease-in-out infinite alternate;
}
.b {
  right: -25vmax;
  top: 120vh;
  background: radial-gradient(circle, var(--lilac), transparent 65%);
  animation: driftB 50s ease-in-out infinite alternate;
}
@keyframes driftA {
  to {
    transform: translate3d(14vw, 12vh, 0) scale(1.08);
  }
}
@keyframes driftB {
  to {
    transform: translate3d(-12vw, -14vh, 0) scale(1.1);
  }
}
.star {
  position: absolute;
  color: var(--accent);
  opacity: 0.3;
}
</style>
